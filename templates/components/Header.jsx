import Container from 'tamia/lib/components/Container';
import Link from 'tamia/lib/components/Link';

import s from './Header.pcss';

export default () => (
	<Container component="header" class={s.header}>
		<Link href="/" quoted>← <u>Home</u></Link>
	</Container>
);
