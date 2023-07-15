import clsx from 'clsx';
import { Box, type BoxProps } from './Box';
import { link } from './Link.css';

/**
 * Text link.
 */
export function Link({ className, ...props }: Omit<BoxProps<'a'>, 'as'>) {
	return <Box as="a" className={clsx(link, className)} {...props} />;
}
