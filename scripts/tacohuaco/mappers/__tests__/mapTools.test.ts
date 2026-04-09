import { expect,test } from 'vitest';
import type { IngredientsSection } from '../../../../sites/tacohuaco/src/types/Recipe';
import { mapTools } from '../mapTools';

test('map tools', () => {
	const tools = `
- mixer
- blender or drill`;
	expect(mapTools(tools, [], [])).toMatchInlineSnapshot(`
		[
		  "mixer",
		  "blender or drill",
		]
	`);
});

test('map tools with subrecipes', () => {
	const tools = `
- mixer
- blender or drill`;
	const subrecipes = [
		{
			slug: 'subrecipe1',
			tools: '- mixer\n- hammer',
		},
		{
			slug: 'subrecipe2',
			tools: '- one\n- two',
		},
	];
	const ingredientsSection = [
		{
			name: '',
			ingredients: [
				[
					{
						name: 'salt',
					},
				],
				[
					{
						name: 'subrecipe 2',
						subrecipeSlug: 'subrecipe2',
					},
				],
			],
		},
	] as IngredientsSection[];
	expect(mapTools(tools, subrecipes, ingredientsSection))
		.toMatchInlineSnapshot(`
			[
			  "mixer",
			  "blender or drill",
			  "hammer",
			]
		`);
});
