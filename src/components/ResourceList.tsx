import type { Resource } from '../types/Resource';
import { Stack, Grid, Text, Link, Badge } from '.';

type Props = {
	items: Resource[];
};

export function ResourceList({ items }: Props) {
	return (
		<Grid as="ul" auto="wide" gap="m">
			{items.map((item) => (
				<Stack key={item.url ?? item.title} as="li" gap="s">
					<Text variant="large">
						{item.url ? <Link href={item.url}>{item.title}</Link> : item.title}
					</Text>
					{item.description && <Text>{item.description}</Text>}
					{item.badges && (
						<Stack as="p" direction="row" gap="xs" alignItems="center">
							{item.badges.map((badge) => (
								<Badge key={badge}>{badge}</Badge>
							))}
						</Stack>
					)}
				</Stack>
			))}
		</Grid>
	);
}
