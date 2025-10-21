import fs from 'node:fs';
import path from 'node:path';
import { createHighlighter, type RawTheme } from 'shiki';
import stripJsonComments from 'strip-json-comments';

const THEMES_DIR = 'squirrelsong-master';

const lightTheme = JSON.parse(
	stripJsonComments(
		fs
			.readFileSync(
				path.join(
					THEMES_DIR,
					'themes/VSCode/SquirrelsongLight/SquirrelsongLight.color-theme.json'
				)
			)
			.toString()
	)
) as RawTheme;
const darkTheme = JSON.parse(
	stripJsonComments(
		fs
			.readFileSync(
				path.join(
					THEMES_DIR,
					'themes/VSCode/SquirrelsongDark/SquirrelsongDark.color-theme.json'
				)
			)
			.toString()
	)
) as RawTheme;

export type CodeLang =
	| 'tsx'
	| 'markdown'
	| 'css'
	| 'html'
	| 'json'
	| 'php'
	| 'python';
export type CodeTheme = 'light' | 'dark';

const highlighter = await createHighlighter({
	themes: [lightTheme, darkTheme],
	langs: ['tsx', 'markdown', 'css', 'html', 'json', 'php', 'python'],
});

export function highlightCode(code: string, lang: CodeLang, theme: CodeTheme) {
	return highlighter.codeToHtml(code, {
		lang,
		theme: theme === 'light' ? 'Squirrelsong Light' : 'Squirrelsong Dark',
		// Make code block not focusable as they wrap instead of scrolling
		tabindex: false,
	});
}
