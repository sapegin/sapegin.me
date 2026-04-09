import { useEffect, useReducer,useRef } from 'react';

/**
 * Debounces the provided value in render
 * Based on https://github.com/amannn/react-hooks/tree/main/packages/use-debounced
 */
export function useDebouncedValue<T>(value: T, delay = 300) {
	const [, forceUpdate] = useReducer(() => ({}), {});

	const debouncedValueRef = useRef<T>(value);

	const returnedValue = debouncedValueRef.current;

	useEffect(() => {
		// When the delay increases, we need to be able to return
		// the previous value until the new one is applied.
		const timeoutId = setTimeout(() => {
			debouncedValueRef.current = value;

			if (value !== returnedValue) {
				forceUpdate();
			}
		}, delay);

		return () => clearTimeout(timeoutId);
	}, [delay, value, returnedValue]);

	return returnedValue;
}
