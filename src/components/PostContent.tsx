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
						backgroundColor: 'base',
					},

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

					'& .tip': {
						marginBlock: 'l',
						fontSize: 's',
						fontFamily: 'body',
						fontStyle: 'italic',
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
				}}
				{...props}
			/>
		</TextContent>
	);
}
