import component from 'tamia/lib/components/component';
import s from './Text.pcss';

export default component(({ small, big }) => ({
	[s.isSmall]: small,
	[s.isBig]: big,
}));
