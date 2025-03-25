---
id: 12
# title: "Markdown: Why it's the greatest writing tool"
title: "Markdown: What should be the standard protocol, but isn't"
slug: markdown
date: 'March 23, 2025'
img: 'feature-images/keyboard-assembly.png' # TODO
tags:
  - 'Internet'
  - 'Opinion'
  - 'Software'
  - 'Tools'
---


There is one tool that I have relied on more than any other as a Senior Software Engineer. It's the backbone of tech-collaboration tools such as GitHub or Jira, and even plays a role in social platforms like Reddit or Discord.

What is that tool? ***Markdown***. \
In this post, I want to explain why I think Markdown is the greatest writing tool utilized mostly only by software engineers, and why it has the potential to change the internet altogether.

<!--more-->

## What is Markdown?
First, we need to understand what Markdown is and how it is already being used across the internet[^1]. For starters, many bloggers opt to use Markdown when writing their posts. It is a standardized format that makes writing incredibly easy. It makes formatting text such as **bold words** or *italics* as easy as surrounding text with \*'s. Most Discord users have written Markdown without even knowing it exists. Anyway, let's take a formal look at the tool and its creation.

Markdown is a tool created by blogger [John Gruber](https://daringfireball.net). In his [2004 post describing his new creation](https://daringfireball.net/projects/markdown/), Gruber describes Markdown as "a text-to-HTML conversion tool for web writers." He continues, saying "Markdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid" HTML[^2]. \
In essence, Markdown is a text format that is ***both easy to read and write***. The magic comes in the fact that it can still be converted to the messy languages browsers and websites depend on, such as HTML. As with any technology, there is much nuance to Markdown, but we don't need to get into that for this post.

Before Markdown (and some people still build websites this way), you would have to use messy HTML to build a blog. \
For examples, expand the dropdown below.

<details>

  <summary class="text-lg font-bold hover:underline cursor-pointer">Markdown versus HTML Examples</summary>
  <!--<summary class="underline hover:no-underline cursor-pointer">Markdown versus HTML Examples</summary>-->
    
  Let's look at how a couple basic writing structures are built using Markdown versus HTML. We will see examples for:
  - a sentence with bold, italics, and a hyperlink
  - a basic table
  - headers


  ### Text with link
  Take a look at this basic sentence with a hyperlink, rendered into HTML and displayed via your browser. First, let's look at the rendered content. Note that both Markdown and HTML result in the same rendered content.

  #### Rendered text
  Read more about my projects on my [portfolio section](/portfolio).

  #### HTML
  ```html
  <p>Read more about my projects on my <a href="/portfolio">portfolio section</a>.</p>
  ```

  #### Markdown
  ```markdown
  Read more about my projects on my [portfolio section](/portfolio).
  ```


  ### Table
  Take a look at this basic table, rendered into HTML and displayed via your browser. First, let's look at the rendered table. Note that both result in the same rendered table.

  #### Rendered Table
  | Person           | Age | Net worth (USD) |
  | ---------------- | --- | --------------- |
  | Elon Musk        | 53  | $334.5 Billion  |
  | Jeff Bezos       | 61  | $212.3 Billion  |
  | Mark Zuckerberg  | 40  | $206.1 Billion  |
  | Warren Buffet    | 94  | $162.6 Billion  |

  #### HTML
  ```html
  <table>
    <thead>
      <tr>
        <th>Person</th>
        <th>Age</th>
        <th>Net worth (USD)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Elon Musk</td>
        <td>53</td>
        <td>$334.5 Billion</td>
      </tr>
      <tr>
        <td>Jeff Bezos</td>
        <td>61</td>
        <td>$212.3 Billion</td>
      </tr>
      <!-- ...Shortened because, well,
           you get the point -->
    </tbody>
  </table>
  ```

  #### Markdown
  ```markdown
  | Person          | Age | Net worth (USD) |
  | --------------- | --- | --------------- |
  | Elon Musk       | 53  | $334.5 Billion  |
  | Jeff Bezos      | 61  | $212.3 Billion  |
  | Mark Zuckerberg | 40  | $206.1 Billion  |
  | Warren Buffet   | 94  | $162.6 Billion  |
  ```

</details>

<!-- TODO sections -->

##### Similar tools
<!-- Refer to Latex -->


#### "Flavors" of Markdown
...

#### Markdown extensions
...
<!-- i.e., Mermaid -->


#### Quotes to throw in

> Markdown syntax is designed to be readable and unobtrusive, so the text in Markdown files can be read even if it isn’t rendered
(FROM )


#### Use cases
- a new protocol (standard)
- all social platforms
  - YouTube video descriptions
  - Instagram descriptions
  - Facebook posts
  - Twitter tweets
  - Email
-
- books

#### Other things to throw-in
- demo site (messaround with markdown)
  - https://markdown-it.github.io/
  - [CommonMark - Interactive tutorial](https://commonmark.org/help/tutorial/)
  - [CommonMark - Markdown Overview](https://commonmark.org/)
  
#### Where it needs improving
- Buggy spacing (i.e., details/summary, nested stuff)

[^1]: Currently mostly only Software Engineers know of Markdown's existence.
[^2]: HTML, short for Hypertext Markup Language, is the standardized format of website data. It is the structured format browsers expect (and understand how to render) when loading a website. Note there is also Cascading Style Sheets (CSS) which tells the browser how to style (i.e., button shape, colors, etc.) the HTML content.
