import { Box } from './Box';

// TODO: Can we import the colors from the theme or palette file?
// TODO: Can we avoid inline styles?

export function SquirrelsongLogo() {
	return (
		<Box
			as="pre"
			aria-hidden="true"
			css={{
				fontFamily: 'code',
				fontSize: 'clamp(2.6rem, 7vw, 4rem)',
				fontFeatureSettings: 'normal',
			}}
		>
			<span style={{ color: '#80a4be' }}>/</span>
			<span style={{ color: '#af9fc7' }}>*</span>
			<span style={{ color: '#de9e59', paddingInline: '0.15ch' }}>_</span>
			<span style={{ color: '#af9fc7' }}>*</span>
			<span style={{ color: '#80a4be' }}>/</span>
		</Box>
	);
}
