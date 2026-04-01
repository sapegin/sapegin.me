import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import _ from 'lodash';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import { SITE_DESCRIPTION, SITE_URL } from '../constants';

const parser = new MarkdownIt();

const NUM_POSTS = 20;

export async function GET() {
	const blogEntries = await getCollection(
		'blog',
		({ data }) => data.draft !== true
	);
	const entries = _.sortBy(blogEntries, (x) => -x.data.date.getTime()).slice(
		0,
		NUM_POSTS
	);

	return rss({
		title: 'Artem Sapegin’s Blog',
		description: SITE_DESCRIPTION,
		site: SITE_URL,
		items: entries.map((entry) => {
			const link = `/blog/${entry.id}/`;
			return {
				title: entry.data.title,
				pubDate: entry.data.date,
				description: entry.data.description,
				link,
				content: sanitizeHtml(parser.render(entry.body ?? '')),
			};
		}),
		customData: `<language>en-us</language>`,
	});
}
