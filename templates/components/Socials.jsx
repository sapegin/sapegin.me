import Icon from 'tamia/lib/components/Icon';
import cx from 'classnames';
import s from './Socials.pcss';

export default function({ items }) {
	return (
		<div class={s.root}>
			{items.map(({ id, url, name }) => (
				<a href={url} class={cx(s.item, s[`item${name}`])} title={name}>
					<Icon name={id} />
				</a>
			))}
		</div>
	);
}
