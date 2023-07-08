import { Text, Link } from '.';
import romanize from 'romanize';

export function Footer() {
	return (
		<footer>
			<Text variant="xsmall" mb="xs">
				© <Link href="https://sapegin.me/">Artem Sapegin</Link>
				{', '}
				{romanize(1999)}—{romanize(new Date().getFullYear())}
			</Text>
			<Text variant="xsmall">
				Powered by <Link href="https://astro.build/">Astro</Link> and{' '}
				<Link href="https://tamiadev.github.io/tamia/">Tâmia</Link>, hosted on{' '}
				<Link href="https://www.netlify.com/">Netlify</Link>.{' '}
				<Link href="https://github.com/sapegin/sapegin.me">Source code</Link>.{' '}
				<Link href="/atom.xml">RSS</Link>
			</Text>
		</footer>
	);
}
