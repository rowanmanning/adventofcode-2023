/**
 * @callback Grouper
 * @param {any} item
 * @returns {any}
 */

/** @type {Grouper} */
const defaultGrouper = (item) => item;

/**
 * Group an array of items based on the return value of a callback.
 *
 * @template {any} Type1
 * @param {Type1[]} items
 * @param {Grouper} [grouper]
 * @returns {{[key: string]: Type1[]}}
 */
export function groupBy(items, grouper = defaultGrouper) {
	/** @type {{[key: string]: Type1[]}} */
	const groups = {};
	for (const item of items) {
		const group = grouper(item);
		groups[group] ??= [];
		groups[group].push(item);
	}
	return groups;
}
