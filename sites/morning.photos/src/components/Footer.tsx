import { currentYear } from '@shared/util/currentYear';

export function Footer() {
	return (
		<footer>
			<p className="typo-small mb-1">
				© Artem Sapegin
				{', '}
				2004—{currentYear}
			</p>
			<p className="typo-small">
				Powered by{' '}
				<a className="link" href="https://astro.build/">
					Astro
				</a>{' '}
				and{' '}
				<a className="link" href="https://github.com/sapegin/tamia">
					Tâmia
				</a>
				, hosted on{' '}
				<a className="link" href="https://www.netlify.com/">
					Netlify
				</a>
				.{' '}
				<a className="link" href="https://github.com/sapegin/morning.photos">
					Source code
				</a>
				.{' '}
				<a className="link" href="/atom.xml">
					RSS
				</a>
			</p>
		</footer>
	);
}
