import Block from 'tamia/lib/components/Block';
import Link from 'tamia/lib/components/Link';

export default function() {
	return (
		<Block component="header" bottom={2}>
			<Link href="/" quoted>← <u>Home</u></Link>
		</Block>
	);
}
