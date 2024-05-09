import { defineConfig } from '@pandacss/dev';
import tamia from 'tamia';
import { theme } from './src/theme';

export default defineConfig({
	...theme,

	presets: [tamia],

	// Opt out of all default
	eject: true,

	// Output directory
	outdir: 'styled-system',

	// Generate React components based on patterns
	jsxFramework: 'react',

	// Don't include CSS reset
	preflight: false,

	// Use Lightning CSS instead of PostCSS
	lightningcss: true,

	// Minify production CSS
	minify: true,

	// Where to look for CSS declarations
	include: ['./src/**/*.{js,jsx,ts,tsx,astro}'],

	// Files to exclude
	exclude: [],
});
