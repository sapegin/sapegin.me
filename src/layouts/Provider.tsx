import React from 'react';
import { TamiaRoot } from 'tamia';
import theme from '../theme';

type Props = {
	title: string;
	children: React.ReactNode;
};

export default function Root({ children }: Props) {
	return <TamiaRoot theme={theme}>{children}</TamiaRoot>;
}
