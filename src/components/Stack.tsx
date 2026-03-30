import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

export type StackProps<C extends ElementType = 'div'> =
	ComponentPropsWithoutRef<C> & {
		as?: C;
		className?: string;
	};

export function Stack<C extends ElementType = 'div'>({
	as,
	className,
	...props
}: StackProps<C>) {
	const Component = as ?? 'div';
	return <Component className={clsx('flex flex-col', className)} {...props} />;
}
