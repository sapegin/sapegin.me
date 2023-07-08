import type { CollectionEntry } from 'astro:content';
import type { Post } from '../types/Post';

type Entry = CollectionEntry<'til'>;

export function tilEntryToPost(entry: Entry): Post {
	return {
		...entry.data,
		url: `/til/${entry.slug}/`,
	};
}
