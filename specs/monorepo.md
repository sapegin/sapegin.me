# Astro Multi-Site Consolidation Plan

This document outlines a step-by-step migration of existing projects into a single Astro repository with per-site `root` switching and Tailwind v4 CSS configuration.

Target repository (monorepo-in-a-single-package): https://github.com/sapegin/sapegin.me

---

# 1. Goals

- Consolidate multiple sites into a **single repository** with per-site Astro instances
- Avoid monorepo complexity (no workspaces/packages)
- Keep **full design separation per site**
- Share:
  - utilities
  - low-level components
  - styles (via Tâmia)
- Use **Tailwind v4 CSS-based configuration**
- Enable **per-site build via `--root` flag**

---

# 2. Target Structure

```
/sites
  /sapegin.me
    /components
    /layouts
    /pages
    /styles
    /templates
    /types
    /util
    /public            (static assets)
    astro.config.mjs   (per-site, imports shared base config)
    content.config.ts
    constants.ts
    env.d.ts
    .astro/            (auto-generated types, gitignored)
  /morning.photos
    astro.config.mjs
    ...
/content              (all content lives here)
  /blog
  /photos
  ...
/shared
  /components
  /packages
    /tamia             (Tailwind v4 theme)
  /remark
  /rehype
  /util
  astro.config.base.mjs  (shared Astro config)
/scripts
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

## 4.2 Per-site `root` via `--root` flag

Each site has its own `astro.config.mjs` that imports a shared base config:

```js
// sites/sapegin.me/astro.config.mjs
import {
  defineConfig,
  getBaseConfig
} from '../../shared/astro.config.base.mjs';

export default defineConfig({
  ...getBaseConfig({ site: 'sapegin.me' })
  // site-specific overrides here
});
```

Astro generates `.astro/` (content types, `content.d.ts`) inside each site's root — no regeneration needed when switching sites.

## 4.3 Scripts

```json
{
  "scripts": {
    "dev:sapegin": "astro dev --root ./sites/sapegin.me",
    "dev:morning": "astro dev --root ./sites/morning.photos",
    "dev:tacohuaco": "astro dev --root ./sites/tacohuaco",

    "build:sapegin": "astro build --root ./sites/sapegin.me",
    "build:morning": "astro build --root ./sites/morning.photos",
    "build:tacohuaco": "astro build --root ./sites/tacohuaco",

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
@import '../../shared/packages/tamia/theme.css';
```

---

# 6. Step 3 — Migrate sapegin.me

- Move code to `/sites/sapegin.me/`
- Add per-site `astro.config.mjs` importing shared base config
- Replace styling with Tailwind + Tâmia
- Add:

```
/sites/sapegin.me/styles/app.css
```

```css
@import 'tailwindcss';
@import '../../shared/packages/tamia/theme.css';
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
    "sites/sapegin.me/**": "sites/sapegin.me/src/styles/app.css",
    "sites/morning.photos/**": "sites/morning.photos/src/styles/app.css",
    "sites/tacohuaco/**": "sites/tacohuaco/src/styles/app.css"
  }
}
```

---

# 11. Step 8 — Obsidian Content Sync

## 11.1 Source vault structure (TBD)

```
/🌐 Sites
  /sapegin.me
  /morning.photos
  /tacohuaco
```

---

## 11.2 Monorepo target

```
/content
  /blog
  /photos
  ...
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
/content
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
astro build --root ./sites/morning.photos
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

## 14. Future improvements

1. Define fonts using Astro fonts config: https://docs.astro.build/en/guides/fonts/
2. Look if we can optimize performance a bit.

---

# 15. Risks

- Tailwind v4 requires proper CSS imports
- content sync complexity
- Obsidian syntax handling
- need discipline around `publish`

---

# 16. Final State

- Single repository, per-site Astro `root` with own `.astro/` types
- Multiple isolated sites
- Shared Tailwind v4 theme (Tâmia)
- Deterministic content pipeline
- Obsidian as source of truth
