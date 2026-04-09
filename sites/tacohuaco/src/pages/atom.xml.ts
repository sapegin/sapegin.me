import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../constants';

export function GET() {
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: SITE_URL,
		items: [],
		customData: `<language>en-us</language>`,
	});
}
