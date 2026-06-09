import { campaigns } from '../campaigns';

const { enabled: isCampaignEnabled, banner } = campaigns.washingCode;

export function Banner() {
	if (isCampaignEnabled === false) {
		return null;
	}

	return (
		<aside className="bg-accent -mt-4 mb-2 ml-[calc(50%-50vw)] w-screen px-4 py-2 text-center">
			<a
				href="/book/"
				className="text-background focus-visible:rounded-normal hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-(--border-width-focus-offset) focus-visible:outline-current"
			>
				{banner}
			</a>
		</aside>
	);
}
