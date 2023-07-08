import {
	ComponentProps,
	createElement,
	forwardRef,
	type ElementType,
} from 'react';
import clsx from 'clsx';
import { Box } from '../components/Box';

// TODO: as prop doesn't limit props correctly
export function styled<T extends ElementType<any>>(cls: string, base?: T) {
	return forwardRef<HTMLDivElement, ComponentProps<T>>(
		({ className, ...props }, ref) =>
			createElement(base ?? Box, {
				ref,
				className: clsx(cls, className),
				...props,
			})
	);
}
