import type { RecipeIngredient } from '../../../sites/tacohuaco/src/types/Recipe.ts';
import type { IngredientModel } from '../types.ts';

export function mapWarnings(
	ingredients: RecipeIngredient[],
	allIngredients: IngredientModel[]
) {
	const allWarnings = allIngredients
		.filter((ingredient) =>
			ingredients.some(({ name }) => name === ingredient.name.toLowerCase())
		)
		.flatMap((x) => x.warnings)
		.filter((x) => x.length > 0);

	// Remove duplicates and return
	return [...new Set(allWarnings)];
}
