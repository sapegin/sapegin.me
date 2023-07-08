import { Stack, QuotedLink, Icon } from '.';
import type { IconName } from './Icon';

type Props = React.ComponentProps<typeof QuotedLink> & {
	icon: IconName;
};

export function LinkWithIcon({ icon, href, children }: Props) {
	return (
		<QuotedLink href={href}>
			<Stack
				as="span"
				display="inline-flex"
				direction="row"
				gap="xs"
				alignItems="center"
				verticalAlign="bottom"
			>
				<Icon icon={icon} />
				<u>{children}</u>
			</Stack>
		</QuotedLink>
	);
}
