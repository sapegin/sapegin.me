import { type ElementType, type ReactNode } from 'react';
import { cva, type RecipeVariantProps } from '../../styled-system/css';
import { Box, type BoxProps } from './Box';

const button = cva({
	base: {
		position: 'relative',
		display: 'inline-block',
		px: { base: 'm', tablet: 'l' },
		py: 'm',
		fontFamily: 'ui',
		color: 'text',
		borderStyle: 'solid',
		borderWidth: 2,
		lineHeight: '1rem',
		textDecoration: 'none',
		userSelect: 'none',
		outline: 0,
		transitionDuration: 'hover',
		transitionTimingFunction: 'hover',
		transitionProperty: 'all',
		_hover: {
			cursor: 'pointer',
			color: 'accent',
		},
		_active: {
			transform: 'translateY(1px)',
		},
		_focusVisible: {
			outline: 'focus',
			outlineOffset: 'token(borderWidths.focusOutlineOffset)',
		},
		'&::-moz-focus-inner': {
			border: 0,
		},
	},
	variants: {
		variant: {
			medium: {
				backgroundColor: 'background',
				height: '2.2rem',
				py: 's',
				fontSize: 'ui',
			},
			large: {
				backgroundColor: 'background',
				py: 'm',
				fontSize: 'xl',
			},
			coffee: {
				background: 'coffeeBackground',
				color: 'coffeeText',
				pt: 's',
				py: 'm',
				fontSize: 'l',
				lineHeight: '1',
				borderRadius: 'button',
				_hover: {
					color: 'coffeeHover',
				},
			},
		},
	},
});

export type ButtonProps<C extends ElementType> = BoxProps<C> &
	RecipeVariantProps<typeof button> & {
		children: ReactNode;
	};

export function Button<C extends ElementType = 'button'>({
	variant = 'medium',
	children,
	...props
}: ButtonProps<C>) {
	return (
		// @ts-expect-error: I have no idea what's wrong here but it works...
		<Box {...props} className={button({ variant })}>
			{children}
		</Box>
	);
}
