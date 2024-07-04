import { Stack, type StackProps } from './Stack';
import { type TextProps } from './Text';
import { TextTypo } from './TextTypo';

// HACK: I had to hardcoded colors to support dark mode because currentColor or
// CSS properties don’t work in background SVGs. Also Panda’s css prop explodes
// with <style> tag inside an SVG, so using inline styles instead.
// Alternative option would be using an inline image but then positioning would
// be much more tricky, which is taken care of with list-style-image
const checkmarkSvg =
	'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 6 6"><style>path{fill:#3a3d40}@media (prefers-color-scheme:dark){path{fill:#e3e6e8}}</style><path d="M0 2.014h1V3H0zM1 3h1v.986H1zM2 3.986h1v.986H2zM2.994 3h1v.986h-1zM3.994 2.014h1V3h-1zM4.994 1.027h1v.986h-1z"/></svg>';

export function FeatureList(props: StackProps<'ol'>) {
	return <Stack as="ul" gap="m" ml="1rem" {...props} />;
}

export function FeatureListItem(props: TextProps<'li'>) {
	return (
		<TextTypo
			as="li"
			pl="xs"
			style={{
				listStyleImage: `url('data:image/svg+xml,${encodeURIComponent(checkmarkSvg)}')`,
			}}
			{...props}
		/>
	);
}
