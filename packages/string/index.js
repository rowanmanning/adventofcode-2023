
/**
 * Check whether a string is made up of only numbers.
 *
 * @param {string} string - The string to test.
 * @returns {boolean} - Returns whether the string contains only numeric characters..
 */
export function isNumeric(string) {
	return Number.isInteger(Number(string));
}
