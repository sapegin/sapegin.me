import clsx from 'clsx';
import { type ReactNode } from 'react';

interface Props {
	children: ReactNode;
	className?: string;
	/** Render first paragraph as typo-intro. */
	intro?: boolean;
	/**
	 * Use article-sized text, like blog posts. Default is body text for page
	 * sections.
	 */
	article?: boolean;
}

export function BlockProse({ children, className, intro, article }: Props) {
	return (
		<div
			className={clsx(
				'prose',
				article ? 'post-content' : 'block-content',
				intro && '[&>p:first-of-type]:typo-intro',
				className
			)}
		>
			{children}
		</div>
	);
}
