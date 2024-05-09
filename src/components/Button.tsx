import { type ElementType, type ReactNode } from 'react';
import { cva, type RecipeVariantProps } from '../../styled-system/css';
import { Box, type BoxProps } from './Box';

const button = cva({
	base: {
		position: 'relative',
		display: 'inline-block',
		px: { base: 'm', tablet: 'l' },
		pt: { base: 'm', tablet: 'calc(token(spacing.m) + token(spacing.xs))' },
		pb: { base: 'm', tablet: 'm' },
		fontFamily: 'ui',
		backgroundColor: 'background',
		color: 'text',
		borderStyle: 'solid',
		borderWidth: 2,
		lineHeight: '1rem',
		textDecoration: 'none',
		userSelect: 'none',
		outline: 0,
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
				height: '2.2rem',
				py: 's',
				fontSize: 'ui',
			},
			large: {
				py: 'm',
				fontSize: 'xl',
			},
		},
	},
});

export type ButtonProps<C extends ElementType> = BoxProps<C> &
	RecipeVariantProps<typeof button> & {
		children: ReactNode;
	};

function Pixel({
	type = 'print',
	...props
}: {
	type?: 'print' | 'erase';
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
}) {
	return (
		<Box
			{...props}
			position="absolute"
			width={2}
			height={2}
			bg={type === 'print' ? 'currentColor' : 'background'}
			css={{ content: `''` }}
		/>
	);
}

export function Button<C extends ElementType = 'button'>({
	variant = 'medium',
	children,
	...props
}: ButtonProps<C>) {
	return (
		// @ts-expect-error: I have no idea what's wrong here but it works...
		<Box {...props} className={button({ variant })}>
			{children}
			{/* Top left corner */}
			<Pixel top={0} left={0} />
			<Pixel top={-2} left={-2} type="erase" />
			<Pixel top={0} left={-2} type="erase" />
			<Pixel top={-2} left={0} type="erase" />

			{/* Top right corner */}
			<Pixel top={0} right={0} />
			<Pixel top={-2} right={-2} type="erase" />
			<Pixel top={0} right={-2} type="erase" />
			<Pixel top={-2} right={0} type="erase" />

			{/* Bottom left corner */}
			<Pixel bottom={0} left={0} />
			<Pixel bottom={-2} left={-2} type="erase" />
			<Pixel bottom={0} left={-2} type="erase" />
			<Pixel bottom={-2} left={0} type="erase" />

			{/* Bottom right corner */}
			<Pixel bottom={0} right={0} />
			<Pixel bottom={-2} right={-2} type="erase" />
			<Pixel bottom={0} right={-2} type="erase" />
			<Pixel bottom={-2} right={0} type="erase" />
		</Box>
	);
}
