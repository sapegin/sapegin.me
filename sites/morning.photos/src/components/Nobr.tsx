import { Box, type BoxProps } from './Box';

export function Nobr(props: BoxProps<'span'>) {
	return <Box as="span" whiteSpace="nowrap" {...props} />;
}
