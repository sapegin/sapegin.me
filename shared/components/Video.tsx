import { type ComponentPropsWithoutRef } from 'react';

/**
 * Responsive video embed.
 */
export function Video(props: ComponentPropsWithoutRef<'iframe'>) {
	return (
		// YouTube’s embed needs JavaScript; sandbox would block it.
		// oxlint-disable-next-line react/iframe-missing-sandbox
		<iframe
			{...props}
			title="YouTube video player"
			allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
			className="aspect-video w-full border-0"
		/>
	);
}
