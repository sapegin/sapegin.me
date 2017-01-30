import { Alpha } from 'tamia/src/components/Text';
import Block from 'tamia/src/components/Block';
import Container from 'tamia/src/components/Container';
import Base from './Base';
import Header from './components/Header';
import Footer from './components/Footer';

/* Manually import styles for custom Fledermaus tags */
import './components/Embed.pcss';

export default function({ title, content, typo, typoTitle }) {
	return (
		<Base>
			<Container>
				<Header />

				<Block class="text" bottom={2}>
					<Alpha>{typoTitle(title)}</Alpha>
					{typo(content)}
				</Block>

				<Footer />
			</Container>
		</Base>
	);
}

