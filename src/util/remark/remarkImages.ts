import path from 'node:path';
import { visit } from 'unist-util-visit';
import type { Root, Image, Html } from 'mdast';
import sizeOf from 'image-size';

/*
 * Add dimensions, lazy loading, and captions to Markdown images.
 *
 * ![Pizza](/images/pizza.jpg "Image caption")
 * ->
 * <figure>
 *   <img src="/images/pizza.jpg" alt="Pizza" width="200" height="100" loading="lazy">
 *   <figcaption>Image caption</figcaption>
 * </figure>
 */
export default function remarkImages() {
	return (tree: Root) =>
		visit(tree, 'image', (node: Image) => {
			if (node.url.startsWith('/') === false) {
				return;
			}

			const filepath = path.resolve('./public', `.${node.url}`);
			const { width, height } = sizeOf(filepath);

			const img = `
<figure>
  <img src="${node.url}" alt="${node.alt}" width="${width}" height="${height}" loading="lazy" />
  ${node.title ? `<figcaption>${node.title}</figcaption>` : ''}
</figure>
`;

			(node as unknown as Html).value = img;
			(node as unknown as Html).type = 'html';
		});
}
