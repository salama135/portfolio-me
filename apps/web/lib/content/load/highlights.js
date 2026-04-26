import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { highlightsFileSchema } from '../schemas/highlights.js';

const FILE = join(process.cwd(), 'content', 'highlights.json');

/** @returns {Promise<import('zod').infer<typeof highlightsFileSchema>>} */
export async function loadHighlights() {
  try {
    const raw = await readFile(FILE, 'utf8');
    return highlightsFileSchema.parse(JSON.parse(raw));
  } catch {
    return [];
  }
}
