import type { PropsWithoutRef } from 'react';
import { Box, type BoxProps } from './Box';

export function Nobr(props: PropsWithoutRef<BoxProps<'span'>>) {
	return <Box as="span" whiteSpace="nowrap" {...props} />;
}
