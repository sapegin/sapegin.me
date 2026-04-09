import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';
import { ChartStepType } from './types/Recipe';
import { IngredientKind, Month } from './util/olivier';

// The sync script serializes IngredientKind as numeric indices (0-5).
// Map them back to string values at schema level.
const INGREDIENT_KIND_BY_INDEX: Record<number, IngredientKind> = {
	0: IngredientKind.Vegan,
	1: IngredientKind.Vegetarian,
	2: IngredientKind.Poultry,
	3: IngredientKind.Fish,
	4: IngredientKind.Meat,
	5: IngredientKind.Unknown,
};

const ingredientKind = z
	.number()
	.transform((v) => INGREDIENT_KIND_BY_INDEX[v] ?? IngredientKind.Unknown);

const amount = z.string().or(z.number());

const asset = z.object({
	url: z.string(),
	handle: z.string(),
	width: z.number(),
	height: z.number(),
});

const ingredientWithInfo = z.object({
	name: z.string(),
	minAmount: z.optional(amount),
	maxAmount: z.optional(amount),
	unit: z.string().optional(),
	modifier: z.string().optional(),
	comment: z.string().optional(),
	kind: ingredientKind,
	hasGluten: z.boolean(),
	hasDairy: z.boolean(),
	hasSugar: z.boolean(),
	seasons: z.array(z.number()),
	subrecipeSlug: z.string().optional(),
});

const ingredientsSection = z.object({
	name: z.string(),
	ingredients: z.array(z.array(ingredientWithInfo)),
});

const step = z.object({
	text: z.string(),
	pause: z.boolean(),
});

const stepsSection = z.object({
	name: z.string(),
	steps: z.array(step),
});

const yields = z.object({
	amount: z.number(),
	unit: z.string(),
});

const subrecipe = z.object({
	slug: z.string(),
	title: z.string(),
});

const chartStepType = z.nativeEnum(ChartStepType);

const chartStep = z.object({
	type: chartStepType,
	subtype: z.string().optional(),
	value: z.string().optional(),
	overnight: z.boolean(),
	covered: z.boolean(),
});

const fragment = z.object({
	createdAt: z.coerce.date(),
	cuisines: z.array(z.string()),
	dairyFree: z.boolean(),
	favorite: z.boolean(),
	glutenFree: z.boolean(),
	images: z.array(asset),
	ingredients: z.array(ingredientsSection),
	keywords: z.array(z.string()),
	lowGluten: z.boolean(),
	noAddedSugar: z.boolean(),
	overnight: z.boolean(),
	seasons: z.array(z.number()),
	slug: z.string(),
	tags: z.array(z.string()),
	time: z.number().optional(),
	title: z.string(),
	titleEnglish: z.string().optional(),
	vegan: z.boolean(),
	vegetarian: z.boolean(),
});

const recipes = defineCollection({
	loader: glob({ pattern: '*.json', base: '../../content/recipes' }),
	schema: fragment.extend({
		description: z.string().optional(),
		notes: z.array(z.string()),
		chart: z.array(chartStep),
		recipes: z.array(subrecipe),
		source: z.string().optional(),
		steps: z.array(stepsSection),
		subrecipes: z.array(subrecipe),
		tips: z.array(z.string()),
		tools: z.array(z.string()),
		warnings: z.array(z.string()),
		yields,
	}),
});

const calendarMonths = defineCollection({
	loader: glob({
		pattern: '*.json',
		base: '../../content/calendarMonths',
	}),
	schema: z.object({
		name: z.string(),
		month: z.number(),
		breakfasts: z.tuple([z.array(z.string()), z.array(z.string())]),
		lunches: z.tuple([z.array(z.string()), z.array(z.string())]),
		specials: z.tuple([z.array(z.string()), z.array(z.string())]),
		sweets: z.tuple([z.array(z.string()), z.array(z.string())]),
		snacks: z.tuple([z.array(z.string()), z.array(z.string())]),
	}),
});

export const collections = {
	recipes,
	calendarMonths,
};
