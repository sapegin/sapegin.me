export function Footer() {
	return (
		<footer>
			<p className="mb-0.5 typo-small">
				© Artem Sapegin, 1999—{new Date().getFullYear()}
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
				<a className="link" href="https://github.com/sapegin/sapegin.me">
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
