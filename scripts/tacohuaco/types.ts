import type { Asset } from '../../sites/tacohuaco/src/types/Asset';
import type { Month } from '../../sites/tacohuaco/src/util/olivier';

export type Maybe<T> = T | null;

export interface RecipeModelRaw {
	createdAt: string;
	cuisines: string[];
	description: Maybe<string>;
	images: Asset[];
	ingredients: string;
	keywords: Maybe<string>;
	notes: Maybe<string>;
	overnight: boolean;
	slug: string;
	source: Maybe<string>;
	steps: string;
	tags: string[];
	time: Maybe<number>;
	title: string;
	titleEnglish: Maybe<string>;
	tools: Maybe<string>;
	yields: Maybe<string>;
	subrecipes: Pick<
		RecipeModelRaw,
		'slug' | 'title' | 'ingredients' | 'steps' | 'tools'
	>[];
	recipes: Pick<
		RecipeModelRaw,
		| 'createdAt'
		| 'cuisines'
		| 'images'
		| 'ingredients'
		| 'overnight'
		| 'slug'
		| 'subrecipes'
		| 'tags'
		| 'time'
		| 'title'
	>[];
}

export interface TipModelRaw {
	content: string;
	tags: string[];
	ingredient: Maybe<string>;
}

export interface IngredientModelRaw {
	name: string;
	warnings: Maybe<string>;
}

export interface TipModel {
	content: string;
	tags: string[];
	ingredient?: string;
}

export interface IngredientModel {
	name: string;
	warnings: string[];
}

// Each section is a comma-separated list of recipe names
// 'month recipe1, month recipe1'
export interface CalendarMonthModelRaw {
	// Month name or 'all' for generic recipes
	name: string;
	breakfasts: string;
	lunches: string;
	specials: string;
	sweets: string;
	snacks: string;
}

// Each section contains a nested array of recipe names:
// [['month recipe1', 'month recipe1'], ['generic recipe1', 'generic recipe1']]
export interface CalendarMonth {
	name: string;
	month: Month;
	breakfasts: [string[], string[]];
	lunches: [string[], string[]];
	specials: [string[], string[]];
	sweets: [string[], string[]];
	snacks: [string[], string[]];
}
