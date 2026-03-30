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
		<div className="code-spread-supreme">
			{names.map((name) => (
				<Code key={name} code={codes.light[name]} />
			))}
			{names.map((name) => (
				<Code key={name} code={codes.dark[name]} />
			))}
		</div>
	);
}
