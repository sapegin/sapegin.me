import { Text } from './Text';
import { Link } from './Link';
import romanize from 'romanize';

export function Footer() {
	return (
		<footer>
			<Text variant="small" mb="xs">
				© Artem Sapegin
				{', '}
				{romanize(1999)}—{romanize(new Date().getFullYear())}
			</Text>
			<Text variant="small">
				Powered by <Link href="https://astro.build/">Astro</Link> and{' '}
				<Link href="https://github.com/sapegin/tamia">Tâmia</Link>, hosted on{' '}
				<Link href="https://www.netlify.com/">Netlify</Link>.{' '}
				<Link href="https://github.com/sapegin/sapegin.me">Source code</Link>.{' '}
				<Link href="/atom.xml">RSS</Link>
			</Text>
		</footer>
	);
}
