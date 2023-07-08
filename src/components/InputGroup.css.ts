import { style, globalStyle } from '@vanilla-extract/css';
import { mediaQueries } from '../tamia/primitives/theme';
import { vars } from '../styles/theme.css';

export const inputGroup = style({
	padding: 0,
	borderWidth: 0,
});

globalStyle(`${inputGroup} input:first-of-type`, {
	position: 'relative',
	width: '100%',
	'@media': {
		[mediaQueries.mobileOnly]: {
			borderBottom: 'none',
		},
		[mediaQueries.tablet]: {
			borderRight: 'none',
		},
	},
});
globalStyle(`${inputGroup} input:last-of-type::after`, {
	content: '',
	position: 'absolute',
	'@media': {
		[mediaQueries.mobileOnly]: {
			top: 0,
			left: -4,
			right: -4,
			borderBottom: '2px solid',
		},
		[mediaQueries.tablet]: {
			left: 0,
			top: -4,
			bottom: -4,
			borderRight: '2px solid',
		},
	},
});

globalStyle(`${inputGroup} button:last-of-type`, {
	position: 'relative',
	width: '100%',
	'@media': {
		[mediaQueries.mobileOnly]: {
			borderTop: 'none',
		},
		[mediaQueries.tablet]: {
			borderLeft: 'none',
		},
	},
});
globalStyle(`${inputGroup} button:last-of-type::after`, {
	content: '',
	position: 'absolute',
	'@media': {
		[mediaQueries.mobileOnly]: {
			top: 0,
			left: -4,
			right: -4,
			borderTop: '2px solid',
		},
		[mediaQueries.tablet]: {
			left: 0,
			top: -4,
			bottom: -4,
			borderLeft: '2px solid',
		},
	},
});

// HACK: ::after doesn't work on <input>, so we change the color of the button's
// border instead
globalStyle(`${inputGroup}:focus-within button:last-of-type::after`, {
	borderLeftColor: vars.colors.hover,
});
