import type { ReactNode } from 'react';

interface Props {
	extraFooter?: ReactNode;
}

export function Footer({ extraFooter }: Props) {
	return (
		<footer className="mt-auto flex flex-col gap-2">
			<p className="typo-small-ui">
				©{' '}
				<a className="link" href="https://drtaco.net/">
					Dr.&nbsp;Margarita Diaz Cortes
				</a>{' '}
				and&nbsp;
				<a className="link" href="https://sapegin.me/">
					Artem Sapegin
				</a>
				{', '}
				{new Date().getFullYear()}
			</p>
			<p className="typo-small-ui">
				Made with The&nbsp;Secret Ingredient™ in&nbsp;miserable Berlin
				&amp;&nbsp;sunny Valencia
				{' • '}Follow&nbsp;us on&nbsp;
				<a className="link" href="https://twitter.com/tacohuaco">
					Twitter
				</a>{' '}
				and&nbsp;
				<a className="link" href="https://www.instagram.com/tacohuaco.co/">
					Instagram
				</a>
				{' • '}
				<a className="link" href="https://www.buymeacoffee.com/sapegin">
					Buy us coffee
				</a>
				{' • '}
				<a className="link" href="/atom.xml">
					RSS
				</a>
			</p>
			{extraFooter ? <p className="typo-small-ui">{extraFooter}</p> : null}
		</footer>
	);
}
