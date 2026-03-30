import type { ComponentPropsWithoutRef, ElementType } from 'react';

/**
 * Expands content horizontally to remove the paddings so it is rendered
 * from edge to edge on small screens.
 */
export function Expander<C extends ElementType = 'div'>({
	as,
	...props
}: ComponentPropsWithoutRef<C> & { as?: C }) {
	const Component = as ?? 'div';
	return <Component className="expander" {...props} />;
}
