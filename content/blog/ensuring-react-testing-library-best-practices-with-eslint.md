---
title: 'Ensuring React Testing Library best practices with ESLint'
description: ''
date: 2020-08-11
tags:
  - react
  - testing
  - testing-library
  - linting
  - eslint
  - javascript
  - tools
---

These two ESLint plugins could be useful to improve consistency in how your team is using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro):

- [eslint-plugin-testing-library](https://github.com/testing-library/eslint-plugin-testing-library)
- [eslint-plugin-jest-dom](https://github.com/testing-library/eslint-plugin-jest-dom)

1. Install the dependencies:

```shell
npm install --save-dev eslint-plugin-testing-library eslint-plugin-jest-dom
```

2. Update ESLint config, **.eslintrc.json**:

```json
{
  "extends": [
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended"
  ],
  "plugins": ["testing-library", "jest-dom"],
  "rules": {
    "testing-library/no-render-in-setup": "error",
    "testing-library/no-wait-for-empty-callback": "error",
    "testing-library/prefer-explicit-assert": "error",
    "testing-library/prefer-presence-queries": "error",
    "testing-library/prefer-screen-queries": "error",
    "testing-library/prefer-wait-for": "error"
  }
}
```

All jest-dom rules are enabled in [the recommended configuration](https://github.com/testing-library/eslint-plugin-jest-dom#recommended-configuration), and all are fixable.

[The testing-library recommended configuration](https://github.com/testing-library/eslint-plugin-testing-library#supported-rules) doesn’t have many rules, so I’ve enabled a few more, that match our codebase. Unfortunately, there aren’t many fixable rules.

## Resources

- [Modern React testing, part 1: best practices](/blog/react-testing-1-best-practices/)
- [Modern React testing, part 3: Jest and React Testing Library](/blog/react-testing-3-jest-and-react-testing-library/)
- [Jest cheat sheet](https://github.com/sapegin/jest-cheat-sheet/blob/master/Readme.md)
