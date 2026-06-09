interface Props {
	code: string;
}

export function Code({ code }: Props) {
	// TODO: Make aria-hidden optional if this component
	// is ever used not as an illustration
	// oxlint-disable-next-line react/no-danger
	return <div dangerouslySetInnerHTML={{ __html: code }} aria-hidden="true" />;
}
