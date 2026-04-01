import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const baseSchema = z.object({
	title: z.string(),
	tags: z.array(z.string()),
	date: z.date(),
	description: z.string().optional(),
	draft: z.boolean().optional(),
});

// Blog posts
const blog = defineCollection({
	loader: glob({ pattern: '*.md', base: './content/blog' }),
	schema: baseSchema.extend({
		source: z.string().optional(),
	}),
});

// Book chapters
const bookChapters = defineCollection({
	loader: glob({ pattern: '*.md', base: './content/bookChapters' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		source: z.string(),
	}),
});

// Squirrelsong themes
const squirrels = defineCollection({
	loader: glob({ pattern: '*.md', base: './content/squirrels' }),
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

export const collections = {
	blog,
	bookChapters,
	squirrels,
};
