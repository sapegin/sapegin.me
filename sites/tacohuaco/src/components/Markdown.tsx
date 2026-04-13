import MarkdownToJsx, { type MarkdownToJSX } from 'markdown-to-jsx';
import { typo } from '../util/typo';

// TODO: Merge with the shared component. Consider adding a separate prop for
// custom rules (or a variant that enables extended rules)

interface Props {
	text: string;
	overrides?: MarkdownToJSX.Options['overrides'];
	forceBlock?: boolean;
	forceInline?: boolean;
}

export function Markdown({
	text,
	overrides = {},
	forceBlock = false,
	forceInline = false,
}: Props) {
	const textTypo = typo(text);
	console.log(text);
	console.log(textTypo);
	return (
		<MarkdownToJsx options={{ overrides, forceBlock, forceInline }}>
			{textTypo}
		</MarkdownToJsx>
	);
}
