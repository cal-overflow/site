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
When compared to leveraging simple Lambda functions with an invocation URL, API Gateway is rather pricey. This cost is especially notable when the application is small-scale and being utilized by only a small number of users.

##### 2. `AWS::Serverless` + API Gateway + CloudFormation = Confusion
This project leverages [Infrastructure as Code](/cloud/infrastructure-as-code)  through AWS CloudFormation. To deploy a serverless
API Gateway + CloudFormation = unprovisioned AWS resources

##### 3. Why add more complexity?
API Gateway provides very little benefits to small-scale applications such as this security system. API Gateway definitely has its uses, however, it feels that leveraging the tool would add a sense of complexity to this (somewhat simple) small-scale project.

---

TODO
TO INCLUDE:

- [x] Mention why API Gateway is not being used
- [ ] Environment variables (System config)
- [ ] ...
- [ ] Include the Configuration pulled from S3 like below
```text
configuration/
  settings.json
  clients/
    06d22a99.json
    e70b0ffe.json
```
