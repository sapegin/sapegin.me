import { createTheme as createThemeBase } from '@vanilla-extract/css';
import { createGlobalTheme } from './createGlobalTheme';
import type { Tokens } from './types';
import '../styles/base.css';
import '../styles/print.css';

// HACK: These types are copied from vanilla-extract since they don't export anything
type CSSVarFunction =
	| `var(--${string})`
	| `var(--${string}, ${string | number})`;
type Primitive = string | boolean | number | null | undefined;
type MapLeafNodes<Obj, LeafType> = {
	[Prop in keyof Obj]: Obj[Prop] extends Primitive
		? LeafType
		: Obj[Prop] extends Record<string | number, any>
		? MapLeafNodes<Obj[Prop], LeafType>
		: never;
};
type NullableTokens = {
	[key: string]: string | NullableTokens | null;
};
type ThemeVars<ThemeContract extends NullableTokens> = MapLeafNodes<
	ThemeContract,
	CSSVarFunction
>;

export function createTheme<ThemeTokens extends Tokens>(
	theme: ThemeTokens
): [className: string, vars: ThemeVars<ThemeTokens>] {
	createGlobalTheme(theme);
	return createThemeBase(theme);
}
