# Astro Multi-Site Consolidation Plan

This document outlines a step-by-step migration of existing projects into a single Astro repository with per-site `srcDir` switching and Tailwind v4 CSS configuration.

Target repository (monorepo-in-a-single-package): https://github.com/sapegin/sapegin.me

---

# 1. Goals

- Consolidate multiple sites into a **single Astro instance**
- Avoid monorepo complexity (no workspaces/packages)
- Keep **full design separation per site**
- Share:
  - utilities
  - low-level components
  - styles (via Tâmia)
- Use **Tailwind v4 CSS-based configuration**
- Enable **per-site build via `SITE` env variable**

---

# 2. Target Structure

```
/src
  /sites
    /sapegin.me
    /morning.photos
    /tacohuaco
  /shared
  /components
  /utils
  /styles
  /packages
    /tamia   (Tailwind v4 theme)
/scripts
/astro.config.mjs
/package.json
```

---

# 3. Migration Order

1. Convert Tâmia → Tailwind v4 theme (DONE)
2. Prepare Astro "monorepo" switching
3. Migrate sapegin.me
4. Migrate morning.photos
5. Migrate tacohuaco
6. Extract shared code
7. Implement Obsidian sync pipeline
8. Cleanup and unify workflows

---

# 4. Step 1 — Base Astro Setup

## 4.1 Install

- Astro
- Tailwind v4 (via Vite plugin)

## 4.2 Dynamic `srcDir`

```js
import { defineConfig } from 'astro/config';

const SITE = process.env.SITE || 'sapegin.me';

export default defineConfig({
  srcDir: `./sites/${SITE}`
});
```

## 4.3 Scripts

```json
{
  "scripts": {
    "dev:sapegin": "SITE=sapegin.me astro dev",
    "dev:morning": "SITE=morning.photos astro dev",
    "dev:tacohuaco": "SITE=tacohuaco astro dev",

    "build:sapegin": "SITE=sapegin.me astro build",
    "build:morning": "SITE=morning.photos astro build",
    "build:tacohuaco": "SITE=tacohuaco astro build",

    "sync": "node scripts/sync-content.ts"
  }
}
```

---

# 5. Step 2 — Convert Tâmia to Tailwind v4 Theme

Source: [https://github.com/sapegin/tamia](https://github.com/sapegin/tamia)

## 5.1 Remove abstraction components

Remove:

- Flex
- Heading
- Link

Replace with:

- Tailwind utilities
- or CSS component classes

---

## 5.2 Theme entry

```
/packages/tamia/theme.css
```

```css
@import 'tailwindcss';

@theme {
  --font-body: system-ui;
  --color-primary: oklch(60% 0.15 250);
  --radius-base: 0.5rem;
}
```

---

## 5.3 Component layer

```css
@layer components {
  .btn {
    @apply inline-flex items-center justify-center rounded-md px-4 py-2;
    background: var(--color-primary);
  }

  .heading-1 {
    @apply text-3xl font-bold;
  }
}
```

---

## 5.4 Customization per site

```css
@theme {
  --color-primary: oklch(70% 0.2 20);
}
```

---

## 5.5 Usage

```css
@import '../../../packages/tamia/theme.css';
```

---

# 6. Step 3 — Migrate sapegin.me

- Move code to `/sites/sapegin.me`
- Replace styling with Tailwind + Tâmia
- Add:

```
/sites/sapegin.me/styles/app.css
```

```css
@import 'tailwindcss';
@import '../../../packages/tamia/theme.css';
```

- Import in layout:

```astro
import '../styles/app.css';
```

---

# 7. Step 4 — Migrate morning.photos

- Move to `/sites/morning.photos`
- Repeat same setup
- Focus on image-heavy layouts

---

# 8. Step 5 — Migrate tacohuaco

- Move to `/sites/tacohuaco`
- Keep branding-specific components
- Override theme variables

---

# 9. Step 6 — Shared Code

```
/shared
```

Move:

- utilities
- generic components

Avoid:

- design-specific code

---

# 10. Step 7 — Tailwind v4 IntelliSense (VSCode)

```json
{
  "tailwindCSS.experimental.configFile": {
    "sites/sapegin.me/**": "sites/sapegin.me/styles/app.css",
    "sites/morning.photos/**": "sites/morning.photos/styles/app.css",
    "sites/tacohuaco/**": "sites/tacohuaco/styles/app.css"
  }
}
```

---

# 11. Step 8 — Obsidian Content Sync

## 11.1 Source vault structure

```
/🌐 Sites
  /sapegin.me
  /morning.photos
  /tacohuaco
```

---

## 11.2 Monorepo target

```
/sites/<site>/content
```

---

## 11.3 Publishing flag

```md
---
publish: true
slug: my-article
---
```

---

## 11.4 Sync script

```
/scripts/sync-content.ts
```

### Responsibilities

#### 1. Scan vault

- Traverse all site folders

#### 2. Filter

- `.md` files only
- `publish: true`

#### 3. Transform

- Ensure slug
- Normalize frontmatter

#### 4. Copy files

```
vault → repo/sites/<site>/content
```

---

## 11.5 Assets

### Detect

- `![[image.png]]`
- standard Markdown images

### Copy

```
→ /content/assets/
```

### Rewrite

```
![[image.png]]
→
![image](./assets/image.png)
```

---

## 11.6 Deletion

- Remove files no longer published
- Use manifest or diff

---

## 11.7 Idempotency

- Safe repeated runs
- deterministic output

---

## 11.8 CLI

```bash
npm run sync
```

Optional:

```bash
node scripts/sync-content.ts --site sapegin.me --dry-run
```

---

## 11.9 Dev workflow

```bash
npm run sync
npm run dev:sapegin
```

---

## 11.10 CI / Netlify

```bash
npm run sync
npm run build:sapegin
```

---

## 11.11 Generated content rule

Do not edit:

```
/sites/*/content
```

Optional header:

```md
<!-- GENERATED FILE - DO NOT EDIT -->
```

---

## 11.12 Edge cases

- duplicate filenames → use slug
- large images → optional optimization
- broken links → validate during sync

---

## 11.13 Optional improvements

- incremental sync
- hashing
- image optimization
- Obsidian preview integration

---

# 12. Deployment

Each site builds independently:

```bash
SITE=morning.photos astro build
```

Deploy:

- Netlify
- Vercel
- etc.

---

# 13. Future Plan — Obsidian-first Publishing

- Replace:
  - Hygraph
  - local Markdown sources

With:

- single Obsidian vault

Benefits:

- local-first workflow
- no CMS dependency
- unified content system

---

# 14. Risks

- Tailwind v4 requires proper CSS imports
- content sync complexity
- Obsidian syntax handling
- need discipline around `publish`

---

# 15. Final State

- Single Astro repository
- Multiple isolated sites
- Shared Tailwind v4 theme (Tâmia)
- Deterministic content pipeline
- Obsidian as source of truth
