import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { highlightListSchema } from '../schemas/highlight.js';

const FILE = join(process.cwd(), 'content', 'highlights.json');

/** @returns {Promise<import('zod').infer<typeof import('../schemas/highlight.js').highlightSchema>[]>} */
export async function loadHighlights() {
  try {
    const raw = await readFile(FILE, 'utf8');
    return highlightListSchema.parse(JSON.parse(raw));
  } catch {
    return [];
  }
}
