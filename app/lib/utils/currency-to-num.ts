/**
 * It takes a string that looks like a currency and returns a number
 * @param {string} currency - string - The currency string to convert to a number.
 * @returns A function that takes a string and returns a number.
 */
const currencyToNum = (currency: string): number => {
    const num = Number(currency.replace(/[^(0-9.\-)]+/g, ''));
    return num;
};

export default currencyToNum;
