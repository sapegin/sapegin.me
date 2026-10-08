# Agent notes

## Tâmia (`tamia`)

This monorepo consumes [Tâmia](https://github.com/sapegin/tamia) as an npm dependency. **Do not override or reimplement Tâmia utilities in site or shared CSS** (for example, copying `@utility grid-auto-*` after `@import 'tamia/...'`). If behavior or composition is wrong, **change Tâmia** (source repo: `../tamia` on this machine), release a new version, and bump the dependency here.

Composable utilities (e.g. `grid grid-auto-wide`, like `flex flex-col`) must be fixed upstream so Tailwind and oxlint see the correct split of CSS properties.
