import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { Box, Text, Heading, VisuallyHidden } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import Books from '../components/Books';
import ColumnList from '../components/ColumnList';
import InlineList from '../components/InlineList';
import Socials from '../components/Socials';
import Lead from '../components/Lead';
import Menu from '../components/Menu';
import Section from '../components/Section';
import Base from './Base';
import { Book, Resource, Social } from '../types';

const Subheading = ({ children }: { children: React.ReactNode }) => (
	<Heading level={2} mb="m">
		{children}
	</Heading>
);

type Frontmatter = {
	pageTitle: string;
	books: Book[];
	projects: Resource[];
	secondary: Resource[];
	socials: Social[];
};

type Props = {
	data: {
		markdownRemark: {
			frontmatter: Frontmatter;
		};
	};
};

export default function Index({
	data: {
		markdownRemark: {
			frontmatter: { pageTitle, books, projects, secondary, socials },
		},
	},
}: Props) {
	return (
		<Base className="h-card">
			<Helmet title={pageTitle} />
			<main>
				<VisuallyHidden as="h1">Artem Sapegin</VisuallyHidden>
				<Section level={1}>
					<VisuallyHidden as="h2">About me</VisuallyHidden>
					<Lead
						head="Hi."
						details={
							<>
								I live in&nbsp;
								<span className="p-region">Berlin, Germany</span>, work at{' '}
								<Link href="https://www.omio.com/" className="p-org">
									Omio
								</Link>
								, and interested in design systems, testing
								and&nbsp;accessibility.
							</>
						}
					>
						I’m&nbsp;
						<span className="p-given-name" title="Pronounced as [ar'tiyom]">
							Artem
						</span>{' '}
						<span className="p-family-name">Sapegin</span>, a&nbsp;coffee first{' '}
						<span className="p-job-title">frontend engineer</span>, award-losing
						photographer, and&nbsp;dog&nbsp;friend.
					</Lead>
				</Section>
				<Section as="nav" level={1}>
					<Menu current="/" />
				</Section>
				<Section level={2}>
					<Subheading>My books</Subheading>
					<Books items={books} />
				</Section>
				<Section level={2}>
					<Subheading>My projects</Subheading>
					<Box mb="m">
						<ColumnList items={projects} />
					</Box>
					<InlineList items={secondary} />
				</Section>
				<Section level={2}>
					<Subheading>Contact me</Subheading>
					<Text mb="l" variant="large">
						Drop me a line at{' '}
						<Link href="mailto:artem@sapegin.ru" className="u-email">
							artem@sapegin.ru
						</Link>{' '}
						or{' '}
						<Link href="https://github.com/sapegin/ama">ask me anything</Link>.
					</Text>
					<Socials items={socials} />
				</Section>
			</main>
		</Base>
	);
}

export const pageQuery = graphql`
	query IndexPage($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				pageTitle
				books {
					title
					description
					link
					cover
				}
				projects {
					title
					description
					link
				}
				secondary {
					title
					link
				}
				socials {
					id
					name
					link
				}
			}
		}
	}
`;
