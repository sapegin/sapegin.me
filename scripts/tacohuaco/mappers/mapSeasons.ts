import type { RecipeIngredient } from '../../../sites/tacohuaco/src/types/Recipe.ts';
import type { Month } from '../../../sites/tacohuaco/src/util/olivier/types.ts';

/**
 * Recipe seasons: return months shared by all recipe ingredients
 */
export const mapSeasons = (ingredients: RecipeIngredient[]): Month[] => {
	const allSeasons = ingredients
		.map((x) => x.seasons)
		.filter((x) => x.length > 0);

	if (allSeasons.length === 0) {
		return [];
	}

	return allSeasons[0].filter((month) =>
		allSeasons.every((seasons) => seasons.includes(month))
	);
};
