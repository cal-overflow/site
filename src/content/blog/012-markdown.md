---
id: 12
# title: "Markdown: Why it's the greatest writing tool"
title: "Markdown: What should be the standard protocol, but isn't"
slug: markdown
date: 'March 23, 2025'
img: "feature-images/markdown-utopia.png"
tags:
  - 'Internet'
  - 'Opinion'
  - 'Software'
  - 'Tools'
---

There is one tool that I have relied on more than any other as a Senior Software Engineer. It's the backbone of tech-collaboration tools such as GitHub or Jira, and even plays a role in social platforms like Reddit or Discord.

What is that tool? ***Markdown***. \
In this post, I want to explain why I think Markdown is the greatest writing tool utilized almost only by software engineers, and why it has the potential to change the internet altogether.

<!--more-->

### What is Markdown?
First, we need to understand what Markdown is and how it is already being used across the internet[^1]. Many bloggers--typically those with technical backgrounds--opt to use Markdown when writing content for their websites. It is a standardized format that makes writing incredibly easy. If you have ever sent a Discord message with **bold** or *italic* text, you used Markdown syntax[^2]. <!--Markdown makes formatting text such as **bold words** or *italics* as easy as surrounding text with \*'s.--> \
Anyway, let's take a formal look at the tool and its creation.

#### The creation of Markdown
In 2004, blogger [John Gruber](https://daringfireball.net) published an open-source project titled *Markdown*. In the [post describing his new creation](https://daringfireball.net/projects/markdown/), Gruber describes Markdown as "a text-to-HTML conversion tool for web writers." He continues, saying "Markdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid" HTML[^3] for browsers to render. \
In essence, Markdown is a text format that is ***both easy to read and write***. The magic comes in the fact that it can still be converted to the messy language browsers and websites depend on, HTML. Although it wasn't its intended use, Markdown can even be converted into PDF's or used to write an entire book.

The main takeaway is that content need not be written in messy HTML anymore. Instead, we can rely on Markdown to achieve almost everything one needs for a blog or text-heavy website (that's most websites, btw). \
Expand the section below to see examples of how much simpler Markdown makes it to format content.

<details>

  <summary class="text-lg font-bold hover:underline cursor-pointer">Formatting content with Markdown versus HTML</summary>
  <!--<summary class="underline hover:no-underline cursor-pointer">Markdown versus HTML Examples</summary>-->
    
  Let's look at how a couple basic writing structures are built using Markdown versus HTML. We will explore examples for [a basic website home page](#example-1-website-home-page) and then [a table](#example-2-table).


  ### Example 1: Website home page
  Take a look at this basic home page for my website including formatted text, headings, and a hyperlink. First, let's look at the content in Markdown.

  #### Markdown
  ```markdown
  ## Hi 👋
  *Welcome to my corner of the internet.*

  ### I'm Cal
  I am a **software engineer** who loves pretty much everything that has to do with computers.
  I also fancy long walks outside.
  
  If you want to get in touch or have any questions while viewing my website,
  please feel free to [reach out to me](/contact).
  ```
  As you can see, the syntax is quite minimal. The headings are defined simply by placing `#`'s ahead of the text. Bold and italic formatting is done simply by surrounding text with `*`'s. Lastly, the hyperlink is easily defined by placing the text in brackets and the desired URL in following paranthesis like `[Click me](https://example.com)`. \
  Moving on, we can see how a Markdown parser converts everything into HTML.

  #### HTML
  ```html
  <h2>Hi 👋</h2>
  <p><em>Welcome to my corner of the internet</em>.</p>

  <h3>I'm Cal</h3>
  <p>I am a <strong>software engineer</strong> who loves pretty much everything
     that has to do with computers. I also fancy long walks outside.</p>

  <p>If you want to get in touch or have any questions while viewing my website,
     please feel free to <a href="/contact">reach out to me</a>.</p>
  ```
  This HTML can then be interpreted by a web browser and will render into what's shown below.

  #### Rendered
  > ## Hi 👋
  > *Welcome to my corner of the internet.*
  >
  > ### I'm Cal
  > I am a **software engineer** who loves pretty much everything that has to do with computers. I also fancy long walks outside.
  >
  > If you want to get in touch or have any questions while viewing my website, please feel free to [reach out to me](/contact).

  ---

  ### Example 2: Table
  At the time of writing this, the wealth inequality in America is a hot topic, so let's create a table with the Net Worth of the big players' into a table. \
  For this example, let's reverse the order. We will first see the rendered content, then the HTML, and finally the Markdown version.

  #### Rendered
  > | Person           | Age | Net worth (USD) |
  > | ---------------- | --- | --------------- |
  > | Elon Musk        | 53  | $334.5 Billion  |
  > | Jeff Bezos       | 61  | $212.3 Billion  |
  > | Mark Zuckerberg  | 40  | $206.1 Billion  |
  > | Warren Buffet    | 94  | $162.6 Billion  |

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
      <tr>
        <td>Mark Zuckerberg</td>
        <td>40</td>
        <td>$206.1 Billion</td>
      </tr>
      <tr>
        <td>Warren Buffet</td>
        <td>94</td>
        <td>$162.6 Billion</td>
      </tr>
    </tbody>
  </table>
  ```
  There isn't much to say about this. It's a mess, and this is a very simple table. Imagine how confusing tables with more columns may look like.

  #### Markdown
  ```
  | Person          | Age | Net worth (USD) |
  | --------------- | --- | --------------- |
  | Elon Musk       | 53  | $334.5 Billion  |
  | Jeff Bezos      | 61  | $212.3 Billion  |
  | Mark Zuckerberg | 40  | $206.1 Billion  |
  | Warren Buffet   | 94  | $162.6 Billion  |
  ```
  As you can see, the Markdown format is intuitive and easy to interpret.
  
  ---

  Both examples show that the content is easy to write/read even in unrendered Markdown format. The same cannot be said for HTML.

</details>

## TODO
## this is where I left off

<!-- REwrite this AND determine where to include it-->
Another cool thing about Markdown is that it didn't just create new ideas like surrounding *\*words with asteriks\** to make them emphasized (bold or italic). Instead, this is something that people were already doing naturally in places like emails, before those text-formatting options were available. Scott Gilbertson writes strongly about this in his Wired post titled [*The Eternal Truth of Markdown*](https://www.wired.com/story/the-eternal-truth-of-markdown/). Gilbertson explains how easily early users learned Markdown because of its inheritence of common formatting.

<details>

  <summary>TODO notes / misc </summary>

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
     - [iA editor](https://ia.net/)
   - Fun fact: ChatGPT uses Markdown in its responses (that's why it can display tables and other things so easily).
   #### Where it needs improving
   - Buggy spacing (i.e., details/summary, nested stuff)

</details>

#### Still curious?
Check out these blog posts by others about how they used Markdown to achieve different things.
- [Carl Alexander: *How I wrote a book in markdown*](https://carlalexander.ca/write-book-markdown/)
- [Obsidian](https://obsidian.md/about) is a note-taking app (and more) designed entirely around Markdown. 
- [AUTHOR: *TITLE*]() <!-- TODO -->

[^1]: Currently mostly only Software Engineers know of Markdown's existence.
[^2]: Note that Discord uses a modified version of Markdown that removes certain features (hyperlinks) and adds features like <span style="underline">underlines</span>. See [Discord's implementation of Markdown](https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline) for more information.
[^3]: HTML, short for Hypertext Markup Language, is the standardized format of website data. It is the structured format browsers expect (and understand how to render) when loading a website. Note there is also Cascading Style Sheets (CSS) which tells the browser how to style (i.e., button shape, colors, etc.) the HTML content.
