import { RecipeListSection } from '../components/RecipeListSection';
import { TagsLinks } from '../components/TagsLinks';
import type { Recipe } from '../types/Recipe';
import { Page } from './Page';

interface Props {
	url: string;
	newRecipes: Recipe[];
	meals: [string, number][];
	cuisines: [string, number][];
	tags: [string, number][];
}

export function MainPage({ url, newRecipes, meals, cuisines, tags }: Props) {
	return (
		<Page url={url}>
			<h1 className="sr-only">Recipes</h1>
			<main className="flex flex-col gap-16">
				<RecipeListSection title="New recipes" recipes={newRecipes} />
				<section className="flex flex-col gap-4">
					<h2 className="heading-1">Meals</h2>
					<TagsLinks tags={meals} />
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="heading-1">Cuisines</h2>
					<TagsLinks tags={cuisines} />
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="heading-1">Tags</h2>
					<TagsLinks tags={tags} />
				</section>
			</main>
		</Page>
	);
}
