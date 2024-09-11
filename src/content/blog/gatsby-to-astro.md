---
title: 'Migrating my blog from Gatsby to Astro'
description: 'Recently, I redesigned and rebuilt my site and blog from Gatsby to Astro, and would like to share my experience.'
date: 2023-08-07
tags:
  - tools
  - blog
  - astro
---

Recently, I redesigned and rebuilt [my site and blog](/) from [Gatsby](https://www.gatsbyjs.com/) to [Astro](https://astro.build/). I had a few goals with this rebuild:

- **Move away from Gatsby.** What sounded like a good idea, turned out to be a complete disaster. Probably one of the worst developer experiences I’ve seen (after React Native), with poor defaults, and unnecessary complexity with its GraphQL API.
- **Stop shipping React.** The pages are completely static, and using React to render them in the browser is unnecessary.
- **Merge my homepage and my blog.** The homepage is essentially a single-page site, and it doesn’t make sense to maintain it separately from the blog.
- **Better represent the current me.** The old homepage was focused on my open source projects, which [aren’t an important part of my life](/blog/going-offline/) anymore.

![My homepage, version 2023](/images/sapeginme-2023.webp)

I had, however, a few technical requirements:

- **Keep using React** for templates. Many static site generators still use templates, like Handlebars, which makes them hard to work with. I started using [JSX for templates](/blog/why-fledermaus/) many years ago and then switched to React. This is still my favorite way.
- **Keep using primitive components for styling.** I already have [a component library](https://github.com/tamiadev/tamia) that is based on primitive components (`Box`, `Flex`, `Grid`, `Stack`, and such), and it’s my favorite way of styling sites and apps.

After some experimentation, I settled on Astro and vanilla-extract.

## Astro

[Astro](https://astro.build) is a static site generator that prioritizes performance but also is very flexible. It gives a choice of several UI frameworks to use for templates, including React, Vue, and Svelte. By default, Astro uses generates static HTML pages at built-time, meaning they come with zero client JavaScript, but it also allows adding dynamic sections to static pages.

The developer experience is super nice, especially after Gatsby, and Astro comes with most of the things one may need for building a blog or any other content site: [file-based routing](https://docs.astro.build/en/core-concepts/routing/), [content collections](https://docs.astro.build/en/guides/content-collections/), [Markdown with syntax highlighting](https://docs.astro.build/en/guides/markdown-content/), and much much better [TypeScript support](https://docs.astro.build/en/guides/typescript/). The installation process is much nicer than Gatsby or Next.js. It’s very fast, the docs are comprehensive and well-written.

Probably, the only issue I had so far is that it often [crashes after code changes](https://mastodon.cloud/@sapegin/110626274894320458), but looks like it’s not a common issue but some problem with my environment.

Astro has [its own components](https://docs.astro.build/en/core-concepts/astro-components/) that look like a very basic version of React components mixed with MDX, and we could seamlessly use React components inside Astro components:

<!-- eslint-skip -->

```tsx
---
import Layout from './Layout.astro';
import { PostPage } from '../templates/PostPage';
import type { Post } from '../types/Post';

type Props = Post & { related: Post[] };

const { url, title, description, date, tags, source, related } =
  Astro.props;
---

<Layout url={url} title={title} description={description}>
  <PostPage
    url={url}
    title={title}
    description={description}
    date={date}
    tags={tags}
    source={source}
    related={related}
  >
    <slot />
  </PostPage>
</Layout>
```

In this Astro component, we import another Astro component (`Layout`) and a React component (`PostPage`). The `<slot />` is similar to React’s `children`.

However, my favorite Astro feature is probably [content collections](https://docs.astro.build/en/guides/content-collections/), which allows us to create collections of Markdown or JSON files, type frontmatter fields, and have an API to fetch documents for a collection. Have a look at [a comparison of rendering blog pages](https://gist.github.com/sapegin/675cbbc37ad37f2fcbab7f83ad8e3cb9) in Gatsby and Astro.

## Vanilla-extract

I couldn’t continue using [styled-components](https://styled-components.com/) with Astro if I wanted to ship my site without the React runtime: We can’t use anything with React Context, and styled-components rely on it for theming.

[Vanilla-extract](https://vanilla-extract.style) seems to be a popular choice and solves the problem. It allows one to write zero-runtime styles in JavaScript, supports theming, and has good TypeScript support.

With the [Recipes package](https://vanilla-extract.style/documentation/packages/recipes/) we could create variants, and with the [Sprinkles package](https://vanilla-extract.style/documentation/packages/sprinkles/) we could access design tokens and create responsive styles.

However, vanilla-extract comes with a lot of limitations:

- We need to write styles in a separate `*.css.ts` file.
- We cannot export React components from `*.css.ts` files, only strings containing class names.
- We need to write `className` all the time and use [clsx](https://github.com/lukeed/clsx) to combine class names.
- It’s possible to create primitive components but we could only use known prop values (for example, we could write `<Flex alignItems="center">` but not `<Flex maxWidth={640}>` or `<Grid gridTemplateColumns="auto 1fr auto">`).
- Not enough reusable types, which leads to copypasting types from vanilla-extract.
- Nonsensical limitations like selectors can only target one element and can’t use a global class name, which produces convoluted unreadable, and hard-to-maintain styles in some cases.
- Leaking abstractions, for example, one could use Sprinkles in local styles but not in global ones. I know why these limitations exist but I need to know how the tool works inside to be able to use it, and think about it every time I write styles.

Overall, it feels like a huge step back in time for some 10 years or so. The developer experience feels similar to CSS Modules, though, with better types.

I found that the colocation and component model of styled-components are easier to use and maintain. I prefer to keep styles in the same file as my components and access them as components instead of keeping styles in separate files and working with CSS class names.

Vanilla-extract may work for a simple static site, like a personal blog, but I wouldn’t recommend it for a large app with a big team.

Here’s what I’d write using styled-components:

```tsx
// Hola.tsx
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { Box, Stack, Heading, IconCoffee } from '.';

type Props = {
  children: ReactNode;
};

const Name = styled.span({
  fontSize: 'clamp(2.6rem, 7vw, 4rem)',
  background: props =>
    `linear-gradient(${props.theme.colors.hover}, ${props.theme.colors.primary})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
});

export function Hola({ children }: Props) {
  return (
    <Heading level={1}>
      <Stack
        as="span"
        display="inline-flex"
        direction="row"
        gap="s"
        alignItems="baseline"
      >
        <Name>{children}</Name>
        <Box as="span" mt={-6}>
          <IconCoffee />
        </Box>
      </Stack>
    </Heading>
  );
}
```

And here’s what it looks like with vanilla-extract:

```tsx
// Hola.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';

export const name = style({
  fontSize: 'clamp(2.6rem, 7vw, 4rem)',
  background: `linear-gradient(${vars.colors.hover}, ${vars.colors.primary})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
});

export const icon = style({
  marginTop: -6
});

// Hola.tsx
import type { ReactNode } from 'react';
import { Stack, Heading, IconCoffee } from '.';
import { name, icon } from './Hola.css';

type Props = {
  children: ReactNode;
};

export function Hola({ children }: Props) {
  return (
    <Heading level={1}>
      <Stack
        as="span"
        display="inline-flex"
        direction="row"
        gap="s"
        alignItems="baseline"
      >
        <span className={name}>{children}</span>
        <span>
          <IconCoffee className={icon} />
        </span>
      </Stack>
    </Heading>
  );
}
```

The only thing I like more in the vanilla-extract version is accessing design tokens (theme) using an import instead of a function. We could do the same with styled-components, if we don’t need contextual styling (changing the theme for part of the app, for example, having a sign-up form with dark background).

I created [a light version of my React component library](https://github.com/sapegin/sapegin.me/tree/master/src/tamia), so I could create layouts without writing custom CSS:

```tsx
export function Menu({ current }: Props) {
  return (
    <Grid
      as="ul"
      columnGap="m"
      rowGap={{ mobile: 0, tablet: 'm' }}
      justifyItems="center"
      className={menu}
    >
      {ITEMS.map(({ title, href, alt }, index) => (
        <Fragment key={href}>
          {index === HALF && (
            <Box
              as="li"
              aria-hidden="true"
              display={{ mobile: 'none', tablet: 'block' }}
            />
          )}
          <Text as="li" variant="menu">
            <Link
              href={href}
              className={clsx(
                link,
                isCurrent(href, current) && active
              )}
              title={alt}
              aria-label={alt}
            >
              {title}
            </Link>
          </Text>
        </Fragment>
      ))}
    </Grid>
  );
}
```

Here, I’m using `Grid` and `Box` primitive components to create a responsive layout for a site menu.

And I think I changed my mind about responsive props, and now I prefer objects over arrays:

```tsx
<Stack direction={{ mobile: 'column', tablet: 'row' }}>…</Stack>
```

```tsx
<Stack direction={['column', null, 'row']}>…</Stack>
```

Both require some learning and getting used to but the object notation now feels more readable to me. Vanilla-extract supports both.

## Conclusion

I’ll definitely use Astro again, and going to rebuild at least [my photo gallery](/photos/) and possibly [our recipe site](https://tacohuaco.co/) from Gatsby to Astro.

I wish there was a better way to work with styles. Vanilla-extract does the job but the developer experience is far from great. [Let me know](https://mastodon.cloud/@sapegin), if I’m missing anything!

And have a look at [the site’s source code](https://github.com/sapegin/sapegin.me) on GitHub.
