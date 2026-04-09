import type { IngredientModel, IngredientModelRaw } from '../types';

export function mapIngredientsModel(
	ingredients: IngredientModelRaw[]
): IngredientModel[] {
	return ingredients.map(({ name, warnings }) => ({
		name: name.toLowerCase(),
		warnings: warnings === null ? [] : warnings.split(/\n+/),
	}));
}
