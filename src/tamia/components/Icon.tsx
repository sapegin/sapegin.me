import { Box, type BoxProps } from './Box';

export type IconProps = Omit<
	BoxProps<'svg'>,
	'width' | 'height' | 'viewBox'
> & {
	width: number;
	height: number;
	viewBox: {
		width: number;
		height: number;
	};
	fill?: string;
};

/**
 * Generic SVG icon component.
 */
export function Icon({
	viewBox,
	display = 'inline-block',
	verticalAlign = 'middle',
	width,
	height,
	fill = 'currentColor',
	children,
	...props
}: IconProps) {
	return (
		<Box
			as="svg"
			{...props}
			display={display}
			verticalAlign={verticalAlign}
			props={{ width, height }}
			viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
			fill={fill}
			preserveAspectRatio="xMidYMid meet"
			aria-hidden="true"
		>
			{children}
		</Box>
	);
}
