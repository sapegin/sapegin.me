import type { ReactNode } from 'react';
import Group from 'react-group';
import { BuyMeCoffee } from '../components/BuyMeCoffee';
import { InlineList, InlineListItem } from '../components/InlineList';
import { MurderOfCrows } from '../components/MurderOfCrows';
import { PostContent } from '../components/PostContent';
import { Typo } from '../components/Typo';
import type { Squirrel } from '../types/Squirrel';
import { Page } from './Page';

type Props = Squirrel & {
	children?: ReactNode;
	squirrels: Squirrel[];
};

function getGitHubLink(id: string) {
	return `https://github.com/sapegin/squirrelsong/edit/master/themes/${id}/Readme.md`;
}

function getSourceLink(id: string) {
	return `https://github.com/sapegin/squirrelsong/edit/master/themes/${id}/`;
}

function getIssueLink() {
	return `https://github.com/sapegin/squirrelsong/discussions`;
}

export function SquirrelPage({ url, title, id, squirrels, children }: Props) {
	return (
		<Page url={url}>
			<div className="flex flex-col gap-16">
				<div className="flex flex-col gap-8">
					<h1 className="max-w-text-max-width heading-1">{title}</h1>
					<PostContent>{children}</PostContent>
					<div className="flex flex-col gap-1">
						<p className="typo-body">
							<Typo>
								<a className="link" href="/squirrelsong/">
									Squirrelsong themes
								</a>{' '}
								are low-contrast color schemes with great readability for web
								developers and non-distracting UI themes for many apps. It’s
								also available for:
							</Typo>
						</p>
						<p className="typo-body">
							<Group separator=", ">
								{squirrels.map((squirrel) =>
									squirrel.id === id ? (
										squirrel.app
									) : (
										<a className="link" key={squirrel.id} href={squirrel.url}>
											{squirrel.app}
										</a>
									)
								)}
							</Group>
						</p>
					</div>
					<nav aria-label="Page tools">
						<InlineList>
							<InlineListItem>
								<a className="link" href={getSourceLink(id)}>
									View source code
								</a>
							</InlineListItem>
							<InlineListItem>
								<a className="link" href={getIssueLink()}>
									Report an issue
								</a>
							</InlineListItem>
							<InlineListItem>
								<a className="link" href={getGitHubLink(id)}>
									Edit on GitHub
								</a>
							</InlineListItem>
						</InlineList>
					</nav>
				</div>
				<BuyMeCoffee />
				<MurderOfCrows />
			</div>
		</Page>
	);
}
