import { Icon, type IconName } from './Icon';
import { QuotedLink } from './QuotedLink';
import { Stack } from './Stack';

type Props = React.ComponentProps<typeof QuotedLink> & {
	icon: IconName;
};

export function LinkWithIcon({ icon, href, children, ...rest }: Props) {
	return (
		<QuotedLink href={href} {...rest}>
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
