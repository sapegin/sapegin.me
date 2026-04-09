import { expect,test } from 'vitest';
import { IngredientKind } from '../../../../sites/tacohuaco/src/util/olivier';
import { mapChart } from '../mapChart';

test('map chart', () => {
	const ingredients = [
		{
			comment: 'room temperature',
			hasDairy: true,
			hasGluten: false,
			hasSugar: false,
			kind: IngredientKind.Vegetarian,
			maxAmount: 12,
			minAmount: 12,
			modifier: undefined,
			name: 'butter',
			seasons: [],
			unit: 'teaspoon',
		},
		{
			comment: undefined,
			hasDairy: true,
			hasGluten: false,
			hasSugar: false,
			kind: IngredientKind.Vegetarian,
			maxAmount: 1,
			minAmount: 1,
			name: 'milk',
			seasons: [],
			unit: 'cup',
		},
		{
			comment: undefined,
			hasDairy: false,
			hasGluten: false,
			hasSugar: false,
			kind: IngredientKind.Vegan,
			maxAmount: 100,
			minAmount: 100,
			modifier: undefined,
			name: 'chicken broth',
			seasons: [],
			unit: 'g',
		},
	];
	const stepSections = [
		{
			name: '',
			steps: [
				{
					pause: false,
					text: 'Cook covered in the most amazing pot for 3 hours, until super tender',
				},
				{
					pause: true,
					text: 'Refrigerate covered for at least 4 hours or better overnight.',
				},
				{
					pause: false,
					text: 'Do three.',
				},
			],
		},
	];

	expect(mapChart(ingredients, stepSections)).toMatchInlineSnapshot(`
		[
		  {
		    "covered": false,
		    "overnight": false,
		    "subtype": "butter",
		    "type": "WarmToRoomTemp",
		  },
		  {
		    "covered": false,
		    "overnight": false,
		    "subtype": "chicken broth",
		    "type": "WarmToRoomTemp",
		  },
		  {
		    "covered": true,
		    "overnight": false,
		    "subtype": "cook",
		    "type": "Cook",
		    "value": "3 hours",
		  },
		  {
		    "covered": true,
		    "overnight": true,
		    "type": "Refrigerate",
		    "value": "4 hours",
		  },
		]
	`);
});
