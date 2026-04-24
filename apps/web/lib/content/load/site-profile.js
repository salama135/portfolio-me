import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { siteProfileSchema } from '../schemas/site-profile.js';

export async function loadSiteProfile() {
  const path = join(process.cwd(), 'content', 'site-profile.json');
  const raw = await readFile(path, 'utf8');
  const json = JSON.parse(raw);
  return siteProfileSchema.parse(json);
}
