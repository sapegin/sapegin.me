import type { CollectionEntry } from 'astro:content';
import { Markdown } from '../../../../shared/components/Markdown';
import { Typo } from '../../../../shared/components/Typo';
import { Video } from '../../../../shared/components/Video';
import { BookCover } from '../components/BookCover';
import { Support } from '../components/Support';
import { PageWithTitle } from './PageWithTitle';

type Issue = CollectionEntry<'zines'>;

interface Props {
	url: string;
	title: string;
	issues: Issue[];
}

export function ZinePage({ url, title, issues }: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<div className="flex flex-col gap-8">
				<p className="typo-intro">
					<Typo>
						This is a zine with my photos that I publish to share my work and
						reflect on my photography, kind of a better Instagram. I’m planning
						to publish a new issue about once a year, each dedicated to a
						particular theme.
					</Typo>
				</p>
				{issues.map(({ id, data: issue }) => {
					return (
						<article key={id} className="flex flex-col gap-4">
							<h2 className="heading-2">{issue.title}</h2>
							<div
								className="
          flex flex-col gap-8
          md:flex-row
        "
							>
								<div className="flex flex-col gap-4">
									<div className="prose">
										<Markdown text={issue.description} forceBlock />
										<Markdown text={issue.meta} forceBlock />
									</div>
									{issue.price && issue.available ? (
										<a
											className="button"
											href={issue.shop}
											target="_blank"
											rel="noopener"
										>
											Buy now!
											<span
												className="px-2 align-middle typo-body text-xs text-inherit"
												aria-hidden="true"
											>
												■
											</span>{' '}
											{issue.price} (excluding shipping)
										</a>
									) : (
										<p className="typo-body font-bold">Sold out</p>
									)}
									<div className="expander">
										<Video src={issue.video} />
									</div>
								</div>
								<div
									className="
           -order-1 mx-auto
           md:order-0 md:mx-0
         "
								>
									<BookCover
										title={issue.title}
										image={issue.cover}
										width={320}
										height={450}
									/>
								</div>
							</div>
						</article>
					);
				})}
				<Support />
			</div>
		</PageWithTitle>
	);
}
