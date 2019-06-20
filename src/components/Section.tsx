import styled from '@emotion/styled';

type Props = {
	level: 1 | 2 | 3;
};

const MARGINS = ['', '6vh', '4vh', '2.85vh'];

const Section = styled.section<Props>`
	margin-bottom: ${props => MARGINS[props.level]};
`;

export default Section;
