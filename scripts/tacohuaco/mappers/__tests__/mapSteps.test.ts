import { expect,test } from 'vitest';
import { mapSteps } from '../mapSteps';

test('map steps without sections', () => {
	const stepsWithoutSections = `
1. Do one.
2. Do two.
3. Do three.`;
	expect(mapSteps(stepsWithoutSections)).toMatchInlineSnapshot(`
		[
		  {
		    "name": "",
		    "steps": [
		      {
		        "pause": false,
		        "text": "Do one.",
		      },
		      {
		        "pause": false,
		        "text": "Do two.",
		      },
		      {
		        "pause": false,
		        "text": "Do three.",
		      },
		    ],
		  },
		]
	`);
});

test('map steps with ingredients', () => {
	const stepsWithoutSections = `
1. In a medium bowl, combine _} all purpose flour_, _} black peppercorns_, _} cucumbers_, and _} salt_, using a whisk.`;
	expect(mapSteps(stepsWithoutSections)).toMatchInlineSnapshot(`
		[
		  {
		    "name": "",
		    "steps": [
		      {
		        "pause": false,
		        "text": "In a medium bowl, combine <Ingredient name="all-purpose flour"  />, <Ingredient name="peppercorn" modifier="black" />, <Ingredient name="cucumber"  />, and <Ingredient name="salt"  />, using a whisk.",
		      },
		    ],
		  },
		]
	`);
});

test('map steps with pause', () => {
	const stepsWithPause = `
1. Do one.
2. Refrigerate covered for at least 4 hours or better overnight.
3. Do three.`;
	expect(mapSteps(stepsWithPause)).toMatchInlineSnapshot(`
		[
		  {
		    "name": "",
		    "steps": [
		      {
		        "pause": false,
		        "text": "Do one.",
		      },
		      {
		        "pause": true,
		        "text": "Refrigerate covered for at least 4 hours or better overnight.",
		      },
		      {
		        "pause": false,
		        "text": "Do three.",
		      },
		    ],
		  },
		]
	`);
});

test('map steps with sections', () => {
	const stepsWithSections = `### To cook the sponge cake

1. Prepare this.
2. Cook that.

### To cook the tres leches

1. Add all the vegetables
2. Add salt`;
	expect(mapSteps(stepsWithSections)).toMatchInlineSnapshot(`
		[
		  {
		    "name": "To cook the sponge cake",
		    "steps": [
		      {
		        "pause": false,
		        "text": "Prepare this.",
		      },
		      {
		        "pause": false,
		        "text": "Cook that.",
		      },
		    ],
		  },
		  {
		    "name": "To cook the tres leches",
		    "steps": [
		      {
		        "pause": false,
		        "text": "Add all the vegetables",
		      },
		      {
		        "pause": false,
		        "text": "Add salt",
		      },
		    ],
		  },
		]
	`);
});

test('map steps with subrecipe', () => {
	const stepsWithSections = `### To cook the sponge cake

1. Prepare this.
2. Cook that.

### To cook the gremolata

[#](spicy-gremolata)`;
	const subrecipes = [
		{
			slug: 'spicy-gremolata',
			title: 'Spicy gremolata',
			ingredients: '',
			steps: '1. This.\n2. That.',
			tools: '',
		},
	];
	expect(mapSteps(stepsWithSections, subrecipes)).toMatchInlineSnapshot(`
		[
		  {
		    "name": "To cook the sponge cake",
		    "steps": [
		      {
		        "pause": false,
		        "text": "Prepare this.",
		      },
		      {
		        "pause": false,
		        "text": "Cook that.",
		      },
		    ],
		  },
		  {
		    "name": "To cook the gremolata",
		    "steps": [
		      {
		        "pause": false,
		        "text": "This.",
		      },
		      {
		        "pause": false,
		        "text": "That.",
		      },
		    ],
		  },
		]
	`);
});
