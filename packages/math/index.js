/**
 * Add two numbers together.
 *
 * @param {number} [number1] - The first number.
 * @param {number} [number2] - The number to add to the first.
 * @returns {number} - Returns the result of the sum.
 */
export function sum(number1 = 0, number2 = 0) {
	return number1 + number2;
}

/**
 * Multiply two numbers together.
 *
 * @param {number} [number1] - The first number.
 * @param {number} [number2] - The number to multiply with the first.
 * @returns {number} - Returns the result of the multiplication.
 */
export function multiply(number1 = 1, number2 = 1) {
	return number1 * number2;
}

/**
 * Find the greatest common divisor of two numbers.
 * https://en.wikipedia.org/wiki/Greatest_common_divisor
 *
 * @param {number} number1
 * @param {number} [number2]
 * @returns {number}
 */
export function greatestCommonDivider(number1, number2) {
	return number2
		? greatestCommonDivider(number2, number1 % number2)
		: number1;
}

/**
 * Find the least common multiple of two numbers.
 * https://en.wikipedia.org/wiki/Least_common_multiple
 *
 * @param {number} number1
 * @param {number} number2
 * @returns {number}
 */
export function leastCommonMultiple(number1, number2) {
	return (number1 * number2) / greatestCommonDivider(number1, number2);
}
