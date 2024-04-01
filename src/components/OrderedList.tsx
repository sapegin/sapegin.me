import { Stack, type StackProps } from './Stack';
import { Text, type TextProps } from './Text';
import type { PropsWithoutRef } from 'react';

export function OrderedList(props: PropsWithoutRef<StackProps<'ol'>>) {
	return <Stack as="ol" gap="xs" ml="1.2rem" {...props} />;
}

export function OrderedListItem(props: TextProps<'li'>) {
	return <Text as="li" {...props} />;
}
