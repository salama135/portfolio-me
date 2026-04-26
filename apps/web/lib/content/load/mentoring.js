import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { mentoringContentSchema } from '../schemas/mentoring.js';

const FILE = join(process.cwd(), 'content', 'mentoring.json');

/** @returns {Promise<import('zod').infer<typeof mentoringContentSchema> | null>} */
export async function loadMentoring() {
  try {
    const raw = await readFile(FILE, 'utf8');
    return mentoringContentSchema.parse(JSON.parse(raw));
  } catch {
    return null;
  }
}
