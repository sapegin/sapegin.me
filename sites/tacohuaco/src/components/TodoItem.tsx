import type { ReactNode } from 'react';

interface Props {
	children?: ReactNode;
}

export function TodoItem({ children }: Props) {
	return (
		<label className="flex flex-row gap-2">
			<input type="checkbox" />
			<div className="
     font-body text-base/normal text-text
     [input:checked+&]:line-through
   ">
				{children}
			</div>
		</label>
	);
}
