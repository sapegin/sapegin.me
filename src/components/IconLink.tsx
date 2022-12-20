import React from 'react';
import styled from 'styled-components';
import Icon, { IconName } from './Icon';

const Link = styled.a`
	color: ${(p) => p.theme.colors.light};
	transition: color 0.2s ease-in-out;
	&:focus {
		outline: ${(p) => p.theme.borders.focus};
		outline-color: ${(p) => p.theme.colors.focus};
		outline-offset: ${(p) => p.theme.focusOutlineOffset};
	}
	&:hover,
	&:active {
		color: ${(p) => p.theme.colors.base};
	}
`;

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
