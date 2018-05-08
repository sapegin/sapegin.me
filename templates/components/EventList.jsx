import { Big, Small } from 'tamia/lib/components/Text';
import Block from 'tamia/lib/components/Block';
import Group from 'tamia/lib/components/Group';
import Link from 'tamia/lib/components/Link';
import TalkName from './TalkName';

export default function({ items }, children, { typoTitle }) {
	return items.map(item => (
		<Block>
			<Big>
				<Link href={item.link}>{typoTitle(item.name)}</Link>
			</Big>
			<div>
				<TalkName {...item} />
			</div>
			<Small>
				<Group separator=", ">
					{item.date}
					{item.location}
					{item.slides && <Link href={item.slides}>slides</Link>}
					{item.video && <Link href={item.video}>video</Link>}
				</Group>
			</Small>
		</Block>
	));
}
