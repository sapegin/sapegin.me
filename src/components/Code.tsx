type Props = {
	code: string;
};

export function Code({ code }: Props) {
	return <div dangerouslySetInnerHTML={{ __html: code }} />;
}
