---
title: 'Enabling new ESLint rules in a legacy codebase with suppress-eslint-errors'
description: ''
date: 2020-08-20
tags:
  - javascript
  - codemods
  - refactoring
  - linting
  - eslint
  - typescript
  - tools
---

Adding new linter rules could be painful when the codebase has many violations, and the rule isn’t autofixable. You will have to either:

- fix all the violations manually;
- suppress them with the `eslint-disable-next-line` comment.

[suppress-eslint-errors](https://github.com/Faithlife/suppress-eslint-errors) is a tool that automatically adds disabling comments to each line with a linter rule violation.

1. Add a new ESLint rule to your ESLint config. In my case it was `@typescript-eslint/no-explicit-any`:

```js
module.exports = {
  rules: {
    '@typescript-eslint/no-explicit-any': 'error'
  }
};
```

2. Run `suppress-eslint-errors`:

```
NODE_ENV=test npx suppress-eslint-errors ./src --extensions=ts,tsx --parser=tsx --rules @typescript-eslint/no-explicit-any
```

Here we’re:

- enabling the TypeScript parser and file extensions;
- only adding comments for a single ESLint rule;
- changing files only inside the `src` folder.

**Note:** I had to set `NODE_ENV` because it’s required by Create React App Babel config, you may not need to do it.

**Note:** I had to temporarily disable the jsx-a11y plugin in my ESLint config because it was breaking `suppress-eslint-errors`.

After running this command you should see changes like this:

```diff
-  disclaimers: any
+  // TODO: Fix this the next time the file is edited.
+  // eslint-disable-next-line @typescript-eslint/no-explicit-any
+  disclaimers: any
```

And using `any` from now on will trigger an error.
