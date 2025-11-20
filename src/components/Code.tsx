interface Props {
	code: string;
}

export function Code({ code }: Props) {
	// TODO: Make aria-hidden optional if this component
	// is ever used not as an illustration
	// eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
	return <div dangerouslySetInnerHTML={{ __html: code }} aria-hidden="true" />;
}
