import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

export function PostContent({
	className,
	...props
}: ComponentPropsWithoutRef<'div'>) {
	return <div className={clsx('post-content prose', className)} {...props} />;
}
