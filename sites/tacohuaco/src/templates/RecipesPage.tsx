import { RecipeList } from '../components/RecipeList';
import type { Recipe } from '../types/Recipe';
import { PageWithTitle } from './PageWithTitle';

type Props = {
	url: string;
	title: string;
	recipes: Recipe[];
};

export function RecipesPage({ url, title, recipes }: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<RecipeList recipes={recipes} />
		</PageWithTitle>
	);
}
