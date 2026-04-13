import type { AnchorHTMLAttributes } from 'react';

export function Tag({
	children,
	...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
	return (
		<a
			className="
     inline-block rounded-normal bg-light px-2 pt-[0.1ex] font-ui text-sm/normal
     text-nowrap text-secondary no-underline focus-outline
     hover:cursor-pointer hover:text-accent
   "
			{...props}
		>
			{children}
		</a>
	);
}
