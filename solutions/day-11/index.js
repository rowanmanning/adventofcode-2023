import { characters, lines } from '@rowanmanning/adventofcode-input-parsing';

/**
 * @param {string} input
 * @returns {number}
 */
export function solution1(input) {
	return new Space(input).distanceBetweenGalaxies(1);
}

/**
 * @param {string} input
 * @returns {number}
 */
export function solution2(input) {
	return new Space(input).distanceBetweenGalaxies(1_000_000);
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

	/** @type {Point[]} */
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

	/** @type {number[]} */
	get emptyRows() {
		const result = [];
		for (let y = 0; y < this.#rows.length; y += 1) {
			if (this.row(y)?.every((cell) => cell === '.')) {
				result.push(y);
			}
		}
		return result;
	}

	/** @type {number[]} */
	get emptyColumns() {
		const result = [];
		for (let x = 0 - 1; x < this.#rows[0].length; x += 1) {
			if (this.column(x)?.every((cell) => cell === '.')) {
				result.push(x);
			}
		}
		return result;
	}

	/**
	 * @param {number} [expansionFactor]
	 * @returns {number}
	 */
	distanceBetweenGalaxies(expansionFactor = 1) {
		const galaxyLocations = this.galaxyLocations;
		const emptyColumns = this.emptyColumns;
		const emptyRows = this.emptyRows;

		const realExpansionFactor =
			expansionFactor === 1 ? expansionFactor : expansionFactor - 1;

		let distance = 0;
		for (let i = 0; i < galaxyLocations.length; i += 1) {
			const { x: x1, y: y1 } = galaxyLocations[i];
			for (let j = i + 1; j < galaxyLocations.length; j += 1) {
				const { x: x2, y: y2 } = galaxyLocations[j];

				const minX = Math.min(x1, x2);
				const maxX = Math.max(x1, x2);
				const minY = Math.min(y1, y2);
				const maxY = Math.max(y1, y2);

				const emptyColumnsCrossed =
					emptyColumns.filter((x) => x < maxX && x > minX).length *
					realExpansionFactor;

				const emptyRowsCrossed =
					emptyRows.filter((y) => y < maxY && y > minY).length *
					realExpansionFactor;

				const xDiff = maxX - minX;
				const yDiff = maxY - minY;

				distance +=
					xDiff + yDiff + emptyColumnsCrossed + emptyRowsCrossed;
			}
		}
		return distance;
	}

	/**
	 * @returns {string}
	 */
	toString() {
		return this.#rows.map((row) => row.join('')).join('\n');
	}
}
