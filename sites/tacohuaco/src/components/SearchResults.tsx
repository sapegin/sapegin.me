import type { RecipeFragment } from '../types/Recipe';
import { RecipeListSection } from './RecipeListSection';

interface Props {
	searchQuery: string;
	searchResults: RecipeFragment[];
}

export function SearchResults({ searchQuery, searchResults }: Props) {
	return searchResults.length > 0 ? (
		<RecipeListSection title="Search results" recipes={searchResults} />
	) : (
		<p className="font-body text-base/normal text-text">
			We couldn't find any food matching &ldquo;{searchQuery}&rdquo;.
			<br /> (Maybe you'll find what you're looking for at{' '}
			<a className="link" href="/recipes/">the recipes page</a>?)
		</p>
	);
}
