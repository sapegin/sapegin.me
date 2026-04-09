import deburr from 'lodash/deburr';
import type { Index } from 'lunr';
import { useMemo } from 'react';
import type { RecipeFragment } from '../types/Recipe';

export function useSearchResults(
	rawIndex: Index,
	rawStore: RecipeFragment[],
	query?: string
) {
	const index = useMemo(() => {
		return rawIndex;
	}, [rawIndex]);

	const store = useMemo(() => {
		return rawStore;
	}, [rawStore]);

	return useMemo(() => {
		if (query === undefined) {
			return [];
		}

		const results = index.search(deburr(query));

		return results.flatMap(
			({ ref }) => store.find((x) => x.slug === ref) ?? []
		);
	}, [query, index, store]);
}
