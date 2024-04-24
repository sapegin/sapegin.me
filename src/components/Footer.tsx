timport { Text, Link } from '.';
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
				RSS: <Link href="/atom.xml">blog</Link>,{' '}
				<Link href="/photos/atom.xml">photos</Link>
			</Text>
		</footer>
	);
}
