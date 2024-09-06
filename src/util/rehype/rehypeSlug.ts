import GithubSlugger from 'github-slugger';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';
import type { Root } from 'hast';

const slugs = new GithubSlugger();

/**
 * Add IDs to headings.
 *
 * Copy of rehype-slug but handles non-breaking spaces by converting them to
 * regular spaces before generating slugs. The original rehype-slug swallows
 * non-breaking spaces:
 * rehype-slug: `best tacos in\xa0town` → `best-tacos-intown`
 * this module: `best tacos in\xa0town` → `best-tacos-in-town`
 */
export default function rehypeSlug() {
	return function (tree: Root) {
		slugs.reset();

		visit(tree, 'element', function (node) {
			if (
				['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName) &&
				!node.properties.id
			) {
				// Get heading text content, and replace non-breaking spaces
				// with regular spaces
				const text = toString(node).replaceAll('\u00A0', ' ');
				node.properties.id = slugs.slug(text);
			}
		});
	};
}
