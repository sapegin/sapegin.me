import _ from 'lodash';
import rss from '@astrojs/rss';
import { SITE_URL } from '../../constants';
import type { Image, ImageRaw } from '../../types/Image';
import { unwrapImage } from '../../util/unwrapImage';

const PHOTOS_PAGE_URL = `${SITE_URL}/photos`;

type GlobResult = Record<string, () => Promise<ImageRaw>>;

function globToEntries(items: GlobResult) {
	return Promise.all(
		Object.entries(items).map(async ([_fileName, getInfo]) => {
			return unwrapImage(await getInfo());
		})
	);
}

function getPubDate(photo: Image) {
	const match = photo.url.match(/\/photos\/(\d\d\d\d)-(\d\d)-(\d\d)_/);
	if (match === null) {
		return new Date();
	}
	return new Date(
		Number(match[1]),
		Number(match[2]) - 1,
		Number(match[3]),
		12,
		0,
		0
	);
}

export async function GET() {
	const photosRaw = await import.meta.glob(
		'../../../public/images/photos/*.{jpg,webp}'
	);
	const entries = await globToEntries(photosRaw);
	const orderedEntries = _.orderBy(entries, ['url'], ['desc']);

	return rss({
		title: 'Photography by Artem Sapegin',
		description:
			'Artem Sapegin’s photography: landscapes, travel, cityscapes, nature, street, zines',
		site: PHOTOS_PAGE_URL,
		items: orderedEntries.map((entry) => {
			return {
				title: '***',
				pubDate: getPubDate(entry),
				description: '',
				link: PHOTOS_PAGE_URL,
				content: `<img src="${SITE_URL}${entry.url}" alt="">`,
			};
		}),
		customData: `<language>en-us</language>`,
	});
}
