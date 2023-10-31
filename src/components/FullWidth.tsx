import type { ReactNode } from 'react';
import { container, inner } from './FullWidth.css';

type Props = {
	children: ReactNode;
};

/**
 * Container that expands to 100% of page width
 */
export function FullWidth({ children }: Props) {
	return (
		<div className={container}>
			<div className={inner}>{children}</div>
		</div>
	);
}
