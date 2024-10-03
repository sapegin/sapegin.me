---
title: 'Generating TypeScript React components from SVG icons using SVGR'
description: ''
date: 2020-09-09
tags:
  - react
  - typescript
  - svg
  - tools
---

[SVGR](https://github.com/gregberge/svgr) is a tool that converts SVG files into React components. It supports TypeScript generation. However, it only supports default exports. To generate components with named exports we need to use a custom template.

1. Install all the dependencies:

```shell
npm install --save-dev @svgr/core @svgr/plugin-svgo @svgr/plugin-prettier glob
```

2. Create a Node.js script, **scripts/generate-icons.js**:

```js
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const svgr = require('@svgr/core').default;

const ICONS_SOURCE_DIR = 'assets/icons';
const COMPONENTS_DIR = 'src/Icons2';

// Template to generate named exports instead of default ones
const iconComponentTemplate = (
  { template },
  opts,
  { imports, componentName, jsx }
) =>
  template.smart({ plugins: ['typescript'] }).ast`
        ${imports}
        ${'\n'}
        export const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => ${jsx};
    `;

const icons = glob.sync(`${ICONS_SOURCE_DIR}/**.svg`);

for (const icon of icons) {
  const svg = fs.readFileSync(icon, 'utf8');
  const componentName = path.parse(icon).name;
  const componentCode = svgr.sync(
    svg,
    {
      template: iconComponentTemplate,
      // 1. Clean SVG files using SVGO
      // 2. Generate JSX
      // 3. Format the result using Prettier
      plugins: [
        '@svgr/plugin-svgo',
        '@svgr/plugin-jsx',
        '@svgr/plugin-prettier'
      ],
      // Replace hardcoded colors with `currentColor`
      svgoConfig: {
        plugins: [{ convertColors: { currentColor: true } }]
      },
      // Replace dimensions
      svgProps: { height: 32, width: 32, viewBox: '0 0 32 32' }
    },
    { componentName }
  );
  fs.writeFileSync(
    `${COMPONENTS_DIR}/${componentName}.tsx`,
    componentCode
  );
}
```

3. Run the script:

```shell
node scripts/generate-icons.js
```

---

The resulting TypeScript component files should look like this:

```tsx
import * as React from 'react';

export const Unsplash = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" height={32} width={32} {...props}>
    <path
      d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zM32 10.7v14.9c0 2.3-1.9 4.3-4.3 4.3H4.3C1.9 29.9 0 28 0 25.6v-15c0-2.3 1.9-4.3 4.3-4.3H8L8.8 4c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"
      color="currentColor"
    />
  </svg>
);
```

And we can use it like this:

```tsx
<Unsplash />
```

---

Based on [codesandbox-client](https://github.com/codesandbox/codesandbox-client/blob/4719103aad49a9fabb7b134f6fc479697358abea/packages/icons/scripts/build.js), thanks to [Sid](https://twitter.com/siddharthkp).
