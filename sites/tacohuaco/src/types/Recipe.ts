import type {
	Ingredient,
	IngredientInfo,
	Month,
} from '../util/olivier/types.ts';
import { type Asset } from './Asset.ts';

export type RecipeIngredient = Ingredient &
	IngredientInfo & {
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

export const ChartStepType = {
	PreheatOven: 'PreheatOven',
	WarmToRoomTemp: 'WarmToRoomTemp',
	Refrigerate: 'Refrigerate',
	Cook: 'Cook',
	CookInOven: 'CookInOven',
	Rest: 'Rest',
	Soak: 'Soak',
} as const;

export type ChartStepType = (typeof ChartStepType)[keyof typeof ChartStepType];

export interface ChartStep {
	type: ChartStepType;
	subtype?: string;
	value?: string;
	overnight: boolean;
	covered: boolean;
}

// Just enough data to render a recipe card and search
export type RecipeFragment = Pick<
	Recipe,
	| 'createdAt'
	| 'cuisines'
	| 'dairyFree'
	| 'favorite'
	| 'glutenFree'
	| 'images'
	| 'ingredients'
	| 'keywords'
	| 'lowGluten'
	| 'noAddedSugar'
	| 'overnight'
	| 'seasons'
	| 'slug'
	| 'tags'
	| 'time'
	| 'title'
	| 'titleEnglish'
	| 'vegan'
	| 'vegetarian'
>;

export interface Recipe {
	vegan: boolean;
	vegetarian: boolean;
	glutenFree: boolean;
	lowGluten: boolean;
	dairyFree: boolean;
	noAddedSugar: boolean;
	seasons: Month[];
	createdAt: Date;
	title: string;
	titleEnglish?: string;
	description?: string;
	favorite: boolean;
	overnight: boolean;
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
	chart: ChartStep[];
	tips: string[];
	warnings: string[];
	yields: Yields;
	images: Asset[];
	subrecipes: Pick<Recipe, 'slug' | 'title'>[];
	recipes: Pick<Recipe, 'slug' | 'title'>[];
}
