import clsx from 'clsx';
import { type ReactNode } from 'react';

interface Props {
	children: ReactNode;
	className?: string;
	/** Render first paragraph as typo-intro. */
	intro?: boolean;
}

export function BlockProse({ children, className, intro }: Props) {
	return (
		<div
			className={clsx(
				'prose',
				intro && '[&_.post-content>p:first-child]:typo-intro',
				className
			)}
		>
			<div className="post-content">{children}</div>
		</div>
	);
}
