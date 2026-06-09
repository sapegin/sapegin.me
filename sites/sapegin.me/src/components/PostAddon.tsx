import { type ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export function PostAddon({ children }: Props) {
	return (
		<div
			className="border-accent from-primary/20 to-accent/20 -mx-4 border-x-0 border-y-2 border-solid bg-linear-to-t px-4 py-8"
		>
			{children}
		</div>
	);
}
