import type { ImgHTMLAttributes } from 'react';
import { css } from '../../styled-system/css';
import { createBox, type BoxProps } from './Box';

/**
 * Responsive image.
 */
export function Image(
	props: Omit<BoxProps<'img'>, 'width' | 'height' | 'className'> &
		Pick<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'>
) {
	return createBox(
		{
			...props,
			className: css({
				maxWidth: '100%',
				height: 'auto',
			}),
		},
		'img',
		{
			// Send width/height directly to the `img` element
			shouldForwardProp: (prop) => ['width', 'height'].includes(prop),
		}
	);
}
