import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';
import { type Recipe } from './types/Recipe';

const recipes = defineCollection({
	loader: glob({ pattern: '*.json', base: '../../content/recipes' }),
	schema: z.object({
		color: z.string(),
		createdAt: z.coerce.date(),
		description: z.string().optional(),
		height: z.number(),
		ingredients: z.string(),
		keywords: z.array(z.string()),
		notes: z.string().optional(),
		overnight: z.boolean(),
		slug: z.string(),
		source: z.string().optional(),
		steps: z.string(),
		tags: z.array(z.string()),
		time: z.string().optional(),
		title: z.string(),
		titleEnglish: z.string().optional(),
		tools: z.string().optional(),
		usedBy: z.array(z.string()),
		width: z.number(),
		yields: z.string().optional(),
	}) satisfies z.ZodType<Recipe>,
});

export const collections = {
	recipes,
};
