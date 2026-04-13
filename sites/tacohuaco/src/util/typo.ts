import richtypo from 'richtypo';
import rules, { definitions, numberOrdinals } from 'richtypo/rules/en';

const { thinspace } = definitions;

type MaybeText = string | undefined | null;

const degreeSigns = (text: string) =>
	text.replaceAll(/\b(\d+)\s?[°˚]?\s?C/g, `$1${thinspace}˚C`);

const numberRanges = (text: string) =>
	text.replaceAll(/\b(\d+)-(\d+)\b/g, '$1–$2');

const dimensions = (text: string) =>
	text.replaceAll(/\b(\d+)x(\d+)\b/g, '$1×$2');

const apostrophes = (text: string) =>
	text.replaceAll(/([a-z])'([a-z])/g, '$1’$2');

const fractions = (text: string) =>
	text
		.replaceAll('1/2', '½')
		.replaceAll('1/3', '⅓')
		.replaceAll('2/3', '⅔')
		.replaceAll('1/4', '¼')
		.replaceAll('3/4', '¾');

export const typo = (text: MaybeText) =>
	richtypo(
		[
			...rules,
			degreeSigns,
			numberRanges,
			dimensions,
			numberOrdinals,
			apostrophes,
			fractions,
		],
		text ?? ''
	);
