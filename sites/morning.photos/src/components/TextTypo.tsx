import type { ElementType } from 'react';
import { Text, type TextProps } from './Text';
import { Typo } from './Typo';

/**
 * Text with enhanced typography
 */
export function TextTypo<C extends ElementType = 'p'>(props: TextProps<C>) {
	return (
		<Text {...props}>
			<Typo>{props.children}</Typo>
		</Text>
	);
}
