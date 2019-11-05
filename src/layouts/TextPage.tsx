import React from 'react';
import { graphql } from 'gatsby';
import { TextContent } from 'tamia';
import PageWithTitle from './PageWithTitle';

type Frontmatter = {
	title: string;
};

type Props = {
	data: {
		markdownRemark: {
			frontmatter: Frontmatter;
			html: string;
		};
	};
};

export default function TextPage({
	data: {
		markdownRemark: {
			frontmatter: { title },
			html,
		},
	},
}: Props) {
	return (
		<PageWithTitle title={title}>
			<TextContent dangerouslySetInnerHTML={{ __html: html }} />
		</PageWithTitle>
	);
}

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
