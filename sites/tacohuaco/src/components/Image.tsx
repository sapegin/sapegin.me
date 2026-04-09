import clsx from 'clsx';
import type { ImgHTMLAttributes } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & {
	className?: string;
};

export function Image({ className, alt = '', ...props }: Props) {
	return <img alt={alt} className={clsx('image', className)} {...props} />;
}
