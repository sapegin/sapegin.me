import { Box } from './Box';
import { Link } from './Link';

export const LOGO_WIDTH = '400px';

const Span = ({ children }: { children: React.ReactNode }) => (
	<Box
		as="span"
		css={{
			display: 'inline-block',
			paddingInline: 's',
			paddingTop: 'xxs',
			fontFamily: 'ui',
			fontSize: 'ui',
			color: 'background',
			backgroundColor: 'text',
			letterSpacing: '0.05ex',
			fontWeight: 300,
			lineHeight: 0.8,
			textTransform: 'uppercase',
			textDecoration: 'none',
			transitionDuration: 'hover',
			transitionTimingFunction: 'hover',
			transitionProperty: 'all',
			// TODO: Try group
			'a:hover &': {
				backgroundColor: 'accent',
			},
		}}
	>
		{children}
	</Box>
);

export function Logo() {
	return (
		<Link href="/" display="inline-flex" flexDirection="column">
			<span>
				<Span>Artem</Span>
			</span>
			<span>
				<Span>Sapegin</Span>
			</span>
		</Link>
	);
}
