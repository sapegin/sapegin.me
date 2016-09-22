import Base from './Base';
import ColumnList from './components/ColumnList';

/* eslint-disable max-len */

export default function($) {
	const { links, projects } = $;
	const { Script, Icon } = $;
	return (
		<Base {...$}>
			<div class="content text h-card">
				<header class="index-header index-block index-block_last">
					<div class="index-header__primary">Hi.</div>
					<div class="index-header__secondary">My name is <span class="p-given-name" title="Pronounced as [ar'tiyom]">Artem</span><span class="is-hidden p-family-name"> Sapegin</span>. I’m a <span class="p-job-title">front-end developer</span> at <a href="https://www.here.com/" class="p-org" title="Yep, “Here” is a company name ;–)">Here</a>, passionate photographer, coffee drinker and crazy dogs’ owner living in <span class="p-region">Berlin, Germany</span>.</div>
				</header>

				<ColumnList {...$} items={links} class="column-list_primary index-block" />

				<h2 class="beta">My projects</h2>

				<div class="projects">
					<ColumnList {...$} items={projects} />
				</div>

				<div class="footer">
					<a href="https://github.com/sapegin/sapegin.me">Site‘s source</a> ∙ <a href="/history">My interactive history</a>
				</div>

				<h2 class="beta">Contact me</h2>

				<div class="index-contacts">
					<p>Drop me a line at <a href="mailto:artem@sapegin.ru" class="u-email">artem@sapegin.ru</a> or ping me at <a href="skype:artemsapegin">Skype</a> if you just want to chat.</p>
				</div>

				<div class="socials">
					<a href="https://twitter.com/iamsapegin" class="socials__item socials__item_twitter" title="Twitter">
						<Icon name="twitter" />
					</a>
					<a href="https://www.facebook.com/artemsapegin" class="socials__item socials__item_facebook" title="Facebook">
						<Icon name="facebook" />
					</a>
					<a href="https://instagram.com/sapegin/" class="socials__item socials__item_instagram" title="Instagram">
						<Icon name="instagram" />
					</a>
					<a href="https://github.com/sapegin" class="socials__item socials__item_github" title="GitHub">
						<Icon name="github" />
					</a>
				</div>

			</div>

			<div class="pulse" id="pulse" role="presentation">
				<script class="js-pulse-template" type="text/template">In the last 25 weeks I’ve shot <a href="https://instagram.com/sapegin/" class="pulse__legend pulse__legend_instagram">{'{instagram} instagrams'}</a>, wrote <a href="https://twitter.com/iamsapegin" class="pulse__legend pulse__legend_twitter">{'{twitter} tweets'}</a> and pushed <a href="https://github.com/sapegin" class="pulse__legend pulse__legend_github">{'{github} commits'}</a> to GitHub</script>
				<div class="pulse__info js-pulse-info"></div>
				<div class="pulse__chart js-pulse-chart"></div>
			</div>

			<Script src="/build/homepage.js" inline />
		</Base>
	);
}
