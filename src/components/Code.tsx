interface Props {
	code: string;
}

export function Code({ code }: Props) {
	// TODO: Make aria-hidden optional if this component
	// is ever used not as an illustration
	return <div dangerouslySetInnerHTML={{ __html: code }} aria-hidden="true" />;
}
