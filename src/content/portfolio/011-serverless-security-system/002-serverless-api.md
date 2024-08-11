---
id: 2
title: Serverless API
slug: serverless-api
date: April 16, 2023
img: 'feature-images/IMG_0285.png'
tags: 
  - Complex
  - Cloud
---

A full-stack, ***serverless*** application can only classify as such if its API is *serverless*.

Let's break down the *serverless* API built with AWS Lambda.

<!--more-->

### First and foremost
One design choice may stick out if you're familiar with serverless API design in AWS. Let me explain my reasoning for this less-traditional design choice. 

#### No API Gateway
API Gateway is incredibly common and was even my initial choice for the serverless API. However, after leveraging API Gateway in an early prototype, I realized that there are small disadvantages to API Gateway. These disadvantages are:

##### 1. It's expensive
Compared to leveraging simple Lambda functions with an invocation URL, API Gateway could be more costly. This price is especially noticeable when the application is small-scale and utilized by only a few users.

##### 2. `AWS::Serverless` + API Gateway + CloudFormation = Confusion
This project leverages [Infrastructure as Code](/cloud/infrastructure-as-code)  through AWS CloudFormation. When you deploy a serverless
API Gateway with AWS CloudFormation and the [Serverless transformation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-aws-serverless.html), AWS provisions additional resources that you do not define within your template. These additional resources are necessary for the serverless application to work. However, I only enjoy seeing resources provisioned when they're defined explicitly in the CloudFormation template.

##### 3. Why add more complexity?
API Gateway provides few benefits to small-scale applications such as this security system. API Gateway has its uses; however, leveraging the tool would add a sense of complexity to this (somewhat simple) small-scale project.


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
The Security System would be nearly useless if users couldn't view the captured security footage. Performing a GET request on the `/videos` endpoint will trigger a Lambda function to search the system's S3 bucket for footage that matches the given filter. Before we can understand how the request parses and returns videos, we must first understand how videos are stored.

The file structure below represents the S3 bucket for an example System. In this unrealistic example, there are only a few videos.
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

As you may suspect, filtering videos by their type (with or without activity) is incredibly simple. Furthermore, filtering videos by date and time is also rather simple.

Note that [boto3](https://github.com/boto/boto3), the official AWS SDK for Python, simplifies filtering these videos. Using the s3 client in Boto3, the API filters videos by the object prefix. See an example below, where the API only searches for videos with activity on April 14, 2023.
```python
s3_client.list_objects(Bucket=SYSTEM_BUCKET, Prefix='footage/activity/2023-04/14')
```

The API then leverages the returned list of objects to construct a response. The API generates secure presigned URLs for each of the video objects. These presigned URLs are a secure, temporary[^1] means of viewing the requested videos.

The API constructs a list of video objects with the presigned URL for the system's [frontend](/portfolio/serverless-security-system/frontend) to present to the end user.

Below is an example response from the API after a request for all footage with activity on April 14, 2023.

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
If you recall the S3 bucket above, you may remember a `configuration` folder. Let's take a closer look at this folder.

```text
configuration/
  settings.json
  clients/
    06d22a99.json
footage/
  ...
```
<small>

Note the `configuration/clients` folder is separate from the system configuration. We'll dissect that later in the [managing clients](#managing-clients) section.
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
These settings are rather straightforward. For more detail, see [the cloud docs on github](https://github.com/cal-overflow/serverless-security-system/tree/main/cloud#configuration).

What's more interesting is why I said only *some* of the system-wide settings are stored in this file. You see: more system settings are available to users than just the options shown in the JSON file above.

If we look at the API Lambda function, we'll see the below environment variables.

| Variable | Description |
| :-: | :-- |
| `USER_TOKEN_EXPIRATION_TIME` | How long user authentication tokens will remain valid |
| `INVITATION_EXPIRATION_TIME` | How long user invitations will remain valid |
| `PRESIGN_URL_EXPIRATION_TIME` | How long video URLs will remain valid |

The above environment variables are also a part of the system configuration. These environment variables are utilized throughout various API calls. For example, whenever a user requests videos, the Lambda function will look at the `PRESIGN_URL_EXPIRATION_TIME` variable to determine how long (in seconds) presigned URLs should remain valid before expiring.

#### Why?
The reason is simple: Fetching the `configuration/settings.json` file is slow. Whenever a Lambda function needs to read the `configuration/settings.json` file, it must first find and download it from the S3 bucket. \
There is nothing wrong with downloading this file, especially when the user requests the data within the file. However, some API requests require certain system configuration settings, but not everything.

Essentially: **Leveraging environment variables makes the API more efficient (faster).**

#### Caveats
One caveat is that the `/config` endpoint becomes more complex.

Whenever a user changes the system configuration, the Lambda function must store these config changes appropriately. \
Instead of simply writing an updated JSON object to S3, the Lambda function must deconstruct the JSON. Once this is done, the Lambda function updates the `configuration/settings.json` file in S3 while also updating its environment variables.

<divider></divider>

### Managing clients
This simple example system only includes a single [client](/portfolio/serverless-security-system/clients). However, it suffices to demonstrate the implementation.

Recall the object `configuration/clients/06d22a99.json` in the system's bucket. This file is the configuration for client `06d22a99`. The client configuration file will look something like this:
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

This data is rather simple: it tells us information about the client. Given a request for client data, the API can simply respond with the corresponding JSON configuration(s).

#### Client update
Many of a client's properties cannot be altered by user input. \
Only the `name`, `motion_threshold`, and `is_active` fields can be edited. Fields such as `last_upload_key` and `last_upload_time` are automatically updated whenever the client uploads a new object (video).

#### Client creation
Client configurations are automatically created when a client first connects to the system. View the post on [clients](/portfolio/serverless-security-system/clients) to better understand this process.

#### Client deletion
Deleting clients is intentionally not supported. However, the `is_active` field can be toggled to false to indicate that a client is no longer in use. <!--The field is automatically reset to `true` given the client uploads another video.-->

<divider></divider>

### User authentication
Authentication was such an interesting challenge that I dedicated an entire post to the topic. View the post [here](/portfolio/serverless-security-system/authentication).

<divider></divider>

### Managing users
Managing users is rather straightforward.

User data is stored in a DynamoDB table. The primary key (unique identifier) for each user is their name. The API reads, inserts, updates, and deletes entries in the DynamoDB table as needed for user requests.

See an example User DynamoDB table below.

![Picture of user DynamoDB table](/blog-images/serverless-security-system/users-dynamo-table-example.png)
Refer to the [authentication post](/portfolio/serverless-security-system/authentication) for more information on the token fields.

#### Security
Passwords (also called "pins") are not currently encrypted. However, I plan to achieve with AWS KMS in the future.

---

### Want More?
I provided a synopsis of each endpoint without excessive detail in this post. \
If you want to see all endpoints or the exact request/response format, please view the [API endpoints document](https://github.com/cal-overflow/serverless-security-system/blob/main/cloud/api-endpoints.md#api).

If you're interested in seeing the source code for the API, please see the project [`cloud/lambda/api` folder](https://github.com/cal-overflow/serverless-security-system/tree/main/cloud/lambda/api). Also, see the Function definition in [`cloud/template.yml`](https://github.com/cal-overflow/serverless-security-system/blob/29fb390a3667fddede8703d381b76432cd7c7610/cloud/template.yml#L205-L240).

<!--
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
-->

[^1]: Presigned URLs expire quickly (typically a few hours--depending on the system configuration). Another request can be made to generate "fresh" presigned URLs.
