import type { Resource } from '../types/Resource';
import { Badge } from './Badge';
import { Grid } from './Grid';
import { Link } from './Link';
import { Stack } from './Stack';
import { Text } from './Text';

interface Props {
	items: Resource[];
}

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
