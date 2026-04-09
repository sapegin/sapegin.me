import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

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

const fragment = z.object({
	createdAt: z.coerce.date(),
	cuisines: z.array(z.string()),
	images: z.array(asset),
	ingredients: z.array(ingredientsSection),
	keywords: z.array(z.string()),
	overnight: z.boolean(),
	slug: z.string(),
	tags: z.array(z.string()),
	time: z.number().optional(),
	title: z.string(),
	titleEnglish: z.string().optional(),
});

const recipes = defineCollection({
	loader: glob({ pattern: '*.json', base: '../../content/recipes' }),
	schema: fragment.extend({
		description: z.string().optional(),
		notes: z.array(z.string()),
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

export const collections = {
	recipes,
};
