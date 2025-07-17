---
title: 'Code style'
description: 'A chapter from “Washing your code. A book on clean code for frontend developers” by Artem Sapegin. Which code styles are actually improve readability and which are merely preferences that don’t matter much'
source: washing-code/100_Code_style
---

I used to be very strict about [code style](https://sapegin.me/blog/prettier/). I thought my code style was better than others’, but later, I realized that it was just different. Also, it wasn’t the most popular, so anyone else’s code looked wrong to me.

For example, after reading [The Programmers’ Stone](https://www.datapacrat.com/Opinion/Reciprocality/r0/index.html), I was formatting braces like this for a long time:

```js
if (food === 'cake') {
  alert('Cake!');
} else {
  alert('Not cake ;-(');
}
```

I also used two spaces in front of inline comments to better separate them from the code:

```js
const volume = 200; // ml
```

If any other developer touched my code, they would definitely make it inconsistent because it’s unlikely they would follow _my code style_ — so peculiar it was. Code reviews would also be a nightmare if I wanted to enforce _my code style_.

Later, I became more flexible and able to adapt to whatever code style my current project was using. For my personal projects, I switched to more widespread code styles and eventually to code autoformatting tools. Now, I don’t care about code style as much as I used to.

In this chapter, we’ll discuss different ways to format code and where it truly impacts readability.

## Not all code styles are good

I wasn’t entirely wrong, though — not every code style makes code easy to read and maintain.

For example, this way of defining arrays makes it harder to move or add new elements:

```js
const dogs = ['dachshund', 'sheltie', 'schnoodle'];
```

Changing or removing an element at the end of the array requires modifying two lines. It also clutters diffs:

```diff
const dogs = [
  'dachshund',
  'sheltie',
-  'schnoodle'
+  'schnoodle',
+  'niffler'
];
```

_Trailing, or dangling commas_ solve both problems without making code any harder to write or read:

```js
const dogs = ['dachshund', 'sheltie', 'schnoodle'];
```

Now to add a new element, we only need to change one line:

```diff
const dogs = [
  'dachshund',
  'sheltie',
  'schnoodle',
+  'niffler',
];
```

**Info:** Nik Graf wrote [a great article on the benefits of dangling commas](https://medium.com/@nikgraf/why-you-should-enforce-dangling-commas-for-multiline-statements-d034c98e36f8).

If I had to choose the most annoying code style, it would be writing condition or loop bodies without braces:

```js
if (pizza) pizza();
```

Instead of:

```js
if (pizza) {
  pizza();
}
```

It really damages code readability, and the longer the condition, the harder it is to see its body:

```js
function getIngredientNames(recipeDetails) {
  if (!recipeDetails?.allIngredients.length) return [];

  return recipeDetails?.allIngredients.map(x => x.name);
}
```

I’m 102% sure I’d miss the `return` statement here when reading this code for the first time.

**Tip:** My color theme, [Squirrelsong](https://sapegin.me/squirrelsong/), shows `!` and other operators in bold to make them more noticeable.

Compare it with:

```js
function getIngredientNames(recipeDetails) {
  if (!recipeDetails?.allIngredients.length) {
    return [];
  }

  return recipeDetails?.allIngredients.map(x => x.name);
}
```

Now, the `return` statement is more noticeable: it has its own line, braces create extra negative space around it, and, most importantly, it has the familiar shape of an `if` statement. Without braces, it looks like any other line (see the illustration).

![Shapes of if conditions without and with braces](https://sapegin.me/images/blog/book/if-shapes.svg)

Of course, there are worse ways to write such conditions:

```js
pizza && pizza();
```

Shorter isn’t always better _(though, I’m fine with `pizza?.()` sometimes)_.

**Tip:** Use `curly` ESLint rule to make sure all conditions have braces: see the Lint your code chapter.

The only exception is `else if`:

```js
function printStatus(text, type) {
  if (type === 'error') {
    console.error(
      `${colors.badge().red(' FAIL ')} ${colors.red(text)}`
    );
  } else if (type === 'warning') {
    console.error(
      `${colors.badge().yellow(' WARN ')} ${colors.yellow(text)}`
    );
  } else {
    console.log(`${colors.badge().green(' DONE ')} ${text}`);
  }
}
```

JavaScript doesn’t have the `elseif` operator like some other languages. However, we can “make” one by skipping braces on the `else` branch. It doesn’t reduce the readability because all the code is still inside braces, but this way we have all branches at the same nesting level, creating a _parallel structure_: all branches look like they belong to the same condition.

**Info:** We talk more about parallel coding in the Don’t make me think chapter.

## Obsolete code styles

Sometimes, developers follow a particular code style even when the initial reasoning behind it is no longer relevant.

For example, using leading commas in arrays and objects when JavaScript didn’t yet support trailing commas:

```js
const dogs = ['dachshund', 'sheltie', 'schnoodle'];
```

The goal of this style was the same as trailing commas in the previous section: to simplify adding new elements and make diffs more readable. However, there’s no reason to use it anymore; Internet Explorer 8 was the last browser that didn’t support trailing commas, and it was many, many years ago.

Another example is [Yoda conditions](https://en.wikipedia.org/wiki/Yoda_conditions), a style where a literal is on the left side of a condition:

```js
if (42 === meaning) {
  /* … */
}
```

It’s easy to accidentally type `=` instead of `==` in languages like C, resulting in an assignment:

```js
// WARNING: This code is wrong
if ((meaning = 42)) {
  // Assigns 42 to `meaning`
}
```

Instead of a comparison:

```js
if (meaning == 42) {
  // Compares `meaning` to 42
}
```

This issue is much less relevant in JavaScript, where strict equality (`===`, requiring values and types to be equal) is the preferred style; enforced by a linter in most projects. Loose equality (`==`, requiring only values to be equal) is uncommon in modern JavaScript. It’s really hard to skip two equal signs when typing `===`, so the natural order of conditions is safe and more readable:

```js
if (meaning === 42) {
  // Compares `meaning` to 42
}
```

## Nonsensical code styles

Some code styles don’t solve any particular problem but are expensive to maintain.

For example, aligning object values or the right-hand side of assignments horizontally to make them look “pretty”:

```js
var fs = require('fs'),
  readme = require('./readme'),
  examples = readme(fs.readFileSync('./README.md', 'utf8'));
```

Editing code written in this style takes an enormous amount of work. Luckily, code formatters will remove all the artisanal, handcrafted spaces and make code look equally good without requiring any extra work from a developer:

```js
var fs = require('fs'),
  readme = require('./readme'),
  examples = readme(fs.readFileSync('./README.md', 'utf8'));
```

I’d go one step further and replace the single `var` with one `var` per assignment (or even better, `const`):

```js
const fs = require('fs');
const readme = require('./readme');
const examples = readme(fs.readFileSync('./README.md', 'utf8'));
```

This will not only make it slightly more readable but also make it easier to add, remove, or move variable declarations.

**Info:** We talk about code formatting in the Autoformat your code chapter.

## Condition expansion

Some ways of writing code are more readable than others. For example, conditions, especially those with negations. I used to write them as concisely as possible; now, I prefer to be verbose and explicit. Saving a few keystrokes isn’t worth it when the code could be misinterpreted. It’s better to learn touch typing.

Consider this example:

```js
if (!isEmpty(object)) {
  // Object is not empty
}
```

It’s hard to notice the logical NOT operator (`!`) here. We can replace the logical NOT operator with an explicit condition to avoid misunderstandings:

```js
if (isEmpty(object) === false) {
  // Object is not empty
}
```

Someone may argue that it doesn’t read like English — “not is empty” — but there’s now way to miss the negation. This style is also less common than the one with `!`, but I think the readability benefits are worth adopting.

In some languages, negation is much more visible. For example, in Python:

```python
if not is_empty(object):
  # Object is not empty
```

Unfortunately, JavaScript inherited terse syntax from C that’s fast to type but might be hard to read later.

Here’s another example:

```js
if (!('garlic' in guacamole)) {
  // No garlic here
}
```

This pattern was always awkward to write and read for me until my friend Oleg [opened up a whole new world to me](https://x.com/oleg008/status/1519593163803049984): we can use the same trick as above to make it more readable:

```js
if ('garlic' in guacamole === false) {
  // No garlic here
}
```

Another area where expanding conditions improves readability is when checking array length.

Consider these two examples:

```js
if (puppies.length) {
  // Has puppies
}

if (!puppies.length) {
  // Has no puppies
}
```

They look almost the same, and it’s easy to miss the `!` in front of the second one. Let’s expand them:

```js
if (puppies.length > 0) {
  // Has puppies
}

if (puppies.length === 0) {
  // Has no puppies
}
```

Now, the conditions look significantly different, and there’s no way to misinterpret them.

**Tip:** The [unicorn/explicit-length-check](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/explicit-length-check.md) linter rule requires and autofixes explicit length checks.

I’m starting to think that using `!` in conditions is [generally an antipattern](https://x.com/Jack_Franklin/status/1189477268764188672). Instead of:

```js
if (!isFriday) {
  // Not Friday yet :—(
}
```

We should always write:

```js
if (isFriday === false) {
  // Not Friday yet :—(
}
```

## Range conditions

Another area where we can improve readability a bit is when checking whether a value is between two numbers. A naïve way to do so would be:

```js
if (x > 3 && x < 13) {
  // The x is between 3 and 13
}
```

This reads as “x is greater than 3 _and_ less than 13,” which is fine, but we can still improve it:

```js
if (3 < x && x < 13) {
  // The x is not between 3 and 13
}
```

Now, it’s easier to see that we want `x` to be _between_ 3 and 13.

We can use the same approach to check whether a value is outside a range:

```js
if (x < 3 || 13 < x) {
  // The x is not between 3 and 13
}
```

## Readable numbers

One minor improvement in modern JavaScript is _numeric separators_, which let us to separate thousands with an underscore (`_`) to make large numbers easier to read:

```js
const earthToSun1 = 149597870700;
const earthToSun2 = 149_597_870_700;
```

## Christmas trees against kebabs

Some developers seem to prefer long lines of code, some — short.

_The longliners_ write code that looks like a kebab on a long skewer:

```js
const puppiesByParent = {};
for (const puppy of puppies) {
  if (puppy.parentId) {
    const currentParent = puppies.find(
      currentPuppy => currentPuppy.id === puppy.parentId
    );
    puppiesByParent[currentParent.id] = [
      ...(puppiesByParent[currentParent.id] || []),
      puppy.id
    ];
  }
}
```

Or:

```js
const downloadLink = hasTranslation
  ? `${origin}/${intl.formatMessage({ id: 'download-link' })}`
  : `${origin}/download`;
```

Longliners use many ternaries, complex template literals, deep nesting, multiple operations on the same line, and long variable names (even in very small scopes).

On the other hand, _the shortliners_ write code that looks like one side of a Christmas tree:

```js
const puppiesByParent = {};
for (const puppy of puppies) {
  if (puppy.parentId === undefined) {
    continue;
  }

  const parent = puppies.find(x => x.id === puppy.parentId);
  if (puppiesByParent[parent.id] === undefined) {
    puppiesByParent[parent.id] = [];
  }
  puppiesByParent[parent.id].push(puppy.id);
}
```

Or:

```js
const link = hasTranslation
  ? intl.formatMessage({ id: 'download-link' })
  : 'download';
const downloadLink = [origin, link].join('/');
```

Shortliners prefer early returns, extra functions and variables (to reduce the number of operations on one line and to name things), shallow nesting, shorter variable names when the scope is small, and so on.

It’s easier to follow conditions, notice `return` statements in functions, and generally understand what’s happening in the code. Important code, such as adding new values to an object, isn’t buried somewhere in a very long line, and separated from the data management logic. The code has more negative space and a more distinctive shape, making it easier to scan.

_I’m a shortliner._

**Info:** We talk more about separating data and data-managing code in the Separate “what” and “how” section of the _Divide and conquer, or merge and relax_ chapter.

Another issue with the longliner’s approach is that Prettier, with a default print length of 80 characters, will likely make the code ugly and unreadable:

```js
const puppiesByParent = {};
for (const puppy of puppies) {
  if (puppy.parentId) {
    const currentParent = puppies.find(
      currentPuppy => currentPuppy.id === puppy.parentId
    );
    puppiesByParent[currentParent.id] = [
      ...(puppiesByParent[currentParent.id] || []),
      puppy.id
    ];
  }
}
```

The shortliner’s code stays the same.

## Make it easy to remember and use

Some conventions are easy to use, while some are not so much. Let’s compare three popular conventions for _title casing_:

- **Sentence case:** only the first word is capitalized, like in a regular sentence (example: _Breakfast: The most important book about the best meal of the day_).
- **Upper case:** all words are capitalized (example: _Breakfast: The Most Important Book About The Best Meal Of The Day_).
- **AP/APA:** see below (example: _Breakfast: The Most Important Book About the Best Meal of the Day_).

The first two are easy to remember: it’s all or nothing. The last one, however, is not easy at all. Here are the rules of the AP/APA title style (quoted from the [ap-style-title-case](https://github.com/words/ap-style-title-case) package documentation):

- always capitalize the first word, even if it’s a stop word;
- always capitalize the last word, even if it’s a stop word;
- lowercase these words: `a`, `an`, `and`, `at`, `but`, `by`, `for`, `in`, `nor`, `of`, `on`, `or`, `so`, `the`, `to`, `up`, `yet`.

> Many writers make the error of leaving `to be` verbs in lower case. Even though `is`, `are`, `was`, and `be`, are all short words, they should still be capitalized in a title because they are verbs.
>
> When you write titles that contain prepositions, your word processor will likely tell you that you should leave words like `with`, `about`, and `around` lowercase. Defiantly look past the squiggly line indicating a potential error, and remember that in AP title case, prepositions with four or more letters should be capitalized.

This is way too much to remember, and it has too many exceptions to be practical. It breaks in software used by writers, such as Microsoft Word (requiring a special remark). It also doesn’t make text more readable or, to my taste, prettier. While automation could help manage this complexity, the convention doesn’t offer significant enough benefits to justify it. That’s why I use sentence case in all my writing, including in this book.

This is an extreme example of an inconvenient convention. Programmers rarely go to such lengths, but sometimes they try.

One example is [Microsoft .NET naming conventions](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/capitalization-conventions), where they make a special case for two-letter acronyms:

> The PascalCasing convention, used for all identifiers except parameter names, capitalizes the first character of each word (including acronyms over two letters in length), as shown in the following examples: `PropertyDescriptor`, `HtmlTag`.
>
> A special case is made for two-letter acronyms in which both letters are capitalized, as shown in the following identifier: `IOStream`.

I don’t see how this improves anything: `IoStream` is easier to read than `IOStream`, and there’s no need to remember a special rule.

And then even Microsoft couldn’t consistently follow their own guidelines, as we an see with [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).

So, choose the simplest convention, unless more complex rules bring huge benefits. If they do, thoroughly document and automate them.

## Sections, paragraphs, phrases…

In prose writing, we have several tools to make text more scannable (meaning, we don’t need to read it all to find a particular place we need) or separate different ideas. These tools are headings, paragraphs, and emphases (such as bold or italic).

It’s the same when we write code.

_Function declarations_ and _comment blocks_ create distinct _sections_ in the code:

```js
/**
 * Return the range for the:
 * - selection
 * - word + tags under cursor
 * - word under cursor
 */
function getWordRange(pattern) {
  /* … */
}
```

_Empty lines_ further divide the code into _paragraphs_:

```js
function getWordRange(pattern) {
  const editor = window.activeTextEditor;

  if (editor.selection.isEmpty === false) {
    return editor.selection;
  }

  const taggedRange = editor.document.getWordRangeAtPosition(
    editor.selection.start,
    pattern
  );
  if (taggedRange) {
    return taggedRange;
  }

  return editor.document.getWordRangeAtPosition(
    editor.selection.start
  );
}
```

Adding a short comment before each code paragraph is often a good idea:

```js
function getWordRange(pattern) {
  const editor = window.activeTextEditor;

  // If something is selected, return the range of selection
  if (editor.selection.isEmpty === false) {
    return editor.selection;
  }

  // Word is already wrapped in the tags: _tacocat_
  const taggedRange = editor.document.getWordRangeAtPosition(
    editor.selection.start,
    pattern
  );
  if (taggedRange) {
    return taggedRange;
  }

  // Otherwise, return the default range for the word: tacocat
  return editor.document.getWordRangeAtPosition(
    editor.selection.start
  );
}
```

**Info:** Art and design have the concept of [negative space](https://en.wikipedia.org/wiki/Negative_space), which is space between the subjects of an image (known as positive space). In an artwork, negative space is as important as the subject itself. In many artworks, there’s a lot more negative space than positive space. Code also has negative space, which helps us quickly identify particular elements, such as functions, conditions, or loops. This includes the use of whitespace, indentation, and braces.

_Parentheses_ highlight individual _phrases_, and improve readability on the smallest level, for example, in conditions:

```js
if (
  isString(value) &&
  (shouldBeFile(types) || shouldBeDirectory(types))
) {
  /* … */
}
```

Similarly to prose, we can make our code easier to scan — to find a particular place we need, and easier to understand each function; once we fond the right one. I much prefer this approach to splitting code into many small functions.

**Info:** We talk about splitting code into functions in the Divide and conquer, or merge and relax chapter.

## A case for custom formatting

In very rare cases, custom code formatting may improve readability. Here’s an example of an ingredient’s seasonality table, where months are aligned in each row, making it easier to compare different ingredients:

```js
// prettier-ignore
const SEASONS = {
  [`apple`]:        [           Sep                ],
  [`carrot`]:       [ Jul, Aug, Sep, Oct, Nov, Dec ],
  [`garrofó bean`]: [ Jul                          ],
  [`lime`]:         [                     Nov      ],
  // …
};
```

(I removed the first six months of the year to make the lines fit on the page, but the idea should be clear — apple’s September aligns with carrot’s.)

However, the cost of maintaining such formatting usually outweighs the benefits it provides, so in most cases, I stick with autoformatting:

```js
const SEASONS = {
  [`apple`]: [Sep],
  [`carrot`]: [Jul, Aug, Sep, Oct, Nov, Dec],
  [`garrofó bean`]: [Jul],
  [`lime`]: [Nov]
  // …
};
```

**Info:** We talk about code autoformatting in the Autoformat your code chapter.

## To semicolon or not

JavaScript is one of the very few languages that doesn’t require semicolons at the end of each line, but it also doesn’t mind having them. This has sparked countless debates since the 1990s.

Normally, I wouldn’t mind either way, as long as it’s automated. However, there’s one reason I prefer using semicolons in JavaScript: _automatic semicolon insertion_ (ASI). JavaScript tries to guess where to put semicolons when there are none in the code, and sometimes it does it wrong. Here’s a perfect example:

```js
// WARNING: This code is incorrect
function semicolonOrNot() {
  return;
  {
    semi: 'colon';
  }
}
```

Most programmers would expect this function to return an object, but it returns `undefined` because ASI always inserts a semicolon after a stray `return`. The code is interpreted like so:

```js
// WARNING: This code is incorrect
function semicolonOrNot() {
  return;
  {
    semi: 'colon';
  }
}
```

To fix the problem, we need to remove the line break after the `return` statement:

```js
function semicolonOrNot() {
  return {
    semi: 'colon'
  };
}
```

I prefer not to overload my squirrel brain with such silly questions, and I always use semicolons.

Fortunately, _semicolonless_ JavaScript projects are much less common now than they were in the 2000s and 2010s.

## Tabs or spaces

Whether to use tabs or spaces to indent code is one of the oldest programming arguments. I used to advocate for tabs for many years: since tabs are designed for indentation, why use 2 or 4 spaces to mimic them?

However, tooling has improved significantly in recent years, so it no longer matters, as long as we have a linter or autoformatter to handle it automatically. With modern code editors, there’s no difference in developer experience, and most of the time, I don’t even know whether a project uses spaces or tabs.

**Info:** We talk about linters in the Lint your code chapter and about code formatters in Autoformat your code chapter.

## The rest doesn’t matter

There are so many ways to write code. For example, we could use function parameters like this:

```js
function ingredientToString(options) {
  return `${options.name} (${options.quantity})`;
}
```

Or like this:

```js
function ingredientToString(options) {
  const { name, quantity } = options;
  return `${name} (${quantity})`;
}
```

Or like this:

```js
function ingredientToString({ name, quantity }) {
  return `${name} (${quantity})`;
}
```

I prefer the last one for reasons I explain in the Naming is hard chapter, but I wouldn’t ask another developer to change their code just because they use a different approach: they are all fine.

A few more examples are below.

Old-style functions or arrow functions, explicit returns or implicit returns:

```js
function getDropdownOptions(options) {
  return options.map(option => option.value);
}
```

Or:

```js
const getDropdownOptions = options =>
  options.map(option => option.value);
```

Or the same with the default export:

```jsx
const Button = props => <button className="Button" {...props} />;
export default Button;
```

Or:

```jsx
export default function Button(props) {
  return <button className="Button" {...props} />;
}
```

I can probably write a whole book of such examples…

These differences don’t affect readability. The code is just different; no variation is better than another. Even the argument for consistency isn’t strong enough unless we can automate code replacement completely transparently for the developer. Otherwise, the cost of maintaining the convention would be too high.

---

Some programmers become defensive or even angry when promoting their preferred code style. This isn’t the way.

My rule of thumb here is: _automate or forget_. For example, [Prettier](https://prettier.io/) formats code with almost zero config, which saves an enormous amount of time writing code, reading someone else’s code, or discussing code style in a team.

**Info:** We talk about Prettier and code formatting in the Autoformat your code chapter.

Be vigilant when you adapt [a popular code style](https://sapegin.me/blog/javascript-code-styles/): many are too opinionated and want us to write code in a very specific way, even when it doesn’t improve the readability or maintainability of the code or reduce the number of bugs.

I’m very happy that extremely opinionated style guides like [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) or [JavaScript Standard Style](https://standardjs.com/) are now history.

Prefer explicit over implicit; write code to maximize readability, but don’t be too strict with others when they approach it differently.

Start thinking about:

- Does the suggestion I’m about to make in a code review really makes the code more readable and maintainable, or is it just making the code look more familiar to me.
