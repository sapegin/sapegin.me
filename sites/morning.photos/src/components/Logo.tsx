import { css } from '../../styled-system/css';
import { Text } from './Text';

export function Logo() {
	return (
		<Text variant="menu">
			<a
				href="/"
				className={css({
					display: 'inline-block',
					fontWeight: 'bold',
					textDecoration: 'none',
					color: 'primary',
					background: `linear-gradient(token(colors.gradient1), token(colors.gradient2))`,
					backgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					transitionDuration: 'hover',
					transitionTimingFunction: 'hover',
					transitionProperty: 'all',
					_hover: {
						background:
							'linear-gradient(token(colors.accent), token(colors.primary))',
						backgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						textDecoration: 'underline',
					},
					_focusVisible: {
						outline: 'focus',
						outlineOffset: 'token(borderWidths.focusOutlineOffset)',
						borderRadius: '0.05em',
					},
				})}
			>
				Morning.photos
			</a>
		</Text>
	);
}
