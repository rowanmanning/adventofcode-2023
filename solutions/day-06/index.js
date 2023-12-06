import { lines, words } from '@rowanmanning/adventofcode-input-parsing';
import { multiply } from '@rowanmanning/adventofcode-math';

/**
 * @param {string} input
 * @returns {number}
 */
export function solution1(input) {
	return parseMultipleRaceInput(input).map(getButtonPressCount).reduce(multiply);
}

/**
 * @param {string} input
 * @returns {number}
 */
export function solution2(input) {
	const race = parseSingleRaceInput(input);
	return getButtonPressCount(race);
}

/**
 * @param {Race} race
 * @returns {number}
 */
function getButtonPressCount(race) {
	let recordBeatingOptions = 0;
	for (let speed = 0; speed < race.time; speed += 1) {
		const remainingTime = race.time - speed;
		const distance = speed * remainingTime;
		if (distance > race.recordDistance) {
			recordBeatingOptions += 1;
		}
	}
	return recordBeatingOptions;
}

/**
 * @typedef {object} Race
 * @property {number} time
 * @property {number} recordDistance
 */

/**
 * @param {string} racesInput
 * @returns {Race[]}
 */
export function parseMultipleRaceInput(racesInput) {
	const [times, recordDistances] = lines(racesInput).map(parseRaceInputLine);
	return times.map((time, index) => ({
		time,
		recordDistance: recordDistances[index]
	}));
}

/**
 * @param {string} racesInput
 * @returns {Race}
 */
export function parseSingleRaceInput(racesInput) {
	const [time, recordDistance] = lines(racesInput).map((line) => {
		return Number(line.split(': ').at(-1)?.replaceAll(' ', ''));
	});
	return { time, recordDistance };
}

/**
 * @param {string} raceInputLine
 * @returns {number[]}
 */
function parseRaceInputLine(raceInputLine) {
	const numbers = raceInputLine.split(': ').at(-1);
	return words(`${numbers}`).map(Number);
}
