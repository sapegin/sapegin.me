import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from '../constants';

// TODO: Add all book chapters separately
// TODO: Remove book chapters from the blog list above

/**
 * All blog content in Markdown format for LLMs
 * https://llmstxt.org/
 */
export const GET: APIRoute = async () => {
	const posts = await getCollection('blog');

	const sortedPosts = posts.toSorted(
		(a, b) => b.data.date.getTime() - a.data.date.getTime()
	);

	const content = `# ${SITE_TITLE}

> ${SITE_DESCRIPTION}

## Blog

${sortedPosts
	.map(
		(post) =>
			`- [${post.data.title}](${SITE_URL}/blog/${post.slug}.html.md): ${post.data.description ?? ''}`
	)
	.join('\n')}`;
	return new Response(content, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
