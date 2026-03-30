import type { ReactNode } from 'react';
import { IconCoffee } from './IconCoffee';

interface Props {
	children: ReactNode;
}

export function Hola({ children }: Props) {
	return (
		<h1 className="heading-1">
			<span className="inline-flex flex-row items-baseline gap-2">
				<span
					className="
       bg-linear-to-b from-accent to-primary bg-clip-text
       text-[clamp(2.6rem,7vw,4rem)] [-webkit-text-fill-color:transparent]
     "
				>
					{children}
				</span>
				<span className="-mt-1.5">
					<IconCoffee />
				</span>
			</span>
		</h1>
	);
}
