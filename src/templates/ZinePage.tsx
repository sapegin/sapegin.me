import type { CollectionEntry } from 'astro:content';
import {
	Box,
	Stack,
	Text,
	Button,
	Heading,
	TextContent,
	BookCover,
} from '../components';
import { PageWithTitle } from './PageWithTitle';

type Issue = CollectionEntry<'zines'>;

type Props = {
	url: string;
	title: string;
	issues: Issue[];
};

export function ZinePage({ url, title, issues }: Props) {
	return (
		<PageWithTitle url={url} title={title}>
			<Stack gap="l">
				<Text variant="intro">
					This is a zine with my photos that I publish to share my work and
					reflect on my photography, kind of a better Instagram. I’m planning to
					publish a new issue about once a year, each dedicated to a particular
					theme.
				</Text>
				{issues.map(({ id, data: issue }) => {
					return (
						<Stack key={id} as="article" gap="m">
							<Heading as="h2" level={2}>
								{issue.title}
							</Heading>
							<Stack direction={{ mobile: 'column', tablet: 'row' }} gap="l">
								<Stack gap="m">
									<TextContent>
										<Text
											dangerouslySetInnerHTML={{ __html: issue.description }}
										/>
										<Text
											variant="small"
											dangerouslySetInnerHTML={{ __html: issue.meta }}
										/>
									</TextContent>
									{issue.price && issue.available ? (
										<Button
											as="a"
											href={issue.shop}
											target="_blank"
											rel="noopener"
										>
											Buy now!
											<Text
												as="span"
												px="s"
												verticalAlign="middle"
												fontSize="s"
												color="inherit"
											>
												■
											</Text>{' '}
											{issue.price} (excluding shipping)
										</Button>
									) : (
										<Text variant="bold">Sold out</Text>
									)}
									<iframe
										width="560"
										height="315"
										src={issue.video}
										title="YouTube video player"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
									></iframe>
								</Stack>
								<Box mx={{ mobile: 'auto', tablet: 0 }} order={[-1, null, 0]}>
									<BookCover
										title={issue.title}
										image={issue.cover}
										width={320}
										height={450}
									/>
								</Box>
							</Stack>
						</Stack>
					);
				})}
			</Stack>
		</PageWithTitle>
	);
}
