import fs from 'fs';
import path from 'path';
import stripJsonComments from 'strip-json-comments';
import shiki from 'shiki';
import langTSX from 'shiki/languages/tsx.tmLanguage.json';
import langMarkdown from 'shiki/languages/markdown.tmLanguage.json';
import langCss from 'shiki/languages/css.tmLanguage.json';
import langHtml from 'shiki/languages/html.tmLanguage.json';
import langJson from 'shiki/languages/json.tmLanguage.json';
import langPhp from 'shiki/languages/php.tmLanguage.json';
import langPython from 'shiki/languages/python.tmLanguage.json';

const THEMES_DIR = 'squirrelsong-master';

const lightTheme = JSON.parse(
	stripJsonComments(
		fs
			.readFileSync(
				path.join(
					THEMES_DIR,
					'light/VSCode/SquirrelsongLight/SquirrelsongLight.color-theme.json'
				)
			)
			.toString()
	)
);
const darkTheme = JSON.parse(
	stripJsonComments(
		fs
			.readFileSync(
				path.join(
					THEMES_DIR,
					'dark/VSCode/SquirrelsongDark/SquirrelsongDark.color-theme.json'
				)
			)
			.toString()
	)
);

export type CodeLang =
	| 'tsx'
	| 'markdown'
	| 'css'
	| 'html'
	| 'json'
	| 'php'
	| 'python';
export type CodeTheme = 'light' | 'dark';

const highlighter = await shiki.getHighlighter({
	// @ts-ignore
	themes: [lightTheme, darkTheme],
	langs: [
		{
			id: 'tsx',
			scopeName: langTSX.scopeName,
			// @ts-ignore
			grammar: langTSX,
		},
		{
			id: 'markdown',
			scopeName: langMarkdown.scopeName,
			// @ts-ignore
			grammar: langMarkdown,
		},
		{
			id: 'css',
			scopeName: langCss.scopeName,
			// @ts-ignore
			grammar: langCss,
		},
		{
			id: 'html',
			scopeName: langHtml.scopeName,
			// @ts-ignore
			grammar: langHtml,
		},
		{
			id: 'json',
			scopeName: langJson.scopeName,
			// @ts-ignore
			grammar: langJson,
		},
		{
			id: 'php',
			scopeName: langPhp.scopeName,
			// @ts-ignore
			grammar: langPhp,
		},
		{
			id: 'python',
			scopeName: langPython.scopeName,
			// @ts-ignore
			grammar: langPython,
		},
	],
});

export function highlightCode(code: string, lang: CodeLang, theme: CodeTheme) {
	return highlighter.codeToHtml(code, {
		lang,
		theme: theme === 'light' ? 'Squirrelsong Light' : 'Squirrelsong Dark',
	});
}
