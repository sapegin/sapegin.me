import React from 'react';
import Helmet from 'react-helmet';
import { Page, Box, Heading } from 'tamia';
import Footer from '../components/Footer';
import { Link } from '../components/Link';
import Base from './Base';

const PageWithTitle = ({ children, title }) => (
	<Base>
		<Helmet title={`Artem Sapegin${title}`} />
		<main>
			<Heading level={1} mb="l">
				<Link href="/">Artem Sapegin</Link>
				{title}
			</Heading>
			<Box mb="l">{children}</Box>
		</main>
		<Page.Footer is="div">
			<Footer />
		</Page.Footer>
	</Base>
);

export default PageWithTitle;
