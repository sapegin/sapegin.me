import { Grid } from './Grid';
import { Code } from './Code';

interface Props {
	codes: {
		light: Record<string, string>;
		dark: Record<string, string>;
	};
	names: [string, string, string];
}

export function CodeSpreadSupreme({ codes, names }: Props) {
	return (
		<Grid
			rowGap="m"
			columnGap="l"
			css={{
				gridTemplateColumns: {
					base: '1fr',
					tablet: '1fr 1fr',
					desktop: '1fr 1fr 1fr',
				},
				gridTemplateAreas: {
					base: `"light1" "dark1" "light2" "dark2" "light3" "dark3"`,
					tablet: `"light1 dark1" "light2 dark2" "light3 dark3"`,
					desktop: `"light1 light2 light3" "dark1 dark2 dark3"`,
				},
				'& :nth-child(1)': {
					gridArea: 'light1',
				},
				'& :nth-child(2)': {
					gridArea: 'light2',
				},
				'& :nth-child(3)': {
					gridArea: 'light3',
				},
				'& :nth-child(4)': {
					gridArea: 'dark1',
				},
				'& :nth-child(5)': {
					gridArea: 'dark2',
				},
				'& :nth-child(6)': {
					gridArea: 'dark3',
				},
			}}
		>
			{names.map((name) => {
				return <Code key={name} code={codes.light[name]} />;
			})}
			{names.map((name) => {
				return <Code key={name} code={codes.dark[name]} />;
			})}
		</Grid>
	);
}
