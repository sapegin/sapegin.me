import { useCallback, useMemo } from 'react';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useSearchIndex } from '../hooks/useSearchIndex';
import { useSearchResults } from '../hooks/useSearchResults';
import type { RecipeFragment } from '../types/Recipe';
import { formatTagName } from '../util/formatTagName';
import { useUrlState } from './useUrlState';

const getTitle = ({
	title,
	titleEnglish,
}: Pick<RecipeFragment, 'title' | 'titleEnglish'>) => {
	return titleEnglish ? `${title} (${titleEnglish})` : title;
};

export interface AutocompleteItem {
	type: 'recipe' | 'text';
	value: string;
	recipe?: RecipeFragment;
}

const getAutocompleteItems = (
	recipes: RecipeFragment[]
): readonly AutocompleteItem[] => {
	const allItems: AutocompleteItem[] = [];
	const allTags: string[] = [];
	const allKeywords: string[] = [];

	for (const recipe of recipes) {
		allItems.push({
			type: 'recipe',
			value: getTitle(recipe),
			recipe,
		});

		const tagNames = recipe.tags.map((x) => formatTagName(x).toLowerCase());
		allTags.push(...tagNames);

		allKeywords.push(...recipe.keywords);
	}

	const textItems = [...new Set([...allTags, ...allKeywords])].map(
		(value): AutocompleteItem => ({
			type: 'text',
			value,
		})
	);

	return [...allItems, ...textItems];
};

export function useSearch(recipes: RecipeFragment[]) {
	const [searchQuery, setSearchQuery] = useUrlState({
		name: 'q',
		defaultValue: '',
	});
	const searchQueryDebounced = useDebouncedValue(searchQuery);
	const searchIndex = useSearchIndex(recipes);
	const searchResults = useSearchResults(
		searchIndex,
		recipes,
		searchQueryDebounced
	);

	const autocompleteItems = useMemo(() => {
		return getAutocompleteItems(recipes);
	}, [recipes]);

	const getSearchFieldProps = useCallback(() => {
		return {
			items: autocompleteItems,
			value: searchQuery,
			onChange: (value?: string) => setSearchQuery(value ?? ''),
		};
	}, [autocompleteItems, searchQuery]);

	return {
		getSearchFieldProps,
		searchQuery,
		searchResults,
	};
}
