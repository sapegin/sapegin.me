import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Text, Stack } from 'tamia';

type Props = {
	head: React.ReactNode;
	details: React.ReactNode;
	children: React.ReactNode;
};

const Hi = styled(Text)(
	css({
		display: 'block',
		marginLeft: '-0.05ex',
		letterSpacing: '0.05ex',
		fontWeight: 300,
		lineHeight: 1.2,
		fontSize: 'xxxl',
	})
);

const Message = styled(Text)(
	css({
		display: 'block',
		lineHeight: 1.4,
		fontSize: 'xl',
	})
);

const Details = styled(Text)(
	css({
		lineHeight: 1.4,
		fontSize: 'l',
	})
);

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
