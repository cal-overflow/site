---
id: 4
title: System Interface
slug: frontend
date: June 16, 2023
img: 'feature-images/IMG_0767.png'
tags: 
  - Simple
  - Cloud
  - UI/UX
---


<!--
Every good security system has a interface of some sorts. I didn't want to build just any user-interface, so I went a little overkill in the UI/UX design.

A key component of the security system is a user interface. The interface is where:
- video accessibility
- video sharing
- camera management
- system management

-->

<!-- One of the last pieces built for this security system is the user interface. \ -->
The interface is the essential application where authorized users can view and share security footage. Through the interface, admin users can even make adjustments to the system and clients.

If I had only three words to describe the development of the system's interface, I would say: **Simple, but tedious**. \
Let me explain why.

<!--more-->

## System Interface Goals
Before we talk about the development process, let's look at the goals for the interface:

#### Goal 1: Static
The website was to be bundled as a static website. This is because:
1. dynamic (server-side) rendering is not necessary, and
1. static rendering is significantly cheaper.

#### Goal 2: Look good on mobile
I have a strong belief that many mobile applications don't need to exist. A majority of the time, if companies simply put more effort into the responsiveness of their websites, they would not need to design a mobile application[^1]. For instance, I could have spent significant time developing a mobile application for the system interface, **or, I could put effort into making the website mobile-friendly**. I chose the latter.

Don't agree with me? See screenshots of the website (which I consider to be quite mobile-friendly) on my iPhone 12 below:


| ![Screenshot of Login Screen](/blog-images/serverless-security-system/mobile-ui/login_screen.PNG) | ![Screenshot of Dashboard Screen](/blog-images/serverless-security-system/mobile-ui/dashboard_screen.PNG) | ![Screenshot of Footage Screen](/blog-images/serverless-security-system/mobile-ui/footage_screen.PNG) |
| :--: | :--: | :--: |
| Login screen | Dashboard screen | Footage screen |

See an example of filter selection on the footage screen:

| ![Screenshot of Footage Screen editing filter 1](/blog-images/serverless-security-system/mobile-ui/footage_screen_filter_1.PNG) | ![Screenshot of Footage Screen editing filter 2](/blog-images/serverless-security-system/mobile-ui/footage_screen_filter_2.PNG) | ![Screenshot of Footage Screen editing filter 3](/blog-images/serverless-security-system/mobile-ui/footage_screen_filter_3.PNG) |
| :--: | :--: | :--: |
| date filter | activity filter | camera filter |

<!-- ![Snippet](/blog-images/serverless-security-system/mobile-ui/.PNG) -->


#### Goal 3: Pleasant UI/UX
The last primary goal was to make the user-experience as pleasant as possible. Now, this goal introduced the most challenge, since I don't have a strong background in UI/UX. After many iterations, I think the user-experience is an improvement to my previous work.

## A simple, but tedious development process
### Simple
For starters, I'm well-experienced in the world of web development. I've built my fair share of both dynamic/static websites using modern frameworks.

### Tedious
Building a good web-application, that's highly-responsive and well-designed, takes time. Especially when you don't have a strong UI/UX background.


#### Goals for the system interface:
- looks good on mobile
  - Talk about how you wanted this to feel like a mobile app, even just in the mobile browser
- Light/dark mode
- 

---

[^1]: I may make another post discussing this further. This is a pretty controversial take, but I think I have quite good reasoning (and the experience to back it up).
