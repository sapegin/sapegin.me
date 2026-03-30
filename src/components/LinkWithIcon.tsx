import type { ComponentPropsWithoutRef } from 'react';
import { Icon, type IconName } from './Icon';

type Props = ComponentPropsWithoutRef<'a'> & {
	icon: IconName;
};

export function LinkWithIcon({ icon, href, children, ...rest }: Props) {
	return (
		<a className="quoted-link" href={href} {...rest}>
			<span className="inline-flex items-center gap-1 align-bottom">
				<Icon icon={icon} />
				<u>{children}</u>
			</span>
		</a>
	);
}
