import type { ReactNode } from 'react';

interface Props {
	coffeeAmount: number;
	waterAmount: number;
	children: ReactNode;
}

export function CoffeeRecipeMeta({
	coffeeAmount,
	waterAmount,
	children,
}: Props) {
	return (
		<div className="flex flex-row items-center gap-4">
			<span className="flex flex-row items-baseline gap-3">
				<span className="flex flex-col items-center">
					<span className="font-body text-[2rem] tabular-nums">
						{coffeeAmount}&thinsp;g
					</span>
					<span className="-mt-2 font-body text-sm/snug">coffee</span>
				</span>
				<span className="h-6 w-0.5 bg-secondary" />
				<span className="flex flex-col items-center">
					<span className="font-body text-[2rem] tabular-nums">
						{waterAmount}&thinsp;g
					</span>
					<span className="-mt-2 font-body text-sm/snug">water</span>
				</span>
			</span>
			<div className="-mt-4">{children}</div>
		</div>
	);
}
