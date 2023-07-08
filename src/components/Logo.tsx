import { Link } from '.';
import { span } from './Logo.css';

export const LOGO_WIDTH = '400px';

export function Logo() {
	return (
		<Link href="/" display="inline-flex" flexDirection="column">
			<span>
				<span className={span}>Artem</span>
			</span>
			<span>
				<span className={span}>Sapegin</span>
			</span>
		</Link>
	);
}
