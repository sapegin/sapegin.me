import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { theme } from './theme.css';
import { responsiveProperties } from '../tamia/primitives/atoms.css';

const colors = {
	...theme.colors,
	inherit: 'inherit',
};

const colorProperties = defineProperties({
	conditions: {
		...theme.conditions,
		default: {},
		hover: { selector: '&:hover' },
		active: { selector: '&:active' },
		focus: { selector: '&:focus' },
	},
	defaultCondition: ['mobile', 'default'],
	properties: {
		color: colors,
		backgroundColor: colors,
		borderColor: colors,
	},
	shorthands: {
		bg: ['backgroundColor'],
	},
});

const textProperties = defineProperties({
	conditions: theme.conditions,
	defaultCondition: 'mobile',
	properties: {
		fontFamily: theme.fonts,
		fontWeight: theme.fontWeights,
		fontSize: theme.fontSizes,
		lineHeight: theme.lineHeights,
		letterSpacing: theme.letterSpacings,
		fontStyle: ['italic', 'normal'],
		textTransform: ['uppercase'],
		whiteSpace: ['nowrap'],
	},
	shorthands: {},
});

export const sprinkles = createSprinkles(
	responsiveProperties,
	colorProperties,
	textProperties
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
