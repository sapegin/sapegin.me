import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import Icon, { IconName } from './Icon';

const Link = styled.a((p) =>
	css({
		color: 'light',
		transition: 'color 0.2s ease-in-out',
		'&:focus': {
			outline: p.theme.borders.focus,
			outlineColor: p.theme.colors.focus,
			outlineOffset: p.theme.focusOutlineOffset,
		},
		'&:hover, &:active': {
			color: 'base',
		},
	})
);

type Props = React.ComponentProps<typeof Link> & {
	icon: IconName;
};

export default function IconLink({ icon, ...props }: Props) {
	return (
		<Link {...props}>
			<Icon icon={icon} />
		</Link>
	);
}
