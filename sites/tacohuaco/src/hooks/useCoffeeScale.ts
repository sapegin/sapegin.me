import { useMemo, useState } from 'react';
import type { CoffeeRecipe } from '../util/cafe/types';

function getPrevAmount(amount: number) {
	if (amount === 50) {
		return amount;
	}

	return amount - 50;
}

function getNextAmount(amount: number) {
	return amount + 50;
}

export function useCoffeeScale({ defaultAmount }: CoffeeRecipe) {
	const isScalingEnabled = typeof window !== 'undefined';

	const [currentAmount, setCurrentAmount] = useState(defaultAmount);

	const handleLess = useMemo(
		() => () => setCurrentAmount((x) => getPrevAmount(x)),
		[]
	);
	const handleMore = useMemo(
		() => () => setCurrentAmount((x) => getNextAmount(x)),
		[]
	);

	return {
		isScalingEnabled,
		currentAmount,
		handleLess,
		handleMore,
	};
}
