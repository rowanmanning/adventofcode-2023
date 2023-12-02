/**
 * Split an input string into characters.
 *
 * @param {string} input - The full input.
 * @returns {string[]} - Returns the characters in the input.
 */
export function characters(input) {
	return input.split('');
}

/**
 * Split an input string into lines.
 *
 * @param {string} input - The full input.
 * @returns {string[]} - Returns the lines in the input.
 */
export function lines(input) {
	return input.trim().split('\n');
}

/**
 * Split an input string into words, split on a single space.
 *
 * @param {string} input - The full input.
 * @returns {string[]} - Returns the words in the input.
 */
export function words(input) {
	return input.trim().split(' ');
}
