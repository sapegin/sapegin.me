import { z, defineCollection } from 'astro:content';

const baseSchema = z.object({
	title: z.string(),
	tags: z.array(z.string()),
	date: z.date(),
	description: z.string().optional(),
	draft: z.boolean().optional(),
});

// Blog posts
const blog = defineCollection({
	type: 'content',
	schema: baseSchema.extend({
		source: z.string().optional(),
	}),
});

// Squirrelsong themes
const squirrels = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		app: z.string(),
		id: z.string(),
		aliases: z.preprocess(
			(x) => (typeof x === 'string' ? x.split(', ') : []),
			z.array(z.string())
		),
		light: z.boolean(),
		dark: z.boolean(),
	}),
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
	squirrels,
	zines,
};
