import type { ImageRaw, Image } from '../types/Image';

export const unwrapImage = (x: ImageRaw): Image => ({
	url: x.default.src.replace(/^.*\/public(.*)\?.*$/, '$1'),
	width: x.default.width,
	height: x.default.height,
});
