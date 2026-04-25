import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { interestListSchema } from '../schemas/interest.js';

const FILE = join(process.cwd(), 'content', 'interests.json');

/** @returns {Promise<import('zod').infer<typeof import('../schemas/interest.js').interestSchema>[]>} */
export async function loadInterests() {
  try {
    const raw = await readFile(FILE, 'utf8');
    return interestListSchema.parse(JSON.parse(raw));
  } catch {
    return [];
  }
}
