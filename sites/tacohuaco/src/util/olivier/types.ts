export type Amount = number | string;

export const Month = {
	January: 1,
	February: 2,
	March: 3,
	April: 4,
	May: 5,
	June: 6,
	July: 7,
	August: 8,
	September: 9,
	October: 10,
	November: 11,
	December: 12,
} as const;

export type Month = (typeof Month)[keyof typeof Month];

export const ALL_MONTHS = [
	Month.January,
	Month.February,
	Month.March,
	Month.April,
	Month.May,
	Month.June,
	Month.July,
	Month.August,
	Month.September,
	Month.October,
	Month.November,
	Month.December,
] as const;

export const MONTH_NAMES: Record<Month, string> = {
	[Month.January]: 'January',
	[Month.February]: 'February',
	[Month.March]: 'March',
	[Month.April]: 'April',
	[Month.May]: 'May',
	[Month.June]: 'June',
	[Month.July]: 'July',
	[Month.August]: 'August',
	[Month.September]: 'September',
	[Month.October]: 'October',
	[Month.November]: 'November',
	[Month.December]: 'December',
} as const;

export interface Ingredient {
	readonly name: string;
	readonly minAmount?: Amount;
	readonly maxAmount?: Amount;
	readonly unit?: string;
	readonly modifier?: string;
	readonly comment?: string;
}

export const IngredientKind = {
	Vegan: 'Vegan',
	Vegetarian: 'Vegetarian',
	Poultry: 'Poultry',
	Fish: 'Fish',
	Meat: 'Meat',
	Unknown: 'Unknown',
} as const;

export type IngredientKind =
	(typeof IngredientKind)[keyof typeof IngredientKind];

export interface IngredientInfo {
	readonly name: string;
	readonly kind: IngredientKind;
	readonly hasGluten: boolean;
	readonly hasDairy: boolean;
	readonly hasSugar: boolean;
	readonly seasons: readonly Month[];
}

export interface PrintIngredient
	extends Omit<Ingredient, 'minAmount' | 'maxAmount' | 'unit'> {
	readonly amount?: string;
	readonly suffix?: string;
}
