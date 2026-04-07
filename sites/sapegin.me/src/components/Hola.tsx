import { IconCoffee } from '@shared/components/IconCoffee';
import type { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export function Hola({ children }: Props) {
	return (
		<h1 className="inline-flex items-baseline gap-2 heading-1">
			<span
				className="
      bg-linear-to-b from-accent to-primary bg-clip-text
      text-[clamp(2.6rem,7vw,4rem)] [-webkit-text-fill-color:transparent]
    "
			>
				{children}
			</span>
			<IconCoffee variant="hola" className="relative top-[3px]" />
		</h1>
	);
}
