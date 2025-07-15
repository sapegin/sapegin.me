import { getCollection, getEntry } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';
import { SITE_URL } from '../../constants';

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getCollection('blog');
	return posts.map((post) => ({
		params: { slug: post.slug },
	}));
};

export const GET: APIRoute = async ({ params }) => {
	const { slug } = params;
	if (slug === undefined) {
		return new Response('Not found', { status: 404 });
	}

	const post = await getEntry('blog', slug);
	if (post === undefined) {
		return new Response('Not found', { status: 404 });
	}

	const markdown = `# ${post.data.title}

> ${post.data.description ?? ''}

${post.body}
`;

	// Replace internal blog links with absolute .html.md links
	const result = markdown.replaceAll(
		/(\]\()\/blog\/([^/]+)\//g,
		`$1${SITE_URL}/blog/$2.html.md`
	);

	return new Response(result, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
