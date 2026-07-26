import { formatNumber } from './formatNumber';

describe('formatNumber', () => {
    it.each([
        [0, '0,00'],
        [12, '12,00'],
        [1234.5, '1 234,50'],
        [1234567.899, '1 234 567,89'],
        [-9876.549, '-9 876,54'],
    ])('formats %s as %s', (value, expected) => {
        expect(formatNumber(value)).toBe(expected);
    });

    it('truncates instead of rounding', () => {
        expect(formatNumber(9.999)).toBe('9,99');
    });

    it('returns a safe value for non-finite numbers', () => {
        expect(formatNumber(Number.NaN)).toBe('0,00');
        expect(formatNumber(Number.POSITIVE_INFINITY)).toBe('0,00');
    });
});