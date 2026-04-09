import { expect, test } from 'vitest';
import { mapTips } from '../mapTips';

test('map tips', () => {
	const ingredients = [
		{
			comment: undefined,
			maxAmount: 1000,
			minAmount: 1000,
			modifier: 'floury',
			name: 'floury potatoes',
			unit: 'g',
		},
		{
			comment: undefined,
			maxAmount: undefined,
			minAmount: undefined,
			modifier: 'smoked',
			name: 'smoked paprika powder',
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
	];
	const tags = ['pizza', 'pasta'];
	const allTips = [
		{
			content: 'Tip about salt',
			ingredient: 'salt',
			tags: [],
		},
		{
			content: 'Tip about pork',
			ingredient: 'pork',
			tags: [],
		},
		{
			content: 'Tip about pizza',
			tags: ['pizza'],
		},
	];
	expect(mapTips(ingredients, tags, allTips)).toMatchInlineSnapshot(`
		[
		  "Tip about salt",
		  "Tip about pizza",
		]
	`);
});
