import richtypo from 'richtypo';
import rules, {
	abbrs,
	dashesBasic,
	definitions,
	ellipses,
	numberOrdinals,
	numberUnits,
	orphans,
	prepositions,
	quotes,
	shortWords,
} from 'richtypo/rules/en';

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

export const typo = (text: MaybeText) =>
	richtypo(
		[
			...rules,
			degreeSigns,
			numberRanges,
			dimensions,
			numberOrdinals,
			apostrophes,
		],
		text ?? ''
	);

export const typoLite = (text: MaybeText) =>
	richtypo(
		[
			// Common rules
			shortWords,
			prepositions,
			orphans,
			abbrs,
			dashesBasic,
			ellipses,
			numberUnits,
			// English rules
			quotes,
			// Custom rules
			degreeSigns,
			dimensions,
			numberRanges,
			numberOrdinals,
			apostrophes,
		],
		text ?? ''
	);
