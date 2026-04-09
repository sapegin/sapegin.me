import type { Ingredient } from '../util/olivier/types.ts';
import { type Asset } from './Asset.ts';

export type RecipeIngredient = Ingredient & {
	subrecipeSlug?: string;
};

export interface IngredientsSection {
	name: string;
	ingredients: RecipeIngredient[][];
}

export interface Step {
	text: string;
	pause: boolean;
}

export interface StepsSection {
	name: string;
	steps: Step[];
}

export interface Yields {
	amount: number;
	unit: string;
}

// Just enough data to render a recipe card and search
export type RecipeFragment = Pick<
	Recipe,
	| 'createdAt'
	| 'cuisines'
	| 'images'
	| 'ingredients'
	| 'keywords'
	| 'overnight'
	| 'slug'
	| 'tags'
	| 'time'
	| 'title'
	| 'titleEnglish'
>;

export interface Recipe {
	createdAt: Date;
	title: string;
	titleEnglish?: string;
	description?: string;
	overnight: boolean;
	// TODO: Cuisines should be defined as tags and probably rendered with an emoji
	// and sorted in front of other tags
	cuisines: string[];
	tags: string[];
	ingredients: IngredientsSection[];
	steps: StepsSection[];
	keywords: string[];
	slug: string;
	source?: string;
	time?: number;
	tools: string[];
	notes: string[];
	tips: string[];
	warnings: string[];
	yields: Yields;
	images: Asset[];
	subrecipes: Pick<Recipe, 'slug' | 'title'>[];
	recipes: Pick<Recipe, 'slug' | 'title'>[];
}
