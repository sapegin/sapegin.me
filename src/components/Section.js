import styled from '@emotion/styled';

const MARGINS = ['', '6vh', '4vh', '2.85vh'];

const Section = styled.section`
	margin-bottom: ${props => MARGINS[props.level]};
`;

export default Section;
