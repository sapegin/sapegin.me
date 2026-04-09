import type { Ingredient } from './types';

function getKey(ingredient: Ingredient) {
	return [ingredient.name, ingredient.unit].filter(Boolean).join('/');
}

function add(a: Ingredient, b: Ingredient) {
	return {
		...a,
		minAmount: Number(a.minAmount) + Number(b.minAmount),
		maxAmount: Number(a.maxAmount) + Number(b.maxAmount),
	};
}

export function merge(
	allIngredients: readonly Ingredient[]
): readonly Ingredient[] {
	const ingredients: Record<string, Ingredient> = {};
	for (const ingredient of allIngredients) {
		const key = getKey(ingredient);

		if (key in ingredients === false) {
			ingredients[key] = {
				...ingredient,
				minAmount: 0,
				maxAmount: 0,
			};
		}

		ingredients[key] = add(ingredients[key], ingredient);
	}
	return Object.values(ingredients);
}
