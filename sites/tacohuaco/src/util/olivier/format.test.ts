import { expect, test } from 'vitest';
import { format } from './format';

test.each([
	[
		{
			name: 'egg',
			minAmount: 1,
			maxAmount: 1,
		},
		{
			name: 'egg',
			minAmount: '1',
			maxAmount: '1',
		},
	],
	[
		{
			name: 'egg',
			minAmount: 1,
			maxAmount: 3,
		},
		{
			name: 'eggs',
			minAmount: '1',
			maxAmount: '3',
		},
	],
	[
		{
			name: 'cucumber',
			minAmount: 1,
			maxAmount: 1.5,
		},
		{
			name: 'cucumbers',
			minAmount: '1',
			maxAmount: '1½',
		},
	],
	[
		{
			name: 'pork',
			minAmount: 200,
			maxAmount: 200,
			unit: 'g',
		},
		{
			name: 'pork',
			minAmount: '200',
			maxAmount: '200',
			unit: 'g',
		},
	],
	[
		{
			name: 'garlic',
			minAmount: 1,
			maxAmount: 1,
			unit: 'clove',
		},
		{
			name: 'garlic',
			minAmount: '1',
			maxAmount: '1',
			unit: 'clove',
		},
	],
	[
		{
			name: 'garlic',
			minAmount: 1,
			maxAmount: 2,
			unit: 'clove',
		},
		{
			name: 'garlic',
			minAmount: '1',
			maxAmount: '2',
			unit: 'cloves',
		},
	],
	[
		{
			name: 'milk',
			minAmount: 100,
			maxAmount: 200,
			unit: 'ml',
		},
		{
			name: 'milk',
			minAmount: '100',
			maxAmount: '200',
			unit: 'ml',
		},
	],
	[
		{
			name: 'milk',
			minAmount: 1000,
			maxAmount: 2000,
			unit: 'ml',
		},
		{
			name: 'milk',
			minAmount: '1',
			maxAmount: '2',
			unit: 'l',
		},
	],
	[
		{
			name: 'milk',
			minAmount: 500,
			maxAmount: 1000,
			unit: 'ml',
		},
		{
			name: 'milk',
			minAmount: '½',
			maxAmount: '1',
			unit: 'l',
		},
	],
	[
		{
			name: 'paprika',
			minAmount: 5,
			maxAmount: 7,
			unit: 'teaspoon',
		},
		{
			name: 'paprika',
			minAmount: '2',
			maxAmount: '2',
			unit: 'tablespoons',
		},
	],
	[
		{
			name: 'cumin seeds',
			minAmount: 2,
			maxAmount: 2,
			unit: 'pinch',
		},
		{
			name: 'cumin seeds',
			minAmount: '2',
			maxAmount: '2',
			unit: 'pinches',
		},
	],
])('format ingredient: %s', (source, result) => {
	expect(format([source])).toEqual([result]);
});
