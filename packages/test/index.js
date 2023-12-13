import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Load a fixture file.
 *
 * @param {string} name
 * @param {ImportMeta} meta
 * @returns {Promise<string>}
 */
export async function loadFixture(name, meta) {
	const directory = new URL('.', meta.url).pathname;
	const filePath = path.join(directory, 'fixtures', `${name}.txt`);
	return await readFile(filePath, 'utf-8');
}
