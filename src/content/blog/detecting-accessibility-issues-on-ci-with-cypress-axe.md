---
title: 'Detecting accessibility issues on CI with cypress-axe'
description: ''
date: 2020-10-06
tags:
  - testing
  - axe
  - accessibility
  - cypress
  - ci
---

Unless we check the accessibility of our pages every time we change them, it’s to easy to introduce regressions. Therefore, we should test accessibility during our Continuous Integration (CI) checks.

[Cypress-axe](https://github.com/avanslaars/cypress-axe) allows us to do exactly that, and it’s a good place to do that in Cypress because we already render all the pages in our end-to-end tests and run them during CI.

## Setting up cypress-axe

1. Install cypress-axe (assuming we already have Cypress installed and configured on our project):

```shell
npm install --dev cypress-axe
```

2. Import the commands, add to the **cypress/support/index.js**:

```js
import 'cypress-axe';
```

3. Update the plugins file, **cypress/plugins/index.js**:

```diff
module.exports = (on, config) => {
+  on('task', {
+    table(message) {
+      console.table(message);
+      return null;
+    },
+  });
  return config;
};
```

We need this for printing the results in the terminal.

4. Add a custom Cypress command, **cypress/support/commands.js**:

```js
// Print cypress-axe violations to the terminal
function printAccessibilityViolations(violations) {
  cy.task(
    'table',
    violations.map(({ id, impact, description, nodes }) => ({
      impact,
      description: `${description} (${id})`,
      nodes: nodes.length
    }))
  );
}

Cypress.Commands.add(
  'checkAccessibility',
  {
    prevSubject: 'optional'
  },
  (subject, { skipFailures = false } = {}) => {
    cy.checkA11y(
      subject,
      null,
      printAccessibilityViolations,
      skipFailures
    );
  }
);
```

This command runs cypress-axe [`checkA11y`](https://github.com/avanslaars/cypress-axe#cychecka11y) method with a custom violation callback function that prints a list of violations to the terminal, and can be chained to queries.

## Running cypress-axe

To run accessibility checks, we need to do two things:

1. Inject Axe into the page — we need to do it once, after calling `cy.visit`.
2. Run the checks using our `checkAccessibility` command — we can do it multiple times to check the page in different states.

A test case could look like this:

```js
describe('Our awesome site', () => {
  it('Happy path', () => {
    // Visiting the page to test
    cy.visit('http://localhost:8000');

    // Injecting Axe runtime into the page
    cy.injectAxe();

    // Waiting for the page to render
    cy.log('Page header is rendered');
    cy.findByRole('heading', { name: /awesome site/i }).should(
      'be.visible'
    );

    // Running accessibility checks
    cy.checkAccessibility();

    // All the regular end-to-end checks
    // ...
  });
});
```

If there are any accessibility violations, the test case fails:

![Cypress-axe found accessibility issues](/images/blog/cypress-axe-error.png)

And the list of violations is printed in the terminal:

![Cypress-axe prints accessibility violations in the terminal](/images/blog/cypress-axe-violations.png)

We could also check a particular area of the page, for example, a modal:

```js
describe('Our awesome site', () => {
  it('Happy path', () => {
    // ...

    // Click a button that opens a modal
    cy.findByRole('button', { name: /open modal/i });

    // Check accessibility only inside the modal
    cy.findByTestId('some-modal').checkAccessibility();
  });
});
```

**Hint:** `cy.findByRole` and `cy.findByTestId` are from [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro), read more about it in [my article on Cypress](https://sapegin.me/blog/react-testing-4-cypress/).
