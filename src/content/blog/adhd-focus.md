---
draft: true
title: 'How I stay (more) focused with ADHD'
description: 'I could never stay focused on one thing for a long time. These tips help me stay focused and productive.'
date: 2024-02-17
tags:
  - tools
  - howiwork
  - adhd
  - apps
  - hardware
---

I could never stay focused on one thing for a long time, my mind is always squirreling around. Often, I try to read an article — a few minutes later I realize that I’ve switched to another app or a browser tab in the middle of a paragraph. Also, I’m sensitive to noise and loud sounds, and I feel overwhelmed after a few hours of working in the open space environment of a typical office. Being diagnosed with ADHD at the age of 39 explained these things and many others.

In this article, I share a few things that help me to complete my tasks. Mostly they minimize distractions in different ways, and the amount of things I need to keep in my memory. Some are specific to my job as a software engineer but most are fairly generic. I’m only familiar with the Apple ecosystem, so if you have suggestions for Windows, Linux, or Android, please let me know. Even if you don’t have ADHD, you could find something useful for yourself.

![My workplace](/images/workplace-2024.webp)

## Disable notifications everywhere

I have notifications disabled for all apps on my Mac and iPad, and for most on my iPhone.

The only exceptions on iPhone are messenger apps, email (without sound though), and a few other apps that are sending infrequent but important updates (like my bank).

I’ve tried to disable notifications for emails too but I ended up checking it myself way too often.

My general rule for notifications is: better to have too few than too many. If I get a single spam notification from some app, I immediately disable all notifications for this app, unless there’s an option to disable spam but it’s rare.

## Work with a single screen

I think multiple-screen setups aren’t worth it: they require too much space on the desk and too much meta work — moving windows between screens and so on. They also tend to have too much information visible at the same time.

![The Matrix, 1999](/images/focus-matrix-monitors.webp)

_[Screenshot from The Matrix, 1999](https://screenmusings.org/movie/blu-ray/The-Matrix/pages/The-Matrix-090.htm)_

I have used a single 27” screen for the past decade or so, and for me, it’s the perfect size.

## Turn on some music

I like listening to music while I’m working, and usually I wear headphones. The right kind of music helps me to focus on work, and headphones, especially noise-canceling, reduce distractions and sensory overload from things happening around me.

I like different styles of music, depending on what I’m doing:

- **For programming** — something loud, heavy, and energetic, like melodic death metal or post-metal. Be’Lakor, Katatonia, and Russian Circles are among my favorites.
- **For writing** — something soft and quiet, like lo-fi. The [Lola app](https://apps.apple.com/us/app/lola-stream-lofi-music/id1596929185) is great to listen to in a café (when it’s too noisy or I disagree with their choice of music), or [Lofi girl’s](https://www.youtube.com/@LofiGirl) playlists.
- **For reading** — [something quiet](https://music.apple.com/de/playlist/ambient-night/pl.u-KVXBDYWCLrrEerg?l=en-GB), like ambient.
- **For cooking** — something in my own language, so I can sing along.

**Note:** I prefer music without lyrics because they distract me, especially if I understand the language. However, death metal, with its growling, is an exception — the singing is so incomprehensible, that it essentially becomes music.

When I’m not wearing headphones, we often listen to sets by [My Analog Journal](https://www.youtube.com/@MyAnalogJournal) and [Chris Luno](https://youtube.com/@chrisluno), [our favorite playlist](https://music.apple.com/de/playlist/good-vibes-only/pl.u-2aoqXKzfG66mb65?l=en-GB), or start a station on Apple Music based on one of the songs from Pink Floyd, The Cure, or something similar.

**Tip:** Noise-cancelling headphones allow quieter music in noisier environments, or even no music at all — they may reduce sounds to a comfortable level.

## Minimize distractions on the screen

I don’t like to see stuff unrelated to what I’m doing, especially things that change often or with animation, like icons in the dock or the menu bar, so I try to hide as many of them as possible.

![Splitting screen into two windows](/images/focus-split-screen.webp)

### Maximize app windows

I always maximize app windows. Or, more often, I put two windows side-by-side.

My typical setup is a code editor on the left half of the screen, and the browser or terminal on the right half of the screen.

**Tip:** I use [Rectangle](https://rectangleapp.com) app to set up keyboard shortcuts to resize windows (I only have three shortcuts there: left/right half of the screen and full screen).

### Disable tabs in your code editor

My code editor setup is very minimalistic. I disable tabs and all toolbars, so they don’t distract me. Sometimes I have the file tree open, and that’s pretty much all I see.

**Tip**: [Hiding tabs in Visual Studio Code](https://sapegin.me/til/tools/hiding-tabs-in-visual-studio-code/) used to be tricky but now there’s an option to do that. WebStorm always had an option to hide tabs.

### Hide icons on the menu bar

I don’t like seeing too many icons in the menu bar, especially colorful or animated. Thanks to [Bartender](https://www.macbartender.com) most of the menu bar icons are hidden in a menu I can open when I need to.

Or, you could set Bartender up to show icons conditionally. For example, show battery indicator only when it’s below a certain level, so when you work in a café, you know when to wrap up your work and go home.

**A little bird told me:** You could also hide the menu bar, and it will appear on hover.

### Disable dock on a Mac

I’m not sure you could actually disable the dock on a Mac but hiding it and [increasing the opening delay](https://github.com/sapegin/dotfiles/blob/d706fd2315e7c58f89ab4c46672a1b165dc0f192/setup/osx.sh#L325) to 1 second is enough to rarely see it.

### Install an ad blocker

Ads on web pages are very distracting, especially animated ones, and I can’t imagine myself using the internet without an ad block again.

**Tip:** I use [Adblock Plus](https://adblockplus.org/) on desktop, and [AdGuard](https://adguard.com/) on iPhone and iPad.

## Use Pomodoro technique

The [Pomodoro technique](https://en.m.wikipedia.org/wiki/Pomodoro_Technique) was inspired by the tomato-shaped kitchen timer. The idea is that you split your work into 25-minute blocks (_a pomodoro_) with a 5-minute break between each block, and a longer 15-30 minute break after each four pomodoros.

During a pomodoro, you’re supposed to focus on a single task (ideally, the one you select before starting the timer), and avoid distractions like checking your social networks, email, or going to the kitchen to make another cup of coffee.

And it kinda works, though I don’t use it very often, and I can’t imagine working for two hours with only three 5-minute breaks. So feel free to experiment with longer breaks and shorter work intervals (or the opposite if that’s your thing). It’s also useful when you need to report time spent on certain tasks.

**Tip:** I used to use the [Tadam](https://www.tadamapp.com) app as a Pomodoro timer but recently I switched to [a mechanical timer](https://www.timetimer.com/collections/all-1/products/time-timer-mod-home-edition).

**Tip:** Timeboxing tasks, meaning working on something only for, let’s say, 10 or 20 minutes, is a good way of making progress on things you don’t want to do.

## Keep your phone in a drawer

I try to keep my phone in my desk drawer, or at least on the side of my desk upside down, so I don’t see the notifications.

**Tip:** For the same reason I tend to keep my phone on the kitchen counter in the evening, and never bring it to the bedroom.

## Work on an iPad

[Using an iPad](https://sapegin.me/blog/writing-on-ipad/) (with an external keyboard) for certain tasks, like writing an article, works very well for me — somehow it feels like a single-task device and it’s easier to focus.

**Tip:** Most tech writing I do in Markdown, in the [iA Writer](https://ia.net/writer).

![Writing on an iPad](/images/ipad-nuphy-air60-keyboard.jpg)

**Tip:** I often go to a café to write, and it helps me a lot to focus on writing. As much as I loathe noise and distractions, the café noise and presence of other people (known as _body doubling_, see below) help me to focus on writing. Unless, of course, I can hear and understand what people are talking about — in this case, I must hear the gossip.

## Unload your brain

If you’re trying to focus on a task, and suddenly remember that you need to buy tortillas, do laundry, or get an idea for a new awesome article, write it down right away to your shopping list, todo, or your notes.

I use several tools to keep notes and tasks:

- [Bear](https://bear.app) for most of my notes and freeform project planning.
- [Notion](https://www.notion.so/) when I need to share a project with someone (it has poor UX but many great features).
- Paper todo cards (see “Make a list” section below).
- [AnyList](https://www.anylist.com) for the shopping list because I can share it with my girlfriend, and even ask Alexa to add things there.
- Apple Notes occasionally for short-term or throw-away notes.

## Auto close distracting apps

When I suddenly fall into a flow state (rarely but happens) I don’t want to be distracted by new messages in Slack or Telegram. To help me with that I use [Quitter](https://marco.org/apps) to close all such apps after a certain time.

![Quitter](/images/focus-quitter.png)

## Improve meeting notifications

I was always struggling with meeting notifications. For some reason, all calendar apps show notifications 10 minutes before the meeting, and it’s way too long for me. Even in the office, one usually don’t need 10 minutes to walk to a meeting room. At home, it’s even worse: these notifications distract me from what I’m doing but by the time I need to join the meeting I usually completely forget about it.

[Dato](https://sindresorhus.com/dato) is a calendar app that gives me quick access to my calendar from the menu bar. My favorite feature is that it shows upcoming calls in the menu bar. And there’s a global shortcut to open this link in your default browser.

![Dato menu bar](/images/focus-dato.png)

## Make a list

I like making lists, especially when a task is complex and involves many steps. Lists (sometimes) help me to stop procrastinating at the beginning when the task is so big that I don’t know how to start for days.

Lists also help me to remember all the little things I need to do, instead of trying to keep them in my head.

I mainly use two kinds of lists:

- **Daily todo cards**, similar to [Analog](https://ugmonk.com/en-de/pages/analog).
- **Project todos** in Bear or Notion.

![Todo](/images/focus-todo.webp)

I’m still figuring out what works best for me, and will probably write another article if I ever find a working solution.

## Work from home

A typical office is full of distractions, especially one with an open plan, where you sit together with dozens of other people in the same room. Someone is constantly talking to someone else. Someone is having a Zoom call next to you. Someone is constantly distracting you with “quick questions” that take at least 20 minutes to answer and 20 more to remember what you were doing before it.

At home, I have very few distractions, and I can organize my workspace in a way that works for me.

However, I feel more productive when my girlfriend is working next to me. We’re not working for the same employer but it kinda sets the right mood for me: we’re working here. When it’s just me, it’s harder to focus on work and not be distracted by something else.

**Tip:** This is called [body doubling](https://lifehacker.com/use-body-doubling-to-increase-your-productivity-1849021265), and if you live alone, you could try to have a video call with a friend, or even watch someone working on YouTube.

![Our home office](/images/offline-home-office.webp)

## Work with an AI assistant

I often have trouble starting to work on a new task, or sometimes I don’t know how to move forward and start procrastinating. Or spend way too much time googling a solution to a seemingly simple problem.

Recently I started using [ChatGPT](https://chat.openai.com/) to generate the initial solution or brainstorm ideas. Whether it’s a piece of code or a letter I need to write.

I also use [GitHub Copilot’s](https://github.com/features/copilot) inline chat, and I like that it’s unobtrusive, and knows enough context, so the queries could be very short.

![GitHub Copilot’s chat](/images/focus-github-copilot-chat.png)

I’ve also tried Copilot’s autocomplete and found it infuriatingly annoying and distracting.

Usually, AI could give you a draft you could improve on, or help with the coding “bureaucracy”, like tricky syntax, generating types, and so on. It’s also good for throw-away solutions, and it’s great for writing official letters. However, you really need to understand what’s going on to detect when the AI is hallucinating and gives you the wrong solution.

Think of it as a slightly smarter Stack Overflow or an assistant who can google something for you or write some code but doesn’t understand whether it’s a good solution or not, or whether it’ll work at all.

![ChatGPT with some coding question](/images/focus-chatgpt.png)

**Tip:** I usually use ChatGPT via [QuckGPT app](https://sindresorhus.com/quickgpt).

## Choose a non-distracting color scheme for your editor

I’ve created my own color scheme that gives me enough contrast to distinguish different things in the code but not overly bright to make my eyes bleed. I called it [Squirrelsong](https://sapegin.me/squirrelsong/), because why not?

![Squirrelsong Light theme](/images/focus-squirrelsong.webp)

**Tip:** To make the coding experience even better, I use [MonoLisa](https://www.monolisa.dev) font in all my code editors and a terminal.

## Conclusion

Minimizing distractions and knowing what to do next helps a lot in staying focused and productive. If you’ve got any tips to stay productive, I’ll be delighted to learn about them on [a social network previously known as Twitter](https://twitter.com/iamsapegin) or [Mastodon](https://mastodon.cloud/@sapegin).

You may be also curious to read [my personal user manual](https://sapegin.me/man/).

---

_Thanks to Anna Bulavina, Alexei Crecotun, Margarita Diaz, and Anita Kiss for their suggestions._
