import { Code } from './Code';

interface Props {
	codes: {
		light: Record<string, string>;
		dark: Record<string, string>;
	};
	names: [string, string, string];
}

// Order values to rearrange items from interleaved:
// Light 1   Dark 1
// Light 2   Dark 2
// Light 3   Dark 3
// to grouped:
// Light 1   Dark 1
// Light 2   Dark 2
// Light 3   Dark 3
// on the 3-column breakpoint
const ORDER: [light: string, dark: string][] = [
	['lg:order-1', 'lg:order-4'],
	['lg:order-2', 'lg:order-5'],
	['lg:order-3', 'lg:order-6'],
];

export function CodeSpreadSupreme({ codes, names }: Props) {
	return (
		<div
			className="
     grid grid-cols-1 gap-x-8 gap-y-4
     md:grid-cols-2
     lg:grid-cols-3
   "
		>
			{names.flatMap((name, i) => [
				<div key={`light-${name}`} className={ORDER[i][0]}>
					<Code code={codes.light[name]} />
				</div>,
				<div key={`dark-${name}`} className={ORDER[i][1]}>
					<Code code={codes.dark[name]} />
				</div>,
			])}
		</div>
	);
}
