import { visit } from 'unist-util-visit';
import type { Node } from 'unist';
import type { Root, Paragraph } from 'mdast';

interface NodeWithData extends Node {
	data?: {
		hProperties?: Record<string, string | string[]>;
	};
}

const addClassNameToNode = (node: NodeWithData, cls: string) => {
	node.data = node.data || {};
	node.data.hProperties = node.data.hProperties || {};
	node.data.hProperties.className = node.data.hProperties.className || [];
	if (Array.isArray(node.data.hProperties.className)) {
		node.data.hProperties.className.push(cls);
	}

	return node;
};

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
				if (!titleTextNode.value.endsWith(':')) {
					return;
				}

				addClassNameToNode(node, 'tip');
				addClassNameToNode(titleNode, 'tip__title');

				titleTextNode.value = titleTextNode.value.replace(/:$/, '');
			}
		});
}
