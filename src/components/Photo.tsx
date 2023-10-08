import { photo } from './Photo.css';

/**
 * Responsive photo with max height.
 */
export function Photo(props: JSX.IntrinsicElements['img']) {
	return <img loading="lazy" className={photo} {...props} />;
}
