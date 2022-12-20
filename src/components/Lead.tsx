import React from 'react';
import styled from 'styled-components';
import { Text, Stack } from 'tamia';

type Props = {
	head: React.ReactNode;
	details: React.ReactNode;
	children: React.ReactNode;
};

const Hi = styled(Text)`
	display: block;
	margin-left: -0.05ex;
	letter-spacing: 0.05ex;
	font-weight: 300;
	line-height: 1.2;
	font-size: ${(p) => p.theme.fontSizes.xxxl};
`;

const Message = styled(Text)`
	display: block;
	line-height: 1.4;
	font-size: ${(p) => p.theme.fontSizes.xl};
`;

const Details = styled(Text)`
	line-height: 1.4;
	font-size: ${(p) => p.theme.fontSizes.l};
`;

export default function Lead({ head, details, children }: Props) {
	return (
		<Stack gap="m">
			<p>
				<Hi as="strong">{head}</Hi>
				<Message as="span">{children}</Message>
			</p>
			<Details>{details}</Details>
		</Stack>
	);
}
