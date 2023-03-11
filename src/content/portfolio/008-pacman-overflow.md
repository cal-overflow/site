---
id: 8
title: Borderline Copyright Infringement
slug: pacman-overflow
date: 'August 14, 2022'
img: 'feature-images/pacman-game-over.png'
tags:
  - Game
  - Website
  - Complex
  - AWS
  - Schizo Sunday
  - Abandoned Project
---

This last Spring, I found myself playing [CyRun](/portfolio/cyrun), the multiplayer Pac-Man game I helped create for [COM S 319](/blog/com-s-319) a few years back. \
While replaying the game, I realized how crappy the movement system felt. I challenged myself to create a game with an improved look and feel.

I was antsy to start developing a game. However, I couldn't come up with an idea of what game to create. Then, one day I realized it was right in front of me.

#### I was going to recreate Pac-Man *again*.

<!--more-->

I quickly started developing the game. I felt extremely comfortable designing a basic game engine. After all, I had learned a lot about software development since working on CyRun. \
Since I knew that recreating the same game might turn dull, I decided to create dev logs as I progressed through the project.

Creating dev logs allowed me to take a break here and there after periods of intense focus (like when I implemented pathfinding 🦧) as it required me to take time to reflect on the work that I had just completed. \
Additionally, I learned a lot about video editing in the process. I think it's pretty clear that drastic improvements were made when watching each of the videos.

In this post, I'll take some time to reflect on the project overall. I'll explain some of the project's biggest challenges and main takeaways.


### Overview

1. [Creating a basic game engine](#dev-log-1)
1. [Adding Items and player collision](#dev-log-2)
1. [AI & Pathfinding](#dev-log-3)
    1. [Attempting to create my own pathfinding algorithm](#attempting-to-create-my-own-pathfinding-algorithm)
    1. [Dijkstra's algorithm](#dijkstras-algorithm-)
1. [Version 0.0.1](#dev-log-4)
    1. [Adding Multiplayer](#adding-multiplayer)
    1. [Containerizing the server](#containerizing-the-server)
    1. [Deploying to AWS](#deploying-to-aws)
1. [Namco asking me to shut down the game](#final-video)

---


<iframe width="560" height="315" src="https://www.youtube.com/embed/omgf2yqS6oU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="youtube-embed" id="dev-log-1"></iframe>

Aside from the crappy jokes and inconsistent aspect ratios, the video describes the development process somewhat well. The biggest goals achieved in this video were:

- Outlining the project goals
- Implementing a basic movement system
  - Attempting to implement player-wall collision
  - Switching to a fixed-paths movement system
- Designing the game engine to input JSON files for loading maps
- Utilizing multiple HTML5 Canvas layers

One overlooked design choice is that the Game Engine is designed with a Class system. For example, there is a class/object for each `Player`, `Path`, `Item`, etc.


<iframe width="560" height="315" src="https://www.youtube.com/embed/wzIYqg7OO1Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="youtube-embed" id="dev-log-2"></iframe>

I completed this video only two weeks after the first dev log since I didn't face any big technical challenges. Since the first dev log had laid the basic foundation for abstract players/items, it was simple for me to build upon those abstract classes. For example, In this dev log, I add multiple players. Each player inherits all of the properties of the `Player` and then adds their attributes (such as color).


Another feature included in this dev log is the CPU players moving randomly. I wasn't ready to bang my head against the wall while implementing pathfinding. That happens in the next dev log.

<iframe width="560" height="315" src="https://www.youtube.com/embed/zlvdCjl03uU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="youtube-embed" id="dev-log-3"></iframe>

#### Attempting to create my own pathfinding algorithm

I wasted 20+ hours attempting to create my own recursive pathfinding algorithm. I'm not sure why I thought this was a good idea. Once I finally called it quits, I chose Dijkstra's algorithm because it was the most similar to the one I had been designing.

#### Dijkstra's algorithm 🙏

It took very little time to successfully implement [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm). I could have saved an entire weekend if I had just started using this algorithm.


<iframe width="560" height="315" src="https://www.youtube.com/embed/PI2ACazH7oA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="youtube-embed" id="dev-log-4"></iframe>


#### Adding multiplayer

Since I'd completed this before in CyRun, adding Multiplayer wasn't too difficult. I was able to reference [CyRun's source code](https://github.com/cal-overflow/cyrun) while implementing the multiplayer for Pac-Man Overflow. The multiplayer for both games were built with the help of [Socket.IO](https://socket.io/).

The biggest challenge in implementing the multiplayer was moving the Game Engine into the backend webserver since it was initially just [served as static JavaScript files](https://github.com/cal-overflow/pacman-overflow/blob/627271eb173ec421025503b92ec9b9dbc66f7cd2/src/frontend/app.js).

Once I had implemented the game's core component, multiplayer, I decided it was time to get the app deployed for others to check out.

#### Containerizing the server

Since I have been working extensively with [Kubernetes (K8s)](https://kubernetes.io/) lately, I wanted to containerize Pac-Man Overflow. I knew that K8s would be overkill for a small project like this, but using Docker simplified the deployment process. \
Docker made things easier since it meant all a computer needs to run the server is `docker` itself. There is no need to install NodeJS since that is included within the docker image.

Here is the Dockerfile for Pac-Man Overflow.
```go
FROM node:16.14.2

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000
ENTRYPOINT ["npm", "start"]
```

#### Deploying to AWS

I was recently exposed to AWS on another project, which used it to deploy both the front and backend of a complex web app. After learning the concept of **Infrastructure as Code** (IaC), I quickly became astonished with AWS Cloudformation. I love how simple it makes deploying all of the resources you need with just a single template file.

Here is a **skeleton** Cloudformation template of the resources used in hosting Pac-Man Overflow. You can get a better understanding of how I enabled the [GitHub Action](https://github.com/cal-overflow/pacman-overflow/blob/master/.github/workflows/cd.yml) to deploy resources to my AWS account via the [repository README](https://github.com/cal-overflow/pacman-overflow#deploying-the-application).

```yaml
AWSTemplateFormatVersion: 2010-09-09
Description: "Pac-Man Overflow stack"

Parameters:
  - KeyPair # input by the GitHub Action so it can later SSH into the EC2 instance

Resources:
  SSHSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable SSH access via port 22
  
  HTTPTrafficSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable incoming HTTP access

  EC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      KeyName: !Ref KeyPair
      SecurityGroups:
        - !Ref SSHSecurityGroup
        - !Ref HTTPTrafficSecurityGroup

  ElasticIP:
    Type: AWS::EC2::EIP
    Properties:
      InstanceId: !Ref EC2Instance

  RecordSetGroup:
    Type: AWS::Route53::RecordSetGroup
    Properties:
      Comment: Route 53 records for Pac-Man Overflow
      HostedZoneName: pacman-overflow.com.
      RecordSets:
      - Name: pacman-overflow.com
        ResourceRecords:
          - !Ref ElasticIP
        TTL: 900
        Type: A

Outputs:
  - IPAddress # Needed for the GitHub Action to SSH into the EC2 instance
```
View the actual template [here](https://github.com/cal-overflow/pacman-overflow/blob/master/template.yml).

Unfortunately, Pac-Man Overflow was live for roughly one month before Namco reached out and requested the site be taken down.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Z-3F3HRuaTY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="youtube-embed" id="final-video"></iframe>

When I first took down the website, I was pretty sad. I had spent so much time developing the project and was informed that I could not keep it live.

Then, I decided to make light of the situation. I chose to make a silly final video that differs from the past dev logs. Doing this allowed me to reflect deeply on Pac-Man Overflow.

Altogether, Pac-Man Overflow failed to become the game that I [envisioned it could become](https://github.com/users/cal-overflow/projects/2). However, I achieved the initial goal of creating a game with a smooth movement system. Additionally, **I learned so much**. I learned tons about AWS and video editing.

---

In hindsight, I'm glad that Pac-Man Overflow is over with. While learning just how capable AWS can be, I started visualizing CloudOps projects that intrigue me. We'll see if I can make something as exciting as Multiplayer Pac-Man. 👀

---

View the [Pac-Man Overflow GitHub repository](https://github.com/cal-overflow/pacman-overflow).

Feature image by [Sei](https://unsplash.com/@itssecondkaki) on [Unsplash](https://unsplash.com).
