import Base from './Base';
import Header from './components/Header';
import PageFooter from './components/PageFooter';

export default function($) {
	const { title, content } = $;
	const { typo, typoTitle } = $;
	return (
		<Base {...$}>
			<Header />

			<div class="page-content content text">
				<h1 class="alpha">{typoTitle(title)}</h1>
				{typo(content)}
			</div>

			<PageFooter />
		</Base>
	);
}
