import { Code } from './Code';

interface Props {
	codes: {
		light: Record<string, string>;
		dark: Record<string, string>;
	};
	name: string;
}

export function CodeSpread({ codes, name }: Props) {
	const lightCode = codes.light[name];
	const darkCode = codes.dark[name];

	return (
		<div className="grid-auto-wide grid gap-x-8 gap-y-4">
			<Code code={lightCode} />
			<Code code={darkCode} />
		</div>
	);
}
