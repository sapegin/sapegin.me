import { expect,test } from 'vitest';
import { IngredientKind, Month } from '../../../../sites/tacohuaco/src/util/olivier';
import { mapSeasons } from '../mapSeasons';

test('map seasons', () => {
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
	expect(mapSeasons(ingredients)).toMatchInlineSnapshot(`
		[
		  1,
		]
	`);
});
