import clsx from 'clsx';
import type { ReactNode } from 'react';

interface Props {
	variant?: 'small' | 'intro';
	className?: string;
	children: ReactNode;
}

export function TextContent({ variant, className, children }: Props) {
	return (
		<div
			className={clsx(
				'prose',
				variant === 'small' && '[&_p]:text-sm',
				variant === 'intro' && '[&_p]:text-lg [&_p]:italic',
				className
			)}
		>
			{children}
		</div>
	);
}
