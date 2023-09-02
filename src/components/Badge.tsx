import type { ReactNode } from 'react';
import { Box } from '.';
import clsx from 'clsx';
import { badge, inverted } from './Badge.css';

type Props = {
	variant?: 'default' | 'inverted';
	children: ReactNode;
};

export function Badge({ variant = 'default', children }: Props) {
	return (
		<Box
			as="span"
			display="inline-block"
			px="xs"
			py="xxs"
			className={clsx(badge, variant === 'inverted' && inverted)}
		>
			{children}
		</Box>
	);
}
