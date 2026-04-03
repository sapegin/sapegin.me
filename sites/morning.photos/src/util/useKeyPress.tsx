import { useEffect } from 'react';

export default function useKeyPress(targetKey: string, fn: () => void): void {
	function handler({ key }: KeyboardEvent) {
		if (key === targetKey) {
			fn();
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', handler);
		return () => {
			window.removeEventListener('keydown', handler);
		};
	}, []);
}
