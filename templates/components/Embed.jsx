import { Small } from 'tamia/lib/components/Text';
import Block from 'tamia/lib/components/Block';
import cx from 'classnames';
import s from './Embed.pcss';

export default function({ id, title, background, height }) {
	return (
		<Block bottom={2}>
			<div class={cx(s.content, s[`embed${id}`])} style={`background-image: url(${background}); height: ${height}px`}>
				<div class={s[`embedInner${id}`]} id={id}></div>
			</div>
			<Small>{title}</Small>
		</Block>
	);
}
