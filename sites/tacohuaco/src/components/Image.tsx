import clsx from 'clsx';
import type { ImgHTMLAttributes } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & {
	className?: string;
};

export function Image({ className, ...props }: Props) {
	return (
		<img
			className={clsx('image', className)}
			{...props}
		/>
	);
}
