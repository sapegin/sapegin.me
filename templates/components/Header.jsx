import Block from 'tamia/src/components/Block';
import Link from 'tamia/src/components/Link';

export default function() {
	return (
		<Block component="header" bottom={2}>
			<Link href="/" quoted>← <u>Home</u></Link>
		</Block>
	);
}
