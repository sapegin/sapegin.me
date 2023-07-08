import visit from 'unist-util-visit';

// TODO: Doesn't work

const addClassNameToNode = (node, cls) => {
	node.data = node.data || {};
	node.data.hProperties = node.data.hProperties || {};
	node.data.hProperties.className = node.data.hProperties.className || [];

	node.data.hProperties.className.push(cls);

	return node;
};

/*
 * Replace tips with HTML markup
 *
 * **Tip:** Some text.
 * ->
 * <p class="tip"><strong class="tip__title">Tip</strong> Some text</p>
 */
export default function ({ markdownAST }) {
	console.log('🐴 remark tips 1');
	return visit(markdownAST, 'paragraph', (node) => {
		console.log('🐴 remark tips 2');
		const [titleNode] = node.children;
		if (titleNode.type !== 'strong' || node.children.length === 1) {
			return;
		}

		const [titleTextNode] = titleNode.children;
		if (!titleTextNode.value.endsWith(':')) {
			return;
		}

		addClassNameToNode(node, 'tip');
		addClassNameToNode(titleNode, 'tip__title');

		titleTextNode.value = titleTextNode.value.replace(/:$/, '');
	});
}
