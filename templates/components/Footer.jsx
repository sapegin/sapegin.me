import { Small } from 'tamia/src/components/Text';
import Block from 'tamia/src/components/Block';

export default function() {
	return (
		<Block bottom={1 / 2}>
			<Small>© Artem Sapegin, 2002—{(new Date()).getFullYear()}</Small>
		</Block>
	);
}
