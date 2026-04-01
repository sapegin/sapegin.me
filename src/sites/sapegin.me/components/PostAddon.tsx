import type { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export function PostAddon({ children }: Props) {
	return (
		<div
			className="
     -mx-4 border-x-0 border-y-2 border-solid border-accent bg-linear-to-t
     from-primary/20 to-accent/20 px-4 py-8
   "
		>
			{children}
		</div>
	);
}
