import React from 'react';
import { Box } from 'tamia';

type Props = {
	level: 1 | 2 | 3;
	children: React.ReactNode;
};

const MARGINS = ['', '6vh', '4vh', '2.85vh'];

const Section = (props: Props) => <Box mb={MARGINS[props.level]} {...props} />;

export default Section;
