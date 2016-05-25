/* eslint-disable no-invalid-this */

/**
 * HTML for SVG icon.
 *
 * @param {string} name
 * @returns {string}
 */
export function Icon({ name }) {
	return this.safe(this.embedFile(`icons/${name}.svg`));
}
