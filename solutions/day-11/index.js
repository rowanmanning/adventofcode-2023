import { characters, lines } from '@rowanmanning/adventofcode-input-parsing';
import { sum } from '@rowanmanning/adventofcode-math';

/**
 * @param {string} input
 * @returns {number}
 */
export function solution1(input) {
	const space = new Space(input);
	const galaxyLocations = space.galaxyLocations;

	let distance = 0;
	for (let i = 0; i < galaxyLocations.length; i += 1) {
		const { x: x1, y: y1 } = galaxyLocations[i];
		for (let j = i + 1; j < galaxyLocations.length; j += 1) {
			const { x: x2, y: y2 } = galaxyLocations[j];
			distance += Math.abs(x1 - x2) + Math.abs(y1 - y2);
		}
	}
	return distance;
}

/**
 * @param {string} input
 * @returns {null}
 */
export function solution2(input) {
	console.log('Input was', input);
	return null;
}

/**
 * @typedef {object} Point
 * @property {number} x
 * @property {number} y
 */

class Space {
	/** @type {string[][]} */
	#rows;

	/**
	 * @param {string} input
	 */
	constructor(input) {
		this.#rows = lines(input).map((line) => characters(line));
		this.#expand();
	}

	/**
	 * @returns {void}
	 */
	#expand() {
		for (let y = this.#rows.length - 1; y >= 0; y -= 1) {
			const row = this.row(y);
			if (row?.every((cell) => cell === '.')) {
				this.#rows.splice(y, 0, row);
			}
		}
		for (let x = this.#rows[0].length - 1; x >= 0; x -= 1) {
			if (this.column(x)?.every((cell) => cell === '.')) {
				for (const row of this.#rows) {
					row.splice(x, 0, '.');
				}
			}
		}
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {string | null}
	 */
	cell(x, y) {
		return this.#rows[y]?.[x] ?? null;
	}

	/**
	 * @param {number} y
	 * @returns {string[] | null}
	 */
	row(y) {
		return this.#rows[y] ? structuredClone(this.#rows[y]) : null;
	}

	/**
	 * @param {number} x
	 * @returns {string[] | null}
	 */
	column(x) {
		const column = this.#rows.map((row) => row[x]);
		return column.every((cell) => typeof cell === 'string') ? column : null;
	}

	/**
	 * @type {Point[]}
	 */
	get galaxyLocations() {
		/** @type {Point[]} */
		const galaxies = [];
		for (let y = 0; y < this.#rows.length; y += 1) {
			for (let x = 0; x < this.#rows[y].length; x += 1) {
				if (this.cell(x, y) === '#') {
					galaxies.push({ x, y });
				}
			}
		}
		return galaxies;
	}

	/**
	 * @returns {string}
	 */
	toString() {
		return this.#rows.map((row) => row.join('')).join('\n');
	}
}
