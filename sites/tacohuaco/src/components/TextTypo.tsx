import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Typo } from './Typo';

interface Props {
	as?: 'p' | 'b' | 'span';
	className?: string;
	children: ReactNode;
}

export function TextTypo({
	as: Component = 'p',
	className,
	children,
	...rest
}: Props) {
	return (
		<Component className={clsx('text-text', className)} {...rest}>
			<Typo>{children}</Typo>
		</Component>
	);
}
