import { expect, test } from 'vitest';
import { merge } from './merge';
import type { Ingredient } from './types';

test.each<[Ingredient[], Ingredient[]]>([
	[
		[
			{
				name: 'cucumber',
				minAmount: 4,
				maxAmount: 4,
			},
			{
				name: 'cucumber',
				minAmount: 2,
				maxAmount: 2,
			},
		],
		[
			{
				name: 'cucumber',
				minAmount: 6,
				maxAmount: 6,
			},
		],
	],
	[
		[
			{
				name: 'beetroot',
				minAmount: 1000,
				maxAmount: 1000,
				unit: 'g',
			},
			{
				name: 'beetroot',
				minAmount: 4,
				maxAmount: 6,
			},
		],
		[
			{
				name: 'beetroot',
				minAmount: 1000,
				maxAmount: 1000,
				unit: 'g',
			},
			{
				name: 'beetroot',
				minAmount: 4,
				maxAmount: 6,
			},
		],
	],
])('merge ingredients: %s', (source, result) => {
	expect(merge(source)).toEqual(result);
});
