import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * Responsive image.
 */
export function Image({
	className,
	alt,
	...props
}: ComponentPropsWithoutRef<'img'>) {
	return (
		<img
			loading="lazy"
			className={clsx('h-auto max-w-full', className)}
			alt={alt}
			{...props}
		/>
	);
}
