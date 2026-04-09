import type { RecipeIngredient } from '../../../sites/tacohuaco/src/types/Recipe';
import type { TipModel } from '../types';

export function mapTips(
	ingredients: RecipeIngredient[],
	tags: string[],
	allTips: TipModel[]
) {
	return allTips
		.filter((tip) => {
			return (
				(tip.ingredient === undefined ||
					ingredients.some(({ name }) => name === tip.ingredient)) &&
				tip.tags.every((tag) => tags.includes(tag))
			);
		})
		.map((tip) => tip.content);
}
