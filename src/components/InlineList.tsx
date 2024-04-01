import { Box, type BoxProps } from './Box';
import { Text, type TextProps } from './Text';

export function InlineList(props: BoxProps<'p'>) {
	return <Box as="p" display={{ tablet: 'flex' }} {...props} />;
}

export function InlineListItem(props: TextProps<'span'>) {
	return (
		<Text
			as="span"
			fontStyle="italic"
			mb="xs"
			css={{
				'&:not(:last-child)::after': {
					content: `''`,
					display: 'inline-block',
					marginInline: 's',
					marginBottom: '0.1rem',
					width: '0.3rem',
					height: '0.3rem',
					backgroundColor: 'border',
				},
			}}
			{...props}
		/>
	);
}
