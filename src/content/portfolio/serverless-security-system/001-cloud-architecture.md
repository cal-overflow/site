---
id: 1
title: Cloud Architecture
slug: cloud-architecture
date: March 26, 2023
img: 'feature-images/IMG_0225.png'
tags: 
  - Complex
  - Cloud
---


<!--
How do I even start with this?
Well, I could list out every AWS resource that is used within the system. However, *it might be easier to list only AWS resources that aren't leveraged by the system.* 🤣
-->

<!--
Once footage is captured by [clients](/portfolio/serverless-security-system/client), it is streamed to the cloud.
The system's cloud architecture is responsible for several tasks. The most notable tasks completed within the cloud are:
- Footage is stored,
- Footage is served to users
- Frontend website is stored & served
- much more
-->

[Clients](/portfolio/serverless-security-system/clients) are solely responsible for capturing and uploading footage. Everything that makes up this complex system is achieved through the system's cloud architecture.

Let's look at the AWS architecture that makes up the brains of the system.

<!--more-->

![Diagram](/blog-images/serverless-security-system/template-diagram.png)
### What is this confusing diagram?
The diagram above shows the resources comprising the system's cloud architecture.

The project leverages [Infrastructure as Code](/cloud/infrastructure-as-code) through AWS CloudFormation. Meaning AWS generated the above diagram of resources from the project's CloudFormation template. **This auto-generated diagram does not appropriately show how resources interact.** Instead, the arrows indicate what a resource depends on within AWS. \
You can view the complete template [here](https://github.com/cal-overflow/serverless-security-system/blob/main/cloud/template.yml).

Let's take a high-level look at the system's cloud architecture.

<divider></divider>

## Data Storage 💾
### S3
S3 is the backbone of the Serverless Security System. Clients upload footage directly to the system's S3 bucket. The footage is securely stored in the bucket and later managed (i.e., given to logged-in users for viewing) through [serverless logic](#lambda). \
The same S3 bucket stores system configuration information and client configuration data.

Another frontend S3 bucket is leveraged for hosting the static frontend. The frontend bucket is configured with [CloudFront](#cloudfront) for website hosting.


### DynamoDB
<!-- Since footage and other resources are not meant to be publicly accessible, user information and permissions must be stored. \ -->
The security system allows users to log into an account and access private resources such as footage. Users may even alter the system configuration if granted the correct administrative permissions. \
An authentication system is required so that the system can identify users and their permissions. The authentication system leverages DynamoDB as its data store.

Take a more detailed look at the custom authentication system [here](/portfolio/serverless-security-system/authentication).

<divider></divider>

## Accessibility 🌍
### CloudFront
The [frontend](/portfolio/serverless-security-system/frontend) is a static website. The website is bundled into an [S3 bucket](#s3). CloudFront is leveraged as the CDN. CloudFront provides traffic encryption and website caching for faster page load times.

### Lambda
Lambda is leveraged as the system's middleware. The frontend can communicate with the Lambda-based [Serverless API](/portfolio/serverless-security-system/serverless-api) to interact with and access system resources.

<divider></divider>

## System connectivity 🔌
### IAM
IAM is heavily leveraged to allow connectivity between various AWS resources. IAM also allows clients to interact with AWS as needed. For instance, an IAM user is provisioned with an access key. Said access key is used by clients for making AWS API calls. Following the least-privilege principle, the client user has only access to S3 for uploading footage and syncing its configuration.

IAM Roles grant AWS services, such as Lambda, the necessary permissions to interact with other AWS services. These roles also follow the least-privilege principle.

### Secrets Manager
Less interestingly, the client IAM user access key is stored as a secret within a Secrets Manager Secret. Using a secret allows for easy retrieval and keeps the resource managed by the CloudFormation stack.

---


View the complete source code for the cloud portion of the security system [here](https://github.com/cal-overflow/serverless-security-system/tree/main/cloud).
