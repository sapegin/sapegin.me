import component from 'tamia/lib/components/component';
import cx from 'classnames';
import s from './Pulse.pcss';

/* eslint-disable no-irregular-whitespace */

const LegendLink = component(({ name }) => [s.legend, s[`legend${name}`]], 'a');

export default function() {
	return (
		<div class={s.root} id="pulse" role="presentation">
			<script class="js-pulse-template" type="text/template">
				In the last 25 weeks
				I’ve shot <LegendLink href="https://instagram.com/sapegin/" name="Instagram">{'{instagram} instagrams'}</LegendLink>,
				wrote <LegendLink href="https://twitter.com/iamsapegin" name="Twitter">{'{twitter} tweets'}</LegendLink> and
				pushed <LegendLink href="https://github.com/sapegin" name="GitHub">{'{github} commits'}</LegendLink> to GitHub
			</script>
			<div class={cx(s.info, 'js-pulse-info')}></div>
			<div class="js-pulse-chart"></div>
		</div>
	);
}
