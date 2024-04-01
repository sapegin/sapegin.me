import { Stack, type StackProps } from './Stack';
import { Text, type TextProps } from './Text';

export function OrderedList(props: StackProps<'ol'>) {
	return <Stack as="ol" gap="xs" ml="1.2rem" {...props} />;
}

export function OrderedListItem(props: TextProps<'li'>) {
	return <Text as="li" {...props} />;
}
