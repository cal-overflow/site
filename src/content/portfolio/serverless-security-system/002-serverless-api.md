---
id: 2
title: Serverless API
slug: serverless-api
date: April 8, 2023
# img: ''
tags: 
  - Complex
  - Cloud
---

A full-stack, ***serverless*** application can only classify as such if its API is *serverless*.

Let's break down the *serverless* API built with AWS Lambda.

<!--more-->

### First and foremost
There are a couple of design choices that may stick out if you're familiar with serverless API design in AWS. Let me explain my reasoning for some of the less-traditional choices. 

#### No API Gateway
API Gateway is incredibly common and was even my initial choice for the serverless API. However, after leveraging API Gateway in an early prototype, I realized that there are small disadvantages to API Gateway. These disadvantages are:

##### 1. It's expensive.
When compared to leveraging simple Lambda functions with an invocation URL, API Gateway is rather pricey. This cost is especially noticeable when the application is small-scale and being utilized by only a small number of users.

##### 2. `AWS::Serverless` + API Gateway + CloudFormation = Confusion
This project leverages [Infrastructure as Code](/cloud/infrastructure-as-code)  through AWS CloudFormation. When you deploy a serverless
API Gateway with AWS CloudFormation and the [Serverless transformation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-aws-serverless.html), AWS provisions additional resources that you do not define within your template. This is necessary for the serverless application to work. However, I do not enjoy seeing resources provisioned when they're not defined explicitely in the CloudFormation template.

##### 3. Why add more complexity?
API Gateway provides very little benefits to small-scale applications such as this security system. API Gateway definitely has its uses, however, it feels that leveraging the tool would add a sense of complexity to this (somewhat simple) small-scale project.


---

### Features
There are individual endpoints that together make the API function. These endpoints allow for REST activities such as:
- fetching footage
  - Filtering footage with or without activity
  - Filtering footage for a given day
  - Filtering footage for a given time
- User Authentication
- Managing the configuration
- Managing users
- Managing clients

Let's take a look at the implementations for each of these features.

#### Fetching footage
The Security System wouldn't be all that great if users couldn't view the security footage. There is a `/videos` endpoint that searches the system's S3 bucket for footage, given the given filter. Before we can understand how the request parses and returns videos, we must first understand how videos are stored.

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

Note that boto3, the official AWS SDK for Python, makes filtering these videos simple. Using the s3 client in Boto3, the API filters videos by the object prefix. See an example below, where the API is searching only for videos with activity on April 14, 2023.
```python
s3_client.list_objects(Bucket=SYSTEM_BUCKET, Prefix='footage/activity/2023-04/14')
```

The value returned by the above response is then used to create secure links to which the user can be passed. These links provide temporary view access to the footage. An example video, included in the list of videos, is shown below.

```json
{
  "camera": "06d22a99",
  "contains_motion": true,
  "date": "2023-04-14",
  "expiration": 1681527063.1003053,
  "time": "12-03-00",
  "video_url": "https://{SYSTEM_BUCKET_URL}/footage/activity/2023-04/14/12-03-00_06d22a99.mp4?AWSAccessKeyId=abc123..."
}
```
The video's `video_url` can be used to securely view the footage. This url expires after a short time (likely a few hours), so the footage remains locked without another authenticated request for videos.

#### User authentication
This implementation was so unique that I dedicated an entire post to authentication. View the post [here](/portfolio/serverless-security-system/authentication).

#### Managing the Configuration
...
MENTION:
- [ ] Environment variables (System config)
```text
footage/
  ...
configuration/
  settings.json
  clients/
    06d22a99.json
    e70b0ffe.json
```

#### Managing users
...

#### Managing clients
...

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

