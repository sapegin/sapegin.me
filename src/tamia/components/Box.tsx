import clsx from 'clsx';
import type * as CSS from 'csstype';
import {
	createElement,
	type ElementType,
	type ComponentPropsWithoutRef,
	type PropsWithChildren,
} from 'react';
import { splitAtoms } from '../primitives/splitAtoms';
import { atoms, type Atoms } from '../primitives/atoms.css';
import { box } from './Box.css';

const defaultElement = 'div';

// Based on https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/

// TODO: Try https://github.com/jaredLunde/forward-ref-as

type AsProp<C extends ElementType> = {
	as?: C;
};

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProps<
	C extends ElementType,
	Props = unknown,
> = PropsWithChildren<Props & AsProp<C>> &
	Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type BoxProps<C extends ElementType> = PolymorphicComponentProps<
	C,
	{
		className?: string;
		// TODO: Do some processing like px()
		// TODO: How do we apply color tokens, etc?
		sx?: CSS.Properties;
		/** A way to pass props to internal component (for example, width) */
		props?: PolymorphicComponentProps<C>;
	} & Atoms
>;

/**
 * Generic container with responsive props to control whitespace, layout,
 * positioning and colors.
 */
export function Box<C extends ElementType>({
	className,
	sx,
	props,
	as,
	...rest
}: BoxProps<C>) {
	const { atomProps, otherProps } = splitAtoms(rest, atoms);
	return createElement(as ?? defaultElement, {
		style: sx,
		...props,
		...otherProps,
		className: clsx(box, className, atoms(atomProps)),
	});
}
