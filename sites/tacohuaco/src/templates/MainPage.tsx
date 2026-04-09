import { RecipeListSection } from '../components/RecipeListSection';
import { IngredientsSeasonChart } from '../components/IngredientsSeasonChart';
import { CuisinesLinks } from '../components/CuisinesLinks';
import { TagsLinks } from '../components/TagsLinks';
import type { Recipe } from '../types/Recipe';
import { Page } from './Page';

type Props = {
	url: string;
	newRecipes: Recipe[];
	recipesInSeason: Recipe[];
	recipesNextSeason: Recipe[];
	favoriteRecipes: Recipe[];
	quickRecipes: Recipe[];
	ingredientsInSeason: string[];
	ingredientsNextSeason: string[];
	cuisines: [string, number][];
	meals: [string, number][];
	tags: [string, number][];
};

export function MainPage({
	url, newRecipes, recipesInSeason, recipesNextSeason,
	favoriteRecipes, quickRecipes, ingredientsInSeason,
	ingredientsNextSeason, cuisines, meals, tags,
}: Props) {
	return (
		<Page url={url}>
			<h1 className="sr-only">Recipes</h1>
			<main className="flex flex-col gap-16">
				<RecipeListSection title="New recipes" recipes={newRecipes} />
				{recipesInSeason.length > 0 && (
					<RecipeListSection title="In season now" recipes={recipesInSeason}>
						<p className="font-body text-base leading-normal text-text">
							In season now in Valencia, Spain: {ingredientsInSeason.join(', ')}.
						</p>
					</RecipeListSection>
				)}
				{recipesNextSeason.length > 0 && (
					<RecipeListSection title="In season next month" recipes={recipesNextSeason}>
						<p className="font-body text-base leading-normal text-text">
							In season next month: {ingredientsNextSeason.join(', ')}.
						</p>
					</RecipeListSection>
				)}
				<RecipeListSection title="Recipes under 30 minutes" recipes={quickRecipes} />
				<RecipeListSection title="Our favorite recipes" recipes={favoriteRecipes} />
				<section className="flex flex-col gap-4">
					<h2 className="heading-1">Cuisines</h2>
					<CuisinesLinks cuisines={cuisines} />
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="heading-1">Meals</h2>
					<TagsLinks tags={meals} />
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="heading-1">Tags</h2>
					<TagsLinks tags={tags} />
				</section>
				<section className="flex flex-col gap-8">
					<h2 className="heading-1">Seasonal ingredients</h2>
					<IngredientsSeasonChart />
				</section>
			</main>
		</Page>
	);
}
