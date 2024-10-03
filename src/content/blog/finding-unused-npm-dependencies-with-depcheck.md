---
title: 'Finding unused and missing npm dependencies with depcheck'
description: ''
date: 2020-09-29
tags:
  - javascript
  - npm
  - tools
---

Unused dependencies in the project increases installation time, and every time we upgrade dependencies we spend more time than necessary updating packages we don’t use. [Depcheck](https://github.com/depcheck/depcheck) could identify which of the dependencies listed in project’s `package.json` aren’t used and could be removed.

1. Run depcheck in the project root directory:

```shell
npx depcheck . --specials=babel,bin,eslint,husky,jest,lint-staged,prettier,webpack
```

**Note:** The `--specials` option defines [additional dependency checkers](https://github.com/depcheck/depcheck#special), like ESLint or webpack configuration files.

We should see something like this:

```
Unused devDependencies
* @storybook/addon-a11y
* @storybook/addons
* @types/cypress
* @types/jest
* @types/react-dom
* babel-plugin-transform-async-to-promises
* babel-preset-react-app
* core-js
* jest-environment-jsdom-sixteen
* typescript-styled-plugin
* webpack-cli
Missing dependencies
* eslint-config-airbnb-base: ./.eslintrc.js
* @typescript-eslint/eslint-plugin: ./.eslintrc.js
* eslint-plugin-react: ./.eslintrc.js
* eslint-config-prettier: ./.eslintrc.js
* eslint-plugin-import: ./.eslintrc.js
* history: ./src/pages/BookingManagementPage/BookingManagementPage.stories.tsx
```

Unfortunately, there are many false positives but some dependencies are actually unused. So we should check each manually before removing anything.
