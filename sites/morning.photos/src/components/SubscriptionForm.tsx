const SUBSTACK_ID = 'lofisunshine';
const IFRAME_URL = `https://${SUBSTACK_ID}.substack.com/embed`;

export function SubscriptionForm() {
	return (
		// Substack’s embed needs JavaScript; sandbox would block it.
		// oxlint-disable-next-line react/iframe-missing-sandbox
		<iframe
			title="Newsletter form"
			src={IFRAME_URL}
			width="100%"
			height="320"
			loading="lazy"
		/>
	);
}
