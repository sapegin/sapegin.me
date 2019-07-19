import styled from 'styled-components';

const InlineListItem = styled.span`
	margin-bottom: ${p => p.theme.space.s};
	@media (min-width: ${p => p.theme.breakpoints[0]}) {
		display: inline;
		margin-bottom: 0;
		& + &::before {
			/* Draw a bullet with CSS because pseudo content */
			/* is read by screen readers */
			content: '';
			display: inline-block;
			vertical-align: middle;
			margin: 0 1ch;
			width: 3px;
			height: 3px;
			border-radius: 50%;
			background-color: currentColor;
		}
	}
`;

export default InlineListItem;
