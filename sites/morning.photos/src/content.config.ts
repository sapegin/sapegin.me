import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';
import type { Album } from './types/Album';
import type { Photo } from './types/Photo';

// Photos
const photos = defineCollection({
	loader: glob({ pattern: '*.json', base: '../../content/photos' }),
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
	loader: glob({ pattern: '*.md', base: '../../content/series' }),
	schema: z.object({
		title: z.string(),
		pageTitle: z.string(),
		keyword: z.string(),
		cover: z.string(),
		position: z.number(),
	}) satisfies z.ZodType<Album>,
});

// Zines
const zines = defineCollection({
	loader: glob({ pattern: '*.md', base: '../../content/zines' }),
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
	zines,
};
