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

const isBrowser = () => typeof globalThis !== 'undefined';

/**
 * Sync the state value with a given query parameter
 */
export function useUrlState<T>({
	name,
	defaultValue,
}: UseUrlStateInterface<T>): UseUrlStateReturnInterface<T> {
	const [value, setValue] = useState<T>(() => {
		if (isBrowser() === false) {
			return defaultValue;
		}
		const urlValue = new URL(globalThis.location.href).searchParams.get(name);
		return urlValue === null ? defaultValue : (urlValue as unknown as T);
	});
	const newSetValue = useCallback(
		(action: SetStateAction<T>) => {
			const nextValue = isFunction(action) ? action(value) : action;
			if (isBrowser()) {
				const url = new URL(globalThis.location.href);
				url.searchParams.set(name, String(nextValue));
				history.replaceState(null, '', url.toString());
			}
			return setValue(action);
		},
		[setValue, value, name]
	);
	return [value, newSetValue];
}
