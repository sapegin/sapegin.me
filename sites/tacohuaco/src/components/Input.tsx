import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
	className?: string;
};

export function Input({ className, ...props }: Props) {
	return (
		<input
			className={clsx(
				`
      h-8 w-full appearance-none rounded-none border-2 border-text bg-background
      px-3 py-1 font-ui text-base font-bold text-text
      focus:border-accent focus:shadow-input focus:outline-0
      disabled:opacity-25
    `,
				className
			)}
			{...props}
		/>
	);
}
