import _ from 'lodash';
import { getCollection } from 'astro:content';
import { squirrelEntryToSquirrel } from './squirrelEntryToSquirrel';

/**
 * Return all sorted Squirrelsong theme pages, including aliases
 */
export async function getAllSquirrels() {
	const entries = await getCollection('squirrels');

	const squirrelsBase = entries.map(squirrelEntryToSquirrel);
	const squirrelsWithAliases = squirrelsBase.flatMap((squirrel) => {
		if (squirrel.aliases.length > 0) {
			return [
				squirrel,
				...squirrel.aliases.map((alias) => ({
					...squirrel,
					app: alias,
				})),
			];
		} else {
			return squirrel;
		}
	});
	return _.sortBy(squirrelsWithAliases, 'app');
}
