import clsx from 'clsx';
import { type ComponentProps } from 'react';

type Props = ComponentProps<'a'> & {
	isCurrent?: boolean;
};

export function MenuLink({ isCurrent, className, children, ...props }: Props) {
	return (
		<a
			className={clsx(
				`typo-menu text-accent ease-hover hover:bg-accent hover:text-background p-2 no-underline transition-all duration-(--duration-hover)`,
				isCurrent
					? `border-accent shadow-menu focus-visible:bg-accent focus-visible:text-background border-2 font-bold focus-visible:outline-0`
					: `rounded-normal focus-outline`,
				className
			)}
			{...props}
		>
			{children}
		</a>
	);
}
