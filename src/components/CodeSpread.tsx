import { Grid } from './Grid';
import { Code } from './Code';

type Props = {
	codes: {
		light: Record<string, string>;
		dark: Record<string, string>;
	};
	name: string;
};

export function CodeSpread({ codes, name }: Props) {
	const lightCode = codes.light[name];
	const darkCode = codes.dark[name];

	if (lightCode === undefined || darkCode === undefined) {
		return <p>Code sample not found for “{name}”</p>;
	}

	return (
		<Grid auto="wide" rowGap="m" columnGap="l">
			<Code code={lightCode} />
			<Code code={darkCode} />
		</Grid>
	);
}
