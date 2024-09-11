import type { ElementType } from 'react';
import { Box, type BoxProps } from './Box';
import { TextContent } from './TextContent';

export function PostContent<C extends ElementType>(props: BoxProps<C>) {
	return (
		<TextContent>
			<Box
				css={{
					fontSize: 'article',
					lineHeight: { base: 'small', tablet: 'base' },

					// HACK: Increase specificity to override post content styles (Astro production
					// build imports CSS in a different order)
					'&& ol': {
						marginLeft: 0,
					},

					'&& ul > li': {
						paddingLeft: '1em',
					},
					'&& ul > li::before': {
						content: `''`,
						top: { base: '.5em', tablet: '.6em' },
						left: '.1em',
						width: '.3em',
						height: '.3em',
						backgroundColor: 'text',
					},

					// Horizontal lines
					'&& hr': {
						height: 'auto',
						textAlign: 'center',
						backgroundColor: 'transparent',
						border: 'none',
						// Make top and bottom margins more or less the same
						marginBlock: '2.5rem',
					},
					'& hr::after': {
						content: `'···'`,
						letterSpacing: '0.7em',
					},

					// Image captions
					'& figcaption': {
						mt: 'calc(token(spacing.l) * -1 + token(spacing.s))',
						fontSize: 'm',
						fontStyle: 'italic',
					},

					// Tips
					'& .tip': {
						position: 'relative',
						marginBlock: 'l',
						fontSize: 'm',
						fontFamily: 'body',
						fontStyle: 'italic',
					},
					'& .tip::before': {
						content: `''`,
						position: 'absolute',
						left: '-s',
						top: '.3em',
						bottom: '.3em',
						borderLeftColor: 'accent',
						borderLeftStyle: 'solid',
						borderLeftWidth: 2,
					},
					'& .tip:first-child': {
						marginTop: 0,
					},
					'& .tip + .tip': {
						marginTop: 'm',
					},
					'& .tip__title': {
						display: 'block',
						marginBottom: 'xxs',
						fontStyle: 'normal',
					},

					'& .heading': {
						position: 'relative',
					},
					'& .heading__anchor': {
						opacity: 0,
						position: 'absolute',
						right: '100%',
						// Add padding to increase clickable area
						marginTop: '-xs',
						padding: 'xs',
						textDecoration: 'none',
						transitionDelay: '1s',
						transitionDuration: 'fadeout',
						transitionTimingFunction: 'fadeout',
						willChange: 'opacity',
					},
					'& .heading:hover .heading__anchor': {
						_pointerFine: {
							opacity: 1,
							transitionDelay: '0.1s',
							transitionDuration: 'fade',
							transitionTimingFunction: 'fade',
							transitionProperty: 'opacity',
						},
					},
				}}
				{...props}
			/>
		</TextContent>
	);
}
