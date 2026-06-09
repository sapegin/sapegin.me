---
title: 'Accessible inline list with bullets between items'
description: 'Making lists with bullets between items (like · this · one) accessible can be surprisingly hard.'
date: 2019-07-19
tags:
  - css
  - html
  - accessibility
---

I had a list like this on [my site](/) for a long time:

<p style="text-align:center">Pizza · Döner · Kaffee</p>

Until I’ve tried it in a screen reader and realized that a screen reader reads pseudo elements (`::before` and `::after`) content that I was using to implement bullets.

A screen reader will read something like “Pizza MIDDLE DOT Döner MIDDLE DOT Kaffee”. Not good. Let’s try to fix it.

## Wrong solution: text in pseudo elements

This is my original solution with a bullet character in a `::before` pseudo element and adjacent sibling selector to show it only between elements, not in front of each element:

```css
li + li::before {
  content: ' · ';
}
```

[Demo on CodePen](https://codepen.io/iamsapegin/pen/ZgYprX)

**Pros.** Simple.

**Cons.** Not accessible. Screen readers will pronounce each bullet as _middle dot_ or something similar.

## Right solution: markup

A naïve solution to accessibility problems could be moving bullets to the markup and wrapping them with `aria-hidden="true"`:

```html
<ul>
  <li>Pizza <span aria-hidden="true"> · </span></li>
  <li>Döner <span aria-hidden="true"> · </span></li>
  <li>Kaffee</li>
</ul>
```

[Demo on CodePen](https://codepen.io/iamsapegin/pen/RXNGqb)

**Pros.** works fine in screen readers.

**Cons.** I don’t like keeping things like list bullets in the markup if I can avoid that, but to use a text character as a bullet, this may be your only solution.

## Right solution: image or CSS in pseudo elements

This is my final solution. It’s based on the initial, wrong, solution with pseudo element, but uses graphics for bullets. It can be CSS for simple shapes, like a circle or an arrow, or SVG for more complex shapes.

I have just a circle, so I’m using CSS:

```css
ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
li + li::before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  margin: 0 0.5ch;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: currentColor;
}
```

I’ve added `display: flex` to the `ul` to make it independent from possible whitespace in HTML.

[Demo on CodePen](https://codepen.io/iamsapegin/pen/wVBzZo)

**Pros.** works fine in screen readers, clean markup.

**Cons.** a lot more CSS. Need to draw a bullet using CSS or SVG.

## Conclusion

Both solutions don’t look great on small screens, when items can’t fit on a single line. I don’t know a _perfect_ way to this, so consider it a homework. [Let me know](https://twitter.com/iamsapegin) if you have find something good.

This case is a good reminder for us to be more mindful about [accessibility of our sites and apps](https://web.dev/accessible). We should do at least [the basic accessibility testing](https://daverupert.com/2018/07/assistive-technologies-i-test-with/) and don’t always trust our intuition, like I did with this list, was wrong, and shipped inaccessible feature to production.
