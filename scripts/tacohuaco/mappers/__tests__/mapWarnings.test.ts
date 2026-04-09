import { expect,test } from 'vitest';
import { IngredientKind, Month } from '../../../../sites/tacohuaco/src/util/olivier';
import { mapWarnings } from '../mapWarnings';

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
			name: 'potatoes',
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
			name: 'paprika powder',
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
		{
			comment: undefined,
			hasDairy: false,
			hasGluten: false,
			hasSugar: false,
			kind: IngredientKind.Vegan,
			maxAmount: undefined,
			minAmount: undefined,
			modifier: undefined,
			name: 'soy sauce',
			seasons: [Month.January, Month.November, Month.December],
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
