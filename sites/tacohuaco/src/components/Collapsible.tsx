import type { ReactNode } from 'react';

interface Props {
	label: ReactNode;
	children: ReactNode;
}

export function Collapsible({ label, children }: Props) {
	return (
		<details className="flex flex-col gap-3">
			<summary className="
     font-ui text-sm/normal text-text underline
     hover:cursor-pointer hover:text-accent
     focus-visible:outline-[3px] focus-visible:outline-offset-2
     focus-visible:outline-accent
     active:text-accent
   ">
				{label}
			</summary>
			<div>{children}</div>
		</details>
	);
}
