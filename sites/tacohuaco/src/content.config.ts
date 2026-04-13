import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const recipes = defineCollection({
	loader: glob({ pattern: '*.json', base: '../../content/recipes' }),
	schema: z.object({
		createdAt: z.coerce.date(),
		description: z.string().optional(),
		imageUrl: z.string().optional(),
		ingredients: z.string(),
		keywords: z.array(z.string()),
		notes: z.string().optional(),
		overnight: z.boolean(),
		slug: z.string(),
		source: z.string().optional(),
		steps: z.string(),
		tags: z.array(z.string()),
		thumbnailUrl: z.string().optional(),
		time: z.string().optional(),
		title: z.string(),
		titleEnglish: z.string().optional(),
		tools: z.string().optional(),
		usedBy: z.array(z.string()),
		yields: z.string().optional(),
	}),
});

export const collections = {
	recipes,
};
