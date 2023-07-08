import type { ElementType } from 'react';
import { Box, type BoxProps } from '../tamia/components/Box';
import { TextContent } from '../tamia/components/TextContent';
import { postContent } from './PostContent.css';

export function PostContent<C extends ElementType>(props: BoxProps<C>) {
	return (
		<TextContent>
			<Box className={postContent} {...props} />
		</TextContent>
	);
}
