import { definePreset } from '@pandacss/dev';
import { theme } from './theme';
import { patterns } from './patterns';
import { utilities } from './utilities';
import { globalCss } from './globalCss';
import { conditions } from './conditions';

export default definePreset({
	conditions,
	globalCss,
	utilities,
	patterns,
	theme,
});
