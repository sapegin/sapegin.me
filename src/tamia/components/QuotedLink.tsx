import { Box, type BoxProps } from './Box';
import { link } from './QuotedLink.css';

/**
 * “Quoted” link component, a link where only content inside the `<u>` tag is underlined. Useful for links in quotes or links with images.
 */
export function QuotedLink(props: Omit<BoxProps<'a'>, 'as'>) {
	return <Box as="a" className={link} {...props} />;
}
