import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

type BadgeProps = ComponentPropsWithoutRef<'span'> & {
	variant?: 'default' | 'inverted';
};

export function Badge({
	variant = 'default',
	className,
	...props
}: BadgeProps) {
	return (
		<span
			className={clsx(
				'inline-block rounded-lg border border-accent px-1 py-px text-xs lowercase',
				variant === 'default' && 'text-accent',
				variant === 'inverted' && 'bg-accent text-background',
				className
			)}
			{...props}
		/>
	);
}
