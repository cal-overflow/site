---
id: 4
title: oAuth Who?
slug: authentication
date: TO BE DETERMINED
img: 'feature-images/IMG_0057.png'
tags: 
  - Complex
  - Cloud
  - UI/UX
---

Authentication is incredibly important in any application that involves authorization. That's why I spent much time internally debating how I'd implement authentication.

[oAuth2](https://oauth.net/2/) is the industry-standard authentication tool. It's a tool I've leveraged before. [Amazon Cognito](https://aws.amazon.com/cognito/) is another highly-praised tool that's packaged as an AWS service. Both are incredible options that would incorporate nicely within the system.

So which one did I use? \
**I built my own.**

<!--more-->

Going forward I'll refer to my home-made authentication system as "oAuthWho."

#### Why re-invent the wheel?
Now I'm not one that likes to re-invent the wheel. I also don't like over-complicating an already-complicated architecture. That's why I thought it might be best to create what might be **the simplest authentication system** for the Security System.

### How does it work?
oAuthWho is a minimalistic authentication system. The system is built into the [serverless API](/portfolio/serverless-security-system/serverless-api)

<!--
### Why would you do this?
Really, the reason I wanted to do this was because I thought it would be cool to build a barebones authentication system.

### How bad is the authentication system?
Well, in my opinion it's a decent authentication system. It does exactly what I need it to do, and nothing more.

Let's talk about what oAuth Who is capabl
-->

<!--### What is the point of authentication?

The main purpose for authentication is to gain access to resources that are restricted to logged-in users. Ignoring authorization, which is an entirely different concept,-->
