import { lines, words } from '@rowanmanning/adventofcode-input-parsing';
import { intersection } from '@rowanmanning/adventofcode-array';
import { sum } from '@rowanmanning/adventofcode-math';

/**
 * @param {string} input
 * @returns {number}
 */
export function solution1(input) {
	return parseCardsInput(input)
		.map((card) => {
			const winners = intersection(card.numbers, card.winningNumbers);
			if (winners.length) {
				return winners.slice(1).reduce((total) => total * 2, 1);
			}
			return 0;
		})
		.reduce(sum);
}

/**
 * @param {string} input
 * @returns {number}
 */
export function solution2(input) {
	const cards = parseCardsInput(input);

	/** @type {{[key: string]: ScratchCard[]}} */
	const winningCardMap = cards.reduce((map, card, index) => {
		let winCount = intersection(card.numbers, card.winningNumbers).length;
		map[card.name] = [];
		while (winCount) {
			if (cards[index + winCount]) {
				map[card.name].push(cards[index + winCount]);
			}
			winCount -= 1;
		}
		return map;
	}, {});

	for (const card of cards) {
		if (winningCardMap[card.name]) {
			cards.push(...winningCardMap[card.name]);
		}
	}

	return cards.length;
}

/**
 * @typedef {object} ScratchCard
 * @property {string} name
 * @property {number[]} winningNumbers
 * @property {number[]} numbers
 */

/**
 * @param {string} cardsInput
 * @returns {ScratchCard[]}
 */
export function parseCardsInput(cardsInput) {
	return lines(cardsInput).map(parseCardLine);
}

/**
 * @param {string} lineInput
 * @returns {ScratchCard}
 */
function parseCardLine(lineInput) {
	const [name, allNumbers] = lineInput.split(': ');
	const [winningNumbers, numbers] = allNumbers.split(' | ');
	return {
		name,
		winningNumbers: words(winningNumbers).map(Number),
		numbers: words(numbers).map(Number)
	};
}
