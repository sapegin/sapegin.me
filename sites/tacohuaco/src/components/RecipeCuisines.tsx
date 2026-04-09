import { kebabCase } from 'change-case';
import { CuisineName } from './CuisinesName';
import { Tag } from './Tag';

interface Props {
	cuisines: readonly string[];
}

export function RecipeCuisines({ cuisines }: Props) {
	return (
		<div className="flex flex-row gap-3">
			{cuisines.map((cuisine) => (
				<Tag key={cuisine} href={`/cuisines/${kebabCase(cuisine)}/`}>
					<CuisineName cuisine={cuisine} />
				</Tag>
			))}
		</div>
	);
}
