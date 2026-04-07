import type { Photo } from '../types/Photo';
import { getPhotoUrl, type PhotoSize } from '../util/getPhotoUrl';

/**
 * Render a Photo object.
 * - Basic responsiveness
 * - Lazy loaded
 * - Fallback to dominant color
 */
export function Thumbnail({
	photo,
	size = 'thumbnail',
	alt,
}: {
	photo: Photo;
	size?: PhotoSize;
	alt?: string;
}) {
	return (
		<img
			src={getPhotoUrl(photo, size)}
			width={photo.width}
			height={photo.height}
			alt={alt ?? ''}
			loading="lazy"
			className="h-auto w-full"
			style={{ backgroundColor: photo.color }}
		/>
	);
}
