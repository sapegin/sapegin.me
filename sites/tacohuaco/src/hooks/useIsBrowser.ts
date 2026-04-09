const canUseDOM = () =>
	Boolean(
		typeof window !== 'undefined' &&
			window.document &&
			window.document.createElement
	);

/**
 * A hook that indicates whether the component is run in the browser environment.
 */
export function useIsBrowser(): boolean {
	return canUseDOM();
}
