import clsx from 'clsx';
import type { ComponentProps } from 'react';

type Props = ComponentProps<'a'> & {
	isCurrent?: boolean;
};

export function MenuLink({ isCurrent, className, children, ...props }: Props) {
	return (
		<a
			className={clsx(
				`
      p-2 typo-menu text-accent no-underline transition-all
      duration-(--duration-hover) ease-hover
      hover:bg-accent hover:text-background
    `,
				isCurrent
					? `
       border-2 border-accent font-bold shadow-menu
       focus-visible:bg-accent focus-visible:text-background
       focus-visible:outline-0
     `
					: `rounded-normal focus-outline`,
				className
			)}
			{...props}
		>
			{children}
		</a>
	);
}
