import orderBy from 'lodash/orderBy';
import { Order } from '../types/Order';
import { Photo } from '../types/Photo';
import { loadPhoto } from './gallery';

const PHOTO_PROTOCOL = 'photo://';
const IMAGES_REGEXP = /!\[[^\]]*\]\(([^)'"\s]*)\)/g;

export const getLines = (text: string) => text.split('\n').filter(Boolean);

export const getImages = (markdown: string) => {
	const images = [];
	IMAGES_REGEXP.lastIndex = 0;
	let match = IMAGES_REGEXP.exec(markdown);
	while (match != null) {
		images.push(match[1]);
		match = IMAGES_REGEXP.exec(markdown);
	}
	return images;
};

export const isPhotoUrl = (url: string) => url && url.startsWith(PHOTO_PROTOCOL);

export const getPhotoNameFromUrl = (url: string) => {
	return isPhotoUrl(url) && url.substring(PHOTO_PROTOCOL.length);
};

export const getAlbumFromNames = async (
	names: string[],
	{
		orderby,
		limit,
		slug,
		filter,
	}: { orderby: Order; limit?: number; slug: string; filter?: (photos: Photo[]) => Photo[] }
) => {
	// Load photos
	const photos: Photo[] = await Promise.all(
		names.map(async (name) => {
			const photo = await loadPhoto(name);
			return {
				...photo,
				slug: `${slug}/${photo.slug}`,
			};
		})
	);

	const filteredPhotos = filter ? filter(photos) : photos;

	// Sort photos
	const sortedPhotos =
		orderby === 'manual'
			? filteredPhotos
			: orderBy(filteredPhotos, [orderby || 'timestamp'], ['desc']);

	return limit ? sortedPhotos.slice(0, limit) : sortedPhotos;
};
