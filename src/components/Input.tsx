import clsx from 'clsx';
import { Box, type BoxProps } from '../tamia/components/Box';
import { input } from './Input.css';
import type { ElementType } from 'react';

export function Input<C extends ElementType = 'input'>({
	className,
	...props
}: Omit<BoxProps<C>, 'as'>) {
	return <Box as="input" className={clsx(className, input)} {...props} />;
}
