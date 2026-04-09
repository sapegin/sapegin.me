import { sentenceCase } from 'change-case';

const EXCEPTIONS: Record<string, string> = {
	NewYear: 'New Year',
};

export function formatTagName(tag: string) {
	return EXCEPTIONS[tag] ?? sentenceCase(tag);
}
