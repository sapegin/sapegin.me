import { Grid, Code } from '.';

type Props = {
	codes: {
		light: Record<string, string>;
		dark: Record<string, string>;
	};
	name: string;
};

export function CodeSpread({ codes, name }: Props) {
	const ligthCode = codes.light[name];
	const darkCode = codes.dark[name];

	if (ligthCode === undefined || darkCode === undefined) {
		return <p>Code sample not found for “{name}”</p>;
	}

	return (
		<Grid auto="wide" rowGap="m" columnGap="l">
			<Code code={ligthCode} />
			<Code code={darkCode} />
		</Grid>
	);
}
