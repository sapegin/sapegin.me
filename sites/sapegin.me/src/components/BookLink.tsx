import { campaigns } from '../campaigns';
import type { Resource } from '../types/Resource';
import { BookCover } from './BookCover';

function getCampaign(url: string) {
	if (url === '/book/') {
		return campaigns.washingCode.enabled ? campaigns.washingCode : undefined;
	}
}

interface Props {
	book: Resource;
}

export function BookLink({ book: { url, image, title, description } }: Props) {
	const campaign = url ? getCampaign(url) : undefined;
	return (
		<a className="block quoted-link" key={url} href={url}>
			<div className="flex gap-4">
				{image && (
					<div className="shrink-0">
						<BookCover image={image} title={title} />
					</div>
				)}
				<div className="flex flex-col gap-2">
					{campaign && <p className="typo-flag">{campaign.badge}</p>}
					<u className="typo-large">{title}</u>
					<p className="typo-body">{description}</p>
				</div>
			</div>
		</a>
	);
}
