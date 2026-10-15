# Agent notes

## Content sync (dotfiles)

Most synced content in this repo is **generated elsewhere**. The publish/sync CLIs live in [dotfiles](https://github.com/sapegin/dotfiles) on this machine at `~/dotfiles` (symlinked on `PATH` as `obsidian-publish` and `photos-publish`). Run them locally, then commit the changes under `content/` and site `public/` trees.

| Source | Command | Writes into this repo |
| --- | --- | --- |
| Obsidian vault (blog/site pages) | `obsidian-publish site` | `content/blog`, `content/blocks`, … |
| Obsidian vault (recipes) | `obsidian-publish recipes` | `content/recipes/*.json`, `sites/tacohuaco/public/images/recipes/` |
| iCloud photo export | `photos-publish` | `content/photos/*.json`, `sites/morning.photos/public/photos/` |

Implementation: `~/dotfiles/src/publish/` (`site.ts`, `recipes.ts`, `photos.ts`), invoked from `~/dotfiles/src/bin/obsidian-publish.ts` and `photos-publish.ts`.

**Do not add monorepo npm scripts or Astro loaders to re-sync Obsidian recipes or morning.photos assets** — extend dotfiles publish instead. In-repo scripts under `scripts/` are only for book and Squirrelsong (`npm run sync:book`, `sync:squirrelsong`). Netlify builds assume content is already committed; they do not run dotfiles sync.

## Tâmia (`tamia`)

This monorepo consumes [Tâmia](https://github.com/sapegin/tamia) as an npm dependency. **Do not override or reimplement Tâmia utilities in site or shared CSS** (for example, copying `@utility grid-auto-*` after `@import 'tamia/...'`). If behavior or composition is wrong, **change Tâmia** (source repo: `../tamia` on this machine), release a new version, and bump the dependency here.

Composable utilities (e.g. `grid grid-auto-wide`, like `flex flex-col`) must be fixed upstream so Tailwind and oxlint see the correct split of CSS properties.
