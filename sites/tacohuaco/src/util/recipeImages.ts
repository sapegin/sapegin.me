export function getRecipeImageUrl(slug: string) {
	return `/images/recipes/${slug}.avif`;
}

export function getRecipeThumbnailUrl(slug: string) {
	return `/images/recipes/${slug}_thumb.avif`;
}
