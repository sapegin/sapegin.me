import s from './TalkName.pcss';

export default function({ type, title }, children, { typo }) {
	return (
		<span>
			{type === 'lightning' && (
				<span className={s.suffixEmoji} role="img" aria-label="Lightning talk">
					⚡️
				</span>
			)}
			{typo(title)}
			{type === 'workshop' && ' workshop'}
		</span>
	);
}
