import { expect,test } from 'vitest';
import { IngredientKind, Month } from '../../../../sites/tacohuaco/src/util/olivier';
import { mapTips } from '../mapTips';

test('map tips', () => {
	const ingredients = [
		{
			comment: undefined,
			hasDairy: false,
			hasGluten: false,
			hasSugar: false,
			kind: IngredientKind.Vegan,
			maxAmount: 1000,
			minAmount: 1000,
			modifier: 'floury',
			name: 'floury potatoes',
			seasons: [Month.January, Month.February],
			unit: 'g',
		},
		{
			comment: undefined,
			hasDairy: false,
			hasGluten: false,
			hasSugar: false,
			kind: IngredientKind.Vegan,
			maxAmount: undefined,
			minAmount: undefined,
			modifier: 'smoked',
			name: 'smoked paprika powder',
			seasons: [],
			unit: undefined,
		},
		{
			comment: undefined,
			hasDairy: false,
			hasGluten: false,
			hasSugar: false,
			kind: IngredientKind.Vegan,
			maxAmount: undefined,
			minAmount: undefined,
			modifier: undefined,
			name: 'salt',
			seasons: [Month.January, Month.November, Month.December],
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
