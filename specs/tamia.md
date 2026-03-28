# Tâmia → Tailwind v4 Migration Plan

Source: https://github.com/sapegin/tamia

Target: `src/packages/tamia/` in this repository.

---

## 1. What Tâmia Becomes

A **CSS-only shared Tailwind v4 theme** (no JS runtime, no Panda dependency) consisting of:

| File | Purpose |
| --- | --- |
| `theme.css` | `@theme` block with design tokens (colors, fonts, spacing, etc.) |
| `base.css` | `@layer base` — CSS reset + global styles |
| `components.css` | `@layer components` — prose, link, quoted-link, button, input, etc. |
| `utilities.css` | `@utility` blocks — grid-auto-narrow/wide, expander |
| `index.css` | entry point |

Consumer entry point:

```css
@import 'tailwindcss';
@import '../../packages/tamia/index.css';
```

---

## 2. Theme Tokens (`theme.css`)

Map every Panda token to a Tailwind v4 `@theme` variable. Per-site overrides are done by re-declaring variables in a site-level `@theme` block after the import.

```css
@theme {
  /* ---- Colors (light defaults) ---- */
  --color-text: #222;
  --color-background: #fff;
  --color-primary: #6e56ba;
  --color-accent: #d396c3;
  --color-border: #ddd;
  --color-selection: #faebaf;
  --color-secondary: #75757c;

  /* ---- Fonts ---- */
  --font-body: system-ui, sans-serif;
  --font-heading: system-ui, sans-serif;
  --font-code: ui-monospace, SFMono-Regular, Menlo, monospace;

  /* ---- Font sizes ---- */
  --text-xs: 0.75rem;
  --text-s: 0.9rem;
  --text-m: 1rem;
  --text-l: 2rem;
  --text-xl: 3rem;

  /* ---- Font weights ---- */
  --font-weight-normal: 400;
  --font-weight-heading: 300;
  --font-weight-bold: 800;

  /* ---- Line heights ---- */
  --leading-base: 1.5;
  --leading-heading: 1.1;
  --leading-code: 1.3;

  /* ---- Spacing ---- */
  --spacing-xxs: 0.125rem;
  --spacing-xs: 0.25rem;
  --spacing-s: 0.5rem;
  --spacing-m: 1rem;
  --spacing-l: 2rem;
  --spacing-xl: 4rem;
  --spacing-xxl: 8rem;
  --spacing-xxxl: 16rem;

  /* ---- Semantic spacing ---- */
  --spacing-block-margin: 1rem;
  --spacing-heading-margin-top: 2rem;
  --spacing-list-margin: 1.3em;
  --spacing-content-padding-x: 1rem;

  /* ---- Sizes ---- */
  --size-text-max-width: 45rem;

  /* ---- Radii ---- */
  --radius-base: 0.25em;
  --radius-button: 0.25em;
  --radius-round: 99999em;

  /* ---- Borders ---- */
  --border-width-focus: 3px;
  --border-width-focus-offset: 2px;

  /* ---- Transitions ---- */
  --ease-fade: ease-out;
  --ease-hover: ease-in;
  --duration-fade: 0.15s;
  --duration-hover: 0.1s;

  /* ---- Breakpoints ---- */
  --breakpoint-tablet: 48rem;
  --breakpoint-desktop: 62rem;
}
```

### Dark mode

Light values are the defaults in `@theme`. Dark overrides use a standard media query on `:root` — since `@theme` compiles to `:root` variables, the override naturally takes precedence in dark mode.

The consumer site defines dark overrides after importing the theme:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #e3e6e8;
    --color-background: #2e3033;
    --color-primary: #89abd2;
    /* ... */
  }
}
```

### Per-site overrides

A site simply re-declares the variables it wants to change:

```css
/* sites/sapegin.me/styles/app.css */
@import 'tailwindcss';
@import '../../../packages/tamia/theme.css';

@theme {
  --font-heading: 'Mondwest-Regular', sans-serif;
  --font-body: 'Helvetica Neue', Arial, sans-serif;
  --color-primary: #577290;
  --text-xxxl: 3.2rem;
  --text-xxl: 2.4rem;
}
```

---

## 3. CSS Reset & Global Styles (`base.css`)

**Use Tailwind preflight** (included by default with `@import "tailwindcss"`). Only add overrides for Tâmia-specific reset rules that preflight doesn't cover.

Consumer entry point uses standard `@import "tailwindcss"` — preflight is included automatically.

Then `base.css` contains only the **delta** on top of preflight:

```css
@layer base {
  html {
    font-size: var(--text-m);
    font-family: var(--font-body);
    color: var(--color-text);
    background-color: var(--color-background);
    line-height: var(--leading-base);
    word-wrap: break-word;
    text-rendering: optimizeSpeed;
    font-kerning: normal;
    font-feature-settings: 'kern', 'liga', 'clig', 'calt';
    -webkit-text-size-adjust: 100%;
    hyphens: auto;
  }

  /* Smooth scroll with reduced-motion guard */
  @media (prefers-reduced-motion: no-preference) {
    html {
      scroll-behavior: smooth;
    }
  }

  body {
    min-height: 100vh;
  }

  a {
    hyphens: none;
  }

  /* Monospace digits in tables */
  table {
    font-feature-settings: 'tnum';
  }

  /* Abbreviation spacing */
  abbr {
    letter-spacing: 0.1em;
    margin-right: -0.1em;
  }
  abbr,
  acronym {
    border-bottom: 0;
    cursor: default;
  }

  /* Do NOT globally remove list-style: Safari/VoiceOver strips list
     semantics from ul/ol with list-style:none. Use Tailwind's list-none
     class explicitly where needed; .prose handles its own list styling
     via ::before pseudo-elements. */

  /* Remove default borders */
  iframe,
  fieldset {
    border: 0;
  }

  /* Text selection */
  ::selection {
    color: var(--color-text);
    background-color: var(--color-selection);
    text-shadow: none;
  }

  /* Print styles */
  @media print {
    @page {
      margin: 0.5cm 1cm;
    }
    :is(header, footer, nav) {
      display: none;
    }
    * {
      font-family: Georgia, serif;
      color: #000 !important;
      background: transparent !important;
    }
    :is(h1, h2, h3, h4, h5, h6) {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      page-break-inside: avoid;
      page-break-after: avoid;
    }
    :is(p, blockquote, ul, ol, dl, tr, img) {
      page-break-inside: avoid;
    }
    :is(p, h2, h3) {
      orphans: 3;
      widows: 3;
    }
  }
}
```

**What preflight already handles** (no need to redefine): `box-sizing: border-box`, `margin: 0`, `img/svg/video display: block`, `textarea resize: vertical`, `border-style: solid` defaults.

---

## 4. Component Migration Matrix

### 4.1 Eliminate — Replace with Tailwind classes directly

These components become plain HTML + class names. No component file needed.

| Component | Replacement |
| --- | --- |
| `Box` | `<div className="...">` — polymorphic `as` can become an Astro/React slot or just the right element |
| `Flex` | `<div className="flex ...">` |
| `Stack` | `<div className="flex flex-col gap-m ...">` |
| `VisuallyHidden` | `<span className="sr-only">` |
| `Image` | `<img className="max-w-full h-auto" loading="lazy">` |
| `Expander` | `<div className="expander">` (see custom utility below) |
| `Heading` | `<h1 className="heading-1">`, `<h2 className="heading-2">`, `<h3 className="heading-3">` — separate HTML element from visual style |
| `Text` | `<p className="typo-body">`, `<p className="typo-small">`, `<span className="typo-menu">`, etc. |
| `Frame` | `<div className="frame aspect-[9/6]">` — uses Tailwind's built-in `aspect-*` classes |
| `List` | `<ol className="flex flex-col gap-m list-none">` |
| `FullWidth` | `<div className="w-screen ml-[calc(50%-50vw)]"><div className="max-w-[1200px] mx-auto">` |

### 4.2 Custom Utilities (`utilities.css`)

These become `@utility` definitions — usable as single classes with full variant support.

```css
/* Grid auto-layout */
@utility grid-auto-narrow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
@utility grid-auto-wide {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

/* Full-bleed on mobile */
@utility expander {
  margin-inline: calc(var(--spacing-content-padding-x) * -1);
  @media (width >= 48rem) {
    margin-inline: 0;
  }
}

/* ---- Headings ---- */
/* Base heading styles shared by all levels */
@utility heading {
  color: var(--color-text);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heading);
  line-height: var(--leading-heading);
}
/* Per-level size variants (combine with heading base) */
@utility heading-1 {
  color: var(--color-text);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heading);
  line-height: var(--leading-heading);
  font-size: var(--text-xl);
}
@utility heading-2 {
  color: var(--color-text);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heading);
  line-height: var(--leading-heading);
  font-size: var(--text-l);
}
@utility heading-3 {
  color: var(--color-text);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heading);
  line-height: var(--leading-heading);
  font-size: var(--text-m);
  font-style: italic;
}

/* ---- Typography presets ---- */
@utility typo-body {
  font-family: var(--font-body);
  font-size: var(--text-m);
  font-weight: var(--font-weight-normal);
  line-height: var(--leading-base);
  color: var(--color-text);
}
@utility typo-bold {
  font-family: var(--font-body);
  font-size: var(--text-m);
  font-weight: var(--font-weight-bold);
  line-height: var(--leading-base);
  color: var(--color-text);
}
@utility typo-small {
  font-family: var(--font-body);
  font-size: var(--text-s);
  font-weight: var(--font-weight-normal);
  line-height: var(--leading-base);
  color: var(--color-text);
}
@utility typo-large {
  font-family: var(--font-body);
  font-size: var(--text-l);
  font-weight: var(--font-weight-normal);
  line-height: var(--leading-heading);
  color: var(--color-text);
}
/* Sites add their own typo-* variants (e.g. typo-menu, typo-intro, typo-flag) */

/* ---- Frame: aspect-ratio container with cover children ---- */
@utility frame {
  & > :is(img, video) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
```

Usage:

- **Grid**: `<div className="grid-auto-narrow gap-m">`
- **Heading**: `<h2 className="heading-2">` (decoupled from HTML element — can use `heading-1` on an `h2` if needed)
- **Text**: `<p className="typo-body">`, `<span className="typo-small">`
- **Frame**: `<div className="frame aspect-[9/6]">` (combine with Tailwind's `aspect-*`)

### 4.3 CSS Component Classes (`components.css`)

These are complex style recipes that use descendant selectors or pseudo-elements. Defined in `@layer components` as CSS classes.

#### `.link` — Styled anchor

```css
@layer components {
  .link {
    padding: 0;
    background: none;
    border: 0;
    font: inherit;
    line-height: inherit;
    text-decoration: underline;
    color: var(--color-primary);
    transition: all var(--duration-hover) var(--ease-hover);

    &:visited {
      color: var(--color-primary);
    }
    &:hover:not(:disabled) {
      color: var(--color-accent);
      cursor: pointer;
    }
    &:focus-visible {
      outline: var(--border-width-focus) solid var(--color-accent);
      outline-offset: var(--border-width-focus-offset);
      border-radius: 0.05em;
    }
  }
}
```

Usage: `<a className="link" href="...">` — no React component needed.

#### `.quoted-link` — Selective underline

```css
@layer components {
  .quoted-link {
    text-decoration: none;
    color: inherit;
    transition: all var(--duration-hover) var(--ease-hover);

    & u {
      color: var(--color-primary);
      text-decoration: underline;
    }
    &:hover u {
      color: var(--color-accent);
    }
    &:focus-visible {
      outline: var(--border-width-focus) solid var(--color-accent);
      outline-offset: var(--border-width-focus-offset);
      border-radius: 0.05em;
    }
  }
}
```

Usage: `<a className="quoted-link" href="..."><u>Link text</u> context</a>` — no React component needed.

#### `.prose` — Rich text content container

Port the `textContent` pattern (~180 lines) as a `.prose` class. This is the most complex piece. Unlike `@tailwindcss/typography`, we maintain full control and match existing Tâmia behavior exactly.

Key sections to port (all using CSS custom properties from theme):

```css
@layer components {
  .prose {
    font-family: var(--font-body);
    font-weight: var(--font-weight-normal);
    line-height: var(--leading-base);

    /* Block margin */
    &
      :is(
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        ul,
        ol,
        dl,
        dd,
        p,
        pre,
        table,
        blockquote,
        form,
        iframe,
        img,
        hr,
        address
      ) {
      margin-bottom: var(--spacing-block-margin);
    }

    /* Max reading width */
    & :is(h1, h2, h3, h4, h5, h6, p, li, blockquote) {
      max-width: var(--size-text-max-width);
    }

    /* Links */
    & a {
      color: var(--color-primary);
      text-decoration: underline;
    }
    & a:hover {
      color: var(--color-accent);
      cursor: pointer;
    }
    & a:focus-visible {
      /* focus ring */
    }

    /* Headings */
    & :is(h1, h2, h3, h4, h5, h6) {
      margin-top: var(--spacing-heading-margin-top);
      font-family: var(--font-heading);
      line-height: var(--leading-heading);
      font-weight: var(--font-weight-heading);
      text-wrap: balance;
    }
    & h1 {
      font-size: var(--text-xxl);
    }
    & h2 {
      font-size: var(--text-xl);
    }
    & h3 {
      font-size: var(--text-l);
    }
    /* ... h4–h6, collapse rules ... */

    /* Lists: unordered with em-dash bullets */
    & ul > li {
      position: relative;
      padding-left: var(--spacing-list-margin);
    }
    & ul > li::before {
      content: '\2014\a0';
      position: absolute;
      left: 0;
    }
    /* ... ordered lists with hanging markers ... */

    /* Tables */
    & table {
      font-size: var(--text-s);
      border-collapse: collapse;
      width: 100%;
    }
    /* ... thead, td, th ... */

    /* Blockquotes */
    & blockquote {
      margin-inline: var(--spacing-l);
      font-size: var(--text-s);
    }

    /* Responsive full-bleed images */
    & :is(p > img, figure > img) {
      height: auto;
      max-width: calc(100% + var(--spacing-content-padding-x) * 2);
      margin-inline: calc(var(--spacing-content-padding-x) * -1);
      @media (width >= 48rem) {
        max-width: 100%;
        margin-inline: auto;
      }
    }

    /* Inline code */
    & :is(h1, h2, h3, h4, h5, h6, p, li, table) :is(code, kbd) {
      font-family: inherit;
      font-style: italic;
      hyphens: none;
    }

    /* Clean last-child margin */
    & > *:last-child {
      margin-bottom: 0;
    }
  }

  /* Prose variants (modifier classes) */
  .prose-small p {
    font-size: var(--text-s);
  }
  .prose-intro p {
    font-size: var(--text-l);
    font-style: italic;
  }
}
```

Usage: `<div className="prose">` or `<div className="prose prose-intro">` — no React component needed unless variant logic is desired.

#### `.input` — Text input

```css
@layer components {
  .input {
    display: block;
    width: 100%;
    height: 2rem;
    margin: 0;
    padding: var(--spacing-m);
    border: 1px solid var(--color-primary);
    border-radius: var(--radius-button);
    font-family: var(--font-body);
    font-size: var(--text-m);
    color: var(--color-text);
    background-color: var(--color-background);
    box-shadow: none;

    &:focus-visible {
      /* focus ring */
    }
    &:disabled {
      opacity: 0.6;
      filter: saturate(60%);
    }
  }
}
```

Usage: `<input className="input">` — no React component needed.

### 4.4 Keep as React Components (copy-paste, shadcn-style)

These must stay as components because they have **complex JS behavior or site-specific rendering logic**. They are provided as copy targets in `src/packages/tamia/components/`, but each project copies and adapts them.

| Component | Why it stays | Notes |
| --- | --- | --- |
| `Button` | Variant logic + Pixel decoration children (site-specific pixel art corners on sapegin.me) | Very site-specific; each site will have its own Button |
| `OrderedList` | CSS counter-based numbering via `::before` | Provide as CSS class + thin component wrapper |
| `IconBase` | SVG `viewBox` normalization, `aria-hidden`, `preserveAspectRatio` defaults | Pure utility component, no styling dependency |

---

## 5. File Structure

```
src/packages/tamia/
├── index.css          # entry point
├── theme.css          # @theme design tokens
├── base.css           # @layer base — delta on top of Tailwind preflight
├── components.css     # @layer components — prose, link, quoted-link, input
├── utilities.css      # @utility — grid-auto-*, expander, heading-*, typo-*, frame
├── variants.css       # @custom-variant — hover-enabled, pointer-fine
├── components/        # Copy-paste React components (shadcn-style)
│   ├── Button.tsx
│   ├── OrderedList.tsx
│   └── IconBase.tsx
└── Readme.md
```

---

## 6. Migration Steps

### Step 1: Create the CSS package

1. Create `src/packages/tamia/theme.css` with all design tokens
2. Create `src/packages/tamia/base.css` with overrides on top of Tailwind preflight
3. Create `src/packages/tamia/components.css` with `.prose`, `.link`, `.quoted-link`, `.input`
4. Create `src/packages/tamia/utilities.css` with `@utility` definitions (grid-auto-_, expander, heading-_, typo-\*, frame)
5. Create `src/packages/tamia/variants.css` with custom variants
6. Create `src/packages/tamia/index.css` with imports of all previous CSS files

### Step 2: Create component templates

6. Create `src/packages/tamia/components/Button.tsx` (minimal base — site-specific decorations are added per project)
7. Create `src/packages/tamia/components/OrderedList.tsx`
8. Create `src/packages/tamia/components/IconBase.tsx`

### Step 3: Migrate sapegin.me

12. Install `tailwindcss` and `@tailwindcss/vite`
13. Create `src/styles/app.css` importing Tâmia + site overrides + font-face declarations
14. Update `astro.config.mjs` to use Tailwind Vite plugin
15. Replace Panda pattern/component usages file-by-file:
    - `Flex` → `<div className="flex ...">`
    - `Stack` → `<div className="flex flex-col gap-...">`
    - `Box` → plain elements with Tailwind classes
    - `VisuallyHidden` → `<span className="sr-only">`
    - `Image` → `<img className="max-w-full h-auto">`
    - `Link` → `<a className="link">`
    - `QuotedLink` → `<a className="quoted-link">`
    - `TextContent` → `<div className="prose">`
    - `Grid` → `<div className="grid-auto-narrow gap-m">`
    - `Expander` → `<div className="expander">`
    - `Heading` → `<h1 className="heading-1">`, `<h2 className="heading-2">`, etc.
    - `Text` → `<p className="typo-body">`, `<span className="typo-small">`, etc.
    - `Frame` → `<div className="frame aspect-[9/6]">`
    - `Button` → copy and adapt from component template
16. Remove `panda.config.ts`, `styled-system/`, `@pandacss/dev` dependency

### Step 4: Cleanup

17. Remove Panda CSS dependencies from `package.json`
18. Remove `postcss.config.cjs` (or update for `@tailwindcss/postcss`)
19. Delete `styled-system/` directory
20. Update `.gitignore`

---

## 8. Typography Strategy

Typography is the area with the most per-site variation. The strategy:

1. **Theme tokens define the scale** — sizes, weights, line-heights, letter-spacings are all CSS variables in `@theme`. Each site overrides only what it needs.

2. **`.prose` handles article content** — a single class for all user-generated/markdown content. Sites customize by overriding the theme variables that `.prose` references (e.g., `--font-heading`, `--text-xl`, `--spacing-block-margin`).

3. **`@utility typo-*` for UI text** — each preset (body, bold, small, large) is a standalone `@utility`. Sites add their own variants (e.g., `typo-menu`, `typo-intro`) by defining additional `@utility` blocks in their site-level CSS.

4. **`@utility heading-*` for headings** — each level (1, 2, 3) is a standalone `@utility`. The HTML element (`h1`, `h2`, etc.) is chosen independently of the visual style class, allowing flexibility (e.g., an `h2` that looks like a `heading-1`).

5. **No `@tailwindcss/typography`** — we use our own `.prose` class because Tâmia's prose styling (em-dash bullets, full-bleed images, hanging list markers, heading weight 300) diverges significantly from the plugin's defaults. Maintaining our own is simpler than fighting the plugin's opinions.

---

## 9. Dependency Changes

### Remove

- `@pandacss/dev`
- `tamia` (npm package)

### Add

- `tailwindcss` (^4.0)
- `@tailwindcss/vite` (for Astro's Vite integration)

---

## 10. Risks & Mitigations

| Risk | Mitigation |
| --- | --- |
| Token naming mismatch between `@theme` variable names and Tailwind utility classes | Establish naming convention early; document the mapping |
| Dark mode overrides live outside `@theme` | Simple `:root` media query override; well-understood CSS pattern |
| `.prose` is large and complex | Port section by section, test with real article content |
| Tailwind v4 is relatively new | Pin version; avoid bleeding-edge features beyond what's documented |
| Button is extremely site-specific (pixel art corners) | Accept that Button is never truly shared; provide only a minimal base |
