import { Small } from 'tamia/lib/components/Text';
import Block from 'tamia/lib/components/Block';

export default function() {
	return (
		<Block bottom={1 / 2}>
			<Small>© Artem Sapegin, 2002—{(new Date()).getFullYear()}</Small>
		</Block>
	);
}
