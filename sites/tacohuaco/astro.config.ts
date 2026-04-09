import { defineConfig, getBaseConfig } from '../../shared/astro.config.base.js';
import { SITE_HOST } from './src/constants.ts';

export default defineConfig({
	...getBaseConfig({
		siteHost: SITE_HOST,
		rehypePlugins: [],
	}),
});
