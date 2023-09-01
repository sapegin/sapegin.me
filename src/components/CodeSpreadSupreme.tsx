import { Code, Grid } from '.';
import { grid } from './CodeSpreadSupreme.css';

type Props = {
	codes: {
		light: Record<string, string>;
		dark: Record<string, string>;
	};
	names: [string, string, string];
};

export function CodeSpreadSupreme({ codes, names }: Props) {
	return (
		<Grid rowGap="m" columnGap="l" className={grid}>
			{names.map((name) => {
				const code = codes.light[name];
				if (code === undefined) {
					return <p key={name}>Code sample not found for “{name}”</p>;
				}
				return <Code key={name} code={code} />;
			})}
			{names.map((name) => {
				const code = codes.dark[name];
				if (code === undefined) {
					return <p key={name}>Code sample not found for “{name}”</p>;
				}
				return <Code key={name} code={code} />;
			})}
		</Grid>
	);
}
