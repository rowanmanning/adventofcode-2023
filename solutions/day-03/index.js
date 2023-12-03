import { characters, lines } from '@rowanmanning/adventofcode-input-parsing';
import { sum } from '@rowanmanning/adventofcode-math';
import { isNumeric } from '@rowanmanning/adventofcode-string';

/**
 * @param {string} input
 * @returns {number}
 */
export function solution1(input) {
	const schematic = parseSchematic(input);
	const numbers = schematic.filter(({ value }) => typeof value === 'number');
	const symbols = schematic.filter(({ value }) => typeof value === 'string');
	return numbers
		.filter((component) => {
			return (
				symbols.filter(({ x1, y1 }) => {
					const xOverlap =
						x1 >= component.x1 - 1 && x1 <= component.x2 + 1;
					const yOverlap =
						y1 >= component.y1 - 1 && y1 <= component.y2 + 1;
					return xOverlap && yOverlap;
				}).length > 0
			);
		})
		.map(({ value }) => Number(value))
		.reduce(sum);
}

/**
 * @param {string} input
 * @returns {number}
 */
export function solution2(input) {
	const schematic = parseSchematic(input);
	return schematic
		.filter((component) => component.value === '*')
		.map((component) => {
			return schematic
				.filter(({ value }) => typeof value === 'number')
				.filter(({ x1, y1, x2, y2 }) => {
					const yOverlap =
						y2 >= component.y2 - 1 && y1 <= component.y1 + 1;
					const xOverlap =
						(x1 <= component.x1 && x2 >= component.x2) || // overlapping
						x1 === component.x2 + 1 || // to the right
						x2 === component.x1 - 1; // to the left
					return xOverlap && yOverlap;
				})
				.map(({ value }) => Number(value));
		})
		.filter((numbers) => numbers.length === 2)
		.map(([number1, number2]) => number1 * number2)
		.reduce(sum);
}

/**
 * @typedef {SchematicComponent[]} Schematic
 */

/**
 * @typedef {object} SchematicComponent
 * @property {number} x1
 * @property {number} x2
 * @property {number} y1
 * @property {number} y2
 * @property {string | number} value
 */

/**
 * @param {string} input
 * @returns {Schematic}
 */
function parseSchematic(input) {
	/** @type {Schematic} */
	const schematic = [];

	/** @type {SchematicComponent | undefined} */
	let component;

	const rows = lines(input).map(characters);
	for (let y = 0; y < rows.length; y += 1) {
		for (let x = 0; x < rows[y].length; x += 1) {
			const value = rows[y][x];
			if (isNumeric(value)) {
				if (component) {
					component.x2 = x;
					component.value += value;
				} else {
					component = {
						x1: x,
						y1: y,
						x2: x,
						y2: y,
						value
					};
				}
			} else {
				if (component) {
					component.value = Number(component.value);
					schematic.push(component);
					component = undefined;
				}
				if (value !== '.') {
					schematic.push({
						x1: x,
						y1: y,
						x2: x,
						y2: y,
						value
					});
				}
			}
		}
	}

	return schematic;
}
