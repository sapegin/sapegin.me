import type { PatternConfig } from '@pandacss/types';

function definePattern<T extends PatternConfig>(config: T) {
	return config;
}

// Patterns
export const patterns = {
	/**
	 * Generic container with responsive props to control whitespace, layout,
	 * positioning and colors.
	 */
	box: definePattern({
		transform(props) {
			return props;
		},
	}),

	/**
	 * Responsive Flexbox container, based on the `box` but has `display: flex` by default.
	 */
	flex: definePattern({
		transform(props) {
			return {
				display: 'flex',
				...props,
			};
		},
	}),

	/**
	 * Stacking layout: horizontal, vertical, and responsive. Adds equal amount
	 * of spacing between children.
	 */
	stack: definePattern({
		properties: {
			/** Stacking direction */
			direction: { type: 'property', value: 'flexDirection' },
		},
		defaultValues: {
			direction: 'column',
		},
		transform(props) {
			const { direction, ...rest } = props;
			return {
				display: 'flex',
				flexDirection: direction,
				...rest,
			};
		},
	}),

	/**
	 * Generic CSS Grid layout component. Based on the `box` but with `display: grid` by default.
	 */
	grid: definePattern({
		properties: {
			/** Magic auto layout */
			auto: { type: 'enum', value: ['narrow', 'wide'] },
		},
		transform(props) {
			const { auto, ...rest } = props;
			const autoWidth: Record<string, string> = {
				narrow: '200px',
				wide: '300px',
			};
			return {
				display: 'grid',
				gridTemplateColumns:
					typeof auto === 'string' && auto in autoWidth
						? `repeat(auto-fit, minmax(${autoWidth[auto]},1fr))`
						: undefined,
				...rest,
			};
		},
	}),

	/**
	 * Text link.
	 */
	link: definePattern({
		jsxElement: 'a',
		transform(props) {
			return {
				...props,
				padding: 0,
				background: 'none',
				border: 0,
				font: 'inherit',
				lineHeight: 'inherit',
				textDecoration: 'underline',
				color: 'primary',
				_visited: {
					color: 'primary',
				},
				_hover: {
					color: 'accent',
					cursor: 'pointer',
				},
				_focusVisible: {
					outline: 'focus',
					outlineOffset: 'var(--focus-outline-offset, 2px)',
				},
			};
		},
	}),

	/**
	 * “Quoted” link component, a link where only content inside the `<u>` tag is underlined. Useful for links in quotes or links with images.
	 */
	quotedLink: definePattern({
		jsxElement: 'a',
		transform(props) {
			return {
				...props,
				padding: 0,
				background: 'none',
				border: 0,
				font: 'inherit',
				lineHeight: 'inherit',
				textDecoration: 'none',
				color: 'inherit',
				_hover: {
					cursor: 'pointer',
				},
				_focusVisible: {
					outline: 'focus',
					outlineOffset: 'var(--focus-outline-offset, 2)',
				},
				'& u': {
					color: 'primary',
					_hover: {
						color: 'accent',
					},
				},
			};
		},
	}),

	/**
	 * TODO
	 */
	visuallyHidden: definePattern({
		transform(props) {
			return {
				srOnly: true,
				...props,
			};
		},
	}),
};
