import React from 'react';
import { graphql } from 'gatsby';
import { TextContent, Html } from 'tamia';
import PageWithTitle from './PageWithTitle';

const TextPage = ({
	data: {
		markdownRemark: {
			frontmatter: { title },
			html,
		},
	},
}) => {
	return (
		<PageWithTitle title={title}>
			<TextContent is={Html}>{html}</TextContent>
		</PageWithTitle>
	);
};

export default TextPage;

export const pageQuery = graphql`
	query BioPage($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
			}
			html
		}
	}
`;
