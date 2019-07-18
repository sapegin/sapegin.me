import React from 'react';
import { Box } from 'tamia';

type Props = {
	level: 1 | 2;
	children: React.ReactNode;
};

const MARGINS = ['', 'calc(2rem + 2vh)', 'calc(2rem + 1vh)'];

const Section = (props: Props) => (
	<Box as="section" mb={MARGINS[props.level]} {...props} />
);

export default Section;
