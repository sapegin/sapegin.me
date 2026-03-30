import type { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export function PostAddon({ children }: Props) {
	return (
		<div
			className="-mx-4 border-x-0 border-y-2 border-solid border-accent px-4 py-8"
			style={{
				background: 'linear-gradient(0deg, #57729030 0%, #c45a8d30 100%)',
			}}
		>
			{children}
		</div>
	);
}
