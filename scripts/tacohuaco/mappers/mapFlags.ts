import type { Recipe, RecipeIngredient } from '../../../sites/tacohuaco/src/types/Recipe.ts';
import { IngredientKind } from '../../../sites/tacohuaco/src/util/olivier/types.ts';

/**
 * Gluten free recipe: less than 30% of the flour amount has gluten
 */
function isLowGlutenRecipe(ingredients: RecipeIngredient[]) {
	let glutenFloursAmount = 0;
	let glutenlessFloursAmount = 0;

	for (const ingredient of ingredients) {
		if (
			typeof ingredient.minAmount === 'number' &&
			(ingredient.name.endsWith(' flour') || ingredient.name.endsWith('starch'))
		) {
			if (ingredient.hasGluten) {
				glutenFloursAmount += ingredient.minAmount;
			} else {
				glutenlessFloursAmount += ingredient.minAmount;
			}
		}
	}
	const glutennes = glutenFloursAmount / glutenlessFloursAmount;
	return glutennes < 0.33;
}

/**
 * Return recipe flags based on ingredients list
 */
export const mapFlags = (
	ingredients: RecipeIngredient[]
): Pick<
	Recipe,
	| 'vegan'
	| 'vegetarian'
	| 'glutenFree'
	| 'lowGluten'
	| 'dairyFree'
	| 'noAddedSugar'
> => {
	return {
		vegan: ingredients.every((x) => x.kind === IngredientKind.Vegan),
		vegetarian: ingredients.every(
			(x) =>
				x.kind === IngredientKind.Vegan || x.kind === IngredientKind.Vegetarian
		),
		glutenFree: ingredients.every((x) => x.hasGluten === false),
		lowGluten: isLowGlutenRecipe(ingredients),
		dairyFree: ingredients.every((x) => x.hasDairy === false),
		noAddedSugar: ingredients.every((x) => x.hasSugar === false),
	};
};
