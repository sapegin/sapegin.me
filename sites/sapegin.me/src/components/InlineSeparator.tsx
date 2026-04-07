// TODO: Should this be a Tailwind utility on <hr> element?

export function InlineSeparator() {
	return (
		<span
			role="separator"
			className="inline-block h-[0.3rem] w-[0.3rem] bg-border"
		/>
	);
}
