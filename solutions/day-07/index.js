import { sortByProperty } from '@rowanmanning/adventofcode-array';
import {
	characters,
	lines,
	words
} from '@rowanmanning/adventofcode-input-parsing';
import { sum } from '@rowanmanning/adventofcode-math';
import { groupBy } from '@rowanmanning/adventofcode-object';

/**
 * @param {string} input
 * @returns {number}
 */
export function solution1(input) {
	return parseInput(input)
		.map((hand) => addHandType(hand))
		.sort(rankHands())
		.map(calculateWinnings)
		.reduce(sum);
}

/**
 * @param {string} input
 * @returns {number}
 */
export function solution2(input) {
	const options = { jackIsJoker: true };
	return parseInput(input)
		.map((hand) => addHandType(hand, options))
		.sort(rankHands(options))
		.map(calculateWinnings)
		.reduce(sum);
}

/**
 * @typedef {object} Hand
 * @property {string[]} cards
 * @property {number} bid
 */

/**
 * @param {string} input
 * @returns {Hand[]}
 */
function parseInput(input) {
	return lines(input).map((line) => {
		const [cards, bid] = words(line);
		return {
			cards: characters(cards),
			bid: Number(bid)
		};
	});
}

/**
 * @typedef {"five-of-a-kind" | "four-of-a-kind" | "full-house" | "three-of-a-kind" | "two-pair" | "one-pair" | "high-card"} HandType
 */

/**
 * @typedef {Hand & {type: HandType}} HandWithType
 */

/**
 * @param {Hand} hand
 * @param {{jackIsJoker?: boolean}} [options]
 * @returns {HandWithType}
 */
function addHandType(hand, options) {
	return { ...hand, type: getHandType(hand, options) };
}

const HAND_SIGNATURE_TO_TYPE = {
	5: 'five-of-a-kind',
	14: 'four-of-a-kind',
	23: 'full-house',
	113: 'three-of-a-kind',
	122: 'two-pair',
	1112: 'one-pair',
	11111: 'high-card'
};
const HAND_TYPE_RANKING = Object.values(HAND_SIGNATURE_TO_TYPE);

/**
 * @param {Hand} hand
 * @param {{jackIsJoker?: boolean}} [options]
 * @returns {HandType}
 */
function getHandType(hand, { jackIsJoker = false } = {}) {
	const groups = groupBy(hand.cards);
	if (jackIsJoker && groups.J) {
		const jokers = groups.J;
		delete groups.J;
		const biggestGroup = Object.values(groups).sort(
			sortByProperty('length')
		)[0];
		// Edge-case: if the whole hand is jokers then we don't have any groups now
		if (biggestGroup) {
			biggestGroup.push(...jokers);
		} else {
			groups.J = jokers;
		}
	}
	const handSignature = Object.values(groups)
		.map((group) => group.length)
		.sort()
		.join('');
	return HAND_SIGNATURE_TO_TYPE[handSignature];
}

/**
 * @param {{jackIsJoker?: boolean}} [options]
 * @returns {(hand1: HandWithType, hand2: HandWithType) => -1 | 0 | 1}
 */
function rankHands(options) {
	return (hand1, hand2) => {
		// If the hand types are different we know the order immediately
		if (hand1.type !== hand2.type) {
			const typeRanking1 = HAND_TYPE_RANKING.indexOf(hand1.type);
			const typeRanking2 = HAND_TYPE_RANKING.indexOf(hand2.type);
			if (typeRanking1 < typeRanking2) {
				return 1;
			}
			if (typeRanking1 > typeRanking2) {
				return -1;
			}
			return 0;
		}

		// We have to sort by the strength of the cards at the same index
		for (let index = 0; index < hand1.cards.length; index += 1) {
			const cardStrength1 = cardStrength(hand1.cards[index], options);
			const cardStrength2 = cardStrength(hand2.cards[index], options);
			if (cardStrength1 > cardStrength2) {
				return 1;
			}
			if (cardStrength1 < cardStrength2) {
				return -1;
			}
		}
		return 0;
	};
}

const CARD_STRENGTHS = {
	// biome-ignore lint/style/useNamingConvention: ugh can you not?
	A: 14,
	// biome-ignore lint/style/useNamingConvention: ugh can you not?
	K: 13,
	// biome-ignore lint/style/useNamingConvention: ugh can you not?
	Q: 12,
	// biome-ignore lint/style/useNamingConvention: ugh can you not?
	J: 11,
	// biome-ignore lint/style/useNamingConvention: ugh can you not?
	T: 10
};

/**
 * @param {string} card
 * @param {{jackIsJoker?: boolean}} [options]
 * @returns {number}
 */
function cardStrength(card, { jackIsJoker = false } = {}) {
	const cardStrengthMap = jackIsJoker
		? { ...CARD_STRENGTHS, J: 1 }
		: CARD_STRENGTHS;
	return cardStrengthMap[card] ?? Number(card);
}

/**
 * @param {Hand} hand
 * @param {number} index
 * @returns {number}
 */
function calculateWinnings(hand, index) {
	const rank = index + 1;
	return hand.bid * rank;
}
