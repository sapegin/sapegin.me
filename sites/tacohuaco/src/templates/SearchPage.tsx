import { SearchForm } from '../components/SearchForm';
import { SearchResults } from '../components/SearchResults';
import { useSearch } from '../hooks/useSearch';
import type { RecipeFragment } from '../types/Recipe';

type Props = {
	recipes: RecipeFragment[];
};

export function SearchPage({ recipes }: Props) {
	const { getSearchFieldProps, searchQuery, searchResults } = useSearch(recipes);
	return (
		<div className="flex flex-col gap-8">
			<header>
				<SearchForm {...getSearchFieldProps()} />
			</header>
			<main className="flex flex-col gap-8">
				{searchQuery === '' ? (
					<p className="font-body text-base leading-normal text-text">
						Try searching for recipe names (<em>pozole</em>, <em>tres leches</em>),
						cuisines (<em>Mexican</em>, <em>Russian</em>), ingredients (<em>kimchi</em>,
						<em>tomatoes</em>), kinds of dishes (<em>lunch</em>, <em>soup</em>),
						seasons (<em>autumn</em>)...
					</p>
				) : (
					<SearchResults searchQuery={searchQuery} searchResults={searchResults} />
				)}
			</main>
		</div>
	);
}
