import {
	ARTICLES,
	CONNECTORS,
	RANGE_SEPARATORS,
	UNITLESS,
} from './langs/en/translations.ts';
import { UNITS } from './langs/en/units.ts';
import type { Ingredient } from './types.ts';

type State = 'BEGINNING' | 'NUMBER' | 'UNIT' | 'NAME' | 'COMMENT';

const ALL_UNITS = UNITS.flat(/* Flatten 2 dimensional array */ 2);

const isNumber = (s: string) => /^[\d,./–—-]+$/.test(s);
const isRangeSeparator = (s: string) =>
	RANGE_SEPARATORS.includes(s.toLocaleLowerCase());
const isUnit = (s: string) => ALL_UNITS.includes(s.toLowerCase());
const isUnitless = (s: string) => UNITLESS.includes(s.toLowerCase());
const isArticle = (s: string) => ARTICLES.includes(s.toLowerCase());
const isConnector = (s: string) => CONNECTORS.includes(s.toLowerCase());
const isLastWordOfName = (s: string) => s.endsWith(';');
const trimSemicolon = (s: string) => s.replace(/;$/, '');
const append = (text: string, s: string) => (text === '' ? s : `${text} ${s}`);

/**
 * Parse an option of recipe ingredient, like
 * 1-3 g apples; in small dice
 */
export function parseOption(text: string): Ingredient {
	const tokens = text.split(/\s+/);
	let state: State = 'BEGINNING';
	let name = '';
	let amount = '';
	let unit = '';
	let comment = '';
	let token = tokens.shift();
	while (token) {
		switch (state) {
			case 'BEGINNING': {
				if (isNumber(token) || isArticle(token) || isUnitless(token)) {
					amount = token;
					state = 'NUMBER';
				} else {
					state = 'NAME';
					continue;
				}
				break;
			}
			case 'NUMBER': {
				if (isConnector(token)) {
					// Ignore
				} else if (isRangeSeparator(token)) {
					amount += '-';
				} else if (isNumber(token) || isUnitless(token)) {
					amount = append(amount, token);
				} else if (isUnit(token)) {
					unit = token;
					state = 'UNIT';
				} else {
					state = 'NAME';
					continue;
				}
				break;
			}
			case 'UNIT': {
				state = 'NAME';
				continue;
			}
			case 'NAME': {
				if (isConnector(token)) {
					// Ignore
				} else if (isLastWordOfName(token)) {
					name = append(name, trimSemicolon(token));
					state = 'COMMENT';
				} else {
					name = append(name, token);
				}
				break;
			}
			case 'COMMENT': {
				comment = append(comment, token);
				break;
			}
		}

		token = tokens.shift();
	}

	const [min, max] = amount.split(/\s*-\s*/);

	// Adjust for cases when the name of an ingredient is a unit too (like cloves)
	if (name === '') {
		name = unit;
		unit = '';
	}

	return {
		name,
		minAmount: min || undefined,
		maxAmount: max || min || undefined,
		unit: unit || undefined,
		comment: comment || undefined,
	};
}

/**
 * Parse a line of recipe ingredient, like
 * 30 g of hazelnut flour / 15 g coconut flour
 */
export function parse(text: string): readonly Ingredient[] {
	return text.split(/\s+\/\s+/).map((x) => parseOption(x));
}
