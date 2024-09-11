---
draft: true
title: 'Better autosave and autoformat in Visual Studio Code'
date: 2024-09-16
tags:
  - tools
  - vscode
  - ides
  - editors
---

_This setup assumes that you have the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions installed in Visual Studio Code._

I like the autosave feature in editors: when you switch to another app — usually a browser — the file is automatically saved, causing the hot reload to apply the changes to the page right before you look at it.

One thing I’ve struggled with for a long time is that autoformatting (using Prettier) on autosave isn’t always desirable. For example, I start typing something, then google how to use a certain API, come back to the editor, and now everything is messed up by autoformatting.

I solved this by disabling autoformatting on save and running autoformat and save on a custom Cmd+S hotkey.

Two other useful things I like to do here:

1. Disable autosave when there’s a syntax error in the file, so autosave doesn’t break the dev server, which could cause loss of state, such as scroll position or form data.
2. Hide all autofixable ESLint issues so they don’t distract me while I’m writing code, since these issues don’t require any action from me and will be autofixed the next time I save the file.

The [Visual Studio Code config](https://code.visualstudio.com/docs/getstarted/settings#_settingsjson) to achieve this could look like this:

```json
// settings.json
{
  // Don’t format files on save
  "editor.formatOnSave": false,
  // Autosave files on focus change
  "files.autoSave": "onFocusChange",
  // Don’t autosave files with syntax errors
  "files.autoSaveWhenNoErrors": true,
  "editor.codeActionsOnSave": {
    // Trigger lint autofixing on explicit save (not on autosave)
    "source.fixAll": "explicit"
  },
  "eslint.rules.customizations": [
    // Change the severity of all autofixable issues to `off`
    { "rule": "*", "fixable": true, "severity": "off" }
  ]
}
```

And the [keybinding config](https://code.visualstudio.com/docs/getstarted/keybindings) could look like this:

```json
// keybindings.json
[
  {
    "comment": "Format and Save (to make autosave save files without formatting)",
    "key": "cmd+s",
    "command": "runCommands",
    "args": {
      "commands": [
        "editor.action.format",
        "workbench.action.files.save"
      ]
    }
  },
  // Disable the default keybinding
  {
    "key": "cmd+s",
    "command": "-workbench.action.files.save"
  }
]
```

One downside of this setup is that it’s sometimes unclear why a linter autofixed something, as there’s no log of any kind.

P.S. Check out my other Visual Studio Code extensions: [Emoji Console Log](https://marketplace.visualstudio.com/items?itemName=sapegin.emoji-console-log), [Just Blame](https://marketplace.visualstudio.com/items?itemName=sapegin.just-blame), [Mini Markdown](https://marketplace.visualstudio.com/items?itemName=sapegin.mini-markdown), [New File Now](https://marketplace.visualstudio.com/items?itemName=sapegin.new-file-now), [Notebox](https://marketplace.visualstudio.com/items?itemName=sapegin.notebox), [Todo Tomorrow](https://marketplace.visualstudio.com/items?itemName=sapegin.todo-tomorrow); and my themes: [Squirrelsong Light](https://marketplace.visualstudio.com/items?itemName=sapegin.Theme-SquirrelsongLight), [Squirrelsong Dark](https://marketplace.visualstudio.com/items?itemName=sapegin.Theme-SquirrelsongDark).
