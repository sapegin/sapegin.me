import { expect, test } from 'vitest';
import { normalize } from './normalize';

test.each([
	[
		{
			name: 'cucumber',
			minAmount: '1',
			maxAmount: '1',
			comment: 'sliced',
		},
		{
			name: 'cucumber',
			minAmount: 1,
			maxAmount: 1,
			unit: undefined,
			comment: 'sliced',
		},
	],
	[
		{
			name: 'cucumbers',
			minAmount: 'two',
			maxAmount: 'two',
			comment: undefined,
		},
		{
			name: 'cucumber',
			minAmount: 2,
			maxAmount: 2,
			unit: undefined,
			comment: undefined,
		},
	],
	[
		{
			name: 'cayenne pepper',
			minAmount: 'some',
			maxAmount: 'some',
			comment: undefined,
		},
		{
			name: 'pepper',
			minAmount: 'some',
			maxAmount: 'some',
			unit: undefined,
			comment: undefined,
			modifier: 'cayenne',
		},
	],
	[
		{
			name: 'floury potatoes',
			minAmount: '1',
			maxAmount: '1',
			unit: 'kg',
			comment: undefined,
		},
		{
			name: 'potato',
			minAmount: 1000,
			maxAmount: 1000,
			unit: 'g',
			comment: undefined,
			modifier: 'floury',
		},
	],
	[
		{
			name: 'cocaine',
			minAmount: '13',
			maxAmount: '13',
			unit: 'g',
			comment: undefined,
		},
		{
			name: 'cocaine',
			minAmount: 13,
			maxAmount: 13,
			unit: 'g',
			comment: undefined,
		},
	],
	[
		{
			name: 'salt',
			minAmount: '0,5',
			maxAmount: '0,5',
			unit: 'g',
		},
		{
			name: 'salt',
			minAmount: 0.5,
			maxAmount: 0.5,
			unit: 'g',
			comment: undefined,
		},
	],
	[
		{
			name: 'onion',
			minAmount: '1/2',
			maxAmount: '1',
			comment: undefined,
		},
		{
			name: 'onion',
			minAmount: 0.5,
			maxAmount: 1,
			comment: undefined,
		},
	],
	[
		{
			name: 'sausage',
			minAmount: '2.75',
			maxAmount: '3 1/2',
			unit: 'g',
			comment: undefined,
		},
		{
			name: 'sausage',
			minAmount: 2.75,
			maxAmount: 3.5,
			unit: 'g',
			comment: undefined,
		},
	],
	[
		{
			name: 'cucumbers',
			minAmount: '3',
			maxAmount: '3',
			comment: undefined,
		},
		{
			name: 'cucumber',
			minAmount: 3,
			maxAmount: 3,
			unit: undefined,
			comment: undefined,
		},
	],
	[
		{
			name: 'juicy cucumbers',
			minAmount: '3',
			maxAmount: '3',
			comment: undefined,
		},
		{
			name: 'cucumber',
			minAmount: 3,
			maxAmount: 3,
			unit: undefined,
			comment: undefined,
			modifier: 'juicy',
		},
	],
	[
		{
			name: 'chickpeas',
			minAmount: '300',
			maxAmount: '300',
			unit: 'g',
		},
		{
			name: 'chickpea',
			minAmount: 300,
			maxAmount: 300,
			unit: 'g',
		},
	],
	[
		{
			name: 'extra virgin olive oil',
			minAmount: '100',
			maxAmount: '100',
			unit: 'g',
		},
		{
			name: 'olive oil',
			minAmount: 100,
			maxAmount: 100,
			unit: 'g',
		},
	],
	[
		{
			name: 'milk',
			minAmount: '2',
			maxAmount: '3',
			unit: 'l',
		},
		{
			name: 'milk',
			minAmount: 2000,
			maxAmount: 3000,
			unit: 'ml',
		},
	],
	[
		{
			name: 'flour',
			minAmount: '2',
			maxAmount: '3',
			unit: 'kg',
		},
		{
			name: 'flour',
			minAmount: 2000,
			maxAmount: 3000,
			unit: 'g',
		},
	],
	[
		{
			name: 'beans',
			minAmount: 'a',
			maxAmount: 'a',
			unit: 'handful',
		},
		{
			name: 'bean',
			minAmount: 1,
			maxAmount: 1,
			unit: 'handful',
		},
	],
])('normalize ingredient: %s', (source, result) => {
	expect(normalize([source])).toEqual([result]);
});
