import { expect, test } from 'vitest';
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
		          "maxAmount": 1000,
		          "minAmount": 1000,
		          "modifier": "floury",
		          "name": "potato",
		          "unit": "g",
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "maxAmount": 12,
		          "minAmount": 12,
		          "modifier": undefined,
		          "name": "butter",
		          "unit": "teaspoon",
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "maxAmount": 1,
		          "minAmount": 1,
		          "name": "milk",
		          "unit": "cup",
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "maxAmount": undefined,
		          "minAmount": undefined,
		          "modifier": "smoked",
		          "name": "paprika powder",
		          "unit": undefined,
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "maxAmount": undefined,
		          "minAmount": undefined,
		          "modifier": undefined,
		          "name": "salt",
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
		          "maxAmount": 1,
		          "minAmount": 1,
		          "modifier": "red",
		          "name": "onion",
		          "unit": undefined,
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "maxAmount": 6,
		          "minAmount": 6,
		          "modifier": undefined,
		          "name": "garlic",
		          "unit": "clove",
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "maxAmount": 1,
		          "minAmount": 1,
		          "modifier": "green",
		          "name": "bean",
		          "unit": "handful",
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "maxAmount": 1,
		          "minAmount": 1,
		          "modifier": "sugar",
		          "name": "pea",
		          "unit": "handful",
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "maxAmount": undefined,
		          "minAmount": undefined,
		          "modifier": undefined,
		          "name": "soy sauce",
		          "unit": u3ndefined,
		        },
		      ],
		      [
		        {
		          "comment": undefined,
		          "maxAmount": undefined,
		          "minAmount": undefined,
		          "modifier": undefined,
		          "name": "salt",
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
			          "maxAmount": 2,
			          "minAmount": 2,
			          "modifier": undefined,
			          "name": "onion",
			          "unit": undefined,
			        },
			      ],
			      [
			        {
			          "comment": undefined,
			          "maxAmount": 6,
			          "minAmount": 6,
			          "modifier": undefined,
			          "name": "parsley",
			          "unit": "bunch",
			        },
			      ],
			      [
			        {
			          "comment": undefined,
			          "maxAmount": undefined,
			          "minAmount": undefined,
			          "modifier": undefined,
			          "name": "olive oil",
			          "unit": undefined,
			        },
			      ],
			      [
			        {
			          "comment": undefined,
			          "maxAmount": undefined,
			          "minAmount": undefined,
			          "modifier": undefined,
			          "name": "salt",
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
			          "maxAmount": 1000,
			          "minAmount": 1000,
			          "modifier": "small new",
			          "name": "potato",
			          "unit": "g",
			        },
			      ],
			      [
			        {
			          "comment": undefined,
			          "maxAmount": undefined,
			          "minAmount": undefined,
			          "modifier": undefined,
			          "name": "olive oil",
			          "unit": undefined,
			        },
			      ],
			      [
			        {
			          "comment": undefined,
			          "maxAmount": undefined,
			          "minAmount": undefined,
			          "modifier": undefined,
			          "name": "salt",
			          "unit": undefined,
			        },
			      ],
			      [
			        {
			          "comment": undefined,
			          "maxAmount": undefined,
			          "minAmount": undefined,
			          "name": "freshly ground black pep",
			          "unit": undefined,
			        },
			      ],
			    ],
			    "name": "For the potatoes",
			  },
			]
		`);
});
