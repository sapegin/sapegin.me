import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { Box, Text, Heading, VisuallyHidden } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import Books from '../components/Books';
import ColumnList from '../components/ColumnList';
import InlineList from '../components/InlineList';
import Socials from '../components/Socials';
import Lead from '../components/Lead';
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
	links: Resource[];
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
			frontmatter: { pageTitle, books, links, projects, secondary, socials },
		},
	},
}: Props) {
	return (
		<Base className="h-card">
			<Helmet title={pageTitle} />
			<main>
				<Section level={1}>
					<VisuallyHidden as="h1">Artem Sapegin</VisuallyHidden>
					<Lead head="Hi.">
						I’m&nbsp;
						<span className="p-given-name" title="Pronounced as [ar'tiyom]">
							Artem
						</span>{' '}
						<span className="p-family-name">Sapegin</span>, a&nbsp;
						<span className="p-job-title">frontend developer</span> at&nbsp;
						<Link href="https://www.wayfair.com/" className="p-org">
							Wayfair
						</Link>
						, award-losing photographer, bouldering enthusiast, coffee consumer
						and&nbsp;dog&nbsp;friend, living in&nbsp;
						<span className="p-region">Berlin, Germany</span>.
					</Lead>
				</Section>
				<Section level={1}>
					<ColumnList items={links} primary />
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
				<Section level={3}>
					<Subheading>Contact me</Subheading>
					<Text variant="large">
						Drop me a line at{' '}
						<Link href="mailto:artem@sapegin.ru" className="u-email">
							artem@sapegin.ru
						</Link>{' '}
						or{' '}
						<Link href="https://github.com/sapegin/ama">ask me anything</Link>.
					</Text>
				</Section>
				<Section level={3}>
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
				links {
					title
					description
					link
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
