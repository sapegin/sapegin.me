import clsx from 'clsx';

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
		title: 'Photos',
		href: '/photos/',
	},
	{
		title: 'Series',
		href: '/series/',
	},
	{
		title: 'Zine',
		href: '/zine/',
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
      flex flex-wrap content-center items-center gap-x-4
      md:gap-y-4
    "
			>
				{ITEMS.map(({ title, href }) => (
					<li className="typo-menu" key={href}>
						<a
							href={href}
							className={clsx(
								'link text-nowrap',
								isCurrent(href, current) ? 'underline' : 'no-underline'
							)}
						>
							{title}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
