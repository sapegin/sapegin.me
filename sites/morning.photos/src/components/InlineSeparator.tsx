import { Box } from './Box';

export function InlineSeparator() {
	return (
		<Box
			as="span"
			role="separator"
			css={{
				display: 'inline-block',
				width: '0.3rem',
				height: '0.3rem',
				backgroundColor: 'border',
			}}
		/>
	);
}
