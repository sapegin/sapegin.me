---
title: 'Thoughts on using AI for software development'
description: 'My somewhat random and disorganized thoughts and experiences on using AI for software development.'
date: 2025-08-20
tags:
  - tools
  - howiwork
  - adhd
  - apps
  - ai
  - neurodiversity
---

_In this article, I share my somewhat random and disorganized thoughts and experiences on using AI for software development._

![Clippy saying “you’re absolutely right”](/images/blog/clippy-you-are-absolutely-right.avif)

Recently, I stumbled upon the [AI-first developer approach](https://addyo.substack.com/p/the-ai-native-software-engineer) – when you start most of your tasks by asking AI to do it, and then decide whether it was a good idea or not. Similar to a dog that eats everything and then decides whether it was edible or not (I used to have one of those dogs – a remarkable creature!).

It seems that people either worship AI as a tool that can do everything (and will probably replace us all by lunch next Wednesday), or reject it completely. I think such a black-and-white approach is counterproductive and dangerous in the long term. I think the truth is somewhere in-between.

For me, it’s often faster and easier to use old-school methods, such as search and replace, than to explain to AI what I want—and I still need to review and fix each change it makes. Since AI often misses things, you end up using search anyway.

On the other hand, AI is good at writing small generic code snippets (the kind you might copypaste from Stack Overflow), generating throwaway code (prototypes, proofs of concepts, or even [complete apps for fun](https://simonwillison.net/2025/Mar/19/vibe-coding/) or [personal tools](https://temochka.com/blog/posts/2025/08/03/elephant-in-the-room.html)), creating tests and types, fixing linting errors, generating fake test data, brainstorming ideas, rubberducking, writing letters and emails, proofreading, working with Git, searching code, and even [fixing bugs from a screenshot report](https://ampcode.com/how-i-use-amp).

**Tip:** AI can even make screenshots on its own or debug pages in a browser, using the [Playwright MCP](https://github.com/microsoft/playwright-mcp).

AI is great for bootstrapping or trying something new – when you’ve never done it before and have no idea how it works. Instead of googling and weeding through articles for hours, it’s often more efficient to ask AI to build it, and then have it explain or adjust things.

It can also be more efficient to ask AI a semi-generic question, then write your own code – rather than letting it go berserk in your codebase. It’s similar to googling solutions and copypasting code snippets from Stack Overflow.

I don’t really like the rhythm of working with an AI agent (such as Cursor or GitHub Copilot). It often feels slow and gets in my way, especially when making large-scale changes. It’s hard for me to [stay focused on a task](https://sapegin.me/blog/adhd-focus/) if I have to wait longer than a few seconds. My brain also works better with code than with text instructions.

The overall overhead of using AI for writing code is very high for me: prompting, waiting for results, reviewing generated code, asking for adjustments, and so on, and so forth… A highly customized environment with shortcuts is often more efficient for everyday tasks.

It’s also annoying that AI is incredibly verbose: it overexplains, overcomments, and overdocuments everything, often adding unnecessary low-level details or even “examples” of implementation code in the docs. I really wish I could make agents less extroverted and talkative, and more efficient. AI also has the annoying habit of making changes I didn’t ask for, such as random changes to formatting and comments.

Explaining how to do something in words, reviewing whether it was done correctly, then explaining to AI how to fix it, and reviewing again often takes more time – and far more mental effort – than doing it yourself. Besides, most coding tasks still require understanding, and often the best way to gain that understanding is by doing the task yourself. If I have to read, understand, and fix some code, I might as well write it myself. This is especially true for business logic, though less so for generic low-level code.

Sometimes, it’s almost impossible to make AI do what you want. I’ve lost count of how many times I’ve told AI, “DONT EVEN DUCKING THINK OF DOING THIS,” only for it to do exactly that – “you’re right, I apologize” – and do it again…

Even on good days, I have a very limited number of [spoons](https://neurodivergentinsights.com/the-neurodivergent-spoon-drawer-spoon-theory-for-adhders-and-autists/). Writing code is relatively cheap for me. Talking to people burns more spoons. Arguing with them burns even more. Adjusting prompts to please a machine that doesn’t want to cooperate probably burns as much. If I want to accomplish anything in a day, I have to choose wisely how I spend my spoons.

Copypasting existing code, either from the same project or from one of my other projects, is often much faster than asking AI to write it. The quality is usually higher as well, and it requires less fixing.

**Idea:** I suppose, you could copypaste code from another project or point AI to a GitHub repository and ask it to adapt the code.

It’s frustrating to use AI to run code, execute tests, or handle basic project tasks. It’s cumbersome and much less efficient than using IDE shortcuts and tools such as npm scripts (either running them directly from terminal or using IDE). It could have been a good tool to discover the right commands in a particular project, but AI isn’t reliable for that – it changes its mind all the time: one day it runs a dev server using an existing npm script, the next day it tries to run it manually; and generally it ignores commands in the docs.

Overall, I treat AI code assistant as a _junior developer on amphetamines_: it can write lots of code very fast but often ignore direct instructions, is overconfident, erratic, and stubborn. It knows plenty of random facts but often can’t connect them and lacks common sense.

I’m starting to use AI agents as assistants rather than autonomous coders. I now ask the agent to outline a solution before writing any code. This makes it easier to spot issues in logic, which would be more time-consuming to catch while reviewing the code. This approach is often called [spec-driven development](https://github.com/andreskull/spec-driven-ai-coding).

**Tip:** I’m experimenting with a [simplified spec-driven approach](https://github.com/sapegin/two-step-ai-coding-modes/) inspired by [Kiro](https://kiro.dev/), where I use two custom agent modes: one to design the feature and give me an implementation outline for approval, and the other to write the code for it.

Another area I’ve started exploring is AI-powered code reviews in the editor, before opening a pull request. It can be a good first check to avoid wasting colleagues’ time on obvious issues, such as a stray debug `console.log()` left in the code.

It’s often faster to use AI chat for one-off operations, such as converting JSON to YAML, or formatting JSON, than to google an online service.

It’s true that AI sometimes lets us ship code very quickly. However, understanding and debugging skills are becoming [even more important than before](https://ordep.dev/posts/writing-code-was-never-the-bottleneck), especially for projects with a large amount of AI-written code and little or no supervision by senior engineers. AI is great at analyzing thousands of lines of code at superhuman speed, but sometimes it’s not smart enough to pinpoint the issue. Someone still has to make sense of and fix all the AI slop.

Often, AI cannot identify the root cause of an issue and falls into a loop of “Now I can see the issue!” and making random changes until it gets tired. It may even replace correct tests to generic ones that don’t really test anything but still pass with broken code.

**Story time:** Once, I thought I had a bug, and AI was happy to “fix” it by throwing a spaghetti net of duplicate code on top of the existing code, instead of telling me that the code was correct.

So far, my favorite workflow is writing most of the code manually, and using inline chat in GitHub Copilot for small precise changes, such as writing a complex loop, helper function, remembering tricky syntax, or adding types. It limits edits to the exact spot under the cursor, so you don’t have to explain where you want the changes. I can’t stand AI tab autocomplete, and immediately disable it, as I find it incredibly distracting.

AI can unblock you when you’re stuck or too tired to figure out how to start a new task. It can also help you brainstorm ideas or rubberduck a problem with you.

Naming is another thing AI shines at, especially for us, non-native English speakers. Usually, variable and function names are clear enough and don’t need adjustments. I often get stuck trying to come up with a short, clear name when writing code myself.

However, AI is horrible at writing commit messages: they’re too long and generic with things like “Refactor X to make it better” or a long list of low-level code changes that don’t explain why the changes were made.

Overall, AI can speed up my work in many cases, though often making it less fun. I feel like I’m spending less time doing what I actually like: writing code and solving problems, and more time on what I try to avoid: interacting with someone, worse when this someone is a machine. Especially if that machine is a mechanical parrot with an infinite power bank.

I hope the hype will calm down a bit and that AI providers will start talking to each other to minimize the configuration mess they’ve created. Each tool expects its own [onboarding docs](https://www.fuzzycomputer.com/posts/onboarding), and if you switch between several tools on the same project (or your colleagues use different tools), you end up with a bunch of similar files, such as `.cursor/rules/something.md` or `.github/instructions/something.instructions.md`.

**Info:** Looks like this is finally changing with the new [AGENTS.md](https://agents.md/) format that is already supported by several popular AI tools.

[Writing good prompts](https://ryanperry.io/post/cost-of-poor-prompting) is an important skill, but it requires a lot of upfront planning – something I was never good at. My approach to most things in life (programming, photography, climbing, and so on) is somewhere between reactive and YOLO.

The shift from coders to project managers (or, in many cases, [prompt masters](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five)) is real. We can already outsource the boring details of typing code to AI. But then the question is: how do we get good enough at writing code to be able to review it without actually writing much? Or even without [seeing much of it](https://blog.val.town/vibe-code) – because when you vibe code, you [forget the code even exists](https://x.com/karpathy/status/1886192184808149383).

AI may change [the way we treat dependencies](https://lucumr.pocoo.org/2025/1/24/build-it-yourself/): it often seems more efficient to ask AI to write your own version of some generic function than to search for a decent dependency on npm and having to update it forever. However, I still think we should stick to established, well-tested libraries for tricky code that requires specialized knowledge, involves obscure edge cases, or is platform-specific.

Today AI is very good at writing low-level, generic code, especially at answering Stack-Overflow-like questions, because it has been trained on millions of web pages and source code files written by humans. What will happen in 5-10 years, when the majority of the internet is written by AI itself?

What I want an AI assistant to be is like [Poe in Altered Carbon](https://altered-carbon.fandom.com/wiki/Poe). A tool that can actually solve problems on its own and can anticipate my needs. And, very importantly, doesn’t say “you’re absolutely right” when I’m absolutely not. Ideally, one that read [my book](/book/) and knows how I like to write code.

**Tip:** I’ve been [experimenting with the latter a bit](https://github.com/sapegin/washingcode-book/pull/35) via Cursor User Rules, but it doesn’t seem to make a lot of difference.

---

_Thanks to [Margarita Diaz](https://drtaco.net) and [Nick Plekhanov](https://plekhanov.me/)._
