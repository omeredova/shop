const DECIMAL_PLACES = 2;
const DECIMAL_FACTOR = 10 ** DECIMAL_PLACES;

export const formatNumber = (value: number): string => {
    if (!Number.isFinite(value)) {
        return '0,00';
    }

    const isNegative = value < 0;
    const truncatedValue = Math.trunc(Math.abs(value) * DECIMAL_FACTOR);
    const integerPart = Math.floor(truncatedValue / DECIMAL_FACTOR);
    const decimalPart = truncatedValue % DECIMAL_FACTOR;
    const groupedInteger = integerPart
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return `${isNegative ? '-' : ''}${groupedInteger},${decimalPart
        .toString()
        .padStart(DECIMAL_PLACES, '0')}`;
};