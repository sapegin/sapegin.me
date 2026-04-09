import type { ReactNode } from 'react';

type Props = {
	coffeeAmount: number;
	waterAmount: number;
	children: ReactNode;
};

export function CoffeeRecipeMeta({ coffeeAmount, waterAmount, children }: Props) {
	return (
		<div className="flex flex-row gap-4 items-center">
			<span className="flex flex-row gap-3 items-baseline">
				<span className="flex flex-col items-center">
					<span className="font-body text-[2rem] tabular-nums">{coffeeAmount}&thinsp;g</span>
					<span className="font-body text-sm leading-snug -mt-2">coffee</span>
				</span>
				<span className="h-6 w-0.5 bg-secondary" />
				<span className="flex flex-col items-center">
					<span className="font-body text-[2rem] tabular-nums">{waterAmount}&thinsp;g</span>
					<span className="font-body text-sm leading-snug -mt-2">water</span>
				</span>
			</span>
			<div className="-mt-4">{children}</div>
		</div>
	);
}
