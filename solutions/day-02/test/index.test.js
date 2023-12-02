import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';
import { readFile } from 'node:fs/promises';

import { parseGameInput, solution1, solution2 } from '../index.js';

describe('day 2', () => {
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

	describe('parseGameInput', () => {
		it('returns an object representation of a game input string', () => {
			assert.deepEqual(parseGameInput(exampleInput), [
				{
					id: 1,
					rounds: [
						{ blue: 3, green: 0, red: 4 },
						{ blue: 6, green: 2, red: 1 },
						{ blue: 0, green: 2, red: 0 }
					]
				},
				{
					id: 2,
					rounds: [
						{ blue: 1, green: 2, red: 0 },
						{ blue: 4, green: 3, red: 1 },
						{ blue: 1, green: 1, red: 0 }
					]
				},
				{
					id: 3,
					rounds: [
						{ blue: 6, green: 8, red: 20 },
						{ blue: 5, green: 13, red: 4 },
						{ blue: 0, green: 5, red: 1 }
					]
				},
				{
					id: 4,
					rounds: [
						{ blue: 6, green: 1, red: 3 },
						{ blue: 0, green: 3, red: 6 },
						{ blue: 15, green: 3, red: 14 }
					]
				},
				{
					id: 5,
					rounds: [
						{ blue: 1, green: 3, red: 6 },
						{ blue: 2, green: 2, red: 1 }
					]
				}
			]);
		});
	});

	describe('solution 1', () => {
		describe('with test data', () => {
			it('returns the expected result', () => {
				assert.equal(solution1(exampleInput), 8);
			});
		});

		describe('with puzzle input', () => {
			it('returns the expected result', () => {
				assert.equal(solution1(puzzleInput), 2551);
			});
		});
	});

	describe('solution 2', () => {
		describe('with test data', () => {
			it('returns the expected result', () => {
				assert.equal(solution2(exampleInput), 2286);
			});
		});

		describe('with puzzle input', () => {
			it('returns the expected result', () => {
				assert.equal(solution2(puzzleInput), 62811);
			});
		});
	});
});
