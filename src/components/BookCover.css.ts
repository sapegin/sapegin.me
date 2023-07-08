import { style, globalStyle } from '@vanilla-extract/css';

const colors = {
	shadow: 'rgba(0, 0, 0, 0.25)',
	outlineLight: 'rgba(255, 255, 255, 0.7)',
	outlineDark: 'rgba(0, 0, 0, 0.3)',
	insetLight: 'rgba(0, 0, 0, 0.15)',
	insetDark: 'rgba(255, 255, 255, 0.5)',
};

export const bookCover = style([
	{
		position: 'relative',
		boxShadow: `0 10px 20px ${colors.shadow}`,
		borderRadius: '3px',
		borderStyle: 'solid',
		borderWidth: '1px',
		borderColor: `${colors.outlineLight} ${colors.outlineDark} ${colors.outlineDark} ${colors.outlineLight}`,
		'::before': {
			content: '',
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: '10px',
			borderLeft: `1px solid ${colors.insetLight}`,
		},
		'::after': {
			content: '',
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: '11px',
			borderLeft: `1px solid ${colors.insetDark}`,
		},
	},
]);

// Override styles coming from TextContent
globalStyle(`${bookCover} img`, {
	margin: 0,
});
