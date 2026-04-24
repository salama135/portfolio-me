import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { adventureListSchema } from '../schemas/adventure.js';

const FILE = join(process.cwd(), 'content', 'adventures.json');

/** @returns {Promise<import('zod').infer<typeof import('../schemas/adventure.js').adventureSchema>[]>} */
export async function loadAdventures() {
  try {
    const raw = await readFile(FILE, 'utf8');
    return adventureListSchema.parse(JSON.parse(raw));
  } catch {
    return [];
  }
}
