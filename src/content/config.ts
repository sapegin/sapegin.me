import { z, defineCollection } from 'astro:content';

const baseSchema = z.object({
	title: z.string(),
	tags: z.array(z.string()),
	date: z.date(),
	description: z.string().optional(),
});

// Blog posts
const blog = defineCollection({
	type: 'content',
	schema: baseSchema.extend({
		source: z.string().optional(),
	}),
});

// Today I learned
const til = defineCollection({
	type: 'content',
	schema: baseSchema,
});

// Zines
const zines = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		cover: z.string(),
		video: z.string().optional(),
		shop: z.string().optional(),
		meta: z.string(),
		price: z.number().optional(),
		available: z.boolean(),
		preorder: z.boolean(),
	}),
});

export const collections = {
	blog,
	til,
	zines,
};
