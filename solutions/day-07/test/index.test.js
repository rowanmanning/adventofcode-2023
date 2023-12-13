import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';
import { loadFixture } from '@rowanmanning/adventofcode-test';

import { solution1, solution2 } from '../index.js';

describe('day 7', () => {
	let exampleInput;
	let puzzleInput;

	before(async () => {
		exampleInput = await loadFixture('example-input', import.meta);
		puzzleInput = await loadFixture('puzzle-input', import.meta);
	});

	describe('solution 1', () => {
		describe('with test data', () => {
			it('returns the expected result', () => {
				assert.equal(solution1(exampleInput), 6440);
			});
		});

		describe('with puzzle input', () => {
			it('returns the expected result', () => {
				assert.equal(solution1(puzzleInput), 250347426);
			});
		});
	});

	describe('solution 2', () => {
		describe('with test data', () => {
			it('returns the expected result', () => {
				assert.equal(solution2(exampleInput), 5905);
			});
		});

		describe('with puzzle input', () => {
			it('returns the expected result', () => {
				assert.equal(solution2(puzzleInput), 251224870);
			});
		});
	});
});
