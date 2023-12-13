import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';
import { loadFixture } from '@rowanmanning/adventofcode-test';

import { solution1, solution2 } from '../index.js';

describe('day 1', () => {
	let exampleInput;
	let exampleInput2;
	let puzzleInput;

	before(async () => {
		exampleInput = await loadFixture('example-input', import.meta);
		exampleInput2 = await loadFixture('example-input-2', import.meta);
		puzzleInput = await loadFixture('puzzle-input', import.meta);
	});

	describe('solution 1', () => {
		describe('with test data', () => {
			it('returns the expected result', () => {
				assert.equal(solution1(exampleInput), 142);
			});
		});

		describe('with puzzle input', () => {
			it('returns the expected result', () => {
				assert.equal(solution1(puzzleInput), 54450);
			});
		});
	});

	describe('solution 2', () => {
		describe('with test data', () => {
			it('returns the expected result', () => {
				assert.equal(solution2(exampleInput2), 281);
			});
		});

		describe('with puzzle input', () => {
			it('returns the expected result', () => {
				assert.equal(solution2(puzzleInput), 54265);
			});
		});
	});
});
