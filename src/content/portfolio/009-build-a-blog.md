---
id: 9
title: This Website
slug: build-a-blog
date: March 5, 2023
# img: feature-images/gigachad-site.png
img: feature-images/build-a-blog-whiteboard.png
tags: []
todo:
  - Come up with tags
  - Create new feature image
  - something else probably
---


When someone wants to build a website, you can often classify them as one of three user types.

- Admin 🦍
- In-between 🐒
- Idiot 🦧

The original goal of this website was a simple portfolio. However, the potential for an abstract, simple website builder arose early in development. With this idea another question arose:
> How do we build a website that even an idiot can use?

<!--more-->

## How did we get here?
Let's backtrack a little bit...

Come late 2021, I felt it was time to recreate my personal website. I was still [rocking a WordPress website](https://web.archive.org/web/20230301224927/https://christianlisle.com/) and had recently developed a [Nuxt](https://nuxtjs.org/) Single-Page Application (SPA) at work. \
It was time to develop a website with a modern frontend framework like Nuxt.

### Requirements
I outlined the two requirements before starting development.

#### Requirement 1 - Static Rendering
Nuxt provides the ability to bundle your web application into static HTML/CSS/JavaScript files. This means that you can rely on static hosting instead of traditional (costlier) server-side rendering. <!-- The primary reason this is important is that it eliminates the need for a server to host your website  -->

#### Requirement 2 - Markdown blog posts 📝
Over the last few years I've fallen in love with [Markdown](https://daringfireball.net/projects/markdown). I wanted a simple, straightforward way of writing the blog posts within the site.


### That was easy
Once these requirements were defined, it was time to begin development. The initial development was rather simple. I designed a static Nuxt blog backed by Markdown-written posts.

Shortly after publishing the first version of this blog, I realized that other parts of the website--not just the blog posts--could be written in Markdown. If all website content is written using Markdown, then others can create their own website without the need to understand the JavaScript behind the scenes.

So, I refactored the project into a "template" website. I decide to share my work with the world, and create the below YouTube video walking through the process of building your own blog.

<iframe width="560" height="315" src="https://www.youtube.com/embed/O3ctZ6SdSLA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="youtube-embed"></iframe>

#### More than markdown
You see, the way I achieved converting Markdown into beautiful HTML & CSS (like the post you're reading now) was with the [Nuxt Content](https://content.nuxtjs.org) module. Put simply, this module converts your Markdown files into HTML and CSS. The converted HTML & CSS can be referenced within your Nuxt templates with a little bit of JavaScript magic ✨.

### Revival
That basic markdown-supported blog is about where the website stopped. That is until my friend [Michael](https://www.mamoore1440.com) forked the template. He almost immediately noticed the entire structure of the website was dependent on the Nuxt (JavaScript) code. 

You see, the template was originally structured as a "portfolio" website. This meant there were four pages:
- Home
- Blog
- Portfolio
- Contact

Each of these pages were defined within the Nuxt (JavaScript) logic. This is a problem for anyone who wants to create their own website, but wants different pages.


### "Throw it in `content`"

Michael pitched a restructure of the template in which the entire site's structure is defined within the `content` folder. The `content` folder is where Nuxt Content finds Markdown posts before converting them to HTML & CSS.

<!--To help explain the concept, Michael and I got out the whiteboard.

![Whiteboard planning](/blog-images/build-a-blog-whiteboard.png) -->

This is where Michael explained the different types of users in regards to this template.

#### Admin users
Administrative users are the type of individuals that know their way around Nuxt and wouldn't have any trouble constructing a Nuxt website from scratch.

#### In-between users
In-between users aren't quite ready to dive into Nuxt, but likely know a thing or two about JavaScript.

#### Idiot users
Idiot users are those that don't know JavaScript or Nuxt at all. These individuals know how to write Markdown, and that's about it.

### We should all aspire to be idiot users
At the end of the day, all types of users, *admins* and *idiots*, should use the template with ease. Even *admin users* shouldn't have to re-invent the wheel every time they want to add a new page.

With all of this in mind, Michael and I worked to design an almost idiot-proof template.

### Build-A-Blog
The way it works is incredibly simple. I won't go into all the steps here: since that's heavily documented on the repository.


![Gigachad site](/blog-images/gigachad-site.png)




---

Want to create your own website or just want to view the source code? See the [Build-A-Blog GitHub repository](https://github.com/cal-overflow/Build-A-Blog).
