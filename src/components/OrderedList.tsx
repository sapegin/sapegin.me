import type { BoxProps } from '../tamia/components/Box';
import { Stack } from '../tamia/components/Stack';
import { Text, type TextProps } from './Text';
import { list } from './OrderedList.css';

export function OrderedList(props: BoxProps<'ol'>) {
	return <Stack as="ol" gap="xs" className={list} {...props} />;
}

export function OrderedListItem(props: TextProps<'li'>) {
	return <Text as="li" {...props} />;
}
