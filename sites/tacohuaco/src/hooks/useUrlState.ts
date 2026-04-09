import isFunction from 'lodash/isFunction';
import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useState,
} from 'react';

interface UseUrlStateInterface<T> {
	name: string;
	defaultValue: T;
}

type UseUrlStateReturnInterface<S> = [S, Dispatch<SetStateAction<S>>];

const isBrowser = () => typeof window !== 'undefined';

/**
 * Sync the state value with a given query parameter
 */
export function useUrlState<T>({
	name,
	defaultValue,
}: UseUrlStateInterface<T>): UseUrlStateReturnInterface<T> {
	if (isBrowser() === false) {
		const [state, setState] = useState(defaultValue);
		return [state, setState];
	}

	const url = new URL(window.location.href);
	const [value, setValue] = useState<T>(() => {
		const urlValue = url.searchParams.get(name);
		return urlValue === null ? defaultValue : (urlValue as unknown as T);
	});
	const newSetValue = useCallback(
		(action: SetStateAction<T>) => {
			const nextValue = isFunction(action) ? action(value) : action;
			url.searchParams.set(name, String(nextValue));
			const nextUrl = url.toString();
			history.replaceState(null, '', nextUrl);
			return setValue(action);
		},
		[setValue]
	);
	return [value, newSetValue];
}
