import { expect, test } from 'vitest';
import { parse } from './parse';

test.each([
	[
		'13 g cocaine',
		[
			{
				name: 'cocaine',
				minAmount: '13',
				maxAmount: '13',
				unit: 'g',
			},
		],
	],
	[
		'10 sausages',
		[
			{
				name: 'sausages',
				minAmount: '10',
				maxAmount: '10',
			},
		],
	],
	[
		'1.75 kg bacon',
		[
			{
				name: 'bacon',
				minAmount: '1.75',
				maxAmount: '1.75',
				unit: 'kg',
			},
		],
	],
	[
		'0,5 g of salt',
		[
			{
				name: 'salt',
				minAmount: '0,5',
				maxAmount: '0,5',
				unit: 'g',
			},
		],
	],
	[
		'1/2 sausage',
		[
			{
				name: 'sausage',
				minAmount: '1/2',
				maxAmount: '1/2',
			},
		],
	],
	[
		'3 1/2 sausage',
		[
			{
				name: 'sausage',
				minAmount: '3 1/2',
				maxAmount: '3 1/2',
			},
		],
	],
	[
		'3 - 3 1/2 sausage',
		[
			{
				name: 'sausage',
				minAmount: '3',
				maxAmount: '3 1/2',
			},
		],
	],
	[
		'10-12 sausages',
		[
			{
				name: 'sausages',
				minAmount: '10',
				maxAmount: '12',
			},
		],
	],
	[
		'3-4 sprigs of marijuana',
		[
			{
				name: 'marijuana',
				minAmount: '3',
				maxAmount: '4',
				unit: 'sprigs',
			},
		],
	],
	[
		'1 or 2 sausages',
		[
			{
				name: 'sausages',
				minAmount: '1',
				maxAmount: '2',
			},
		],
	],
	[
		'4 medium eggs',
		[
			{
				name: 'medium eggs',
				minAmount: '4',
				maxAmount: '4',
			},
		],
	],
	[
		'1 clove of garlic',
		[
			{
				name: 'garlic',
				minAmount: '1',
				maxAmount: '1',
				unit: 'clove',
			},
		],
	],
	[
		'1332 kg of cocaine',
		[
			{
				name: 'cocaine',
				minAmount: '1332',
				maxAmount: '1332',
				unit: 'kg',
			},
		],
	],
	[
		'a bit of hot pepper',
		[
			{
				name: 'hot pepper',
				minAmount: 'a bit',
				maxAmount: 'a bit',
			},
		],
	],
	[
		'1-3 g apples; in small dice',
		[
			{
				name: 'apples',
				minAmount: '1',
				maxAmount: '3',
				unit: 'g',
				comment: 'in small dice',
			},
		],
	],
	[
		'salt',
		[
			{
				name: 'salt',
			},
		],
	],
	[
		'freshly ground black pepper',
		[
			{
				name: 'freshly ground black pepper',
			},
		],
	],
	[
		'some nuts',
		[
			{
				name: 'nuts',
				minAmount: 'some',
				maxAmount: 'some',
			},
		],
	],
	[
		'a bit of blood',
		[
			{
				name: 'blood',
				minAmount: 'a bit',
				maxAmount: 'a bit',
			},
		],
	],
	[
		'100 g unsalted butter; cubed',
		[
			{
				name: 'unsalted butter',
				minAmount: '100',
				maxAmount: '100',
				unit: 'g',
				comment: 'cubed',
			},
		],
	],
	[
		'2 cloves',
		[
			{
				name: 'cloves',
				minAmount: '2',
				maxAmount: '2',
			},
		],
	],
	[
		'10 g almond flour / 15 g coconut flour',
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
	],
	[
		'10 g almond flour / 15 g coconut flour; you decide',
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
				comment: 'you decide',
			},
		],
	],
])('parse ingredient: %s', (source, result) => {
	expect(parse(source)).toEqual(result);
});
