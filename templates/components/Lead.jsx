import s from './Lead.pcss';

export default ($, children) => (
	<div class={s.root}>
		<div class={s.primaryLine}>{$.head}</div>
		<div class={s.body}>{children}</div>
	</div>
);
