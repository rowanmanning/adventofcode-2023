import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';
import { loadFixture } from '@rowanmanning/adventofcode-test';

import { parseCardsInput, solution1, solution2 } from '../index.js';

describe('day 4', () => {
	let exampleInput;
	let puzzleInput;

	before(async () => {
		exampleInput = await loadFixture('example-input', import.meta);
		puzzleInput = await loadFixture('puzzle-input', import.meta);
	});

	describe('parseCardsInput', () => {
		it('returns an object representation of each card input string', () => {
			assert.deepEqual(parseCardsInput(exampleInput), [
				{
					name: 'Card 1',
					winningNumbers: [41, 48, 83, 86, 17],
					numbers: [83, 86, 6, 31, 17, 9, 48, 53]
				},
				{
					name: 'Card 2',
					winningNumbers: [13, 32, 20, 16, 61],
					numbers: [61, 30, 68, 82, 17, 32, 24, 19]
				},
				{
					name: 'Card 3',
					winningNumbers: [1, 21, 53, 59, 44],
					numbers: [69, 82, 63, 72, 16, 21, 14, 1]
				},
				{
					name: 'Card 4',
					winningNumbers: [41, 92, 73, 84, 69],
					numbers: [59, 84, 76, 51, 58, 5, 54, 83]
				},
				{
					name: 'Card 5',
					winningNumbers: [87, 83, 26, 28, 32],
					numbers: [88, 30, 70, 12, 93, 22, 82, 36]
				},
				{
					name: 'Card 6',
					winningNumbers: [31, 18, 13, 56, 72],
					numbers: [74, 77, 10, 23, 35, 67, 36, 11]
				}
			]);
		});
	});

	describe('solution 1', () => {
		describe('with test data', () => {
			it('returns the expected result', () => {
				assert.equal(solution1(exampleInput), 13);
			});
		});

		describe('with puzzle input', () => {
			it('returns the expected result', () => {
				assert.equal(solution1(puzzleInput), 27845);
			});
		});
	});

	describe('solution 2', () => {
		describe('with test data', () => {
			it('returns the expected result', () => {
				assert.equal(solution2(exampleInput), 30);
			});
		});

		describe('with puzzle input', () => {
			it('returns the expected result', () => {
				assert.equal(solution2(puzzleInput), 9496801);
			});
		});
	});
});
