import { Stack, Grid, Text, Link } from '.';
import type { Resource } from '../types/Resource';

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
				</Stack>
			))}
		</Grid>
	);
}
