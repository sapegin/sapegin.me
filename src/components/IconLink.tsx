import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import Icon, { IconName } from './Icon';

const Link = styled.a(
	css({
		color: 'light',
		transition: 'color 0.2s ease-in-out',
		'&:focus': {
			outline: '2px dotted',
			outlineColor: 'hover',
		},
		'&:hover, &:focus, &:active': {
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
