import richtypo from 'richtypo';
import rules from 'richtypo/rules/en';

/*
 * Enhance typography.
 */
export default function typo(text: string): string {
	return richtypo(rules, text);
}
