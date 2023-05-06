---
id: 8
title: Giving a Lecture
slug: giving-a-lecture
date: 'February 9, 2023'
img: feature-images/stack-of-books.png
tags:
  - University Course
  - AWS
  - Public Speaking
---

If you read my [previous post](/blog/com-s-402), you'll know I didn't necessarily have the greatest experience in COM S 402. This was mostly because of the hardware limitations imposed upon my development team. More specifically, we couldn't host our application in the cloud.

That's why I was surprised last week to see a message from the course professor. He asked me to come and share what I know about [cloud](/cloud).

<!--more-->

This was my experience preparing and giving a Computer Science lecture.

---

### How did this happen?

**I am by no means a cloud expert.** As a matter of fact, I've only been learning cloud for roughly a year. However, when asked to share my knowledge with others, I didn't hesitate. <!--This is because of the serious lack of cloud courses offered at most universities. -->

Most students lack fundamental knowledge of the cloud due to the lack of cloud courses. That, in addition to my passion for cloud and personal experience in 402, drove me to share my knowledge[^1].

With this same professor being the advisor for Cloud Club, he was well aware of my opinion towards using the cloud vs. the hardware given by ISU.

### What did I cover?

The professor gave me free rein when creating the material. He only requested that I include a "hands-on" activity.

Luckily, I could re-use much of the material I had already created for Cloud Club[^2]. Instead of diving deep into a specific cloud concept, I created an overview of what I believe to be the essential cloud concepts. I determined these to be:
1. Cloud Computing
1. Cloud Storage
    - File storage
    - Databases
1. [Infrastructure as Code](/cloud/infrastructure-as-code)

View my presentation slides <a href="/misc/402-cloud-presentation.pdf" target="_blank">here</a>.


### Hands-on activity
<!--With only an hour to work with, I decided to demonstrate the process of deploying a minimalistic project. This example project includes a static [React](https://reactjs.org/) frontend and a REST API containerized with [Docker](https://www.docker.com/). -->

I created [this example 402 project](https://github.com/christianlisle/COM-S-402-example-project), which includes a frontend and an API, similar to most 402 projects. The idea was that students could fork the repository and deploy the frontend and backend stacks into AWS without needing to change any code or mess around in the console.

The main reason I did this was so that students could see Infrastructure as Code in action. There was only an hour to work with, so having students create their own CloudFormation templates wouldn't have made the most of the time. Instead, students saw how it took minutes to deploy the application into the cloud.

#### Manual work
There was a small amount of manual work for the students participating in the hands-on activity. I walked through the AWS console with the audience as we created an IAM Identity Provider and Role so that [GitHub Actions could deploy to AWS as needed](https://github.com/christianlisle/COM-S-402-example-project#connecting-repository-to-aws).


### Reflections
I'm very grateful for this opportunity. Not only do I love discussing various technologies, but I've also been looking for ways to challenge myself socially as of late. Getting up and talking in front of a class (one that I'm not in, I might add) was definitely out of my comfort zone.

More importantly, I think those attending walked away with a better understanding of the cloud, even if it was just a little bit. One group said they are planning to use AWS and that the example project's architecture will be a great reference.

*Yippee!* 🥳

---


[^1]: This also happens to be the reason I started the Cloud Club

[^2]: Post regarding Cloud Club coming soon
