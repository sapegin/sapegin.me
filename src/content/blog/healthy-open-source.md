---
title: 'Healthier way to open source your code'
description: 'Open source is about sharing your code. Anything else is optional. Don’t want to spend time answering issues and reviewing pull requests? It’s totally up to you!'
date: 2023-09-26
tags:
  - open source
  - mental health
  - burnout
  - projects
  - hobbies
---

Open source was about sharing the code with fellow developers, learning new skills, and having fun. Somehow, it became for many a threat to their mental health, and an unpaid job. Multi-million corporations take advantage of thousands of developers working for free around the globe. And on top of this, we have a generation of developers who demand that open source maintainers fix their issues for free.

## Why open source is failing for me

I’ve been [struggling with my open source projects](/blog/no-complaints-oss/) for years. I used to enjoy writing code, and learned a lot of things developing these projects, and not just coding skills. However, eventually, [I burned out](/blog/open-source-no-more/) solving other people’s problems and trying to maintain projects that were too big for a single person working in his free time.

## What I expect from my open source projects

I enjoy coding much less than I used to but I still have [a few projects](/) that I work on for myself, and I’d like to keep the code open for several reasons:

- Tooling: GitHub for hosting code and documentation, npm for sharing libraries among several projects, continuous integration, semantic versioning, and so on.
- Portfolio of projects that I could use as part of my résumé.

However, there are many things I’d like to change:

- Working with users and contributors: answering questions, fixing bugs, reviewing and merging pull requests.
- Constant anxiety caused by unread notifications.
- A feeling of guilt caused by unanswered issues, unmerged pull requests, or missed releases.
- Being a subject of entitlement and toxicity of users.
- Having a second, unpaid job.
- And, in general, interacting with strangers on the internet.

I’ve tried to reduce user expectations before with the [Powered by you](http://sapegin.github.io/powered-by-you/) badge I was adding to projects I wasn’t actively maintaining, but it wasn’t enough. A few other approaches I found: [The three Fs of open source development](https://boyter.org/posts/the-three-f-s-of-open-source/) and [Don’t ask me license](https://github.com/ErikMcClure/bad-licenses/blob/master/dont-ask-me.md).

This time I want to go further and give myself the freedom to work only on projects and features I use myself, and ignore everything else. Essentially, I only want to share _the code_, not my _time_ or my _mental capacity_.

Curiously, the [MIT license](https://choosealicense.com/licenses/mit/) already says that:

> The software is provided “as is,” without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

I’m not good with reading this kind of legal language, so I asked ChatGPT to summarize it in peasant English:

> The software is given as it is, with no promises that it will work perfectly. If something goes wrong when using it, the people who made it can’t be held responsible for any problems or damages.

Totally agree!

## One way to get there

I think I found a good solution for my projects that was inspired by [Brett Cannons’s article](https://snarky.ca/the-social-contract-of-open-source/) and [Twitter discussion with Dmitry Belyaev](https://twitter.com/blvdmitry/status/1701916984806383720):

1. Clearly state the project status.
2. Convert all open issues to discussions.
3. Block the creation of new issues.
4. Unsubscribe from all notifications.

Let’s talk about each step in greater detail.

### 1. Clearly state the project status

This is the explanation I came up with:

---

This isn’t a conventional open source project. It’s a personal project that is developed openly. It has been developed with a single user in mind — me, and only has features I use myself.

I adopted an open source development model, including things like hosting code on GitHub, npm packages, and semantic versioning, because it makes it easier for me.

The code is provided for free according to the MIT license (see the License.md file in the root of the repository), but the social interactions between project users and maintainer(s) are restricted.

I don’t look at the issues and discussion, however, you’re free to use them to talk to other users, share workarounds for bugs, etc.

I appreciate pull requests with bugfixes and documentation improvements, if they are concise and well structured. I may look at them and merge them one day, but no promise.

Contributions of new features will most likely be ignored. I don’t have the time or emotional capacity to review and later maintain them.

I can’t promise that the project will evolve the way you want it to, or that it will evolve at all. However, you are free to fork the project, I won’t feel bad.

And please don’t at-mention me anywhere, that blue dot makes me too anxious.

_R’amen,<br/>Artem_

---

I add it [as an announcement](https://github.com/sapegin/mrm/discussions/298) in the project’s [Discussions on GitHub](https://docs.github.com/en/discussions/quickstart). Then I pin it and lock the thread.

![Project status announcement](/images/healthy-open-source-project-status.png)

### 2. Convert all open issues to discussions

Firstly, I [create a new Discussions category](https://docs.github.com/en/discussions/managing-discussions-for-your-community/managing-categories-for-discussions) on GitHub — “Bugs”, so I can move all bug reports there.

![Creating a new Discussions category on GitHub](/images/healthy-open-source-new-discussions-category.png)

Then, I label all open issues, so I can [convert all issues labeled with a certain label](https://docs.github.com/en/discussions/managing-discussions-for-your-community/managing-discussions#converting-issues-based-on-labels) to discussions of a certain category.

![Converting issues to discussions on GitHub](/images/healthy-open-source-convert-issues.png)

### 3. Block the creation of new issues

This is something that I’ve learned just recently but that changes everything: we could disable the creation of new issues on GitHub without hiding existing ones, so people could still google them and possibly find answers to their questions. We could also redirect folks to the new discussion page when they try to open a new issue.

To disable the creation of new issues, add [an issue template](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository) at `.github/ISSUE_TEMPLATE/config.yml ` like this:

```yaml
blank_issues_enabled: false
contact_links:
  - name: Get help
    url: https://github.com/sapegin/mrm/discussions/new?category=q-a
    about: >
      If you can’t get something to work the way you expect, open a question in our discussion forums.


  - name: Report a bug
    url: https://github.com/sapegin/mrm/discussions/new?category=bugs
    about: >
      If something is broken in the project itself, create a bug report.
```

In this issue template, `blank_issues_enabled` option does the magic of blocking the new issue page, and `contact_links` option defines the buttons that appear when the user tries to create a new issue. We could put a link to any site here, not just GitHub, for example [Let me Google that for you](https://letmegooglethat.com).

![Creating new issue with a template on GitHub](/images/healthy-open-source-new-issue.png)

### 4. Unsubscribe from all notifications

The last thing I do is ignoring all notifications in the project, even when someone is explicitly mentioning you. Unfortunately, this is the only way to save ourselves from all kinds of toxicity and bullying in the issues.

![One of these comments…](/images/healthy-open-source-one-of-these-comments.webp)

Instead of the default “Participating and @mentions”, choose “Ignore”:

![Ignoring repository notifications on GitHub](/images/healthy-open-source-igonre-notifications.png)

## Conclusion

I think I found a good compromise that would allow me to work on my personal projects in public, and allow users (if there will be any) to help each other. This approach also keeps all the existing issues accessible and googlable.

I hope this will be enough for me to feel calm, and I won’t have to remove all my work from the internets ([this has happened before](https://news.ycombinator.com/item?id=3073798)) or unpublish all my npm packages ([this has happened too](https://www.theregister.com/2016/03/23/npm_left_pad_chaos/)).

_Thanks to [Dmitry Belyaev](https://twitter.com/blvdmitry), [Margarita Diaz](https://drtaco.net)._
