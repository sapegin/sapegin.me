export const ALL_FLAGS = [
	'vegan',
	'vegetarian',
	'glutenFree',
	'lowGluten',
	'dairyFree',
	'noAddedSugar',
	'favorite',
] as const;

export type FlagName = (typeof ALL_FLAGS)[number];
