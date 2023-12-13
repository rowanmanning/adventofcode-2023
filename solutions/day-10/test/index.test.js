import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';
import { loadFixture } from '@rowanmanning/adventofcode-test';

import { solution1, solution2 } from '../index.js';

describe('day 10', () => {
	let exampleInput;
	let exampleInput2;
	let exampleInput3;
	let exampleInput4;
	let puzzleInput;

	before(async () => {
		exampleInput = await loadFixture('example-input', import.meta);
		exampleInput2 = await loadFixture('example-input-2', import.meta);
		exampleInput3 = await loadFixture('example-input-3', import.meta);
		exampleInput4 = await loadFixture('example-input-4', import.meta);
		puzzleInput = await loadFixture('puzzle-input', import.meta);
	});

	describe('solution 1', () => {
		describe('with test data', () => {
			it('returns the expected result', () => {
				assert.equal(solution1(exampleInput), 4);
				assert.equal(solution1(exampleInput2), 8);
			});
		});

		describe('with puzzle input', () => {
			it('returns the expected result', () => {
				assert.equal(solution1(puzzleInput), 6903);
			});
		});
	});

	describe('solution 2', () => {
		describe('with test data', () => {
			it('returns the expected result', () => {
				assert.equal(solution2(exampleInput3), 4);
				assert.equal(solution2(exampleInput4), 10);
			});
		});

		describe('with puzzle input', () => {
			it('returns the expected result', () => {
				assert.equal(solution2(puzzleInput), 265);
			});
		});
	});
});
