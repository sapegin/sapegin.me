/**
 * Make the first letter of a string uppercase.
 */
export function upperFirst(text: string) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}
