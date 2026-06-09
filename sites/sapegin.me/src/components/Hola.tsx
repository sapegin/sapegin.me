import { IconCoffee } from '@shared/components/IconCoffee';
import { type ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export function Hola({ children }: Props) {
	return (
		<h1 className="heading-1 inline-flex items-baseline gap-2">
			<span
				className="from-accent to-primary bg-linear-to-b bg-clip-text text-[clamp(2.6rem,7vw,4rem)] [-webkit-text-fill-color:transparent]"
			>
				{children}
			</span>
			<IconCoffee variant="hola" className="relative top-0.75" />
		</h1>
	);
}
