const SUBSTACK_ID = 'lofisunshine';
const IFRAME_URL = `https://${SUBSTACK_ID}.substack.com/embed`;

export function SubscriptionForm() {
	return (
		<iframe
			title="Newsletter form"
			src={IFRAME_URL}
			width="100%"
			height="320"
			loading="lazy"
		/>
	);
}
