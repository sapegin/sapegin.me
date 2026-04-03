import { Photo } from './Photo';

export interface PageContext {
	photos?: Photo[];
	childrenRegExp?: string;
}
