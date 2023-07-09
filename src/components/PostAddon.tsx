import type { ReactNode } from 'react';
import { Box } from '.';
import { addon } from './PostAddon.css';

type Props = {
	children: ReactNode;
};

export function PostAddon({ children }: Props) {
	return <Box className={addon}>{children}</Box>;
}
