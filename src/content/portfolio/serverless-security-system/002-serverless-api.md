---
id: 2
title: Serverless API
slug: serverless-api
date: April 15, 2023
img: 'feature-images/IMG_0285.png'
tags: 
  - Complex
  - Cloud
---

A full-stack, ***serverless*** application can only classify as such if its API is *serverless*.

Let's break down the *serverless* API built with AWS Lambda.

<!--more-->

### First and foremost
There is one design choice that may stick out if you're familiar with serverless API design in AWS. Let me explain my reasoning for this less-traditional design choice. 

#### No API Gateway
API Gateway is incredibly common and was even my initial choice for the serverless API. However, after leveraging API Gateway in an early prototype, I realized that there are small disadvantages to API Gateway. These disadvantages are:

##### 1. It's expensive
When compared to leveraging simple Lambda functions with an invocation URL, API Gateway is rather pricey. This cost is especially noticeable when the application is small-scale and being utilized by only a small number of users.

##### 2. `AWS::Serverless` + API Gateway + CloudFormation = Confusion
This project leverages [Infrastructure as Code](/cloud/infrastructure-as-code)  through AWS CloudFormation. When you deploy a serverless
API Gateway with AWS CloudFormation and the [Serverless transformation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-aws-serverless.html), AWS provisions additional resources that you do not define within your template. This is necessary for the serverless application to work. However, I do not enjoy seeing resources provisioned when they're not defined explicitely in the CloudFormation template.

##### 3. Why add more complexity?
API Gateway provides very little benefits to small-scale applications such as this security system. API Gateway definitely has its uses, however, it feels that leveraging the tool would add a sense of complexity to this (somewhat simple) small-scale project.


---

## Features
There are individual endpoints that together make the API function. These endpoints enable the following REST activities:
- [Fetching footage](#fetching-footage)
- [Managing the configuration](#managing-the-configuration)
- [Managing clients](#managing-clients)
- [User Authentication](#user-authentication)
- [Managing users](#managing-users)

Let's take a look at the implementations for each of these features.

<divider></divider>

### Fetching footage
The Security System wouldn't be all that great if users couldn't view the captured security footage. Performing a GET request on the `/videos` endpoint will trigger a Lambda function to search the system's S3 bucket for footage that matches the given filter. Before we can understand how the request parses and returns videos, we must first understand how videos are stored.

The file structure below represents the S3 bucket for an example System. In this unrealistic example there are only a few videos.
```text
configuration/
  ...
footage/
  normal/
    2023-04/
      14/
        12-00-00_06d22a99.mp4
        12-01-00_06d22a99.mp4
        12-02-00_06d22a99.mp4
        12-05-00_06d22a99.mp4
  activity/
    2023-04/
      14/
        12-03-00_06d22a99.mp4
        12-04-00_06d22a99.mp4
```

As you may suspect, filtering videos by their type (with or without activity) is incredibly simple. Furthermore, filtering videos by the date and time is also rather simple.

Note that [boto3](https://github.com/boto/boto3), the official AWS SDK for Python, makes filtering these videos simple. Using the s3 client in Boto3, the API filters videos by the object prefix. See an example below, where the API is searching only for videos with activity on April 14, 2023.
```python
s3_client.list_objects(Bucket=SYSTEM_BUCKET, Prefix='footage/activity/2023-04/14')
```

The returned list of objects is then leveraged by the API to construct a response. The API generates secure presigned URL's for each of the video objects. These presigned URL's behave as a secure, temporary[^1], means of viewing the requested videos.

The API constructs a list of video objects with the presigned URL for the system's [frontend](/portfolio/serverless-security-system/frontend) to present to the end user.

Below is an example response from the API for requesting all footage with activity on April 14, 2023.

```json
[
  {
    "camera": "06d22a99",
    "contains_motion": true,
    "date": "2023-04-14",
    "expiration": 1681527063.1003053,
    "time": "12-03-00",
    "video_url": "https://{SYSTEM_BUCKET_URL}/footage/activity/2023-04/14/12-03-00_06d22a99.mp4?AWSAccessKeyId=abc123..."
  },
  {
    "camera": "06d22a99",
    "contains_motion": true,
    "date": "2023-04-14",
    "expiration": 1681527063.1003053,
    "time": "12-04-00",
    "video_url": "https://{SYSTEM_BUCKET_URL}/footage/activity/2023-04/14/12-04-00_06d22a99.mp4?AWSAccessKeyId=def456..."
  }
]
```
Notice that each video's presigned URL is renamed to `video_url`. The URL becomes invalid after the time denoted by the `expiration` attribute.

<divider></divider>

### Managing the Configuration
If you recall the S3 bucket from above, you may remember a `configuration` folder. Let's take a closer look at this folder.

```text
configuration/
  settings.json
  clients/
    06d22a99.json
footage/
  ...
```
<small>

Note, the `configuration/clients` folder is separate from the system configuration. We'll dissect that in the [managing clients](#managing-clients) section later.
</small>

The `configuration/settings.json` holds *some* of the system-wide settings. An example of what this file may look like is shown below.

```json
{
  "is_motion_outlined": false,
  "clip_length": 60,
  "clips_per_upload": 1,
  "default_motion_threshold": 5000,
  "days_to_keep_motionless_videos": 1
}
```
These settings are rather straightforward. For more detail on each of these settings, see [the cloud docs on github](https://github.com/cal-overflow/serverless-security-system/tree/main/cloud#configuration).

What's more interesting is why I said only *some* of the system-wide settings are stored in this file. You see, there are more system settings available to users than just the options shown in the JSON file above.

If we look at the API Lambda function, we'll see the below environment variables.

| Variable | Description |
| :-: | :-- |
| `USER_TOKEN_EXPIRATION_TIME` | How long user authentication tokens remain valid |
| `INVITATION_EXPIRATION_TIME` | How long user invites remain valid |
| `PRESIGN_URL_EXPIRATION_TIME` | How long video URLs remain valid |

The above environment variables are also a part of the system configuration. These environment variables are utilized throughout various API calls. For example, whenever a user requests videos, the Lambda function will look at the `PRESIGN_URL_EXPIRATION_TIME` variable to determine how long (in seconds) presigned URLs should remain valid before expiring.

#### Why?
The reason is simple: Fetching the `configuration/settings.json` file is slow. Whenever a Lambda function needs to read the `configuration/settings.json` file, it must first find and download the file from the S3 bucket. \
There is nothing wrong with downloading this file, especially when the user specifically requests the data within the file. However, some API requests require certain system configuration settings, but not everything.

Essentially: **Leveraging environment variables makes the API more efficient (faster).**

#### Caveats
There is one caveat to this: the `/config` endpoint becomes more complex.

Whenever a user makes changes to the system configuration, the Lambda function must appropriately store these config changes. \
Instead of simply writing an updated JSON object to S3, the Lambda function must deconstruct the given JSON. Once this is done, the Lambda function updates the `configuration/settings.json` file in S3 while also updating its environment variables.

<divider></divider>

### Managing clients
This example system is rather simple and only includes a single [client](/portfolio/serverless-security-system/clients). However, it suffices to demonstrate the implementation.

Recall the object `configuration/clients/06d22a99.json` in the system's bucket. This is the configuration for client `06d22a99`. The client configuration file will look something like:
```json
{
  "id": "06d22a99",
  "last_upload_key": "footage/normal/2023-04/14/12-05-00_06d22a99.mp4",
  "last_upload_time": 1681491960,
  "name": "Front door",
  "motion_threshold": 5000,
  "is_active": true
}
```

Each client configuration consists
TODO

<divider></divider>

### User authentication
The implementation for authentication was so unique that I dedicated it an entire post . View the post [here](/portfolio/serverless-security-system/authentication).

<divider></divider>

### Managing users
TODO ...


<details>

  <summary class="hover:underline cursor-pointer">View all Endpoints</summary>

  I won't go over each endpoint in detail here, but I'll list out all of the available API endpoints. \
  View more information about these endpoints [here](https://github.com/cal-overflow/serverless-security-system/blob/main/cloud/api-endpoints.md).

  Videos (footage)
  - GET `/videos/all`
  - GET `/videos/activity`
  - GET `/videos/normal`
  Video Count
  - GET `/video-count/all`
  - GET `/video-count/activity`
  - GET `/video-count/normal`
  Authentication
  - POST `/auth/login`
  - POST `/auth/refresh`
  - POST `/auth/logout`
  - POST `/auth/invitations`
  - PUT `/auth/invitations`
  - POST `/auth/refresh`
  - POST `/auth/logout`
  Config
  - GET `/config`
  - POST `/config`
  Users
  - GET `/users`
  - GET `/users/{username}`
  - PATCH `/users/{username}`
  - DELETE `/users/{username}`
  Clients
  - GET `/clients`
  - GET `/clients/{client_id}`
  - PATCH `/clients/{client_id}`

</details>

[^1]: Presigned URLs expires after a short time (typically a few hours--depending on the system configuration). Another request can be made to generate a "fresh" presigned URL, if needed.
