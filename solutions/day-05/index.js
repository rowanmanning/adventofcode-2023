import { chunk, sortByProperty } from '@rowanmanning/adventofcode-array';
import { lines, words } from '@rowanmanning/adventofcode-input-parsing';

/**
 * @param {string} input
 * @returns {number}
 */
export function solution1(input) {
	const { seeds, maps } = parseAlmanac(input);

	function walkMap(type, value) {
		const map = maps.find(({ from }) => from === type);
		if (map) {
			const range = map.ranges.find(({ from, to }) => value >= from && value <= to);
			return walkMap(map.to, range ? value + range.offset : value);
		}
		return value;
	}

	const locations = seeds.map((seed) => walkMap('seed', seed));
	return Math.min(...locations);
}

/**
 * @param {string} input
 * @returns {number}
 */
export function solution2(input) {
	const { seeds: seedRanges, maps } = parseAlmanac(input);

	function walkMap(type, value) {
		const map = maps.find(({ from }) => from === type);
		if (map) {
			const range = map.ranges.find(
				({ from, to }) => value >= from && value <= to
			);
			return walkMap(map.to, range ? value + range.offset : value);
		}
		return value;
	}

	/** @type {number} */
	let lowestLocation = Infinity;

	for (const [from, count] of chunk(seedRanges, 2)) {
		for (let i = 0; i < count; i += 1) {
			lowestLocation = Math.min(
				lowestLocation,
				walkMap('seed', from + i)
			);
		}
	}

	return lowestLocation;
}

/**
 * @typedef {object} Almanac
 * @property {number[]} seeds
 * @property {AlmanacMap[]} maps
 */

/**
 * @typedef {object} AlmanacMap
 * @property {string} from
 * @property {string} to
 * @property {AlmanacMapRange[]} ranges
 */

/**
 * @typedef {object} AlmanacMapRange
 * @property {number} from
 * @property {number} to
 * @property {number} offset
 */

/**
 * @param {string} input
 * @returns {Almanac}
 */
export function parseAlmanac(input) {
	const [seedLine, ...mapInputs] = lines(input, 2);
	const seeds = words(seedLine.split(': ')[1]).map(Number);
	const maps = mapInputs.map(parseMapInput);
	return { seeds, maps };
}

export function parseMapInput(mapInput) {
	const [nameInput, ...values] = lines(mapInput);
	const [name] = words(nameInput);
	const [from, to] = name.split('-to-');

	/** @type {AlmanacMapRange[]} */
	const ranges = values
		.map((line) => {
			const [destination, source, count] = words(line).map(Number);
			return {
				from: source,
				to: source + count,
				offset: destination - source
			};
		})
		.sort(sortByProperty('from'));
	return { from, to, ranges };
}
