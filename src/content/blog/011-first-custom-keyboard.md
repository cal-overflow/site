---
id: 11
title: Building my first Keyboard
slug: building-my-first-keyboard
date: 'December 26, 2023'
img: 'feature-images/keyboard-assembly.png'
tags:
  - Hardware
---

Although I've used various keyboards for all my life, it wasn't until just recently in my early 20's that I built one myself. This post includes my notes for my attempt at becoming familiar with keyboard building and the parts/choices I made for my first custom build.

<!--more-->

Jump to [my setup](#my-setup).

### What is involved in keyboard building
##### Decisions to make
- Layout & size
- Budget
- Switch type
- PCB
- Hotswap support (allow switching switch type easily)
- Keycap material
- Firmware

#### Layout & Size
Common layouts include:
- 100% (full size)
  - Dedicated direction/edit key area
  - Numberpad
- 80% (Tenkeyless (TKL))
  - Dedicated direction/edit key area 
  - No Numberpad
- 75%
  - Direction/edit keys are packed together on right-side of board
  - No Numberpad
- 65%
  - Direction/edit keys are packed together on right-side of board
    - Some may be missing
  - No Numberpad
  - No Function-Key Row
- 60%
  - No numberpad
  - No Function-Key Row
  - No Arrow keys
  - No Direction/Edit keys

**Note:** Direction keys include arrow-keys, pg-up, pg-down, home, end, etc.

#### Switch type
I won't even bother here. Just lookup "[mechanical keyboard switch differences](https://www.google.com/search?q=mechanical+keyboard+switch+differences)" and get lost in the rabbit hole.


#### PCB (board)
In essence, the PCB board is where all the keypress signals travel before being directed to the computer.

#### Hotswap support (allow switching switch type easily)
A PCB board is typically either built so that switches can be placed and removed with ease (click in/out of the board) or so that the switch must be soldered to the board. \
The term for allowing switches to be easily removable is called *Hotswap support*.

#### Keycap material
ABS and PBT keycaps are common.

ABS
- Cheap and common
- Feel smooth and develop a greasy shine over time

PBT
- More expensive
- Feel textured
- Durable

#### Firmware
If the keyboard has the right firmware, apps like Via can be used to customize keybindings.

## Miscellaneous

#### Popular keyboard part brands
- Mode
- Mekanisik

### Resources
- Keyboard testing sites
  - https://www.caniusevia.com
  - https://www.keyboardtester.com
  - https://keyboard-test.space


## My setup

#### Layout
I decided to challenge myself and went with a 65% layout. Now, removing the Function Keys isn't all too challenging; what is challenging is the fact that I give up my dedicated <code>~</code>/<code>`</code> key (the one above the tab button). This is a key that I utilize a lot in software development and daily interaction with a computer.

#### Keycaps
Over the last few months I started learning Japanese. I quickly noticed that typing Hiragana characters through an Operating System's on-screen keyboard is quite an unpleasant experience. Hence, mmy choice for Hiragana keycaps. Plus I like keeping the color scheme simple.

#### Switches
I spent a lot of time looking at different switch types before deciding to stick with Brown switches. They're like the best of all mechanical switches put into one. I found [this cool Coffee-themed switch](https://dangkeebs.com/products/dk-roastery-iced-latte?_pos=1&_sid=467243252&_ss=r) on DangKeebs.

#### Hotswap support
There's not much to say here. I think Hotswap support is very important for newbies like me. However, even in the first day when I accidentally took the switch out of place while trying to remove a keycap, I understood why one would make the choice of soldered switches. 


<!--
- Key switches: [Dangkeebs Iced Latte](https://dangkeebs.com/products/dk-roastery-iced-latte) (Linear)
- Keycaps: [Osume Mochi](https://osume.com/products/mochi-keycaps?variant=43712507543792)
- Board: [Mode Envoy](https://modedesigns.com/pages/envoy)
  - Color: Black
  - Accent: Grey
  - Plate: POM
  - PCB: Hotswap
  - Foam
- Stabilizers: Durock V2 (Black)
-->

#### Parts
The table below shows all of the parts and their prices at the time of purchase for my custom keyboard.

| Item | Price |
| :-: | :-- |
| [Mochi Keycaps](https://osume.com/products/mochi-keycaps?variant=43712507543792) | $80 |
| [Dangkeebs switches](https://dangkeebs.com/products/dk-roastery-iced-latte?_pos=1&_sid=467243252&_ss=r) (70) | $43 |
| [Envoy Board (65%)](https://modedesigns.com/pages/envoy) | $226 |
| [Envoy carrying case](https://modedesigns.com/products/envoy-carrying-case?_pos=2&_sid=bcb92d69a&_ss=r) | $14 |
| [Envoy Foam kit](https://modedesigns.com/products/envoy-foam-kit?_pos=1&_sid=bcb92d69a&_ss=r) | $12 |
| [Durock V2 Stabilizers](https://modedesigns.com/products/durock-v2-stabilizers?variant=39574953754706) | $17 |
| [Lube](https://modedesigns.com/products/krytox-205g0-lubricant) | $6 |
| Shipping (combined) | $26 |
| **Total** | $424 |

#### Build Process
Check out this video to see more about the design and build process

<iframe width="560" height="315" src="https://www.youtube.com/embed/xpx5tZ-dDks" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="youtube-embed"></iframe>

#### How does it sound?
Here's a quick video showing me typing on the board

<iframe width="560" height="315" src="https://www.youtube.com/embed/relz0-8vC7Y?si=-LS2sFKTho9_DYWq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="youtube-embed"></iframe>
