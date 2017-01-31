import { Beta, Big, Small } from 'tamia/lib/components/Text';
import Block from 'tamia/lib/components/Block';
import Container from 'tamia/lib/components/Container';
import Link from 'tamia/lib/components/Link';
import Script from 'tamia/lib/components/Script';
import ColumnList from './components/ColumnList';
import Socials from './components/Socials';
import Lead from './components/Lead';
import Section from './components/Section';
import Pulse from './components/Pulse';
import Base from './Base';

/* eslint-disable max-len */

export default function({ links, projects, socials }) {
	return (
		<Base>
			<Container class="h-card">
				<Section level={1}>
					<Lead head={'Hi.'}>
						My name is <span class="p-given-name" title="Pronounced as [ar'tiyom]">Artem</span><span class="is-hidden p-family-name"> Sapegin</span>. I’m a <span class="p-job-title">frontend developer</span> at <Link href="https://www.here.com/" class="p-org" title="Yep, “Here” is a company name ;–)">Here</Link>, passionate photographer, coffee drinker and crazy dogs’ owner living in <span class="p-region">Berlin, Germany</span>.
					</Lead>
				</Section>

				<Section level={1}>
					<ColumnList items={links} primary />
				</Section>

				<Section level={2}>
					<Beta>My projects</Beta>
					<Block>
						<ColumnList items={projects} />
					</Block>
					<Small>
						<Link href="https://github.com/sapegin/sapegin.me">Site’s source code</Link> ∙ <Link href="/history">My interactive story</Link>
					</Small>
				</Section>

				<Section level={3}>
					<Beta>Contact me</Beta>
					<Big>
						Drop me a line at <Link href="mailto:artem@sapegin.ru" class="u-email">artem@sapegin.ru</Link>, ping me at <Link href="skype:artemsapegin">Skype</Link> or <Link href="https://github.com/sapegin/ama">ask me anything</Link>.
					</Big>
				</Section>

				<Section level={3}>
					<Socials items={socials} />
				</Section>
			</Container>

			<Pulse />

			<Script entry="main" inline />
		</Base>
	);
}
