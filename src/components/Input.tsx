import { type InputHTMLAttributes } from 'react';
import { getPixelBorder } from '../util/getPixelBorder';
import { Box } from './Box';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
	return (
		<Box
			as="input"
			{...props}
			css={{
				display: 'inline-block',
				p: 's',
				fontFamily: 'ui',
				fontSize: 'ui',
				borderColor: 'base',
				backgroundColor: 'bg',
				color: 'base',
				height: '2.2rem',
				borderStyle: 'solid',
				borderWidth: 4,
				borderImageSlice: 4,
				borderImageWidth: 1,
				borderImageOutset: 0,
				borderImageSource: getPixelBorder('var(--colors-base)'),
				lineHeight: '1rem',
				textDecoration: 'none',
				userSelect: 'none',
				outline: 0,
				_focusVisible: {
					borderImageSource: getPixelBorder('var(--colors-hover'),
				},
			}}
		/>
	);
}
