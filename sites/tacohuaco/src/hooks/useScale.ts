import { useMemo, useState } from 'react';
import type { Recipe, RecipeIngredient } from '../types/Recipe';
import { scale } from '../util/olivier';

function getPrevAmount(amount: number) {
	if (amount > 100) {
		return amount - 100;
	}
	if (amount > 20) {
		return amount - 10;
	}
	if (amount === 1) {
		return amount;
	}
	return amount - 1;
}

function getNextAmount(amount: number) {
	if (amount < 20) {
		return amount + 1;
	}
	if (amount < 100) {
		return amount + 10;
	}
	return amount + 100;
}

function getRatio(amount: number, nextAmount: number) {
	return nextAmount / amount;
}

function scaleIngredients(
	ingredientsSections: Recipe['ingredients'],
	baseAmount: number,
	currentAmount: number
): Recipe['ingredients'] {
	const ratio = getRatio(baseAmount, currentAmount);
	return ingredientsSections.map((section) => ({
		...section,
		ingredients: section.ingredients.map(
			(options) => scale(options, ratio) as unknown as RecipeIngredient[]
		),
	}));
}

export function useScale({ ingredients, yields }: Recipe) {
	const isScalingEnabled = typeof window !== 'undefined';

	const baseAmount = yields.amount;

	const [currentAmount, setCurrentAmount] = useState(baseAmount);

	const scaledIngredients = useMemo(
		() => scaleIngredients(ingredients, baseAmount, currentAmount),
		[currentAmount]
	);

	const handleLess = useMemo(
		() => () => setCurrentAmount((x) => getPrevAmount(x)),
		[]
	);
	const handleMore = useMemo(
		() => () => setCurrentAmount((x) => getNextAmount(x)),
		[]
	);

	return {
		isScalingEnabled,
		currentAmount,
		scaledIngredients,
		handleLess,
		handleMore,
	};
}
