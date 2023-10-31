import { iframe } from './Video.css';

/**
 * Responsive photo with max height.
 */
export function Video(props: JSX.IntrinsicElements['iframe']) {
	return (
		<iframe
			{...props}
			className={iframe}
			title="YouTube video player"
			allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
		></iframe>
	);
}
