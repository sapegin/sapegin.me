import type { Photo } from '../types/Photo';
import { getPhotoUrl } from '../util/getPhotoUrl';

/**
 * Render a Photo object.
 * - Responsive with max height
 * - Lazy loaded
 * - Fallback to dominant color
 */
export function Photograph({ photo, id }: { photo: Photo; id?: string }) {
	return (
		<img
			id={id}
			src={getPhotoUrl(photo)}
			width={photo.width}
			height={photo.height}
			alt={photo.title}
			loading="lazy"
			className="
     size-auto max-h-[min(900px,100vh)] max-w-full
     md:max-h-[min(900px,calc(100vh-2rem))]
   "
			style={{
				backgroundColor: photo.color,
			}}
		/>
	);
}
