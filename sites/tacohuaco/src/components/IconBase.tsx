import type { PropsWithoutRef, SVGAttributes } from 'react';

export type BaseIconProps = PropsWithoutRef<
	Omit<SVGAttributes<SVGSVGElement>, 'width' | 'height' | 'viewBox' | 'fill'>
> & {
	width: number | string;
	height: number | string;
	viewBox: {
		width: number;
		height: number;
	};
	fill?: string;
};

export function IconBase({
	viewBox,
	fill = 'currentColor',
	children,
	...props
}: BaseIconProps) {
	return (
		<svg
			{...props}
			className="inline-block align-middle"
			viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
			fill={fill}
			preserveAspectRatio="xMidYMid meet"
			aria-hidden="true"
		>
			{children}
		</svg>
	);
}
