import { fromMarkdown } from 'mdast-util-from-markdown';
import { toMarkdown } from 'mdast-util-to-markdown';
import { visit } from 'unist-util-visit';

/**
 * Return all list items from Markdown as an array
 * of strings
 */
export const getListLines = (markdown: string): string[] => {
	const tree = fromMarkdown(markdown);
	const items: string[] = [];
	visit(tree, 'listItem', (li) => {
		const contents = li.children[0];
		items.push(toMarkdown(contents).trim());
	});
	return items;
};
