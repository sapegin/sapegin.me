import type { AnchorHTMLAttributes } from 'react';

export function Tag(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
	return (
		<a
			className="
     inline-block rounded-normal border-0 bg-light px-2 pt-[0.1ex] font-ui
     text-sm/normal whitespace-nowrap text-secondary no-underline
     hover:cursor-pointer hover:text-accent
     focus-visible:outline-[3px] focus-visible:outline-offset-2
     focus-visible:outline-accent
   "
			{...props}
		/>
	);
}
