import { A_BIT, OF } from './langs/en/translations';
import type { Ingredient, PrintIngredient } from './types';

function printAmount({
	minAmount,
	maxAmount,
	unit,
}: Ingredient): string | undefined {
	if (minAmount === undefined) {
		return undefined;
	}

	return (
		[
			minAmount,
			minAmount === maxAmount ? '' : `–${maxAmount}`,
			unit ? ` ${unit}` : '',
		].join('') || undefined
	);
}

function printSuffix({ minAmount, unit }: Ingredient): string | undefined {
	if (minAmount === undefined) {
		return undefined;
	}

	return unit || minAmount === A_BIT ? OF : undefined;
}

export function printOption(ingredient: Ingredient): PrintIngredient {
	const { modifier, name, comment } = ingredient;
	return {
		amount: printAmount(ingredient),
		suffix: printSuffix(ingredient),
		modifier,
		name,
		comment,
	};
}

export function print(
	options: readonly Ingredient[]
): readonly PrintIngredient[] {
	const areAmountsSame = options.every(
		(option) =>
			option.minAmount === options[0].minAmount &&
			option.maxAmount === options[0].maxAmount
	);

	// Only keep amounts of the first option if amounts of all options are the same
	const optionsToPrint = options.map((option, index) => {
		if (areAmountsSame && index !== 0) {
			return {
				...option,
				minAmount: undefined,
				maxAmount: undefined,
			};
		}
		return option;
	});

	return optionsToPrint.map((x) => printOption(x));
}
