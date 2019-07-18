import React from 'react';
import { Text } from 'tamia';

type Props = {
	head: React.ReactNode;
	children: React.ReactNode;
};

export default function Lead({ head, children }: Props) {
	return (
		<p>
			<Text
				as="strong"
				display="block"
				marginLeft="-0.05ex"
				letterSpacing="0.05ex"
				fontWeight={300}
				lineHeight="1.2"
				fontSize="xxxl"
			>
				{head}
			</Text>
			<Text as="span" display="block" lineHeight="1.4" fontSize="xl">
				{children}
			</Text>
		</p>
	);
}
