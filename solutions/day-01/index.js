
import {lines} from '@rowanmanning/adventofcode-input-parsing';
import {sum} from '@rowanmanning/adventofcode-math';

/**
 * @param {string} input
 * @returns {number}
 */
export function solution1(input) {
	return lines(input)
		.map(line => {
			const numericCharacters = line.split('').filter(isNumeric);
			return Number(`${numericCharacters.at(0)}${numericCharacters.at(-1)}`);
		})
		.reduce(sum);
}

/**
 * @param {string} input
 * @returns {number}
 */
export function solution2(input) {
	const numberWords = [
		'one', 'two', 'three',
		'four', 'five', 'six',
		'seven', 'eight', 'nine'
	];
	const numberWordsRegExp = new RegExp(`^(${numberWords.join('|')})`, 'g');

	return lines(input)
		.map(line => {
			const numbers = line.split('')
				.reduce((/** @type {string[]} */ result, character, index) => {
					if (isNumeric(character)) {
						result.push(character);
						return result;
					}
					const match = line.substring(index).match(numberWordsRegExp);
					if (match?.[0]) {
						result.push(`${numberWords.indexOf(match?.[0]) + 1}`);
					}
					return result;
				}, []);
			return Number(`${numbers.at(0)}${numbers.at(-1)}`);
		})
		.reduce(sum);
}

/**
 * @param {string} string
 * @returns {boolean}
 */
export function isNumeric(string) {
	return Number.isInteger(Number(string));
}
