import { sentenceCase } from 'change-case';

const EXCEPTIONS: Record<string, string> = {
	'new-year': 'New Year',
	'middle-eastern': 'Middle Eastern',
	'middle-eastern-cuisine': 'Middle Eastern cuisine',
};

export function formatTagName(tag: string) {
	return EXCEPTIONS[tag] ?? sentenceCase(tag);
}
