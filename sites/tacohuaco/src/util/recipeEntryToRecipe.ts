import type { CollectionEntry } from 'astro:content';
import type { Recipe } from '../types/Recipe';

type Entry = CollectionEntry<'recipes'>;

// TODO: Do we need this?
// TODO: Should URL be here?
export function recipeEntryToRecipe(entry: Entry): Recipe {
	return {
		...entry.data,
	};
}
