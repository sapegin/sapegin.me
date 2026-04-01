import type { CollectionEntry } from 'astro:content';

export type Squirrel = CollectionEntry<'squirrels'>['data'] & { url: string };
