import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { demoExperienceListSchema } from '../schemas/demo-experience.js';

export async function loadDemosRegistry() {
  const path = join(process.cwd(), 'content', 'demos.json');
  const raw = await readFile(path, 'utf8');
  const json = JSON.parse(raw);
  return demoExperienceListSchema.parse(json);
}
