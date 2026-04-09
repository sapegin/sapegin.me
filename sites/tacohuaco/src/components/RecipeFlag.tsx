import { type ReactNode } from 'react';
import type { FlagName } from '../types/Flags';
import { Tooltip } from './Tooltip';

interface Props {
	type: FlagName;
	hasLinks: boolean;
}

interface FlagProps {
	title?: string;
	children?: ReactNode;
	hasLinks: boolean;
	href?: string;
	color?: string;
}

const FlagLink = ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
	<a
		className="
    rounded-full text-inherit no-underline
    focus-visible:outline-[3px] focus-visible:outline-offset-2
    focus-visible:outline-accent
  "
		{...props}
	>
		{children}
	</a>
);

const Circle = ({
	children,
	title,
	color,
	href,
	hasLinks,
}: FlagProps) => {
	const body = (
		<span
			aria-hidden="true"
			className="
     block h-[2em] w-[2em] rounded-full border-[0.2em] p-[0.3em] text-center
     font-ui text-xs font-bold text-background
     [a:hover_&]:cursor-pointer [a:hover_&]:brightness-110
     [a:hover_&]:saturate-[1.2]
   "
			style={{ backgroundColor: color }}
		>
			{children}
		</span>
	);
	return hasLinks ? (
		<Tooltip value={title ?? ''}>
			{({ triggerProps, tooltipNode }) => (
				<FlagLink href={href} {...triggerProps}>
					{tooltipNode}
					{body}
				</FlagLink>
			)}
		</Tooltip>
	) : (
		<span title={title}>
			<span className="sr-only">{title}</span>
			{body}
		</span>
	);
};

export function RecipeFlag({ type, ...props }: Props) {
	switch (type) {
		case 'vegan':
			return <Circle href="/flags/vegan/" title="Vegan" {...props} color="#6fa565">VG</Circle>;
		case 'vegetarian':
			return <Circle href="/flags/vegetarian/" title="Vegetarian" {...props} color="#ebd660">V</Circle>;
		case 'glutenFree':
			return <Circle href="/flags/gluten-free/" title="Gluten free" {...props} color="#6c94bd">GF</Circle>;
		case 'lowGluten':
			return <Circle href="/flags/low-gluten/" title="Low gluten" {...props} color="#78bdc9">LG</Circle>;
		case 'dairyFree':
			return <Circle href="/flags/dairy-free/" title="Dairy free" {...props} color="#a67bb1">DF</Circle>;
		case 'noAddedSugar':
			return <Circle href="/flags/no-added-sugar/" title="No refined sugar" {...props} color="#887676">NS</Circle>;
	}
}
