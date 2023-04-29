---
id: 10
title: This Website
slug: build-a-blog
date: March 12, 2023
img: feature-images/IMG_0057.png
tags:
  - Website
  - Complex
  - Software Sunday
---


When someone wants to build a website, you can often classify them as one of three user types.

- [Admin](#admin-users) 🤓
- [In-between](#in-between-users) 🤔
- [Idiot](#idiot-users) 😧

The original goal of this website was a simple portfolio. However, the potential for an abstract, simple website builder arose early in development. With this idea, another question arose:
> How do we build a website that even an idiot can use?

<!--more-->


<small>

If you're offended by what I just said, read on, and you'll learn that it's [good to be an idiot](#we-should-all-aspire-to-be-idiot-users).
</small>

## How did we get here?
Let's backtrack a little bit.

Come late 2021; it was time for me to recreate my website. I was still [rocking a WordPress website](https://web.archive.org/web/20230301224927/https://christianlisle.com/) and had recently developed a [Nuxt](https://nuxtjs.org/) Single-Page Application (SPA) at work. \
It was time to develop a website with a modern frontend framework like Nuxt.

### Requirements
I outlined the two requirements before starting development.

#### Requirement 1 - Static Rendering
Nuxt lets you bundle your web application into static HTML/CSS/JavaScript files. You can rely on static hosting instead of traditional (costlier) server-side rendering. <!-- The primary reason this is important is that it eliminates the need for a server to host your website  -->

#### Requirement 2 - Markdown blog posts 📝
Over the last few years, I've fallen in love with [Markdown](https://daringfireball.net/projects/markdown). I wanted a simple, straightforward way of writing blog posts within the website.


### That was easy
Once I had defined these requirements, it was time to begin development. The initial development was rather simple. I designed a static Nuxt blog backed by Markdown-written posts.

Shortly after publishing the first version of this blog, I realized that other parts of the website--not just the blog posts--could be written in Markdown. If all website content is written using Markdown, others can construct a website without understanding behind-the-scenes JavaScript.

So, I refactored the project into a "template" website. I decided to share my work with the world and created the below YouTube video walking through the process of building a blog with the template.

<iframe width="560" height="315" src="https://www.youtube.com/embed/O3ctZ6SdSLA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="youtube-embed"></iframe>

#### More than Markdown
You see, the way I achieved converting Markdown into beautiful HTML (like the post you're reading now) was with the [Nuxt Content](https://content.nuxtjs.org) module. In essence, this module converts Markdown files into HTML. Once converted, I reference the content within my Nuxt templates with some [JavaScript magic](https://github.com/nuxt/content/blob/main/docs/content-v1/en/1.getting-started/4.fetching.md) ✨.

### Revival
That basic markdown-supported blog is about where the website stopped. That is until mid-2022 when my friend [Michael](https://www.mamoore1440.com) forked the template. He almost immediately noticed the entire website structure depended on the Nuxt (JavaScript) code. 

The template was originally structured as a "portfolio" website. Originally, there were four pages defined:
- Home (index)
- Blog
- Portfolio
- Contact
- Post (dynamic post page)

I defined each page within the Nuxt (JavaScript) logic. The definition of pages became a problem for users wanting to create their websites with different pages.

See the original Nuxt folder structure below.
```text
/src
  /pages
    index.vue
    blog.vue
    portfolio.vue
    contact.vue
    /post
      _.vue

  /content
    post-001.md
    post-002.md
    post-003.md
    post-004.md
    ...
```

### Throw it in `content`

Michael pitched a restructure of the template in which a user can define the entire site's structure in one central `content` folder. \
This was when we discussed the types of users in regarding this template. The three user types we came up with are denoted below.

#### Admin users
"Administrative users" are the type of individuals that know their way around Nuxt and wouldn't have any trouble constructing a Nuxt website from scratch.

#### In-between users
In-between users aren't familiar with Nuxt and its complexities but likely know a thing or two about JavaScript.

#### Idiot users
Idiot users are those that don't know JavaScript or Nuxt at all. These individuals may know how to write Markdown, but that's about it.

<small class="text-primary-light dark:text-primary-dark">
  Don't worry; being an idiot isn't a bad thing. It just means you have much to learn!
</small>

### We should all aspire to be idiot users
All types of users, *admins* and *idiots* should design a website with ease. Even *admin users* shouldn't have to reinvent the wheel whenever they want to add a new page.

The goal was to have users define the entire structure of their website within the `content` folder. An early version of my website's structure after this reformation is shown below.
```text
/src
  /pages
    index.vue
    _.vue

  /content
    navigation.yml
    /home
      index.md
    /blog
      index.md
      post-001.md
      post-002.md
      ...
    /portfolio
      index.md
      post-001.md
      post-002.md
      ...
```

With all of this in mind, Michael and I worked to design an almost idiot-proof template. I came up with the name "Build-A-Blog," as a play on the Build-A-Bear brand 🧸.

---

## Build-A-Blog
Three core components make the template work: [posts](#posts), [sections](#sections), and [views](#views). I describe the functionality of each of these components in detail below. 

### Posts
Let's start with something simple: Posts.

As I initially hoped, posts are written in [Markdown](https://www.markdownguide.org/). \
Each post is a markdown file within a section (i.e., `content/portfolio/` directory). Posts include metadata at the top of the file, such as the title, feature image, and post id.

A snippet of the Markdown file for this post is shown below.

```md
---
id: 10
title: This Website
slug: build-a-blog
date: March 12, 2023
img: feature-images/build-a-blog-whiteboard.png
tags:
  - Website
  - Complex
  - Software Sunday
---


When someone wants to build a website, you can often classify them as one of three user types.

- [Admin](#admin-users) 🤓
- [In-between](#in-between-users) 🤔
- [Idiot](#idiot-users) 😧

The original goal of this website was a simple portfolio. However, the potential for an abstract, simple website builder arose early in development. With this idea, another question arose:
> How do we build a website that even an idiot can use?

<!--more-->


<small>

If you're offended by what I just said, read on, and you'll learn that it's [good to be an idiot](#we-should-all-aspire-to-be-idiot-users).
</small>

## How did we get here?
Let's backtrack a little bit.

...
```
<small>

  View the full file [here](https://github.com/cal-overflow/site/blob/main/src/content/portfolio/010-build-a-blog.md?plain=1)
</small>

### Sections
Sections are defined as folders within `content`. For instance, a user can create a blog section by creating a `content/blog` folder.

#### Metadata
The following metadata is required for each section. The metadata is defined within an `index.md` file.
1. A section title
1. A `primaryView` rendered for the section's default route (i.e., `/blog/` for `src/content/blog/index.md`)
1. A `secondaryView` rendered for the posts within the section (i.e., `/blog/post-1` for `src/content/blog/post-1.md`)

Some views may require additional metadata.

### Views
A view is a layout assigned to a section. \
Many sections include two views: A **primary view** and a **secondary view**. The primary view is shown on the section default route, whereas the secondary view is presented on subroutes.


#### Example
This very website is a great example of views! The portfolio section (`/portfolio`) includes numerous posts, including my post about this website (`/portfolio/build-a-blog`).

The **primary view** for my portfolio section is a [post feed](https://github.com/cal-overflow/Build-A-Blog/blob/main/src/components/views/PostFeed.vue). This view shows all posts within the section and is what's shown when visiting `/portfolio`.

As you may have guessed, visiting `/portfolio/build-a-blog` shows the **secondary view**. The secondary view for my portfolio section is called the [post](https://github.com/cal-overflow/Build-A-Blog/blob/main/src/components/views/Post.vue) view, as its purpose is to display a post.


---

My initial plans for a basic portfolio website became something much more complex. The originally solo project turned into a quite collaborative project. Anyone with only a little Markdown experience can now build a website. The project has evolved into one of my favorites thus far.

Do you want to create a website or view the template's source code? See the [Build-A-Blog GitHub repository](https://github.com/cal-overflow/Build-A-Blog).
