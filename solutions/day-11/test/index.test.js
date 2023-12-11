import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';
import { readFile } from 'node:fs/promises';

import { solution1, solution2 } from '../index.js';

describe('day 11', () => {
	let exampleInput;
	let puzzleInput;

	before(async () => {
		const directory = new URL('.', import.meta.url).pathname;
		exampleInput = await readFile(
			`${directory}/fixtures/example-input.txt`,
			'utf-8'
		);
		puzzleInput = await readFile(
			`${directory}/fixtures/puzzle-input.txt`,
			'utf-8'
		);
	});

	describe('solution 1', () => {
		describe('with test data', () => {
			it('returns the expected result', () => {
				assert.equal(solution1(exampleInput), 374);
			});
		});

		describe('with puzzle input', () => {
			it('returns the expected result', () => {
				assert.equal(solution1(puzzleInput), 9723824);
			});
		});
	});

	describe('solution 2', () => {
		describe.skip('with test data', () => {
			it('returns the expected result', () => {
				assert.equal(solution2(exampleInput), null);
			});
		});

		describe.skip('with puzzle input', () => {
			it('returns the expected result', () => {
				assert.equal(solution2(puzzleInput), null);
			});
		});
	});
});
