import { fromMarkdown } from 'mdast-util-from-markdown';
import { visit } from 'unist-util-visit';

/**
 * Returns a slug from a Markdown link:
 * [#](tres-leches-cake) → tres-leches-cake
 */
export function getSubrecipeSlug(markdown: string): string | undefined {
	const tree = fromMarkdown(markdown);
	let slug;
	visit(tree, 'link', (link) => {
		if (link.children[0].type === 'text' && link.children[0].value === '#') {
			slug = link.url;
		}
	});
	return slug;
}
