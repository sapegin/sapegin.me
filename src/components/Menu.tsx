import clsx from 'clsx';
import { Fragment } from 'react';

// Half of total menu items
export const HALF = 3;

interface Props {
	current: string;
}

interface Item {
	title: string;
	href: string;
}

const ITEMS: Item[] = [
	{
		title: 'About',
		href: '/',
	},
	{
		title: 'Blog',
		href: '/blog/',
	},
	{
		title: 'Book',
		href: '/book/',
	},
	{
		title: 'Color scheme',
		href: '/squirrelsong/',
	},
	{
		title: 'Photos',
		href: 'https://morning.photos/',
	},
];

function isCurrent(href: string, current: string) {
	if (href === '/') {
		return href === current;
	}

	return current.startsWith(href);
}

export function Menu({ current }: Props) {
	return (
		<nav aria-label="Main">
			<ul
				className="
      flex flex-wrap justify-center gap-x-4
      md:grid md:justify-normal md:justify-items-center md:gap-y-4
    "
				style={{
					gridTemplateColumns: `repeat(${HALF}, min-content) auto repeat(${HALF}, min-content)`,
				}}
			>
				{ITEMS.map(({ title, href }, index) => (
					<Fragment key={href}>
						{index === HALF && (
							<li
								aria-hidden="true"
								className="
          hidden
          md:block
        "
							/>
						)}
						<li className="typo-menu">
							<a
								href={href}
								className={clsx(
									'link text-nowrap no-underline',
									isCurrent(href, current) &&
										`text-shadow-[2px_2px] text-shadow-primary/30`
								)}
							>
								{title}
							</a>
						</li>
					</Fragment>
				))}
			</ul>
		</nav>
	);
}
