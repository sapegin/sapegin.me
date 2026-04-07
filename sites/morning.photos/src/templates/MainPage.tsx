import { Markdown } from '@shared/components/Markdown';
import { Support } from '../components/Support';
import { Thumbnail } from '../components/Thumbnail';
import type { Photo } from '../types/Photo';
import type { Resource } from '../types/Resource';
import { Page } from './Page';

interface Props {
	url: string;
	title: string;
	text: string;
	photos: Photo[];
	links: Resource[][];
}

function findPhoto(photos: Photo[], name: string) {
	return photos.find((x) => x.name === name);
}

function Links({ links }: Pick<Props, 'links'>) {
	return (
		<ul>
			{links.map((group) =>
				group.map(({ url, title }, index) => (
					<li
						className={index === group.length - 1 ? 'mb-4' : undefined}
						key={url}
					>
						<a href={url} className="link">
							{title}
						</a>
					</li>
				))
			)}
		</ul>
	);
}

function Photos({ photos }: Pick<Props, 'photos'>) {
	const photo1 = findPhoto(photos, '2021-11-06_8253_Artem_Sapegin');
	const photo2 = findPhoto(photos, '2021-03-08_1475_Artem_Sapegin');
	const photo3 = findPhoto(photos, '2021-02-07_8254_Artem_Sapegin');
	const photo4 = findPhoto(photos, '2021-07-30_4525_Artem_Sapegin');
	return (
		<section className="flex flex-col gap-4">
			{photo1 && (
				<div className="expander">
					<a className="block link" href={`/photos/#${photo1.name}`}>
						<Thumbnail
							photo={photo1}
							size="full"
							alt="Saxon Switzerland forest, Germany"
						/>
					</a>
				</div>
			)}
			<div className="expander">
				<div className="grid-auto-narrow grid gap-4">
					{photo2 && (
						<a className="block link" href={`/photos/#${photo2.name}`}>
							<div className="aspect-65/90 frame">
								<Thumbnail photo={photo2} alt="Dawn in Berlin, Germany" />
							</div>
						</a>
					)}
					<div
						className="
        hidden
        md:block
      "
					>
						{photo3 && (
							<a className="block link" href={`/photos/#${photo3.name}`}>
								<div className="aspect-65/90 frame">
									<Thumbnail
										photo={photo3}
										alt="Snowstorm in Berlin, Germany"
									/>
								</div>
							</a>
						)}
					</div>
					{photo4 && (
						<a className="block link" href={`/photos/#${photo4.name}`}>
							<div className="aspect-65/90 frame">
								<Thumbnail photo={photo4} alt="Sunrise in Rome, Italy" />
							</div>
						</a>
					)}
				</div>
			</div>
		</section>
	);
}

function Photos2({ photos }: Pick<Props, 'photos'>) {
	const photo1 = findPhoto(photos, 'IMG_7743');
	const photo2 = findPhoto(photos, 'IMG_5445');
	const photo3 = findPhoto(photos, 'IMG_8108');
	const photo4 = findPhoto(photos, '2023-12-30_1325_Artem_Sapegin');
	return (
		<section className="flex flex-col gap-4">
			<Me />
			{photo4 && (
				<div className="expander">
					<a className="block link" href={`/photos/#${photo4.name}`}>
						<Thumbnail
							photo={photo4}
							size="full"
							alt="Mall near Valencia, Spain"
						/>
					</a>
				</div>
			)}
			<div className="expander">
				<div className="grid-auto-narrow grid gap-4">
					{photo1 && (
						<a className="block link" href={`/series/gol/#${photo1.name}`}>
							<div className="aspect-65/90 frame">
								<Thumbnail
									photo={photo1}
									alt="View from the top floor of Pressehaus, Berlin, Germany"
								/>
							</div>
						</a>
					)}
					<div
						className="
        hidden
        md:block
      "
					>
						{photo2 && (
							<a className="block link" href={`/series/moire/#${photo2.name}`}>
								<div className="aspect-65/90 frame">
									<Thumbnail
										photo={photo2}
										alt="Peeled advertisement posters, Berlin, Germany"
									/>
								</div>
							</a>
						)}
					</div>
					{photo3 && (
						<a className="block link" href={`/series/sfop/#${photo3.name}`}>
							<div className="aspect-65/90 frame">
								<Thumbnail
									photo={photo3}
									alt="Birds chasing an airplane, Berlin, Germany"
								/>
							</div>
						</a>
					)}
				</div>
			</div>
		</section>
	);
}

function Me() {
	return (
		<div className="expander">
			<div className="grid-auto-narrow grid gap-4">
				<img
					className="image bg-[#69716e]"
					src="/images/about/me-1.avif"
					alt="Artem Sapegin is making photos with a toy camera"
					width={700}
					height={700}
				/>
				<div
					className="
       hidden
       md:block
     "
				>
					<img
						className="image bg-[#978b7f]"
						src="/images/about/me-2.avif"
						alt="Artem Sapegin is making photos with a phone"
						width={700}
						height={700}
					/>
				</div>
				<img
					className="image bg-[#615c45]"
					src="/images/about/me-3.avif"
					alt="Artem Sapegin is making photos in a forest"
					width={700}
					height={700}
				/>
			</div>
		</div>
	);
}

export function MainPage({ url, title, text, photos, links }: Props) {
	return (
		<Page url={url}>
			<div className="flex flex-col gap-16">
				<h1 className="sr-only">{title}</h1>
				<Photos photos={photos} />
				<div className="flex flex-col gap-8">
					<div
						className="
        grid grid-cols-1 gap-x-8
        md:grid-cols-[2fr_1fr]
      "
					>
						<div className="prose">
							<Markdown text={text} />
						</div>
						<Links links={links} />
					</div>
					<Photos2 photos={photos} />
					<div className="prose">
						Have a look at my{' '}
						<a className="link" href="/photos/">
							photo portfolio
						</a>
						,{' '}
						<a className="link" href="/photos/">
							series
						</a>
						,{' '}
						<a className="link" href="/photos/">
							my photography zine
						</a>
						. Subscribe to{' '}
						<a className="link" href="https://lofisunshine.substack.com/">
							my Substack
						</a>{' '}
						or{' '}
						<a className="link" href="https://buymeacoffee.com/sapegin">
							buy me a cup of coffee
						</a>
						.
					</div>
					<Support />
				</div>
			</div>
		</Page>
	);
}
