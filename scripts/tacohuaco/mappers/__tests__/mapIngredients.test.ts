import { expect,test } from 'vitest';
import { mapIngredients } from '../mapIngredients';

test('map ingredients with sections', () => {
	const markdownWithSections = `
### For the mashed potatoes

- 1 kg of floury potatoes
- 4 tablespoons of butter
- a cup of milk
- smoked paprika powder
- salt

### For the filling

- 1 red onion
- 6 cloves of garlic
- a handful of green beans
- a handful of sugar peas
- soy sauce
- salt
`;
	expect(mapIngredients(markdownWithSections)).toMatchInlineSnapshot(`
		[
		  {
		    "ingredients": [
		      [
		        {
		          "comment": undefined,
		          "hasDairy": false,
		          "hasGluten": false,
		          "hasSugar": false,
		          "kind": "Vegan",
		          "maxAmount": 1000,
		          "minAmount": 1000,
		          "modifier": "floury",
		          "name": "potato",
		          "seasons": [],
		          "unit": "g",
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "hasDairy": true,
		          "hasGluten": false,
		          "hasSugar": false,
		          "kind": "Vegetarian",
		          "maxAmount": 12,
		          "minAmount": 12,
		          "modifier": undefined,
		          "name": "butter",
		          "seasons": [],
		          "unit": "teaspoon",
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "hasDairy": true,
		          "hasGluten": false,
		          "hasSugar": false,
		          "kind": "Vegetarian",
		          "maxAmount": 1,
		          "minAmount": 1,
		          "name": "milk",
		          "seasons": [],
		          "unit": "cup",
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "hasDairy": false,
		          "hasGluten": false,
		          "hasSugar": false,
		          "kind": "Vegan",
		          "maxAmount": undefined,
		          "minAmount": undefined,
		          "modifier": "smoked",
		          "name": "paprika powder",
		          "seasons": [],
		          "unit": undefined,
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "hasDairy": false,
		          "hasGluten": false,
		          "hasSugar": false,
		          "kind": "Vegan",
		          "maxAmount": undefined,
		          "minAmount": undefined,
		          "modifier": undefined,
		          "name": "salt",
		          "seasons": [],
		          "unit": undefined,
		        },
		      ],
		    ],
		    "name": "For the mashed potatoes",
		  },
		  {
		    "ingredients": [
		      [
		        {
		          "comment": undefined,
		          "hasDairy": false,
		          "hasGluten": false,
		          "hasSugar": false,
		          "kind": "Vegan",
		          "maxAmount": 1,
		          "minAmount": 1,
		          "modifier": "red",
		          "name": "onion",
		          "seasons": [],
		          "unit": undefined,
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "hasDairy": false,
		          "hasGluten": false,
		          "hasSugar": false,
		          "kind": "Vegan",
		          "maxAmount": 6,
		          "minAmount": 6,
		          "modifier": undefined,
		          "name": "garlic",
		          "seasons": [],
		          "unit": "clove",
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "hasDairy": false,
		          "hasGluten": false,
		          "hasSugar": false,
		          "kind": "Vegan",
		          "maxAmount": 1,
		          "minAmount": 1,
		          "modifier": "green",
		          "name": "bean",
		          "seasons": [],
		          "unit": "handful",
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "hasDairy": false,
		          "hasGluten": false,
		          "hasSugar": false,
		          "kind": "Vegan",
		          "maxAmount": 1,
		          "minAmount": 1,
		          "modifier": "sugar",
		          "name": "pea",
		          "seasons": [],
		          "unit": "handful",
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "hasDairy": false,
		          "hasGluten": true,
		          "hasSugar": false,
		          "kind": "Vegan",
		          "maxAmount": undefined,
		          "minAmount": undefined,
		          "modifier": undefined,
		          "name": "soy sauce",
		          "seasons": [],
		          "unit": undefined,
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "hasDairy": false,
		          "hasGluten": false,
		          "hasSugar": false,
		          "kind": "Vegan",
		          "maxAmount": undefined,
		          "minAmount": undefined,
		          "modifier": undefined,
		          "name": "salt",
		          "seasons": [],
		          "unit": undefined,
		        },
		      ],
		    ],
		    "name": "For the filling",
		  },
		]
	`);
});

test('map ingredients with subrecipe', () => {
	const markdownWithSections = `
### For the gremolata

[#](spicy-gremolata)

### For the potatoes

- 1 kg of small new potatoes
- olive oil
- salt
- freshly ground black pep
`;
	const subrecipes = [
		{
			slug: 'spicy-gremolata',
			title: 'Spicy gremolata',
			ingredients: `- 2 onions
- 6 bunch of parsley
- olive oil
- salt`,
			steps: '',
			tools: '',
		},
	];
	expect(mapIngredients(markdownWithSections, subrecipes))
		.toMatchInlineSnapshot(`
			[
			  {
			    "ingredients": [
			      [
			        {
			          "comment": undefined,
			          "hasDairy": false,
			          "hasGluten": false,
			          "hasSugar": false,
			          "kind": "Vegan",
			          "maxAmount": 2,
			          "minAmount": 2,
			          "modifier": undefined,
			          "name": "onion",
			          "seasons": [],
			          "unit": undefined,
			        },
			      ],
			      [
			        {
			          "comment": undefined,
			          "hasDairy": false,
			          "hasGluten": false,
			          "hasSugar": false,
			          "kind": "Vegan",
			          "maxAmount": 6,
			          "minAmount": 6,
			          "modifier": undefined,
			          "name": "parsley",
			          "seasons": [],
			          "unit": "bunch",
			        },
			      ],
			      [
			        {
			          "comment": undefined,
			          "hasDairy": false,
			          "hasGluten": false,
			          "hasSugar": false,
			          "kind": "Vegan",
			          "maxAmount": undefined,
			          "minAmount": undefined,
			          "modifier": undefined,
			          "name": "olive oil",
			          "seasons": [],
			          "unit": undefined,
			        },
			      ],
			      [
			        {
			          "comment": undefined,
			          "hasDairy": false,
			          "hasGluten": false,
			          "hasSugar": false,
			          "kind": "Vegan",
			          "maxAmount": undefined,
			          "minAmount": undefined,
			          "modifier": undefined,
			          "name": "salt",
			          "seasons": [],
			          "unit": undefined,
			        },
			      ],
			    ],
			    "name": "For the gremolata",
			  },
			  {
			    "ingredients": [
			      [
			        {
			          "comment": undefined,
			          "hasDairy": false,
			          "hasGluten": false,
			          "hasSugar": false,
			          "kind": "Vegan",
			          "maxAmount": 1000,
			          "minAmount": 1000,
			          "modifier": "small new",
			          "name": "potato",
			          "seasons": [],
			          "unit": "g",
			        },
			      ],
			      [
			        {
			          "comment": undefined,
			          "hasDairy": false,
			          "hasGluten": false,
			          "hasSugar": false,
			          "kind": "Vegan",
			          "maxAmount": undefined,
			          "minAmount": undefined,
			          "modifier": undefined,
			          "name": "olive oil",
			          "seasons": [],
			          "unit": undefined,
			        },
			      ],
			      [
			        {
			          "comment": undefined,
			          "hasDairy": false,
			          "hasGluten": false,
			          "hasSugar": false,
			          "kind": "Vegan",
			          "maxAmount": undefined,
			          "minAmount": undefined,
			          "modifier": undefined,
			          "name": "salt",
			          "seasons": [],
			          "unit": undefined,
			        },
			      ],
			      [
			        {
			          "comment": undefined,
			          "hasDairy": false,
			          "hasGluten": false,
			          "hasSugar": false,
			          "kind": "Vegan",
			          "maxAmount": undefined,
			          "minAmount": undefined,
			          "name": "freshly ground black pep",
			          "seasons": [],
			          "unit": undefined,
			        },
			      ],
			    ],
			    "name": "For the potatoes",
			  },
			]
		`);
});
