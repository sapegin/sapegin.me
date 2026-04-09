import { describe, expect, test } from 'vitest';
import { asList } from './asList';

describe('asList', () => {
	test('convert an array to a string', () => {
		const list = ['noodles', 'round pizza', 'wet ramen'];
		expect(asList(list)).toBe('noodles, round pizza and wet ramen');
	});
});
