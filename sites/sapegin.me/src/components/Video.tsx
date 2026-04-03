import type { ComponentPropsWithoutRef } from 'react';

/**
 * Responsive video embed.
 */
export function Video(props: ComponentPropsWithoutRef<'iframe'>) {
	return (
		<iframe
			{...props}
			title="YouTube video player"
			allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
			className="aspect-video w-full border-0"
		/>
	);
}
