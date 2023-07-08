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

export const collections = {
	blog,
	til,
};
