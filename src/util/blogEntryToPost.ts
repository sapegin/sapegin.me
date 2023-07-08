import type { CollectionEntry } from 'astro:content';
import type { Post } from '../types/Post';

type Entry = CollectionEntry<'blog'>;

export function blogEntryToPost(entry: Entry): Post {
	return {
		...entry.data,
		url: `/blog/${entry.slug}/`,
	};
}
