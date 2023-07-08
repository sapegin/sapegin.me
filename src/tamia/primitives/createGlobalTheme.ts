import { createGlobalTheme as createGlobalThemeBase } from '@vanilla-extract/css';
import { vars, globalThemeContract } from './globalTheme.css';
import type { Tokens } from './types';

const getRestrictedTheme = (theme: Tokens, contract: Tokens) => {
	const restrictedTheme: Tokens = {};
	for (const key in contract) {
		const value = contract[key];
		if (typeof value === 'string') {
			restrictedTheme[key] = theme[key];
		} else {
			restrictedTheme[key] = getRestrictedTheme(theme[key] as Tokens, value);
		}
	}

	return restrictedTheme;
};

export const createGlobalTheme = (theme: Tokens) => {
	createGlobalThemeBase(
		':root',
		vars,
		getRestrictedTheme(theme, globalThemeContract) as any
	);
};
