import { characters, lines } from '@rowanmanning/adventofcode-input-parsing';
import { leastCommonMultiple } from '@rowanmanning/adventofcode-math';

/**
 * @param {string} input
 * @returns {number}
 */
export function solution1(input) {
	return calculateSteps(
		parseDesertMapInput(input),
		'AAA',
		(location) => location === 'ZZZ'
	);
}

/**
 * @param {string} input
 * @returns {number}
 */
export function solution2(input) {
	const map = parseDesertMapInput(input);
	const stepCounts = Object.keys(map.nodes)
		.filter((node) => node.endsWith('A'))
		.map((location) =>
			calculateSteps(map, location, (location) => location.endsWith('Z'))
		)
		.sort();
	return stepCounts.reduce(leastCommonMultiple);
}

/**
 * @typedef {object} DesertMap
 * @property {string[]} instructions
 * @property {DesertMapNodeMap} nodes
 */

/**
 * @typedef {{[key: string]: DesertMapNode}} DesertMapNodeMap
 */

/**
 * @typedef {object} DesertMapNode
 * @property {string} left
 * @property {string} right
 */

/**
 * @param {string} input
 * @returns {DesertMap}
 */
function parseDesertMapInput(input) {
	const [instructionsInput, nodeInput] = lines(input, 2);
	return {
		instructions: characters(instructionsInput),
		nodes: parseDesertMapNodesInput(nodeInput)
	};
}

/**
 * @param {string} input
 * @returns {DesertMapNodeMap}
 */
function parseDesertMapNodesInput(input) {
	return lines(input).reduce(
		(/** @type {DesertMapNodeMap} */ nodes, line) => {
			const [nodeName, locations] = line.split(' = ');
			const [left, right] = locations
				.replace('(', '')
				.replace(')', '')
				.split(', ');
			nodes[nodeName] = { left, right };
			return nodes;
		},
		{}
	);
}

/**
 * @param {DesertMap} map
 * @param {string} from
 * @param {(location: string) => boolean} endTest
 * @returns {number}
 */
function calculateSteps(map, from, endTest) {
	let location = from;
	let steps = 0;
	while (!endTest(location)) {
		const instruction = map.instructions[steps % map.instructions.length];
		location = map.nodes[location][instruction === 'L' ? 'left' : 'right'];
		steps += 1;
	}
	return steps;
}
