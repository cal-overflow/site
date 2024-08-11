---
id: 1
title: Infrastructure as Code
slug: infrastructure-as-code
date: 'Janurary 12, 2023'
img: 'feature-images/infrastructure-as-code.png'
tags:
  - AWS
---



The process of provisioning servers, databases, and nearly every other form of computation power has become incredibly simple in recent years. This is mostly due to the evergrowing [cloud](/cloud).

Infrastructure as Code (IaC) is the concept of defining your application's cloud-based infrastructure as code itself.

<!--more-->

The three greatest benefits of IaC are:
1. [Automation](#1-automation-)
1. [Scalability](#2-scalability)
1. [Replication](#3-replication)

Let's discuss how IaC can benefit a business and its developers. Additionally, we'll look at some examples of IaC with [Amazon Web Services (AWS)](https://aws.amazon.com/).

---

## 1. Automation 🤖
The most obvious benefit of using IaC is that it eliminates the need to manually provision computing resources.

### Business
From a business perspective, the less manual work, the better. This is exactly why IaC is an incredible asset. Not only does it simplify the process of scaling a service up or down based on customer needs, but it also eliminates the need to manually provision and oversee computing services. Instead, IaC grants developers free-reign to provision and maintain resources on a per-project basis.

Additionally, IaC eliminates the need for developers to tinker around in the cloud console. Developers have all the necessary permissions to deploy compute power without needing to waste time navigating the cluttered cloud provider sites (such as [the infamously messy AWS console](https://www.reddit.com/r/aws/comments/c8xgsc/i_am_stupefied_every_day_by_the_awfulness_of_the/)).

### Developer
The best way to understand why IaC makes life so much better for developers is to compare the process of provisioning resources without versus with IaC. More specifically, let's look at the typical workflow of a developer provisioning a new resource in a large corporation with a tedious request process.

Let's say we need to provision a Virtual Machine (VM) to host our backend (API).

#### Provisioning resources without IaC
1. Open your company's service-request software.
1. Submit a request for a new VM resource to be provisioned.
1. Wait **possibly days** for your request to be completed.

#### Provisioning resources with IaC
1. Define the new VM resource in your codebase.
1. Trigger a deployment.
1. Wait **a few minutes** for the deployment to complete.


Using AWS's IaC service, [CloudFormation](https://aws.amazon.com/cloudformation/), the virtual machine (called an EC2 Instance) can be defined in code as follows.

```yml
VirtualMachine:
  Type: AWS::EC2::Instance
  Properties:
    # The `t3.micro` instance type is a VM with 2 vCPUs and 1GB of memory
    InstanceType: 't3.micro' 
    # The below id corresponds to an image with Ubuntu 20.04 in the us-east-1 region
    ImageId: 'ami-0b93ce03dcbcb10f6'
```
<small>

**Note:** This is a minimalistic definition of an EC2 Instance. View a complete example in this [GitHub repository](https://github.com/cal-overflow/simple-ec2-stack).
</small>

Deploying this new resource to AWS is as simple as running the following command in the CLI or, better yet, your CI/CD pipeline.
```bash
$ sam deploy
```
<small>

[Learn more about the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-command-reference.html)
</small>


## 2. Scalability
Another incredible benefit of using IaC is the simplified ability to scale applications and services.

### Business
As an application's user base grows, so does the business's need for more computing power. The more load a server experiences, the more power the server will need to continue providing users with a reliable, uninterrupted experience.

Utilizing IaC allows a business to give its developers the power to scale applications without unnecessary overhead. As an application experiences a heavier workload, developers can react accordingly and adjust computing resources without hassle.

### Developer
From the developer's perspective, this simply eliminates the need to bother a manager or someone else because they are unable to do their job. Returning to the example of a VM. Let's say that we're running an API on the VM and have recently seen a drastic increase in users. This increase in traffic is resulting in slow response times.

After monitoring the EC2 Instance performance, we notice the CPU is not the bottleneck. Instead, the VM does not have sufficient memory. Assume we want to upgrade our VM's 1GB of memory to 2GB of memory.

Let's take another look at the process of making this change to allow our API to scale both without and with IaC.
This time, let's pretend there is no annoying service-request system and developers have direct access to the AWS console.

#### Upgrading resources without IaC
1. Navigate to the AWS EC2 console.
1. Find the EC2 Instance running the API.
1. Update the instance's configuration.
<small>

Note that this is not a terribly slow process. However, it eliminates the other benefits of IaC - [automation](#1-automation-) and [replication](#3-replication).
</small>

#### Upgrading resources with IaC
1. Update the VM resource definition in your codebase.
1. Trigger a deployment.
1. Wait **a few minutes** for the deployment to complete.


As we saw earlier, the increase in speed when using IaC is hard to argue against. There's more to it than just that, though. \
Let's look at how simple it would be from a programming standpoint.

First, the `t3.small` instance includes the same vCPU specifications as our previous `t3.micro` but doubles our memory.

The updated resource definition would look like this:

```yml
VirtualMachine:
  Type: AWS::EC2::Instance
  Properties:
    # The `t3.small` instance type is a VM with 2 vCPUs and 2GB of memory
    InstanceType: 't3.small' 
    # The below id corresponds to an image with Ubuntu 20.04 in the us-east-1 region
    ImageId: 'ami-0b93ce03dcbcb10f6'
```

That's it! All it takes to provision an upgraded VM for our API is:
1. Change the `InstanceType` parameter.
1. Run a `sam deploy`.

Of course, some of the finer details have been omitted. However, it does show just how much simpler the process of increasing compute power (scaling up) can be when using IaC.


## 3. Replication
The ability to quickly replicate your computing resources is often overlooked. However, it is practiced by nearly every company that separates their deployments into different environments.

### Business
Almost all businesses implement some sort of environment strategy, where there is a separate version of an application for production, testing, and development. \
This becomes incredibly simple with IaC as the entire infrastructure is defined in a single codebase and can be easily deployed to an environment with a single command.

Moreover, data replication also becomes much simpler with IaC.

This means developers can spend less time worrying about different environments or designing a data backup strategy.


### Developer
As described previously, deploying infrastructure to various environments is incredibly simple with IaC. This typically involves multiple accounts within a cloud provider, so we'll look at a simpler example.

Below is a minimal GitHub Actions CI/CD pipeline that will deploy the same stack (defined in `template.yml`) to two different regions.

```yml

jobs:
  deploy:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        AWS_REGION:
          - 'us-east-1'
          - 'us-west-1'
    steps:
      - name: Deploy stack
        run: |
          sam deploy --region ${{ matrix.AWS_REGION }}
```
<small>

**Note:** a few steps have been omitted from the above workflow. View a complete example in [this GitHub repository](https://github.com/cal-overflow/simple-cloudformation-multi-region-deploy).
</small>


From a developer's perspective, there is little complexity in creating identical infrastructures across the globe. On the contrary, provisioning identical resources across different data centers without IaC can become very time-consuming.

The ability to easily replicate infrastructure has another great benefit: **working on two features simultaneously.**

Consider a complex architecture in which two new features are being developed. Feature *Apple* requires provisioning a new microservice, while feature *Banana* includes changes to an existing microservice.

Let's assume that before a developer can complete a feature, the implementation must be tested in the development environment. Instead of the two developers fighting over the same development stack, both an *Apple* and *Banana* stack can exist simultaneously.

This means feature *Apple* can be tested without affecting the development of *Banana*.

---

In summary, there are countless benefits to using Infrastructure as Code. The three most noteworthy are automation, scalability, and replication.

<!-- In summary, there are countless benefits to using IaC. \
Easily the most important benefit is [automation](#1-automation-). With IaC, it is incredibly simple to provision computing resources without hassle. \
Another great advantage is [scalability](#2-scalability). As resources are defined within code, making changes to your infrastructure as needed by your application or service is incredibly straightforward. \
The third greatest benefit is [replication](#3-replication). With computing resources defined in code, there is almost no steps necessary in replication. TODO - good concluding sentence.
-->


If you're interested in learning more about cloud computing, check out [my other posts regarding cloud](/cloud).
