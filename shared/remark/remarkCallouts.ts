/// <reference types="mdast-util-to-hast" />
// The reference above loads the module augmentation that adds
// `hName`/`hProperties` to mdast’s `Data`
import { type Blockquote, type Paragraph, type Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { upperFirst } from '../util/upperFirst.js';

const CALLOUT_REGEXP = /^\[!(?<type>\w+)\]\s?/;

/*
 * Render Obsidian-style callouts as styled blocks. The callout type becomes the
 * title, and any text after the marker becomes the body.
 *
 * > [!tip] Some text.
 * ->
 * <div class="callout"><p class="callout__title">Tip</p><p>Some text.</p></div>
 */
export default function remarkCallouts() {
	return (tree: Root) =>
		visit(tree, 'blockquote', (node: Blockquote) => {
			const [firstChild] = node.children;
			if (firstChild.type !== 'paragraph') {
				return;
			}

			const [firstText] = firstChild.children;
			if (firstText.type !== 'text') {
				return;
			}

			const match = CALLOUT_REGEXP.exec(firstText.value);
			if (match?.groups === undefined) {
				return;
			}

			const type = match.groups.type;

			// Strip the `[!type]` marker, keeping the text after it as the body
			firstText.value = firstText.value.slice(match[0].length);

			// Drop the leading paragraph if it only contained the marker
			if (firstText.value === '' && firstChild.children.length === 1) {
				node.children.shift();
			}

			const titleNode: Paragraph = {
				type: 'paragraph',
				data: { hProperties: { className: ['callout__title'] } },
				children: [{ type: 'text', value: upperFirst(type) }],
			};
			node.children.unshift(titleNode);

			node.data = node.data ?? {};
			node.data.hName = 'div';
			node.data.hProperties = { className: ['callout'] };
		});
}
