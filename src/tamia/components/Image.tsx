import { image } from './Image.css';

/**
 * Responsive image.
 */
export function Image(props: JSX.IntrinsicElements['img']) {
	return <img className={image} {...props} />;
}
