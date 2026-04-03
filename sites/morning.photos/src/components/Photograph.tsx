import { css } from '../../styled-system/css';
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
			alt={photo.title ? `${photo.title} (${photo.location})` : photo.location}
			loading="lazy"
			className={css({
				width: 'auto',
				height: 'auto',
				maxWidth: '100%',
				maxHeight: {
					base: 'min(900px, 100vh)',
					tablet: 'min(900px, calc(100vh - (token(spacing.m) * 2)))',
				},
			})}
			style={{
				backgroundColor: photo.color,
			}}
		/>
	);
}
