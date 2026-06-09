import { type AnchorHTMLAttributes } from 'react';

export function Tag({
	children,
	...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
	return (
		<a
			className="rounded-normal bg-light font-ui text-secondary focus-outline hover:text-accent inline-block px-2 pt-[0.1ex] text-sm/normal text-nowrap no-underline hover:cursor-pointer"
			{...props}
		>
			{children}
		</a>
	);
}
