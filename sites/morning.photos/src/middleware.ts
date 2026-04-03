import { defineMiddleware } from 'astro/middleware';

export const onRequest = defineMiddleware(async (_context, next) => {
	const response = await next();

	if (
		import.meta.env.MODE === 'development' &&
		response.headers?.get('content-type') === 'text/html'
	) {
		// Patch the dev server headers to fix broken charset
		response.headers.set('content-type', 'text/html;charset=utf-8');
	}
});
