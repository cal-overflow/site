---
id: 2
title: Serverless
slug: serverless
date: 'February 12, 2023'
img: 'blog-images/serverless.png'
tags:
  - AWS
todo:
  - THROW IN THING TOWARDS TOP TALKING ABOUT HOW WE'LL LOOK AT EXAMPLES WITH AWS OR SOMETHING
---


We've all been there: you're getting ready to spin up a server for our new API or game server. Suddenly, you realize you're going to need some hardware to host it. \
With the cloud, provisioning hardware is easier than ever before, but it doesn't stop there. The cloud allows us the option to design serverless applications.

Serverless allows us to almost completely forget about hardware.

<!--more-->

---

## What is serverless?

I often describe serverless to others as "only turning the computer on when you need to use it." While that's a huge over-simplification, it is essentially what happens in a serverless architecture.

Serverless eliminates the need to run a computer 24/7. Instead, we write some code, like a *function*, and provide that to a cloud provider. We tell the cloud provider that we would like our *function* to run when certain events happen. Some examples are:

- Whenever a file is uploaded
- Every day at 5 a.m.
- Every time an API call is made


## Why use serverless?
There are several benefits to using a serverless architecture. The benefits vary depending on the type of application. I'll outline some of the most obvious benefits with some examples below.

### Cost
One of the most obvious benefits is that you can likely save a lot of money with a serverless architecture. \
Let's look at the cost benefits of an application that performs file processing. Think of websites like [tinypng.com](https://tinypng.com/) where users upload a file to be processed. **We'll assume our site has 1,000 requests each hour.**
<!--For instance, a system that automatically turns lights on or off in a building as defined in a schedule. A non-serverless approach to this would be to create some sort of cronjobs that run on a server. However, that requires a computer to be running 24/7, which is quite costly. \
A serverless approach would be to create some sort of `toggleLights` function. Once the function is written, we can provide it to a cloud provider. Lastly, we simply define some events, in this case daily events following a schedule, that invoke the function. -->

Let's compare the cost of a traditional server (running 24/7) versus a serverless function that is invoked whenever a file is uploaded. \
We'll use the lowest-cost EC2 Instance and Lambda (Serverless) configuration. For the Lambda implementation, we'll assume the function takes 1 second to complete.

<!--Let's compare the cost of using AWS's cheapest EC2 Instance vs the cheapest Serverless approach with AWS Lambda. We'll generously assume our function completes in 5 seconds (that's really slow). -->

<!--
| | EC2 (traditional) | Lambda (Serverless) |
| --: | :-: | :-: |
| **Cost per 1 second run** |  | $0.0000021309 |
| **Cost per 5 second run** |  | $0.0000106545 |
| **Cost per 10,0000 requests** |  | $0.106545 |
| **Cost per 310,0000 requests** |  | $3.302895 |
| **Cost per hour** | ... |  |
| **Cost per day** | ... |  |
| **Cost per month** | ... | $0.0003302895 |
-->

<!--
| | Lambda (Serverless) |
| :-: | :-- |
| **Cost per 1 second run** | $0.0000021309 |
| **Cost per 5 second run** | $0.0000106545 |
| **Cost per 10,0000 requests** | $0.106545 |
| **Cost per 310,0000 requests** | $3.302895 |

| | EC2 Instance (traditional) |
| :-: | :-- |
| **Cost per 1 ** | $0.0000021309 |
| **Cost per 5 second run** | $0.0000106545 |
| **Cost per 10,0000 requests** | $0.106545 |
| **Cost per 310,0000 requests** | $3.302895 |
-->

|  | 1 hour - 1k requests | 1 day - 24k requests | 1 month - 720k requests |
| -: | :-: | :-: | :-: |
| **Lambda** | $0.0021309 | $0.0511416 | $1.534248 |
| **EC2** | $0.0042	| $0.1008 | $3.024 |

<!--Now, this might seem like a drastic difference. That's because it is. Remember, this is an example where we run a program twice daily. -->
TODO - write more here

<details open>

  <summary style="cursor: pointer;">More information on how the pricing above was determined</summary>

  These prices are specific to the [us-east-1 region](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-regions) at the time this post was written. Note these prices do change over time. \
  Below are the specifications of both choices

  #### EC2 Instance
  - [t4g.nano](https://aws.amazon.com/ec2/pricing/on-demand/) (cheapest on-demand option)
    - 2 vCPU
    - 0.5 GB Memory
  For each hour, the EC2 instance will cost approximately $0.0042.

  #### Lambda function
  - x86 architecture
  - 128 MB Memory (minimum)
  - 512 MB Ephemeral Storage (minimum)

  For each 1 second request, the Lambda function will cost approximately $0.0000021309.

</details>

View an even better analysis of the cost difference in [this blog post](https://techbeacon.com/enterprise-it/economics-serverless-computing-real-world-test) by Rafal Gancarz.

### Scalability
Consider the possibility (and likelihood) that we will not have a stable 1k requests per hour. Rather, we will have hours with enourmous traffic and hours with very little traffic. 

Now, designing a scalable API with a traditional server is possible. However, it requires much overhead with things like an auto-scaling system or service. \
On the contrary, scalability is handled for you with serverless. There's no set hardware limitations that may experience throttling. Instead, AWS will spin up a new Lambda function per request.

Note there are limitations with serverless such as a limited number of concurrently executing Lambda functions.

The example above does not account for the 

### Simplification

This last point is rather simple. Designing a complex API or computing system can be rather difficult.

## Example
View the cloud infrastructure for an example serverless \
TODO



---

◆ Common use cases for Lambda functions take < 1 second to complete. File processing is a rather demanding example of computation with Lambda.
