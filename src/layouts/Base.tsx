import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { Page } from 'tamia';
import Provider from './Provider';
import theme from '../theme';

type Props = {
	className?: string;
	children: React.ReactNode;
};

export default function Base({ className, children }: Props) {
	return (
		<StaticQuery
			query={graphql`
				query SiteTitleQuery {
					site {
						siteMetadata {
							lang
							title
							description
							twitter
						}
					}
				}
			`}
			render={({
				site: {
					siteMetadata: { lang, title, description, twitter },
				},
			}) => (
				<>
					<Helmet>
						<html lang={lang} />
						<meta name="theme-color" content={theme.colors.primary} />
						<meta name="description" content={description} />
						<meta property="og:type" content="website" />
						<meta property="og:title" content={title} />
						<meta name="twitter:creator" content={twitter} />
					</Helmet>
					<Provider>
						<Page className={className}>{children}</Page>
					</Provider>
				</>
			)}
		/>
	);
}
