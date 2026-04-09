import { expect, test } from 'vitest';
import { print } from './print';

test.each([
	[
		[
			{
				name: 'egg',
				minAmount: '1',
				maxAmount: '1',
			},
		],
		[
			{
				amount: '1',
				name: 'egg',
			},
		],
	],
	[
		[
			{
				name: 'eggs',
				minAmount: '10',
				maxAmount: '10',
				unit: 'g',
			},
		],
		[
			{
				amount: '10 g',
				suffix: 'of',
				name: 'eggs',
			},
		],
	],
	[
		[
			{
				name: 'eggs',
			},
		],
		[
			{
				name: 'eggs',
			},
		],
	],
	[
		[
			{
				name: 'almond flour',
				minAmount: '10',
				maxAmount: '10',
				unit: 'g',
			},
			{
				name: 'coconut flour',
				minAmount: '15',
				maxAmount: '15',
				unit: 'g',
			},
		],
		[
			{
				amount: '10 g',
				suffix: 'of',
				name: 'almond flour',
			},
			{
				amount: '15 g',
				suffix: 'of',
				name: 'coconut flour',
			},
		],
	],
	[
		[
			{
				name: 'almond flour',
				minAmount: '10',
				maxAmount: '10',
				unit: 'g',
			},
			{
				name: 'coconut flour',
				minAmount: '10',
				maxAmount: '10',
				unit: 'g',
			},
		],
		[
			{
				amount: '10 g',
				suffix: 'of',
				name: 'almond flour',
			},
			{
				name: 'coconut flour',
			},
		],
	],
])('print ingredient: %s', (source, result) => {
	expect(print(source)).toEqual(result);
});
