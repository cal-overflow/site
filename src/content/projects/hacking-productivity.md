---
id: 3
title: Hacking `etc/hosts` for productivity
tags:
  - TODO
---


- Hacking `/etc/hosts` to be more productive
- Written in c/c++

<!--more-->

I want to block youtube/netflix/twitter and any other distracting website with the `/etc/hosts` file automatically during certain times of the day.

### For example:

#### 9am-5pm:
```
localhost 127.0.0.1

# custom entries
twitter.com 0.0.0.0 # make twitter inaccessible
twitter.com 0.0.0.0 # make twitter inaccessible
youtube.com 0.0.0.0 # make youtube inaccessible
netflix.com 0.0.0.0 # make netflix inaccessible
```

#### All other time of the day:

```
localhost 127.0.0.1

# custom entries
```

This alone wouldn't be terribly difficult. Using a daemon or cronjob would be simple enough. However, I also want to have the program automatically correct changes to the file. \
So if I were fiending for some Breaking Bad in the middle of the day, I wouldn't be able to go and remove the netflix.com entry. Or, I would be able to remove it, but the program would (almost) immediately revert my change.

I'd prefer to not have a cronjob running every minute as the solution to this because I don't like the idea of running a script on my computer 24/7. Maybe there's some way to invoke a program whenever a file is changed.

