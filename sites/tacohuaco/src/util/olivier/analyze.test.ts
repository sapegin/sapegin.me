import { expect, test } from 'vitest';
import { analyze } from './analyze';
import { IngredientKind, Month } from './types';

test.each([
	[
		{
			name: 'cucumber',
			minAmount: 1,
			maxAmount: 1,
			comment: 'sliced',
		},
		{
			name: 'cucumber',
			kind: IngredientKind.Vegan,
			hasDairy: false,
			hasGluten: false,
			hasSugar: false,
			seasons: [Month.June, Month.July, Month.August, Month.September],
		},
	],
	[
		{
			name: 'beef',
			minAmount: 100,
			maxAmount: 100,
			unit: 'g',
		},
		{
			name: 'beef',
			kind: IngredientKind.Meat,
			hasDairy: false,
			hasGluten: false,
			hasSugar: false,
			seasons: [],
		},
	],
	[
		{
			name: 'chicken breast',
			minAmount: 1,
			maxAmount: 2,
		},
		{
			name: 'chicken breast',
			kind: IngredientKind.Poultry,
			hasDairy: false,
			hasGluten: false,
			hasSugar: false,
			seasons: [],
		},
	],
	[
		{
			name: 'egg',
			minAmount: 2,
			maxAmount: 3,
		},
		{
			name: 'egg',
			kind: IngredientKind.Vegetarian,
			hasDairy: false,
			hasGluten: false,
			hasSugar: false,
			seasons: [],
		},
	],
	[
		{
			name: 'all-purpose flour',
			minAmount: 250,
			maxAmount: 250,
			unit: 'g',
		},
		{
			name: 'all-purpose flour',
			kind: IngredientKind.Vegan,
			hasDairy: false,
			hasGluten: true,
			hasSugar: false,
			seasons: [],
		},
	],
	[
		{
			name: 'sugar',
			minAmount: 250,
			maxAmount: 250,
			unit: 'g',
			modifier: 'brown',
			seasons: [],
		},
		{
			name: 'sugar',
			kind: IngredientKind.Vegan,
			hasDairy: false,
			hasGluten: false,
			hasSugar: true,
			seasons: [],
		},
	],
])('analyze ingredient: %s', (source, result) => {
	expect(analyze([source])).toEqual([result]);
});
