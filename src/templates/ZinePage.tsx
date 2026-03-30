import type { CollectionEntry } from 'astro:content';
import { BookCover } from '../components/BookCover';
import { Button } from '../components/Button';
import { Expander } from '../components/Expander';
import { Subscription } from '../components/Subscription';
import { Typo } from '../components/Typo';
import { Video } from '../components/Video';
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
										<p
											className="typo-body"
											// eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
											dangerouslySetInnerHTML={{ __html: issue.description }}
										/>
										<p
											className="typo-small"
											// eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
											dangerouslySetInnerHTML={{ __html: issue.meta }}
										/>
									</div>
									{issue.price && issue.available ? (
										<Button
											as="a"
											href={issue.shop}
											target="_blank"
											rel="noopener"
										>
											Buy now!
											<span className="px-2 align-middle text-sm text-inherit">
												■
											</span>{' '}
											{issue.price} (excluding shipping)
										</Button>
									) : (
										<p className="typo-body font-bold">Sold out</p>
									)}
									<Expander>
										<Video src={issue.video} />
									</Expander>
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
				<Subscription list="photo" />
			</div>
		</PageWithTitle>
	);
}
