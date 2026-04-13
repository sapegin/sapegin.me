import type { ReactNode } from 'react';

interface Props {
	aspectRatio: string;
	className?: string;
	children: ReactNode;
}

export function Frame({ children, aspectRatio, className }: Props) {
	return (
		<div className={className} style={{ aspectRatio }}>
			{children}
		</div>
	);
}
