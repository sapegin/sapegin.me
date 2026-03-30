import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

// TODO: Find a better way to implement it, avoid `as` prop

type Variant = 'medium' | 'large';

const VARIANT_CLASSES: Record<Variant, string> = {
	medium: 'button-medium',
	large: 'button-large',
};

export type ButtonProps<C extends ElementType = 'button'> =
	ComponentPropsWithoutRef<C> & {
		as?: C;
		variant?: Variant;
		children: ReactNode;
	};

function Pixel({
	type = 'print',
	...style
}: {
	type?: 'print' | 'erase';
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
}) {
	return (
		<span
			className={clsx(
				'absolute size-0.5',
				type === 'print' ? 'bg-current' : 'bg-background'
			)}
			style={style}
			aria-hidden="true"
		/>
	);
}

export function Button<C extends ElementType = 'button'>({
	as,
	variant = 'medium',
	className,
	children,
	...props
}: ButtonProps<C>) {
	const Component = as ?? 'button';
	return (
		<Component
			className={clsx('button', VARIANT_CLASSES[variant], className as string)}
			{...props}
		>
			{children}
			{/* Top left corner */}
			<Pixel top={0} left={0} />
			<Pixel top={-2} left={-2} type="erase" />
			<Pixel top={0} left={-2} type="erase" />
			<Pixel top={-2} left={0} type="erase" />

			{/* Top right corner */}
			<Pixel top={0} right={0} />
			<Pixel top={-2} right={-2} type="erase" />
			<Pixel top={0} right={-2} type="erase" />
			<Pixel top={-2} right={0} type="erase" />

			{/* Bottom left corner */}
			<Pixel bottom={0} left={0} />
			<Pixel bottom={-2} left={-2} type="erase" />
			<Pixel bottom={0} left={-2} type="erase" />
			<Pixel bottom={-2} left={0} type="erase" />

			{/* Bottom right corner */}
			<Pixel bottom={0} right={0} />
			<Pixel bottom={-2} right={-2} type="erase" />
			<Pixel bottom={0} right={-2} type="erase" />
			<Pixel bottom={-2} right={0} type="erase" />
		</Component>
	);
}
