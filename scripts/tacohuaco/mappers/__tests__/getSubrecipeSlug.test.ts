import { expect,test } from 'vitest';
import { getSubrecipeSlug } from '../getSubrecipeSlug';

test.each([
	[`[#](spicy-gremolata)`, 'spicy-gremolata'],
	[
		`To serve the pozole:\n\n1. Cook [chili de arbol sauce](/recipes/chili-de-arbol-sauce).`,
		undefined,
	],
])('return slug from a Markdown link', (markdown, slug) => {
	expect(getSubrecipeSlug(markdown)).toBe(slug);
});
