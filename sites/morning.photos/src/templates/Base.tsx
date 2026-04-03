import React from 'react';
import Provider from './Provider';

type Props = {
	children: React.ReactNode;
};

export default function Base({ children }: Props) {
	return <Provider>{children}</Provider>;
}
