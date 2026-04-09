import { expect, test } from 'vitest';
import { mapWarnings } from '../mapWarnings';

test('map tips', () => {
	const ingredients = [
		{
			comment: undefined,
			maxAmount: 1000,
			minAmount: 1000,
			modifier: 'floury',
			name: 'potatoes',
			unit: 'g',
		},
		{
			comment: undefined,
			maxAmount: undefined,
			minAmount: undefined,
			modifier: 'smoked',
			name: 'paprika powder',
			unit: undefined,
		},
		{
			comment: undefined,
			maxAmount: undefined,
			minAmount: undefined,
			modifier: undefined,
			name: 'salt',
			unit: undefined,
		},
		{
			comment: undefined,
			maxAmount: undefined,
			minAmount: undefined,
			modifier: undefined,
			name: 'soy sauce',
			unit: undefined,
		},
	];
	const allIngredients = [
		{
			name: 'salt',
			warnings: ['Warning about salt 1', 'Warning about salt 2'],
		},
		{
			name: 'pork',
			warnings: [],
		},
		{
			name: 'potatoes',
			warnings: [],
		},
		{
			name: 'pizza',
			warnings: ['Warning about pizza'],
		},
		{
			name: 'soy sauce',
			warnings: ['Warning about soy sauce'],
		},
	];
	expect(mapWarnings(ingredients, allIngredients)).toMatchInlineSnapshot(`
		[
		  "Warning about salt 1",
		  "Warning about salt 2",
		  "Warning about soy sauce",
		]
	`);
});
