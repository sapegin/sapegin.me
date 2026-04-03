import type { CollectionEntry } from 'astro:content';

// TODO: Can we base it on base schema?
export type Post = CollectionEntry<'blog'>['data'] & { url: string };
