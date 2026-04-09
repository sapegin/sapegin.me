import { kebabCase } from 'change-case';
import { CuisineName } from './CuisinesName';

interface Props {
	cuisines: [string, number][];
}

export function CuisinesLinks({ cuisines }: Props) {
	return (
		<ul className="
    columns-2 gap-x-4
    md:columns-3 md:gap-x-8
    lg:columns-4 lg:gap-x-12
  ">
			{cuisines.map(([cuisine, count]) => (
				<li key={cuisine} className="mb-3">
					<a
						href={`/cuisines/${kebabCase(cuisine)}/`}
						className="block w-fit quoted-link"
					>
						<span className="flex flex-row gap-2">
							<CuisineName cuisine={cuisine} underline />
							<span className="text-secondary">{count}</span>
						</span>
					</a>
				</li>
			))}
		</ul>
	);
}
