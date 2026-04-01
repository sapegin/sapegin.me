import { Children, type ReactNode } from 'react';
import typo from '../../../shared/typo';

interface TypoProps {
	children: ReactNode;
}

/**
 * Enhance typography
 */
export function Typo({ children }: TypoProps) {
	// eslint-disable-next-line @eslint-react/no-children-map
	return Children.map(children, (child) => {
		if (typeof child === 'string' && child.trim() !== '') {
			const result = typo(child);
			if (result.includes('<')) {
				// Use dangerouslySetInnerHTML when the result contains HTML
				// (for example, <nobr>
				// eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
				return <span dangerouslySetInnerHTML={{ __html: result }} />;
			} else {
				return result;
			}
		} else {
			return child;
		}
	});
}
