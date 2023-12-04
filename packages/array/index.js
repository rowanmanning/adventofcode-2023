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
