import s from './Lead.pcss';

export default function({ head, children }) {
	return (
		<div class={s.root}>
			<div class={s.head}>{head}</div>
			<div class={s.body}>{children}</div>
		</div>
	);
}
