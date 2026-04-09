import round from 'lodash/round';
import type { Amount, Ingredient } from './types';

function roundAmount(amount: number) {
	if (amount > 50) {
		return round(amount, -0.5);
	}
	if (amount < 0.5) {
		return 0.25;
	}
	if (amount < 1) {
		return 0.5;
	}
	return round(amount, 0);
}

function scaleAmount(
	amount: Amount | undefined,
	ratio: number
): Amount | undefined {
	if (typeof amount === 'number') {
		return roundAmount(amount * ratio);
	}

	return amount;
}

/**
 * Scale ingredient amounts
 */
function scaleOption(ingredient: Ingredient, ratio: number): Ingredient {
	return {
		...ingredient,
		minAmount: scaleAmount(ingredient.minAmount, ratio),
		maxAmount: scaleAmount(ingredient.maxAmount, ratio),
	};
}

/**
 * Scale ingredient objects list
 */
export function scale(
	options: readonly Ingredient[],
	ratio: number
): Ingredient[] {
	return options.map((x) => scaleOption(x, ratio));
}
