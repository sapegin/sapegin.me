import { useEffect, useState } from 'react';

/**
 * Debounces the provided value in render.
 */
export function useDebouncedValue<T>(value: T, delay = 300) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeoutId = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(timeoutId);
	}, [value, delay]);

	return debouncedValue;
}
