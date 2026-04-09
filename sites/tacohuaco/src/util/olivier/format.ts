import { formatQuantity } from 'format-quantity';
import { ALL_INGREDIENTS } from './langs/en/ingredients';
import { UNITLESS } from './langs/en/translations';
import {
	GRAMS_IN_KILOGRAM,
	MILLILITERS_IN_LITER,
	TEASPOONS_IN_TABLESPOONS,
	UNITS,
} from './langs/en/units';
import type { Amount, Ingredient } from './types';

const CONVERSIONS: {
	from: string;
	to: string;
	condition: (x: number) => boolean;
	convert: (x: number) => number;
}[] = [
	{
		from: 'teaspoon',
		to: 'tablespoon',
		condition: (x) => x >= TEASPOONS_IN_TABLESPOONS,
		convert: (x) => Math.round(x / TEASPOONS_IN_TABLESPOONS),
	},
	{
		from: 'g',
		to: 'kg',
		condition: (x) => x >= GRAMS_IN_KILOGRAM,
		convert: (x) => x / GRAMS_IN_KILOGRAM,
	},
	{
		from: 'ml',
		to: 'l',
		condition: (x) => x >= MILLILITERS_IN_LITER,
		convert: (x) => x / MILLILITERS_IN_LITER,
	},
];

function asString(amount?: Amount) {
	if (amount === undefined) {
		return amount;
	}
	return formatQuantity(amount, true) || String(amount);
}

function pluralize(
	dictionary: readonly string[][],
	unit: string,
	amount: number
): string {
	if (amount > 1) {
		const units = dictionary.find(([i]) => i === unit);
		if (units === undefined) {
			return unit;
		}
		return units[1] || units[0];
	}
	return unit;
}

function pluralizeName({
	name,
	unit,
	minAmount,
	maxAmount,
}: Ingredient): string {
	if (unit === undefined && typeof minAmount === 'number' && minAmount === maxAmount) {
		return pluralize(ALL_INGREDIENTS, name, maxAmount);
	}

	if (
		typeof minAmount === 'string' &&
		UNITLESS.some((x) => minAmount.endsWith(x))
	) {
		return name;
	}

	return pluralize(ALL_INGREDIENTS, name, Infinity);
}

function pluralizeUnit({
	amount,
	unit,
}: {
	amount?: Amount;
	unit?: string;
}): string | undefined {
	if (unit && typeof amount === 'number') {
		return pluralize(UNITS, unit, amount);
	}

	return undefined;
}

function prepareAmount(
	amount?: Amount,
	unit?: string,
	forceUnit?: string
): { amount?: Amount; unit?: string } {
	if (typeof amount !== 'number') {
		return { amount, unit };
	}

	for (const conversion of CONVERSIONS) {
		if (
			unit === conversion.from &&
			(conversion.condition(amount) ||
				(forceUnit && conversion.from !== forceUnit))
		) {
			return {
				amount: conversion.convert(amount),
				unit: conversion.to,
			};
		}
	}

	return { amount, unit };
}

/**
 * Format an ingredient option for display:
 * - pluralize the name and the unit
 * - format amounts as strings (1.5 → 1½)
 */
export function formatOption(ingredient: Ingredient): Ingredient {
	const { amount: maxAmount, unit } = prepareAmount(
		ingredient.maxAmount,
		ingredient.unit
	);
	const { amount: minAmount } = prepareAmount(
		ingredient.minAmount,
		ingredient.unit,
		unit
	);
	return {
		...ingredient,
		name: pluralizeName({ name: ingredient.name, minAmount, maxAmount, unit }),
		minAmount: asString(minAmount),
		maxAmount: asString(maxAmount),
		unit: pluralizeUnit({ amount: maxAmount, unit }),
	};
}

/**
 * Format an ingredient for display
 */
export function format(options: readonly Ingredient[]): readonly Ingredient[] {
	return options.map((x) => formatOption(x));
}
