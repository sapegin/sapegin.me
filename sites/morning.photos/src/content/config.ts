import { z, defineCollection } from 'astro:content';
import type { Photo } from '../types/Photo';
import type { Album } from '../types/Album';

// Photos
const photos = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		title: z.string(),
		slug: z.string(),
		caption: z.string().optional(),
		location: z.string().optional(),
		modified: z.coerce.date(),
		timestamp: z.coerce.date().optional(),
		formattedDate: z.string().optional(),
		keywords: z.array(z.string()),
		rating: z.number(),
		width: z.number(),
		height: z.number(),
		color: z.string(),
	}) satisfies z.ZodType<Photo>,
});

// Series
const series = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		pageTitle: z.string(),
		keyword: z.string(),
		cover: z.string(),
		position: z.number(),
	}) satisfies z.ZodType<Album>,
});

// Blog posts
const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()),
		date: z.date(),
		description: z.string().optional(),
		draft: z.boolean().optional(),
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
	photos,
	series,
	blog,
	zines,
};
