import type { Photo } from '../types/Photo';

export type PhotoSize = 'full' | 'thumbnail';

/**
 * Return local photo URL.
 */
export function getPhotoUrl(photo: Photo, size: PhotoSize = 'full'): string {
	const suffix = size === 'thumbnail' ? '_thumb' : '';
	return `/photos/${photo.slug}${suffix}.avif`;
}
