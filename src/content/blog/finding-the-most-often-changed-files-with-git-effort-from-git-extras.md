---
title: 'Finding the most often changed files with git effort from git-extras'
description: ''
date: 2020-08-12
tags:
  - git
  - tools
---

[git-extras](https://github.com/tj/git-extras) is a collection of Git utilities. [Git effort](https://github.com/tj/git-extras/blob/master/Commands.md#git-effort) shows the list of files or folders sorted by the number of changes in these files or folders.

1. Install git-extras:

```shell
brew install git-extras
```

**Note:** If you’re not on macOS, check [the installation instructions](https://github.com/tj/git-extras/blob/master/Installation.md).

2. Run the command in your repository or in its subfolder:

```shell
cd src/components
git effort --above 1 *
```

- `--above 1` option limits the output only to entries with more than one change, otherwise it’s too large;
- `*` is a glob pattern to group changes by folder instead of showing each files separately.

After running the command we’ll see two tables — the first is sorted alphabetically, and the second is sorted by the number of changes:

```
path                                   commits    active days

  src/ContainerHeader.................... 2           2
  src/ContainerSection................... 2           2
  src/DesktopHeader...................... 2           2
  ...

path                                   commits    active days

  src/Icons2............................. 10          8
  src/Time............................... 5           4
  src/PhoneNumberInput................... 4           4
  ...
```
