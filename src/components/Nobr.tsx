import { Box, type BoxProps } from '../tamia/components/Box';

export function Nobr(props: BoxProps<'span'>) {
	return <Box as="span" whiteSpace="nowrap" {...props} />;
}
