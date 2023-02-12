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


We've all been there: you're getting ready to spin up a server for a project or game. Suddenly, you realize you'll need some hardware to host it. \
With the cloud, provisioning hardware is easier than ever before, but it doesn't stop there. The cloud allows us the option to design serverless applications.

Serverless offers several great benefits and removes the need to worry about hardware.

<!--more-->

Let's discuss Serverless and how it can be beneficial. Additionally, we'll look at examples with [Amazon Web Services (AWS)](https://aws.amazon.com/).

---

## What is serverless?

I often describe serverless to others as "only turning the computer on when you need to use it." While that's a huge over-simplification, it is what happens in a serverless architecture.

Serverless eliminates the need to run a computer 24/7. Instead, we write some code, like a *function*, and provide that to a cloud provider. We tell the cloud provider we would like our *function* to run when certain events happen. Some examples are:

- Every time a file is uploaded
- Every day at 5 a.m.
- Every time an API call is made

Remember, a traditional server is a program that is always running, regardless of any processing occurring. Traditional servers use computing resources and, in turn, cost money at all times of the day.

## Why use serverless?
There are several benefits to using a serverless architecture. The benefits vary depending on the type of application. I'll outline a couple of the most obvious benefits with examples below.

### Cost
One of the most obvious benefits is that you can save a lot of money with a serverless architecture. \
Let's look at the cost benefits of an application that performs file processing. Think of websites like [tinypng.com](https://tinypng.com/), where users upload a file to be processed. **We'll assume our site has 1,000 requests each hour.**
<!--For instance, a system that automatically turns lights on or off in a building as defined in a schedule. A non-serverless approach to this would be to create some sort of cronjobs that run on a server. However, that requires a computer to be running 24/7, which is quite costly. \
A serverless approach would be to create some sort of `toggleLights` function. Once the function is written, we can provide it to a cloud provider. Lastly, we simply define some events, in this case daily events following a schedule, that invoke the function. -->

Let's compare the cost of a traditional--always-on--server and a serverless function invoked whenever a file is uploaded. \
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

As you can see, **the cost of the serverless implementation is nearly half of the traditional server**. Note that this assumes a stable 1,000 requests are happening each hour. In reality, there will likely be some hours of very high traffic and others with very little traffic. These fluctuating hours may further decrease the cost of the serverless architecture.

<details>

  <summary style="cursor: pointer;">More information on how the pricing above was determined</summary>

  These prices are specific to the [us-east-1 region](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-regions) at the time I'm writing this post. Note these prices do change over time. \
  Below are the specifications of both choices

  #### EC2 Instance
  - [t4g.nano](https://aws.amazon.com/ec2/pricing/on-demand/) (cheapest on-demand option)
    - 2 vCPU
    - 0.5 GB Memory
  For each hour, the EC2 Instance will cost approximately $0.0042.

  #### Lambda function
  - x86 architecture
  - 128 MB Memory (minimum)
  - 512 MB Ephemeral Storage (minimum)

  For each 1 second request, the Lambda function will cost approximately $0.0000021309.

</details>

### Scalability
Consider the possibility that we will not have a stable 1k requests per hour. Rather, we will have hours with enormous traffic and other hours with very little traffic. 

Designing a scalable API with a traditional server is possible. However, it requires much overhead with things like auto-scaling. \
On the contrary, scalability is *essentially* handled for you with serverless. There are no set hardware limitations that may experience throttling. Instead, AWS will spin up a new Lambda function per request.

Note there are limitations with serverless such as a limited number of concurrently executing Lambda functions. However, this is rarely a problem since requests are typically completed in fractions of a second.


## When serverless doesn't make sense
It is important to note that **serverless is not always a good choice**. This can be for various reasons but is most often related to cost and computation needs.

### Cost
 Serverless may actually cost more money than a traditional server depending on factors such as the time it takes for requests to complete and the amount of traffic.

I recommend looking into [this blog post](https://techbeacon.com/enterprise-it/economics-serverless-computing-real-world-test) by Rafal Gancarz for an in-depth cost analysis of serverless.

### Computation needs
Serverless is great at completing short and simple computations that can be completed in very little time. When a resource-heavy computation is necessary, Serverless may be less efficient and harder to maintain.


---

## Conclusion

Altogether, when serverless is a good choice, it provides incredible benefits. Although it's only sometimes more favorable than a traditional server, it is becoming more and more efficient and simple to use in recent years. The next time you're designing an architecture, consider whether Serverless can benefit you. 

For an example serverless project, including a serverless API, view my [Serverless Security System](https://github.com/cal-overflow/serverless-security-system/tree/main/cloud).

<!--

---

Here is a video where I utilize AWS Lambda to process security footage uploaded to S3 buckets. This is a rather complex usage of Lambda, but shows the
<iframe width="560" height="315" src="https://www.youtube.com/embed/Y8HRzQ82Qxs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="youtube-embed"></iframe>
-->

---


◆ Common use cases for Lambda functions take \< 1 second to complete. File processing is a rather demanding example of computation with Lambda.

