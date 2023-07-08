import { Box, type BoxProps } from './Box';
import { link } from './Link.css';

/**
 * Text link.
 */
export function Link(props: Omit<BoxProps<'a'>, 'as'>) {
	return <Box as="a" className={link} {...props} />;
}
