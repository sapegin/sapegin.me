import { Alpha } from 'tamia/lib/components/Text';
import Block from 'tamia/lib/components/Block';
import Container from 'tamia/lib/components/Container';
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

