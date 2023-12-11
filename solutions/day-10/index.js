import { characters, lines } from '@rowanmanning/adventofcode-input-parsing';

// ======================================================================
//
//
//
//        I hate pretty much everything about this solution
//
//
//
//
// ======================================================================

/**
 * @param {string} input
 * @returns {number}
 */
export function solution1(input) {
	const diagram = new Diagram(input);
	const loop = new DiagramLoop(diagram);
	return loop.steps.length / 2;
}

/**
 * @param {string} input
 * @returns {number}
 */
export function solution2(input) {
	const diagram = new Diagram(input);
	const loop = new DiagramLoop(diagram);

	let count = 0;
	for (const row of loop.rows) {
		let inside = 0;
		for (const cell of row) {
			if (['|', 'L', 'J'].includes(cell)) {
				inside += 1;
			}
			if (cell === '.' && inside % 2 === 1) {
				count += 1;
			}
		}
	}

	return count;
}

/**
 * @typedef {object} Point
 * @property {number} x
 * @property {number} y
 */

class Diagram {
	/** @type {string[][]} */
	#data;

	/**
	 * @param {string} input
	 */
	constructor(input) {
		this.#data = lines(input).map((line) => characters(line));
	}

	/**
	 * @type {string[][]}
	 */
	get rows() {
		return structuredClone(this.#data);
	}

	/**
	 * @returns {Point}
	 */
	getStartingPoint() {
		const row = this.#data.find((row) => row.includes('S'));
		return {
			x: row?.indexOf('S') ?? -1,
			y: row ? this.#data.indexOf(row) : -1
		};
	}

	/**
	 * @param {Point} point
	 * @returns {string}
	 */
	value({ x, y }) {
		return this.#data[y]?.[x] || '.';
	}
}

class DiagramLoop {
	/** @type {Diagram} */
	#diagram;

	/** @type {Point[]} */
	#steps;

	/**
	 * @param {Diagram} diagram
	 */
	constructor(diagram) {
		this.#diagram = diagram;

		const start = diagram.getStartingPoint();
		const validStarts = [
			{ x: start.x + 1, y: start.y },
			{ x: start.x - 1, y: start.y },
			{ x: start.x, y: start.y + 1 },
			{ x: start.x, y: start.y - 1 }
		].filter(({ x, y }) => {
			const value = diagram.value({ x, y });
			return (
				(start.y < y && '|LJ'.includes(value)) ||
				(start.y > y && '|7F'.includes(value)) ||
				(start.x < x && '-7J'.includes(value)) ||
				(start.x > x && '-LF'.includes(value))
			);
		});

		this.#steps = [start, validStarts[0]];
		this.#walk();
	}

	get steps() {
		return structuredClone(this.#steps);
	}

	/**
	 * @type {Point}
	 */
	get #current() {
		// @ts-ignore this is fine, there are always at least two steps
		// so this can't actually error
		return this.#steps.at(-1);
	}

	/**
	 * @type {Point}
	 */
	get #previous() {
		// @ts-ignore this is fine, there are always at least two steps
		// so this can't actually error
		return this.#steps.at(-2);
	}

	/**
	 * @returns {void}
	 */
	#walk() {
		while (true) {
			const { x, y } = this.#current;
			const value = this.#diagram.value({ x, y });

			if (value === 'S') {
				this.#steps.pop();
				return;
			}

			if (value === '|') {
				if (this.#previous.y < y) {
					// Heading south
					this.#steps.push({ x, y: y + 1 });
					continue;
				}
				// Heading north
				this.#steps.push({ x, y: y - 1 });
				continue;
			}

			if (value === '-') {
				if (this.#previous.x < x) {
					// Heading east
					this.#steps.push({ x: x + 1, y });
					continue;
				}
				// Heading west
				this.#steps.push({ x: x - 1, y });
				continue;
			}

			if (value === 'L') {
				if (this.#previous.y !== y) {
					// Heading south east
					this.#steps.push({ x: x + 1, y });
					continue;
				}
				// Heading north west
				this.#steps.push({ x, y: y - 1 });
				continue;
			}

			if (value === 'J') {
				if (this.#previous.y !== y) {
					// Heading south west
					this.#steps.push({ x: x - 1, y });
					continue;
				}
				// Heading north east
				this.#steps.push({ x, y: y - 1 });
				continue;
			}

			if (value === '7') {
				if (this.#previous.y !== y) {
					// Heading north west
					this.#steps.push({ x: x - 1, y });
					continue;
				}
				// Heading south east
				this.#steps.push({ x, y: y + 1 });
				continue;
			}

			if (value === 'F') {
				if (this.#previous.y !== y) {
					// Heading north east
					this.#steps.push({ x: x + 1, y });
					continue;
				}
				// Heading south west
				this.#steps.push({ x, y: y + 1 });
			}
		}
	}

	/**
	 * @type {string[][]}
	 */
	get rows() {
		return this.#diagram.rows.map((row, y) => {
			return row.map((cell, x) => {
				const isInLoop = Boolean(
					this.#steps.find((step) => step.x === x && step.y === y)
				);

				// Turn the start cell into an actual pipe.
				// If I was doing this properly I'd also handle the case
				// where S can be a corner but no thanks
				if (cell === 'S') {
					const prev = this.#steps[this.#steps.length - 1];
					const next = this.#steps[1];
					if (prev.y === y && next.y === y) {
						return '-';
					}
					if (prev.x === x && next.x === x) {
						return '|';
					}
				}

				return isInLoop ? cell : '.';
			});
		});
	}

	draw() {
		return this.rows
			.map((row) => row.join(''))
			.join('\n')
			.replaceAll('S', '█')
			.replaceAll('|', '┃')
			.replaceAll('-', '━')
			.replaceAll('L', '┗')
			.replaceAll('J', '┛')
			.replaceAll('7', '┓')
			.replaceAll('F', '┏');
	}
}
