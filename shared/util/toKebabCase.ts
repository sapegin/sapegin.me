/**
 * Convert the given text to kebab-case.
 */
export function toKebabCase(text: string) {
	return text
		.trim()
		.toLowerCase()
		.replaceAll(/['’]+/g, '')
		.replaceAll(/[^a-z0-9]+/g, '-')
		.replaceAll(/^-+|-+$/g, '');
}
