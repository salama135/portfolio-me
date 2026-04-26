import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { achievementsMetaSchema } from '../schemas/achievements-meta.js';

const FILE = join(process.cwd(), 'content', 'achievements-meta.json');

/** @returns {Promise<import('zod').infer<typeof achievementsMetaSchema> | null>} */
export async function loadAchievementsMeta() {
  try {
    const raw = await readFile(FILE, 'utf8');
    return achievementsMetaSchema.parse(JSON.parse(raw));
  } catch {
    return null;
  }
}
