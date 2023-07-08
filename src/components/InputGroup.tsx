import clsx from 'clsx';
import { Stack } from '../tamia';
import type { BoxProps } from '../tamia/components/Box';
import { inputGroup } from './InputGroup.css';

export function InputGroup({
	className,
	...props
}: Omit<BoxProps<'fieldset'>, 'as'>) {
	return (
		<Stack
			as="fieldset"
			direction={{ mobile: 'column', tablet: 'row' }}
			gap={0}
			className={clsx(className, inputGroup)}
			{...props}
		/>
	);
}
