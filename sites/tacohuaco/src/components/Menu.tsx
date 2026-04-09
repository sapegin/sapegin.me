import { MenuLink } from './MenuLink';

interface Props {
	current: string;
}

const ITEMS = [
	{ title: 'Recipes', href: '/recipes/' },
	{ title: 'Calendar', href: '/cal/' },
	{ title: 'Coffee', href: '/coffee/' },
	{ title: 'Search', href: '/search/' },
	{ title: 'About', href: '/about/' },
];

export function Menu({ current }: Props) {
	return (
		<ul className="
    grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-x-0 gap-y-4
    text-center
    lg:flex lg:gap-x-4
  ">
			{ITEMS.map(({ title, href }) => (
				<li key={href}>
					<MenuLink href={href} isCurrent={current.startsWith(href)}>
						{title}
					</MenuLink>
				</li>
			))}
		</ul>
	);
}
