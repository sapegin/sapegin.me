import { Box, type BoxProps } from '../tamia/components/Box';
import { Text, type TextProps } from './Text';
import { listItem } from './InlineList.css';

export function InlineList(props: BoxProps<'p'>) {
	return <Box as="p" display={{ tablet: 'flex' }} {...props} />;
}

export function InlineListItem(props: TextProps<'span'>) {
	return (
		<Text
			as="span"
			fontStyle="italic"
			mb="xs"
			className={listItem}
			{...props}
		/>
	);
}
