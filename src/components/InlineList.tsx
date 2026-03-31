import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

export function InlineList({
	className,
	...props
}: ComponentPropsWithoutRef<'p'>) {
	return <p className={clsx('md:flex', className)} {...props} />;
}

export function InlineListItem({
	className,
	...props
}: ComponentPropsWithoutRef<'span'>) {
	return (
		<span
			className={clsx(
				`
      mb-1 typo-small italic
      not-last:after:mx-2 not-last:after:mb-[0.1rem] not-last:after:inline-block
      not-last:after:h-[0.3rem] not-last:after:w-[0.3rem]
      not-last:after:bg-border not-last:after:content-[""]
    `,
				className
			)}
			{...props}
		/>
	);
}
