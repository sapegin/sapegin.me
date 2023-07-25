import path from 'path';
import { visit } from 'unist-util-visit';
import type { Root, Image, HTML } from 'mdast';
import sizeOf from 'image-size';

/*
 * Add dimensions and lazy loading to Markdown images.
 *
 * ![Pizza](/images/pizza.jpg)
 * ->
 * <img src="/images/pizza.jpg" alt="Pizza" width="200" height="100" loading="lazy">
 */
export default function remarkImages() {
	return (tree: Root) =>
		visit(tree, 'image', (node: Image) => {
			if (node.url.startsWith('/') === false) {
				return;
			}

			const filepath = path.resolve('./public', `.${node.url}`);
			const { width, height } = sizeOf(filepath);

			const img = `<img src="${node.url}" alt="${node.alt}" width="${width}" height="${height}" loading="lazy" />`;

			(node as unknown as HTML).value = img;
			(node as unknown as HTML).type = 'html';
		});
}
