---
title: 'Why I quit open source'
description: 'Four main reasons I stopped maintaining most of my open source projects after seven years of contributing regularly.'
date: 2023-09-13
tags:
  - open source
  - mental health
  - burnout
  - projects
  - hobbies
---

GitHub published a curious [article on avoiding burnout](https://opensource.guide/maintaining-balance-for-open-source-maintainers/) for open source maintainers. It’s an important topic that should be discussed more widely, and I appreciate that GitHub published it.

The article has a good overview of possible burnout reasons, and gives some suggestions on how to avoid it. However, I feel that the main goal of the article is to convince maintainers to keep doing what they are doing for as long as possible, meaning to keep working for free. The article briefly mentions sponsoring but for most maintainers it’s unrealistic to rely on sponsoring or donations.

I think the most healthy solution for avoiding maintainer burnout is _quitting open source entirely_, at least it was a solution that worked for me. Unfortunately, I had to reach the state of burnout myself to understand that, and then it took me long time to recover (or replace maintainer burnout with a burnout in other areas of my life).

I’ve talked before [on why open source was attractive to me](/blog/ex-open-source/), and a bit on why I [was contributing less](/blog/no-complaints-oss/), and eventually [quit open source](/blog/going-offline/).

In this article I want to talk more about the reasons that led me to maintainer burnout, and to quitting open source after about seven years of contributing regularly, and publishing many projects.

**So what are the reasons?**

## Entitlement and toxicity of users

Somehow [people expect you to solve their issues](https://mikemcquaid.com/entitlement-in-open-source/) or implement features they need. They’ll complain that the bug you introduced in the last version broke their build, or that they need this obscure feature for their current project at work, and that if you don’t add it quickly, their boss will go berserk because the deadline is already on the nose.

Folks seem to miss that you’re working on these projects in your free time, after a long day at your full-time job, and without any compensation. They demand that you work on whatever is, in their opinion, broken or missing, and then they get angry when you’re not doing it or not doing it fast enough.

They miss that you might be the only person working on the project, that you’re not a part of a large team that’s paid to work full-time on maintaining the project and solving issues of its users.

Somehow, _open source_ became a synonym of _free labor_, not just _free code_, and it’s harmful for the whole community but mostly it’s harmful for maintainers of open source projects.

And then, there are all the [toxic comments](https://youtu.be/wI7L9ApnvkQ?si=IYLHpM2L4dTyaiMT) ([see just a few examples](https://medium.com/@d4nyll/the-open-source-community-have-no-place-for-disrespect-70c85d473332)) that tell you that your software is garbage and you should just ~~kill yourself~~ quit programming, all the plus-ones (“I have the same issue”), all the pings (“any update on this?”), and other spam comments that don’t add any value…

## Low quality of contributions

I often felt like managing contributions takes more time than implementing the same features myself.

The overall code quality of pull request to open source projects is usually very low, and each pull request requires a lot of time and mental effort to review, requires many comments and many iterations to bring it to somewhat an acceptable quality.

It often takes several months to merge a single pull request, many get abandoned, or their authors get frustrated and angry. Often someone submits a pull request, and never comes back to it again, so you waste time and energy reviewing their code for nothing (I call such pull requests _hit and run pull requests_).

People often submit features _they_ want but it doesn’t always match the project’s vision or is outside of its intended scope. They also believe that accepting their work is free for you, not thinking that you first need to review the pull request (likely multiple times), and then maintain the feature once it’s merged (likely forever).

And the darkest time for an open source maintainer is October, when during the Hacktoberfest people around the world [spam maintainers with total nonsense](https://blog.domenic.me/hacktoberfest/) just to get a free t-shirt.

## Lack of community

Most of my projects never got popular despite all my efforts to make them useful and to market them. If nobody is using your project, why bother fixing bugs, writing documentation, making a nice site, and so on?

My last project, [Squirrelsong](/squirrelsong/) color theme is a good example here. I’ve invested a lot of time on making this theme, and I think it’s better and different enough than many existing themes, and yet, it seems that I’m the only user.

My most popular open source project, [React Styleguidist](https://react-styleguidist.js.org), has over 10K stars on GitHub, and yet, I couldn’t manage to build a community around it, and to make it self-sufficient. The project is too big for one person to build it, and to manage issues and pull requests.

I had some good contributions over the years on various projects, but most of the time they require a lot of collaboration from my side. A few people were interested in maintaining some of my projects but, again, they needed a lot of guidance from my side, so it never felt like it’s saving me any time and effort.

There should be enough people actively working on a project to respond to issues, review pull requests, and work on new features, so even if some of them ~~get hit by a bus~~ can’t work on a project right now, it’ll continue. In reality, however, if I wasn’t doing everything, the projects would stop completely, and the issues would start to pile up.

## Lack of compensation

Maintaining an open source project is a hard and demanding job, as any other job. The difference is that we usually get paid to do other jobs but not for open source. Few developers could make a living (or at least any significant money) doing open source, for the majority of us it’s nothing but frustration.

The most money I got for my open source work was for [React Styleguidist via Open Collective](https://opencollective.com/styleguidist). And it was barely enough to buy a pack of stickers once in a while. The current monthly budget of the project is $8.

I’ve tried [GitHub sponsors](https://github.com/sponsors/sapegin), with zero results, apart from one-time $550 contribution from GitHub itself that was mysteriously cancelled the same day.

I have a [Buy me a coffee](https://www.buymeacoffee.com/sapegin) button on every project’s readme but I don’t think I ever got a single cup from there. (I got some coffees from Unsplash though, which is also nothing for over 1,5 million downloads of [my photos there](https://unsplash.com/@sapegin).)

## Lack of tooling

There are two problems with tooling that open source maintainers have to deal with.

First, **the complexity of tooling involved in development of a typical open source project**:

- **Publishing** JavaScript code (can’t speak about other languages — most of my work is JavaScript and TypeScript) in a way that it could be used by many people [is very complex](https://blog.isquaredsoftware.com/2023/08/esm-modernization-lessons/), and it’s getting worse.
- **Dependency upgrades** often take ages, and if you have multiple projects, it could turn into a year-long adventure (I even made [a tool](https://mrm.js.org) to help with that).
- Generally, the amount of **configuration** (TypeScript, linters, bundlers, releases, dependencies, testing, continues integration, changelog generation, and more, and more, and more…) is quickly getting out of hand.

Second, GitHub could do so much more (more than nothing) to **protect its users from toxic people**. For example, GitHub could:

- **Detect toxic comments**, and either remove them automatically, or mark them for manual review.
- **Remove spam comments**, and convert plus-ones to thumbs up reactions.
- **Educate users** posting such comments by teaching them better behaviors, or banning them if they don’t want to change.
- **Make project status clear**: make it clear whether a project is backed by a company or maintained by someone in their free time.

I had to ignore any activity on many projects on GitHub just to avoid people at-mentioning me all the time.

## Conclusion

Something has to change to make open source healthy but for now I don’t want to be part of it. I don’t want to help corporations make millions on free code, and receive rude comments instead of any kind of recognition.

The worst part is that it’s getting worse, not better.

Now I consider my open source projects as personal projects whose code happened to be open. It’s convenient to keep code on GitHub and use npm to share code among several projects. I only add features that I need myself, and when I need them. I don’t receive notifications on any activity on these projects. I rarely look at the issues or pull requests, and I almost never respond to them.

Perhaps, I should either disable the issues entirely, or add a note explaining that they will likely be ignored and they may be more successful by forking the code. I guess, I still want projects to have a place for users to report bugs so that other users could suggest workarounds.

_Thanks to [Margarita Diaz](https://drtaco.net/)._
