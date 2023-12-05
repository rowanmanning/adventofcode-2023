/**
 * Get an array of the common items which appear in two arrays.
 *
 * @param {any[]} array1 - The first array.
 * @param {any[]} array2 - The second array.
 * @returns {any[]} - Returns the intersection array.
 */
export function intersection(array1, array2) {
	return array1.filter((item) => array2.includes(item));
}

/**
 * Split an array into chunks of a certain number.
 *
 * @template {any} Type1
 * @param {Type1[]} array
 * @param {number} size
 * @returns {Type1[][]}
 */
export function chunk(array, size) {
	/** @type {Type1[][]} */
	const chunks = [];
	for (let i = 0; i < array.length; i += size) {
		chunks.push(array.slice(i, i + size));
	}
	return chunks;
}

/**
 * @callback Sorter
 * @param {any} item1
 * @param {any} item2
 * @returns {-1 | 0 | 1}
 */

/**
 * Create a sorter that sorts an array by a child object property.
 *
 * @param {string} property
 * @returns {Sorter}
 */
export function sortByProperty(property) {
	return (item1, item2) => {
		const value1 = item1?.[property];
		const value2 = item2?.[property];

		if (value1 < value2) {
			return 1;
		}
		if (value1 > value2) {
			return -1;
		}
		return 0;
	};
}
