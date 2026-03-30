import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * Container for user generated content with styles for all common HTML elements.
 */
export function TextContent({
	className,
	...props
}: ComponentPropsWithoutRef<'div'>) {
	return <div className={clsx('prose', className)} {...props} />;
}
