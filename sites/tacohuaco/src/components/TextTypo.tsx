import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Typo } from './Typo';

interface Props {
	as?: 'p' | 'b' | 'span';
	variant?: 'body' | 'small';
	className?: string;
	children: ReactNode;
}

export function TextTypo({ as: Component = 'p', variant = 'body', className, children, ...rest }: Props) {
	const variantClass = variant === 'small' ? 'font-body text-sm leading-snug' : 'font-body text-base leading-normal';
	return (
		<Component className={clsx(variantClass, 'text-text', className)} {...rest}>
			<Typo>{children}</Typo>
		</Component>
	);
}
