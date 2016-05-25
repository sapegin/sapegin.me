import Base from './Base';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';

export default function($) {
	const { title, content } = $;
	const { typo, typoTitle } = $;
	return (
		<Base {...$}>
			<PageHeader />

			<div class="page-content content text">
				<h1 class="alpha">{typoTitle(title)}</h1>
				{typo(content)}
			</div>

			<PageFooter />
		</Base>
	);
}
