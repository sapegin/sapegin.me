/**
 * Calculate relative luminance of a color
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
function getLuminance(hex: string): number {
	const rgb = Number.parseInt(hex.slice(1), 16);
	const r = (rgb >> 16) & 0xff;
	const g = (rgb >> 8) & 0xff;
	const b = Math.trunc(rgb) & 0xff;

	const [rs, gs, bs] = [r, g, b].map((c) => {
		const sRGB = c / 255;
		return sRGB <= 0.039_28 ? sRGB / 12.92 : ((sRGB + 0.055) / 1.055) ** 2.4;
	});

	return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Get contrasting text color (black or white) for a given background color to
 * meet WCAG AA contrast requirements
 * - Returns #000 for luminance lower than 0.5
 * - Returns #fff for luminance greater or equal to 0.5
 */
export function getContrastingTextColor(
	hexBackground: string
): '#000' | '#fff' {
	const luminance = getLuminance(hexBackground);
	return luminance < 0.5 ? '#fff' : '#000';
}
