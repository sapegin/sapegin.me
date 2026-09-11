import { getEntry } from 'astro:content';

export async function getBlockBody(slug: string) {
	const entry = await getEntry('blocks', slug);

	if (entry === undefined) {
		throw new Error(`Block "${slug}" not found.`);
	}

	return entry.body ?? '';
}
