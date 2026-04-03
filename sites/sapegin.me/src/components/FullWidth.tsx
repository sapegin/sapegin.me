import type { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

/**
 * Container that expands to 100% of page width
 */
export function FullWidth({ children }: Props) {
	return (
		<div className="ml-[calc(50%-50vw)] w-screen">
			<div className="mx-auto max-w-[1200px]">{children}</div>
		</div>
	);
}
