import { visit } from 'unist-util-visit';
import type { Root, Paragraph, Strong } from 'mdast';

const addClassNameToNode = (node: Paragraph | Strong, cls: string) => {
	node.data = node.data ?? {};
	node.data.hProperties = node.data.hProperties ?? {};
	node.data.hProperties.className = node.data.hProperties.className ?? [];
	if (Array.isArray(node.data.hProperties.className)) {
		node.data.hProperties.className.push(cls);
	}

	return node;
};

// TODO: Support multiple paragraphs (replace <br><br> with actual paragraphs
// and wrap the whole block into something other than <p>)

/*
 * Replace tips with HTML markup
 *
 * **Tip:** Some text.
 * ->
 * <p class="tip"><strong class="tip__title">Tip</strong> Some text</p>
 */
export default function remarkTips() {
	return (tree: Root) =>
		visit(tree, 'paragraph', (node: Paragraph) => {
			const [titleNode] = node.children;
			if (titleNode.type !== 'strong' || node.children.length === 1) {
				return;
			}

			const [titleTextNode] = titleNode.children;

			if ('value' in titleTextNode) {
				if (titleTextNode.value.endsWith(':') === false) {
					return;
				}

				addClassNameToNode(node, 'tip');
				addClassNameToNode(titleNode, 'tip__title');

				titleTextNode.value = titleTextNode.value.replace(/:$/, '');
			}
		});
}
