import { logo } from './SquirelsongLogo.css';

// TODO: Can we import the colors from the theme or palette file?

export function SquirelsongLogo() {
	return (
		<pre className={logo} aria-hidden="true">
			<span style={{ color: '#80a4be' }}>/</span>
			<span style={{ color: '#af9fc7' }}>*</span>
			<span style={{ color: '#de9e59', paddingInline: '0.15ch' }}>_</span>
			<span style={{ color: '#af9fc7' }}>*</span>
			<span style={{ color: '#80a4be' }}>/</span>
		</pre>
	);
}
