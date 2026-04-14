import { upperFirst } from './upperFirst';

/**
 * Convert the given text to Sentence case.
 */
export function toSentenceCase(text: string) {
	return upperFirst(
		text
			.trim()
			.replaceAll(/([a-z])([A-Z])/g, '$1 $2')
			.replaceAll(/[-_]+/g, ' ')
			.replaceAll(/\s+/g, ' ')
			.toLowerCase()
	);
}
