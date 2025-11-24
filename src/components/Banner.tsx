import { css } from '../../styled-system/css';
import { campaigns } from '../campaigns';
import { Box } from './Box';

const { enabled: isCampaignEnabled, banner } = campaigns.washingCode;

export function Banner() {
	if (isCampaignEnabled === false) {
		return null;
	}

	return (
		<Box
			as="aside"
			width="100vw"
			marginLeft="calc(50% - 50vw)"
			bg="accent"
			textAlign="center"
			mt="-m"
			mb="s"
			px="m"
			py="s"
		>
			<a
				href="/book/"
				className={css({
					color: 'background',
					_hover: {
						textDecoration: 'none',
					},
					_focusVisible: {
						outline: '2px solid currentColor',
						outlineOffset: 'token(borderWidths.focusOutlineOffset)',
						borderRadius: 'default',
					},
				})}
			>
				{banner}
			</a>
		</Box>
	);
}
