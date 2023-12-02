import { lines, words } from '@rowanmanning/adventofcode-input-parsing';
import { sum } from '@rowanmanning/adventofcode-math';

/**
 * @param {string} input
 * @returns {number}
 */
export function solution1(input) {
	const bag = {
		blue: 14,
		green: 13,
		red: 12
	};
	return parseGameInput(input)
		.filter((game) =>
			game.rounds.every((round) => {
				return (
					round.blue <= bag.blue &&
					round.green <= bag.green &&
					round.red <= bag.red
				);
			})
		)
		.map((game) => game.id)
		.reduce(sum);
}

/**
 * @param {string} input
 * @returns {number}
 */
export function solution2(input) {
	return parseGameInput(input)
		.map((game) => {
			const blue = Math.max(...game.rounds.map((round) => round.blue));
			const green = Math.max(...game.rounds.map((round) => round.green));
			const red = Math.max(...game.rounds.map((round) => round.red));
			return blue * green * red;
		})
		.reduce(sum);
}

/**
 * @typedef {object} Game
 * @property {number} id
 * @property {GameRound[]} rounds
 */

/**
 * @typedef {object} GameRound
 * @property {number} blue
 * @property {number} green
 * @property {number} red
 */

/**
 * @param {string} gameInput
 * @returns {Game[]}
 */
export function parseGameInput(gameInput) {
	return lines(gameInput).map(parseGameLine);
}

/**
 * @param {string} lineInput
 * @returns {Game}
 */
export function parseGameLine(lineInput) {
	const [name, roundsInput] = lineInput.split(': ');
	const id = Number(words(name).at(-1));
	const rounds = roundsInput.split('; ').map(parseGameRoundInput);
	return {
		id,
		rounds
	};
}

/**
 * @param {string} roundInput
 * @returns {GameRound}
 */
export function parseGameRoundInput(roundInput) {
	const draws = Object.fromEntries(
		roundInput.split(', ').map(parseGameDrawInput)
	);
	return {
		blue: draws.blue || 0,
		green: draws.green || 0,
		red: draws.red || 0
	};
}

/**
 * @param {string} drawInput
 * @returns {[string, number]}
 */
export function parseGameDrawInput(drawInput) {
	const [count, color] = words(drawInput);
	return [color, Number(count)];
}
