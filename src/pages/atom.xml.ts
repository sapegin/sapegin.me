import { sortBy } from 'lodash';
import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_URL } from '../constants';

const parser = new MarkdownIt();

const NUM_POSTS = 20;

export async function get() {
	const blogEntries = await getCollection('blog');
	const tilEntries = await getCollection('til');
	const entries = sortBy(
		[...blogEntries, ...tilEntries],
		(x) => -x.data.date
	).slice(0, NUM_POSTS);

	return rss({
		title: 'Artem Sapegin’s Blog',
		description: SITE_DESCRIPTION,
		site: SITE_URL,
		items: entries.map((entry) => {
			const link =
				entry.collection === 'blog'
					? `/blog/${entry.slug}/`
					: `/til/${entry.slug}/`;
			return {
				title: entry.data.title,
				pubDate: entry.data.date,
				description: entry.data.description,
				link,
				content: sanitizeHtml(parser.render(entry.body)),
			};
		}),
		customData: `<language>en-us</language>`,
	});
}
