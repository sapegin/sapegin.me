import type { ReactNode } from 'react';
import { fullWidth } from './FullWidth.css';

type Props = {
	children: ReactNode;
};

/**
 * Container that expands to 100% of page width
 */
export function FullWidth({ children }: Props) {
	return <div className={fullWidth}>{children}</div>;
}
