import { toKebabCase } from '@shared/util/toKebabCase';
import { formatTagName } from '../util/formatTagName';

interface Props {
	tags: [string, number][];
}

export function TagsLinks({ tags }: Props) {
	return (
		<ul className="columns-2 gap-x-4 md:columns-3 md:gap-x-8 lg:columns-4 lg:gap-x-12">
			{tags.map(([tag, count]) => {
				const name = formatTagName(tag.replace('-cuisine', ''));
				return (
					<li key={tag} className="mb-3">
						<a
							href={`/tags/${toKebabCase(tag)}/`}
							className="quoted-link block w-fit"
							aria-label={name}
						>
							<span className="flex flex-row gap-2">
								<u>{name}</u>
								<span className="text-secondary">{count}</span>
							</span>
						</a>
					</li>
				);
			})}
		</ul>
	);
}
