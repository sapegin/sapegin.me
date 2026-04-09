import { type ReactElement, type ReactNode } from 'react';

interface Props {
	value: string;
	children: (props: {
		triggerProps: Record<string, unknown>;
		tooltipNode: ReactElement;
	}) => ReactElement;
}

export function TooltipTrigger(props: { children: ReactNode }) {
	return (
		<button
			{...props}
			type="button"
			className="relative border-0 bg-transparent p-0"
		/>
	);
}

export function Tooltip({ value, children }: Props) {
	return children({
		triggerProps: {
			className: 'relative',
		},
		tooltipNode: (
			<span
				role="tooltip"
				className="
      pointer-events-none absolute -bottom-4 left-1/2 translate-x-[-50%]
      translate-y-full rounded-normal bg-accent px-2 py-1 text-center font-ui
      text-xs font-normal whitespace-nowrap text-background opacity-0
      transition-opacity duration-(--duration-hover) ease-hover
      [:is(button,a):focus_&]:opacity-100
      [:is(button,a):hover_&]:opacity-100
    "
			>
				{value}
			</span>
		),
	});
}
