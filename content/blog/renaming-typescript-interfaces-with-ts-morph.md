---
title: 'Renaming TypeScript interfaces with ts-morph'
date: 2020-08-06
tags:
  - typescript
  - codemods
  - refactoring
  - tools
---

[ts-morph](https://ts-morph.com/) is a tool to write _codemods_ for TypeScript — programs that modify TypeScript code.

Here’s how I removed the `I` prefixes of all interfaces in a project: `IDog` becomes `Dog`.

1. Create a file with the codemod, **src/remove-prefixes.ts**:

```ts
import { Project } from 'ts-morph';

// Initialize a project with our tsconfig file
const project = new Project({
  tsConfigFilePath: 'tsconfig.json'
});

// Get all project files
const sourceFiles = project.getSourceFiles();

for (const sourceFile of sourceFiles) {
  console.log('👉', sourceFile.getBaseName());

  // Get all interfaces in a file
  const interfaces = sourceFile.getInterfaces();

  for (const i of interfaces) {
    // IDog → Dog
    const name = i.getName();
    const nextName = name.replace(/^I([A-Z])/, '$1');
    if (name === nextName) {
      continue;
    }

    // Rename interface
    console.log(name, '->', nextName);
    i.rename(nextName, {
      renameInComments: true,
      renameInStrings: true
    });
  }

  console.log();
}

// Save all changed files
project.saveSync();
```

2. Install dependencies:

```shell
npm install --save-dev ts-morph
```

3. Run the codemod:

```shell
ts-node --compiler-options '{"module": "commonjs"}' src/remove-prefixes.ts
```

> [!note] We need to override compiler options here because our project is using webpack and ECMAScript modules aren’t transpiled, which is required for Node.js.

## Caveats

This codemod doesn’t do anything with naming conflict. For example, if we already have a `Dog` component or class and we’re importing the `IDog` interface into the same file, we’ll have a naming conflict: both, the component and the interface will be called `Dog`.
