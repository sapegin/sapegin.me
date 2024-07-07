import type { CollectionEntry } from 'astro:content';
import type { Squirrel } from '../types/Squirrel';

type Entry = CollectionEntry<'squirrels'>;

export function squirrelEntryToSquirrel(entry: Entry): Squirrel {
	return {
		...entry.data,
		url: `/squirrelsong/${entry.slug}/`,
	};
}
