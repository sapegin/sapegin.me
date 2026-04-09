import { kebabCase } from 'change-case';
import { type ReactNode } from 'react';
import { formatTagName } from '../util/formatTagName';
import { Tag } from './Tag';

interface Props {
	tags?: readonly string[];
	children?: ReactNode;
}

export function RecipeTags({ tags = [], children }: Props) {
	return (
		<div className="flex flex-row flex-wrap gap-3">
			{children}
			{tags.map((tag) => (
				<Tag key={tag} href={`/tags/${kebabCase(tag)}/`}>
					{formatTagName(tag)}
				</Tag>
			))}
		</div>
	);
}
