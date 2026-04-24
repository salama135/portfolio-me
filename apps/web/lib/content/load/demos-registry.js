import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { demoExperienceListSchema } from '../schemas/demo-experience.js';

const FILE = join(process.cwd(), 'content', 'demos.json');

export async function loadDemosRegistry() {
  try {
    const raw = await readFile(FILE, 'utf8');
    return demoExperienceListSchema.parse(JSON.parse(raw));
  } catch {
    return [];
  }
}
