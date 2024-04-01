import { Box, type BoxProps } from './Box';

/**
 * Responsive photo with max height.
 */
export function Photo(props: Omit<BoxProps<'img'>, 'as' | 'css' | 'loading'>) {
	return (
		<Box
			as="img"
			loading="lazy"
			css={{
				width: 'auto',
				height: 'auto',
				maxWidth: {
					base: '100%',
					tablet: 'min(100%, calc(100vw - token(spacing.m)))',
				},
				maxHeight: {
					base: 'min(900px, 100vh)',
					tablet: 'min(900px, calc(100vh - token(spacing.m)))',
				},
			}}
			{...props}
		/>
	);
}
