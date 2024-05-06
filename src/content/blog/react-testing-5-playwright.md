---
title: 'Modern React testing, part 5: Playwright'
description: 'Learn how to test React apps end-to-end with Playwright, how to mock network requests with Mock Service Worker, and how to apply testing best practices to write integration tests.'
date: 2024-05-01
tags:
  - tools
  - react
  - testing
  - testing-series
  - playwright
  - mocking
  - msw
---

Playwright is a framework-agnostic end-to-end testing (also known as E2E, or integration testing) tool for web apps. Playwright has great developer experience and makes writing good and resilient to changes tests straightforward.

**This is the fifth article in the series**, where we learn how to test React apps end-to-end using Playwright and how to mock network requests using Mock Service Worker.

- [Modern React testing, part 1: best practices](/blog/react-testing-1-best-practices/)
- [Modern React testing, part 2: Jest and Enzyme](/blog/react-testing-2-jest-and-enzyme/)
- [Modern React testing, part 3: Jest and React Testing Library](/blog/react-testing-3-jest-and-react-testing-library/)
- [Modern React testing, part 4: Cypress and Cypress Testing Library](/blog/react-testing-4-cypress/)
- **Modern React testing, part 5: Playwright (_this post_)**

_Check out [the GitHub repository](https://github.com/sapegin/playwright-article-2024) with all the examples._

## Getting started with Playwright

We’ll set up and use these tools:

- [Playwright](https://playwright.dev/), an end-to-end test runner;
- [Mock Service Worker](https://mswjs.io/), mocking network requests.

### Why Playwright

**Playwright** has many benefits over other end-to-end test runners:

- The best experience writing and debugging tests.
- An ability to inspect the page at any moment during the test run using the browser developer tools.
- All commands wait for the DOM to change when necessary, which simplifies testing async behavior.
- Tests better resemble real user behavior. For example, Playwright checks that a button is present in the DOM, isn’t disabled, and isn’t hidden behind another element or offscreen before clicking it.
- Supports Chromium, WebKit, Firefox, as well as Google Chrome for Android and Mobile Safari.
- Convenient semantic queries, like finding elements by their label text or ARIA role, similar to [React Testing Library](/blog/react-testing-3-jest-and-react-testing-library/).
- It’s very fast.

Semantic queries help us write [good tests](/blog/react-testing-1-best-practices/) and make writing bad tests difficult. It allows us to interact with the app in a way that is similar to how a real user would do that: for example, find form elements and buttons by their labels. It helps us avoid testing implementation details, making our tests resilient to code changes that don’t change the behavior.

### Why not Cypress

Playwright is similar to the combination of [Cypress, Cypress Testing Library, and start-server-and-test](/blog/react-testing-4-cypress/), which have been my choice for end-to-end testing for many years, but gives us all the necessary tools in a single package. Also, the API feels more cohesive and intentional. There wasn’t a lot of new things to learn.

Some of the benefits of Playwright over Cypress:

- better API;
- easier setup;
- multi-tabs support;
- speed.

### Setting up Playwright

First, run the [installation wizard](https://playwright.dev/docs/intro):

```bash
npm init playwright@latest
```

This will install all the dependencies and generate the config files. We’ll need to choose:

- whether to use TypeScript or JavaScript (we’ll use JavaScript in this article);
- where to put the tests (`tests` folder in the project root);
- whether to generate GitHub Actions to run the tests on CI (we won’t cover this here);
- whether we want to install the browsers (it’s a good idea; we’ll need them anyway).

![Playwright installation wizard](/images/playwright-wizard.webp)

Then add two scripts to our [package.json](https://github.com/sapegin/playwright-article-2024/blob/master/package.json) file:

```json {7-8}
{
  "name": "pizza",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test:e2e": "npx playwright test --ui",
    "test:e2e:ci": "npx playwright test"
  },
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-scripts": "5.0.1"
  },
  "devDependencies": {
    "@playwright/test": "^1.41.2"
  }
}
```

Playwright, unlike React Testing Library or Enzyme, tests a real app in a real browser, so we need to run our development server before running Playwright. We can run both commands manually in separate terminal windows — good enough for local development — or we can set up Playwright to run them for us (see below) and have a single command that we can also use on a continuous integration (CI) server.

As a development server, we can use an actual development server of our app, like Create React App (that we use for the examples) or Vite, or another tool like [React Styleguidist](https://react-styleguidist.js.org/) or [Storybook](https://storybook.js.org/), to test isolated components.

We’ve added two scripts to run the development server and Playwright together:

- `npm run test:e2e` to run a development server and Playwright ready for local development;
- `npm run test:e2e:ci` to run a development server and all Playwright tests in headless mode, ideal for CI.

Then, edit the Playwright config file, [playwright.config.js](https://github.com/sapegin/playwright-article-2024/blob/master/playwright.config.js), in the project root folder:

```js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  // Run tests in files in parallel
  fullyParallel: true,
  // Fail the build on CI if you accidentally left test.only
  // in the source code
  forbidOnly: !!process.env.CI,
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  // Reporter to use
  reporter: 'html',
  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: 'http://localhost:3000',
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
  },
  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

The options we’ve changed are:

- `use.baseURL` is the URL of our development server to avoid writing it in every test;
- `webServer` block describes how to a run development server; we also want to reuse an already-running server unless we’re in the CI environment.

**Tip:** Read more about all [Playwright config options in the docs](https://playwright.dev/docs/test-configuration).

### Setting up Mock Service Worker

We’re going to use [Mock Service Worker](https://mswjs.io/) (MSW) for mocking network requests in our integration tests and in the app during development.

- It uses Service Workers, so it intercepts all network requests, no matter how they are made.
- A single place to define mocks for the project, with the ability to [override responses](https://mswjs.io/docs/api/setup-server/use) for particular tests.
- An ability to reuse mocks in integration tests and during development.
- Requests are still visible in the network panel of the browser developer tools.
- Supports REST API and GraphQL.

First, install MSW from npm:

```bash
npm install --save-dev msw
```

Create [mock definitions](https://mswjs.io/docs/network-behavior/rest), [src/mocks/handlers.js](https://github.com/sapegin/playwright-article-2024/blob/master/src/mocks/handlers.js):

```js
import { http, HttpResponse } from 'msw';

export const handlers = [
  // GET requests to https://httpbin.org/anything with any parameters
  http.get('https://httpbin.org/anything', () => {
    // Return OK status with a JSON object
    return HttpResponse.json({
      args: {
        ingredients: ['bacon', 'tomato', 'mozzarella', 'pineapples'],
      },
    });
  }),
];
```

**Note:** To mock GraphQL requests instead of REST, use the [graphql](https://mswjs.io/docs/network-behavior/graphql) namespace.

Here, we’re intercepting GET requests to `https://httpbin.org/anything` with any parameters and returning a JSON object with an OK (200) status.

Now we need to [generate the Service Worker script](https://mswjs.io/docs/integrations/browser):

```bash
npx msw init ./public --save
```

The `--save` flag will save the public directory path to `package.json` so we can update the worker script later by running just `msw init`.

**Note:** The public directory [may be different](https://mswjs.io/docs/integrations/browser#where-is-my-public-directory) for projects not using Create React App.

Then, create another JavaScript module that will register our Service Worker with our mocks, [src/mocks/browser.js](https://github.com/sapegin/playwright-article-2024/blob/master/src/mocks/browser.js):

```js
import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';
import { handlers } from './handlers';

// Configure a Service Worker with the given request handlers
export const worker = setupWorker(...handlers);

// Expose methods globally to make them available in integration tests
window.msw = { worker, http, HttpResponse };
```

And the last step is to start the worker function when we run our app in development mode. Add these lines to our app root module ([src/index.js](https://github.com/sapegin/playwright-article-2024/blob/master/src/index.js) for Create React App):

```js
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}
```

And update the way we render the React app to await the Promise returned by `enableMocking()` function before rendering anything:

```js {1, 4}
enableMocking().then(() => {
  const root = createRoot(document.getElementById('root'));
  root.render(<App />);
});
```

Now, every time we run our app in the development mode or on CI, network requests will be mocked without any changes to the application code or tests, except these few lines of code in the root module.

### Creating our first test

As defined in our config file, Playwright looks for test files inside the [tests/](https://github.com/sapegin/playwright-article-2024/tree/master/tests) folder. Feel free to remove the `example.spec.js` file from there — we won’t need it.

So, let’s create our first test, [tests/hello.spec.js](https://github.com/sapegin/playwright-article-2024/blob/master/tests/hello.spec.js):

```js
const { test, expect } = require('@playwright/test');

test('hello world', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('welcome back')).toBeVisible();
});
```

Here, we’re visiting the homepage of our app running on the development server, then validating that the text “welcome back” is present on the page using Playwright’s [getByText()](https://playwright.dev/docs/locators#locate-by-text) locator, and [toBeVisible()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-visible) assertion.

### Running tests

Start Playwright in the UI mode by running `npm run test:e2e`. From here, either run a single test or all tests. We can press an eye icon next to a single test or a group to automatically rerun them on every change in the code of the test.

![Running a test in Playwright](/images/playwright-test.webp)

When I write tests, I usually _watch_ a single test (meaning Playwright reruns it for me on every change), otherwise it’s too slow and too hard to see what’s wrong if there are any issues.

Run `npm run test:e2e:ci` to run all tests in the headless mode, meaning we won’t see the browser window:

![Running Playwright in the terminal](/images/playwright-headless.png)

### Querying DOM elements for tests

Tests should resemble how users interact with the app. That means we shouldn’t rely on implementation details because the implementation can change and we’ll have to update our tests. This also increases the chance of false positives when tests are passing but the actual feature is broken.

Let’s compare different methods of querying DOM elements:

| Selector | Recommended | Notes |
| --- | --- | --- |
| `button` | Never | Worst: too generic |
| `.btn.btn-large` | Never | Bad: coupled to styles |
| `#main` | Never | Bad: avoid IDs in general |
| `[data-testid="cookButton"]` | Sometimes | Okay: not visible to the user, but not an implementation detail; use when better options aren’t available |
| `[alt="Chuck Norris"]`, `[role="banner"]` | Often | Good: still not visible to users, but already part of the app UI |
| `[children="Cook pizza!"]` | Always | Best: visible to the user part of the app UI |

To summarize:

- Prefer to query elements by their visible (for example, button label) or accessible name (for example, image alt).
- Use test IDs as the last resort. They clutter the markup with props we only need in tests. Test IDs are also something that users of our app don’t see: if we remove a label from a button, a test with test ID will still pass.

**Note:** I often hear this complaint about using labels to query elements: they break when the app copy is updated. I consider this a feature: I’ve seen more than once that a button label change on one screen broke some other screen where this change was undesired.

Playwright has methods for all good queries, which are called [locators](https://playwright.dev/docs/locators):

- `page.getByAltText()` finds an image by its alt text;
- `page.getByLabel()` finds a form element by its `<label>`;
- `page.getByPlaceholder()` finds a form element by its placeholder text;
- `page.getByRole()` finds an element by its ARIA role;
- `page.getByTestId()` finds an element by its test ID;
- `page.getByText()` finds an element by its text content;
- `page.getByTitle()` finds an element by its `title` attribute.

Let’s see how to use locators. To select this button in a test:

```html
<button data-testid="cookButton">Cook pizza!</button>
```

We can either query it by its test ID:

```jsx
page.getByTestId('cookButton');
```

Or query it by its text content:

```jsx
page.getByText('cook pizza');
```

**Note:** Text locators are partial and case-insensitive by default, which makes them more resilient to small tweaks and changes in the content. For an exact match, use the `exact` option: `page.getByText('Cook pizza!', {exact: true})`.

Or, the best method is to query it by its ARIA role and label:

```jsx
page.getByRole('button', { name: 'cook pizza' });
```

Benefits of the last method are:

- doesn’t clutter the markup with test IDs that aren’t perceived by users;
- doesn’t give false positives when the same text is used in non-interactive content;
- makes sure that the button is an actual `button` element or at least has the `button` ARIA role.

Check the Playwright docs for more details on [best practices](https://playwright.dev/docs/best-practices), and [inherent roles of HTML elements](https://github.com/A11yance/aria-query#elements-to-roles).

## Testing React apps end-to-end

### Testing basic user interaction

A typical integration test looks like this: visit the page, interact with it, and check the changes on the page after the interaction. [For example](https://github.com/sapegin/playwright-article-2024/blob/master/tests/hello.spec.js):

```js
const { test, expect } = require('@playwright/test');

test('navigates to another page', async ({ page }) => {
  await page.goto('/');

  // Opening the pizza page
  await page.getByRole('link', { name: 'remotepizza' }).click();

  // We are on the pizza page
  await expect(
    page.getByRole('heading', { name: 'pizza' }),
  ).toBeVisible();
});
```

Here, we’re finding a link by its ARIA role (`link`) and text using the Playwright’s [getByRole()](https://playwright.dev/docs/locators#locate-by-role) locator, and clicking it using the [click()](https://playwright.dev/docs/input#mouse-click) method. Then we’re verifying that we’re on the correct page by checking its heading, first by finding it the same way we found the link before, and testing the heading with the [toBeVisible()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-visible) assertion.

With Playwright, we generally don’t have to care if the actions are synchronous or asynchronous: each command will [wait for some time](https://playwright.dev/docs/actionability) for the queried element to appear on the page. Though we should explicitly `await` most operations. This avoids the flakiness and complexity of asynchronous testing and keeps the code straightforward.

### Testing forms

Playwright’s locators allow us to access any form element by its visible (for example, `<label>` element) or accessible (for example, `aria-label` attribute) label.

For example, we have a [registration form](https://github.com/sapegin/playwright-article-2024/blob/master/src/components/SignUpForm.js) with a bunch of text inputs, select boxes, checkboxes, and radio buttons. This is how we can [test it](https://github.com/sapegin/playwright-article-2024/blob/master/tests/signUp.spec.js):

```js
const { test, expect } = require('@playwright/test');

test('should show success page after submission', async ({
  page,
}) => {
  await page.goto('/signup');

  // Filling the form
  await page.getByLabel('first name').fill('Chuck');
  await page.getByLabel('last name').fill('Norris');
  await page.getByLabel('country').selectOption({ label: 'Russia' });
  await page.getByLabel('english').check();
  await page.getByLabel('subscribe to our newsletter').check();

  // Submit the form
  await page.getByRole('button', { name: 'sign in' }).click();

  // We are on the success page
  await expect(
    page.getByText('thank you for signing up'),
  ).toBeVisible();
});
```

Here we’re using [getByLabel()](https://playwright.dev/docs/locators#locate-by-label) and [getByRole()](https://playwright.dev/docs/locators#locate-by-role) locators to find elements by their label texts or ARIA roles. Then we use the [fill()](https://playwright.dev/docs/api/class-locator#locator-fill), [selectOption()](https://playwright.dev/docs/api/class-locator#locator-select-option), and [check()](https://playwright.dev/docs/api/class-locator#locator-check) methods to fill the form, and the [click()](https://playwright.dev/docs/api/class-locator#locator-click) method to submit it by clicking the submit button.

### Testing complex forms

In the previous example, we used the [getByLabel()](https://playwright.dev/docs/locators#locate-by-label) locator to find form elements, which works when all form elements have unique labels, but this isn’t always the case.

For example, we have a passport number section in our [registration form](https://github.com/sapegin/playwright-article-2024/blob/master/src/components/SignUpForm.js) where multiple inputs have the same label, like “year” of the issue date and “year” of the expiration date. The markup of each field group looks like so:

```html
<fieldset>
  <legend>Passport issue date</legend>
  <input type="number" aria-label="Day" placeholder="Day" />
  <select aria-label="Month">
    <option value="1">Jan</option>
    <option value="2">Feb</option>
    ...
  </select>
  <input type="number" aria-label="Year" placeholder="Year" />
</fieldset>
```

To access a particular field, we can select a `fieldset` by its `legend` text first, and then select an input by its label inside the `fieldset`.

```js
const passportIssueDateGroup = page.getByRole('group', {
  name: 'passport issue date',
});
await passportIssueDateGroup.getByLabel('day').fill('12');
await passportIssueDateGroup
  .getByLabel('month')
  .selectOption({ label: 'May' });
await passportIssueDateGroup.getByLabel('year').fill('2004');
```

We call [getByRole()](https://playwright.dev/docs/locators#locate-by-role) locator with the ARIA role of `fieldset` (`group`) and the text of its`legend`. Then we chain the [getByLabel()](https://playwright.dev/docs/locators#locate-by-label) locator to query form fields by their labels.

### Testing links

There are several ways to test links that open in a new tab:

- check the link’s `href` attribute without clicking it;
- click the link, and then get the handle of the new page and use it instead of the current one (`page`).

In the first method, we query the link by its ARIA role and text, and verify that the URL in its `href` attribute is correct:

```js
await expect(
  page.getByRole('link', { name: 'terms and conditions' }),
).toHaveAttribute('href', /\/toc/);
```

The main drawback of this method is that we’re not testing whether the link is actually clickable. It might be hidden, or it might have a click handler that prevents the default browser behavior.

In the second method, we query the link by its ARIA role and text again, click it, get the handle of the new page, and use the new page handle instead of the current one:

```js
const pagePromise = context.waitForEvent('page');
await page
  .getByRole('link', { name: 'terms and conditions' })
  .click();
const newPage = await pagePromise;
await expect(newPage.getByText("i'm baby")).toBeVisible();
```

Now, we could verify that we’re on the correct page by finding some text unique to this page.

I recommend the second method because it better resembles the actual user behavior.

There are [other solutions](https://stackoverflow.com/questions/71843918/open-a-blank-link-and-continue-the-test-with-playwright), but I don’t think they are any better than these two.

### Testing network requests, and mocks

Having MSW mocks setup (see “Setting up Mock Service Worker” above), happy path tests of pages with asynchronous data fetching aren’t different from any other tests.

For example, we have an API that returns a list of pizza ingredients:

```js
const { test, expect } = require('@playwright/test');

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

test('load ingredients asynchronously', async ({ page }) => {
  await page.goto('/remote-pizza');

  // Ingredients list is not visible
  await expect(page.getByText(ingredients[0])).toBeHidden();

  // Load ingredients
  await page.getByRole('button', { name: 'cook' }).click();

  // All ingredients appear on the screen
  for (const ingredient of ingredients) {
    await expect(page.getByText(ingredient)).toBeVisible();
  }

  // The button is not clickable anymore
  await expect(
    page.getByRole('button', { name: 'cook' }),
  ).toBeDisabled();
});
```

Playwright will wait until the data is fetched and rendered on the screen, and thanks to network calls mocking it won’t be long.

For not-so-happy-path tests, we may need to override global mocks inside a particular test. For example, we could test what happens when our API returns an error:

```js
test('shows an error message', async ({ page }) => {
  await page.goto('/remote-pizza');

  page.evaluate(() => {
    // Reference global instances set in src/browser.js
    const { worker, http, HttpResponse } = window.msw;
    worker.use(
      http.get(
        'https://httpbin.org/anything',
        () => HttpResponse.json(null, { status: 500 }),
        { once: true },
      ),
    );
  });

  // Ingredients list is not visible
  await expect(page.getByText(ingredients[0])).toBeHidden();

  // Load ingredients
  await page.getByRole('button', { name: 'cook' }).click();

  // Ingredients list is still not visible and error message appears
  await expect(page.getByText(ingredients[0])).toBeHidden();
  await expect(page.getByText('something went wrong')).toBeVisible();
});
```

Here, we’re using the MSW’s [use()](https://mswjs.io/docs/api/setup-worker/use/) method to override the default mock response for our endpoint during a single test. Also note that we’re using the [once](https://mswjs.io/docs/api/http/#once) option of the `http.get()` method; otherwise the override will be added permanently and may interfere with other tests.

### Testing complex pages

We should avoid test IDs wherever possible and use more semantic queries instead. However, sometimes we need to be more precise. For example, we have a “delete profile” button on our user profile page that shows a confirmation modal with “delete profile” and “cancel” buttons inside. We need to know which of the two delete buttons we’re pressing in our tests.

The markup could look [like so](https://github.com/sapegin/playwright-article-2024/blob/master/src/components/Profile.js):

```html
<button type="button">Delete profile</button>
<div
  role="dialog"
  aria-label="Delete profile modal"
  aria-modal="true"
>
  <h1>Delete profile</h1>
  <button type="button">Delete profile</button>
  <button type="button">Cancel</button>
</div>
```

The first “delete profile” isn’t a problem because when we click it, it’s the only one present on the page. However, when the modal is open, we have two buttons with the same label.

So, how do we click the one inside the modal dialog?

The first option would be to assign a test ID to this button, and sometimes that’s the only way. Usually, though, we can do better. We can nest locators, so we could target the container (the modal dialog) first, and then the button we need inside the container:

```js
await page
  // Locate the dialog by its aria-label
  .getByRole('dialog', { name: 'delete profile modal' })
  // Locate the button by its label inside the dialog
  .getByRole('button', { name: 'delete profile' })
  // Click the button
  .click();
```

It’s slightly more complex when the container doesn’t have any semantic way to target it, like a `section` with a heading (`h1`, `h2`, and so on) inside. In this case, we can target all sections on a page and then [filter](https://playwright.dev/docs/locators#filtering-locators) them to find the one we’re looking for.

Imagine markup like so:

```html
<section>
  <h2>Our newsletter</h2>
  <form>
    <input
      type="email"
      name="email"
      arial-label="Email"
      placeholder="Email"
    />
    <button type="submit">Subscribe</button>
  </form>
</section>
```

We can click the “Subscribe” button inside the “Our newsletter” section in a test like so:

```js
await page
  // Locate all sections on a page
  .getByRole('section')
  .filter({
    // Filter only ones that contain "Our newsletter" heading
    has: page.getByRole('heading', { name: 'our newsletter' }),
  })
  // Locate the button inside the section
  .getByRole('button', { name: 'subscribe' })
  .click();
```

Coming back to our profile deletion modal, we can test it [like so](https://github.com/sapegin/playwright-article-2024/blob/master/tests/profile.spec.js):

```jsx
const { test, expect } = require('@playwright/test');

test('should show success message after profile deletion', async ({
  page,
}) => {
  await page.goto('/profile');

  // Attempting to delete profile
  await page.getByRole('button', { name: 'delete profile' }).click();

  // Confirming deletion
  await page
    .getByRole('dialog', { name: 'delete profile modal' })
    .getByRole('button', { name: 'delete profile' })
    .click();

  // We are on the success page
  await expect(
    page.getByRole('heading', { name: 'your profile was deleted' }),
  ).toBeVisible();
});
```

Here, we’re using the [getByRole()](https://playwright.dev/docs/locators#locate-by-role) locator, as in previous examples, to find all elements we need.

## Debugging

Playwright docs have a thorough [debugging guide](https://playwright.dev/docs/running-tests).

However, it’s usually enough to check the locator or inspect the DOM for a particular step of the test after running the tests.

Click any operation in the log first, and then do one of the following:

**To debug a locator the DOM**, click the [Pick locator](https://playwright.dev/docs/test-ui-mode#pick-locator) button, and hover over an element we want to target. We can use the _Locator_ tab below to edit it and see if it still matches the element we need.

![Using browser developer tools in Playwright](/images/playwright-debug-locator.webp)

**To inspect the DOM**, click the [Open snapshot in a new tab](https://playwright.dev/docs/test-ui-mode#pop-out-and-inspect-the-dom) button and use the browser developer tools the way we’d normally do.

![Using browser developer tools in Playwright](/images/playwright-inspect.png)

I also often focus on a single test with `test.only()`, and watch a single file by toggling the eye button in the Playwright UI to make reruns faster and avoid seeing too many errors while I debug why tests are failing.

```js
test.only('hello world', async ({ page }) => {
  // Playwright will skip other tests in this file
});
```

## Conclusion

Good tests interact with the app similar to how a real user would do that; they don’t test implementation details, and they are resilient to code changes that don’t change the behavior.

We’ve learned how to write good end-to-end tests using Playwright, how to set it up, and how to mock network requests using Mock Service Worker.

However, Playwright has many more features that we haven’t covered in the article that may be useful one day.
