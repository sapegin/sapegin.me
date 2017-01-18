import component from 'tamia/lib/components/component';
import Block from 'tamia/lib/components/Block';
import Layout from 'tamia/lib/components/Layout';
import Link from 'tamia/lib/components/Link';
import s from './ColumnList.pcss';

const Wrapper = component(({ primary }) => [s.root, {
	[s.isPrimary]: primary,
	[s.isSecondary]: !primary,
}]);

export default function({ items, primary }, children, { typo, typoTitle }) {
	return (
		<Wrapper primary={primary}>
			<Layout>
				{items.map(item => (
					<Layout sm={1 / 2}>
						<Block>
							<div class={s.title}>
								<Link href={item.link}>{typoTitle(item.title)}</Link>
							</div>
							<div class={s.text}>{typo(item.description)}</div>
						</Block>
					</Layout>
				))}
			</Layout>
		</Wrapper>
	);
}
