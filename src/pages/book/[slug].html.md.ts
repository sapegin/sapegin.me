import { getCollection, getEntry } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getCollection('bookChapters');
	return posts.map((post) => ({
		params: { slug: post.slug },
	}));
};

export const GET: APIRoute = async ({ params }) => {
	const { slug } = params;
	if (slug === undefined) {
		return new Response('Not found', { status: 404 });
	}

	const post = await getEntry('bookChapters', slug);
	if (post === undefined) {
		return new Response('Not found', { status: 404 });
	}

	const markdown = `# ${post.data.title}

> ${post.data.description ?? ''}

${post.body}
`;

	return new Response(markdown, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
