import { campaigns } from '../campaigns';
import { BookCover } from './BookCover';
import { PostAddon } from './PostAddon';

const { enabled: isCampaignEnabled, badge } = campaigns.washingCode;

export function BookPostHeader() {
	return (
		<PostAddon>
			<div className="flex gap-4">
				<div className="flex flex-col gap-4">
					{isCampaignEnabled && <p className="typo-flag">{badge}</p>}
					<p className="typo-intro">
						You’re reading an excerpt of my upcoming book on clean code for
						frontend developers, “Washing your code.”
					</p>
					<p className="typo-body">
						<a className="link" href="/book/">
							Get the book now!
						</a>
					</p>
				</div>
				<a className="link" href="/book/">
					<BookCover image="washing-your-code" title="Washing your code" />
				</a>
			</div>
		</PostAddon>
	);
}
