export default function($) {
	let { items } = $;
	let { typo, typoTitle } = $;
	return (
		<div class={`column-list ${$.class}`}>
			{items.map(item => (
				<div class="column-list__item">
					<div class="column-list__title">
						<a href={item.link}>{typoTitle(item.title)}</a>
					</div>
					<div class="column-list__text">{typo(item.description)}</div>
				</div>
			))}
		</div>
	);
}
