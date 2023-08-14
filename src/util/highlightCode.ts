import shiki from 'shiki';
import langTS from 'shiki/languages/typescript.tmLanguage.json';
import langTSX from 'shiki/languages/tsx.tmLanguage.json';
import lightTheme from '../styles/shiki-themes/SquirrelsongLight.color-theme.json';

export type CodeLang = 'ts';
export type CodeTheme = 'light' | 'dark';

const highlighter = await shiki.getHighlighter({
	themes: [
		// @ts-ignore
		lightTheme,
	],
	langs: [
		{
			id: 'typescript',
			scopeName: langTS.scopeName,
			// @ts-ignore
			grammar: langTS,
			aliases: ['ts'],
		},
		{
			id: 'tsx',
			scopeName: langTSX.scopeName,
			// @ts-ignore
			grammar: langTSX,
		},
	],
});

export function highlightCode(code: string, lang: CodeLang, theme: CodeTheme) {
	return highlighter.codeToHtml(code, {
		lang,
		theme: theme === 'light' ? 'Squirrelsong Light' : 'Squirrelsong Dark',
	});
}
