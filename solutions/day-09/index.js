import { lines, words } from '@rowanmanning/adventofcode-input-parsing';
import { sum } from '@rowanmanning/adventofcode-math';

/**
 * @param {string} input
 * @returns {number}
 */
export function solution1(input) {
	return parseSequences(input).map(findNext).reduce(sum);
}

/**
 * @param {string} input
 * @returns {number}
 */
export function solution2(input) {
	return parseSequences(input).map(findPrevious).reduce(sum);
}

/**
 * @param {string} input
 * @returns {number[][]}
 */
function parseSequences(input) {
	return lines(input).map((line) => words(line).map(Number));
}

/**
 * @param {number[]} sequence
 * @returns {number}
 */
function findNext(sequence) {
	if (sequence.every((value) => value === sequence[0])) {
		return sequence[0];
	}
	const diffs = getDifferences(sequence);
	const last = sequence.at(-1) ?? 0;
	return last + findNext(diffs);
}

/**
 * @param {number[]} sequence
 * @returns {number}
 */
function findPrevious(sequence) {
	if (sequence.every((value) => value === sequence[0])) {
		return sequence[0];
	}
	const diffs = getDifferences(sequence);
	const first = sequence[0];
	return first - findPrevious(diffs);
}

/**
 * @param {number[]} sequence
 * @returns {number[]}
 */
function getDifferences(sequence) {
	return sequence.reduce((/** @type {number[]} */ result, value, index) => {
		if (index !== 0) {
			result.push(value - (sequence.at(index - 1) ?? 0));
		}
		return result;
	}, []);
}
