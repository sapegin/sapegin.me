import clsx from 'clsx';
import type { AnchorHTMLAttributes } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
	isCurrent?: boolean;
};

export function MenuLink({ isCurrent, className, children, ...props }: Props) {
	return (
		<a
			className={clsx(
				`
      m-[calc(0.25rem+2px)] rounded-none border-0 border-solid border-accent
      bg-background p-2 font-ui text-base/heading font-normal tracking-menu
      text-accent uppercase no-underline transition-all
      duration-(--duration-hover) ease-hover
    `,
				isCurrent
					? `
       my-0 border-2 font-bold shadow-menu
       hover:bg-accent hover:text-background
       focus-visible:bg-accent focus-visible:text-background
       focus-visible:outline-0
     `
					: `
       hover:cursor-pointer hover:border-b-2
       focus-visible:rounded-[0.15em] focus-visible:border-0
       focus-visible:outline-[3px] focus-visible:outline-offset-0
       focus-visible:outline-accent
     `,
				className
			)}
			{...props}
		>
			{children}
		</a>
	);
}
