---
title: 'Finding the most used React components with react-scanner'
description: ''
date: 2020-08-12
tags:
  - react
  - javascript
  - design systems
  - tools
---

[react-scanner](https://github.com/moroshko/react-scanner) shows React components and props usage, which can be useful to analyze the component library adoption: to see which components and props are the most popular, or not used at all and should be removed, to track usage of deprecated components and props.

1. Create react-scanner config file, **react-scanner.config.js**:

```js
module.exports = {
  // Where to find components
  crawlFrom: './src',
  // Include component like Modal.Header, not just Modal
  includeSubComponents: true,
  // Our component library package name
  importedFrom: /@goeuro\/frontend-components/,
  // Ignore files in node_modules (not necessary unless we have a monorepo)
  exclude: dirname => dirname === 'node_modules',
  // Take the filename for default imports instead of a local name
  // for consistency
  getComponentName: ({ imported, moduleName }) =>
    imported || path.basename(moduleName),
  processors: [
    // Count only component, not props, and save the result to a file
    ['count-components', { outputTo: 'components.json' }]
  ]
};
```

There are several [processors](https://github.com/moroshko/react-scanner#processors) to show different levels of details:

- `count-components` shows component names and the number of their usages;
- `count-components-and-props` also shows the number of usages of each prop of each component;
- `raw-report` gives all the data, including prop values and locations of each instance.

2. Run react-scanner:

```shell
npx react-scanner -c react-scanner.config.js
```

The result will be in the **components.json** file, that should look like this:

```json
{
  "ParagraphRegular": 155,
  "Button": 125,
  "ContainerSection": 113,
  "Container": 105,
  "Box": 69,
  "Illustration": 67,
  "Tips": 65,
  "Block": 49,
  "ParagraphSmall": 44,
  "Price": 38,
  "H6": 35,
  "InputFormGroup": 35,
  "ContainerHeader": 31,
  "Flex": 30
}
```
