import type { CollectionEntry } from 'astro:content';

// TODO: Can we base it on base schema?
// There's no substantial difference between blog and TIL posts,
// so we could use this type for both
export type Post = CollectionEntry<'blog'>['data'] & { url: string };
