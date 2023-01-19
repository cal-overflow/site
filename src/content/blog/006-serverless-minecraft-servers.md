---
id: 6
title: Serverless Minecraft Servers
slug: serverless-minecraft-servers
date: 'November 20, 2022'
img: 'feature-images/computer-in-the-clouds.png'
tags:
  - AWS
  - Abandoned Projects
---


> Only pay for the time you play.

That was the slogan I had come up with while working on a business model encompassing the idea of serverless video game servers. Specifically, servers for the game Minecraft. \
Let's take a close look at the concept of serverless Minecraft servers, why I abandoned the project, and a couple of the prototype architectures.

<!--more-->

---

Minecraft is, without a doubt, one of my favorite games. You can do pretty much anything in it. Also, it's a majority of why I became so fascinated with computers as a kid.

Something that's always intrigued me was hosting my own Minecraft server. In my freshman year of college, I hosted a server on an old laptop in my dorm room. At some point, I learned about AWS and started hosting Minecraft servers on [AWS EC2 Instances](https://aws.amazon.com/ec2/). It didn't take me long to realize how costly that can be. Especially when you don't play the game for a month but still get a bill for your running EC2 Instance 😳

With my recent deep dive into the cloud, I thought to create a "Serverless" Minecraft server. I talked it through with a friend and thought of a business model where users could have their own Minecraft server that would automatically start/stop to eliminate costs for the times when nobody was playing. \
That's where the slogan, "Only pay for the time you play," originated.

At this point, I laid out the basic concept. It was time to start experimenting and discover what was possible. My initial idea was to provision an EC2 Instance and have it ***magically*** turn on whenever a player connected and turn off whenever all players disconnected. This was my first, somewhat hacky attempt at Serverless Minecraft Servers.

### Architecture 1 - EC2 Instance + An extensive CI/CD pipeline
**Note:** This architecture was only designed for Java Edition.

This solution applies Infrastructure as Code (IaC) to nearly every component. All that is needed is a GitHub repository and an AWS account. Once a user [connects the GitHub repository to their AWS account](https://github.com/cal-overflow/ec2-serverless-minecraft-server#how-to-deploy), the user can provision all of the necessary AWS resources with a single click.

#### Deploying & Starting the server
A [Deploy & Start Server](https://github.com/cal-overflow/ec2-serverless-minecraft-server/blob/main/.github/workflows/deploy.yml) action will provision AWS resources if they don't exist. The action then securely connects to the EC2 Instance (via SSH) and launches the Minecraft server. \
Additional functionality is built into this action so that users can upload files into the `assets` folder, and they will be copied to the Minecraft server's folder.

This action is triggered whenever pushes are made to `main`, or the action is triggered [manually](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow) (within GitHub's UI). This manual trigger allows a repository owner to share control of the server with others.

#### Automatic power-off
Implementing the auto-shutdown was extremely simple. \
All it took was a basic cronjob that utilized the [mcstatus](https://github.com/py-mine/mcstatus) python module for periodically checking the number of connected players.


##### In summary:
- Users manually start the server in GitHub Actions (single click).
- The server automatically turns itself off after inactivity.

Although this architecture does not include the ***magical*** ability to automatically turn on, it automatically turns off. With this architecture, you don't have to worry about your EC2 Instance costing you money when you're not using it.


You can create your own serverless Minecraft server from the [template repository on GitHub](https://github.com/cal-overflow/ec2-serverless-minecraft-server).

---

### Architecture 1.5 - DNS Queries = Magic
Once the basic EC2 Instance-based Minecraft server was functioning, I eliminated the need for manually starting the server. This was achieved by using a domain name instead of an IP address. \
Every time users open the multiplayer screen, they ping each of the servers in their server list. This means that a DNS query happens for servers with domains.

Using AWS's Route53 with CloudWatch, a Lambda function can be run every time a DNS query occurs. This means an automated Lambda function can replace the manually triggered [Deploy & Start Server](#deploying--starting-the-server) GitHub Action.

##### The process flows as follows:
1. A player opens the multiplayer screen in the Minecraft client.
1. Minecraft client pings (queries) all servers in the server list.
1. DNS Query is logged to CloudWatch.
1. CloudWatch logs trigger the Lambda function.
1. Lambda function powers on EC2 Instance & Launches Minecraft server.

#### Scalability
Consider a high-level stack called `smarter-servers.net` that includes Route53 records for a domain of the same name. Assume there is another stack of the name `mc.smarter-servers.net` for DNS records of the subdomain. Additionally, consider numerous `a`, `b`, ... low-level stacks. Each of the low-level stacks represents a Minecraft server.

The DNS queries are all for the subdomain `mc.smarter-servers.net`. However, for each server, we can create a corresponding subdomain; `a.mc.smarter-servers.net`, `b.mc.smarter-servers.net`, and so on. Since the DNS queries are logged at the higher-level domain, the low-level stacks do not need to worry about DNS configurations. Instead, these low-level stacks can simply filter the `smarter-servers.net` DNS queries. If a low-level stack notices a DNS query to its specified subdomain, it will invoke its Lambda function (starting its server).

Below is a drawing of the entire infrastructure at this point.
<img alt="Infrastructure Diagram" src="/blog-images/serverless-videogame-server-architecture.jpg" class="rounded-sm" />

I'm only focusing on Minecraft servers in this post, but I want to point out that other games (or servers) could easily be integrated within this architecture. For example, this architecture could be replicated for Arma under the `arma.smarter-servers.net` subdomain.

---


### Architecture 2 - A more practical approach?
The largest drawback to the previous design was the slow startup time. From limited testing, the EC2 Instances I worked with took an average of roughly 1 minute to power on. One minute waiting for your server to start doesn't sound that bad, especially for the benefit of reduced cost. However, this is in addition to the DNS query, which can take as long as a minute to be logged in CloudWatch (and trigger the lambda function).

When you're waiting on all of these long events to occur, you may end up waiting as long as 5 minutes for your server to start. That's not bad. Given this was aimed to be a customer-facing service, I wanted these servers to have as little startup time as possible.

That's when I made the switch to this ECS-based architecture. \
The infrastructure is relatively the same, with the biggest change being that ECS services + tasks replace the EC2 Instance. This was made simple by the wonderful [itzg/minecraft-server](https://hub.docker.com/r/itzg/minecraft-server) docker image.

Starting a Minecraft server in a docker container controlled by ECS did have its complications, though. For one, the networking configuration required for routing traffic to/from ECS is far more complicated than with an EC2 Instance. It required configuring a custom VPC (Virtual Private Cloud) within AWS and ensuring the routing configuration was correct.

Another significant challenge with the ECS infrastructure is that data within docker containers are not persisted anywhere. Your data will be lost if you just run the [itzg/minecraft-server](https://hub.docker.com/r/itzg/minecraft-server) docker image without a storage configuration. Luckily, AWS provides the [EFS (Elastic File Storage)](https://aws.amazon.com/efs/) service that often powers EC2 Instances. The solution was to provision an EFS for each server. The docker container can then mount to said EFS.

Other slight changes were required for ECS. For instance, the previous solution for automatically turning the server off was using a cronjob. This was replaced with another container, called the Watchdog, in the ECS task. The Watchdog periodically checks the number of connected clients and can stop the ECS task after some time passes with no players.

There are several other complications within the ECS architecture. You can view the full codebase of this architecture in [this GitHub repository](https://github.com/cal-overflow/serverless-minecraft-server-platform).


### Why I called it quits
At this point, I had almost completely achieved what I initially wanted to create. The next tasks were building an interface and subscription service where users could configure their server(s). Before I could do that, I needed to develop the business model further.

Finally, let's step away from technology. \
I went over the business model with a friend. We agreed that **there is no good way of making this subscription model.**

You see, the original idea was that users would get their bill after the month was over. This was the vision and where the slogan came from. You should *only pay for the time you play*. However, what about the few bad apples that try to scam you? Someone could abuse this model and run their server 24/7 for an entire month. Then, they could refuse to fork over the money when it came time to pay. That would leave me with nothing but a hefty AWS bill.

Now I didn't immediately give up hope since several solutions exist. The first is charging a "safety deposit" when a user signs up. However, that might be a pretty big safety deposit and would likely prevent people from using the service in the first place. \
Another cheap solution was to change the payment model. There are existing solutions, such as [exaroton](https://exaroton.com/), where you purchase credits (i.e., 20 credits = 20 hours for 2GB ram). However, this is the cheapest solution. If I were to do that, the original payment model-the real selling point would be gone, and I wouldn't have that advantage over competitors.

All in all, the payment model isn't foolproof enough to work.

### Hindsight is 20/20
Although I sunk a lot of time into this project, I'm not upset that it didn't see the light of day. At the end of the day, my curiosity is what drove me to create serverless Minecraft servers, which originally seemed entirely impossible. Moreover, I learned a great deal about many AWS services and the process of designing a scalable infrastructure from the ground up. 

<details>

  <summary>Click here to view all the AWS services I used while working on this project.</summary>

  - [ACM](https://aws.amazon.com/certificate-manager/)
  - [CloudFront](https://aws.amazon.com/cloudfront/)
  - [CloudWatch](https://aws.amazon.com/cloudwatch/)
  - [DataSync](https://aws.amazon.com/datasync/)
  - [ECR](https://aws.amazon.com/ecr/)
  - [ECS](https://aws.amazon.com/ecs/)
  - [EFS](https://aws.amazon.com/efs/)
  - [IAM](https://aws.amazon.com/iam/)
  - [Lambda](https://aws.amazon.com/lambda/)
  - [Route53](https://aws.amazon.com/route53/)
  - [S3](https://aws.amazon.com/s3/)
  - [SNS](https://aws.amazon.com/sns/)
  - [Systems Manager](https://aws.amazon.com/systems-manager/)
  - [VPC](https://aws.amazon.com/vpc/)
</details>

#### Some miscellaneous ideas for the project
- A Discord bot that can power the server on/off based on input (architecture 1)
- A Discord bot that announces when the server is starting or special in-game events (such as a player dying).
- "Parental" mode, where you can limit the number of hours, specific times the server will be on, and more.

---

Heavily inspired by [doctorray117's minecraft-ondemand](https://github.com/doctorray117/minecraft-ondemand).

