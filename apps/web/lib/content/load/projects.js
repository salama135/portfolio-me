import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { projectListSchema } from '../schemas/project.js';

const PROJECTS_DIR = join(process.cwd(), 'content', 'projects');

/** @returns {Promise<import('zod').infer<typeof import('../schemas/project.js').projectSchema>[]>} */
export async function loadProjects() {
  let files = [];
  try {
    files = await readdir(PROJECTS_DIR);
  } catch {
    return [];
  }

  const jsonFiles = files.filter((f) => f.endsWith('.json'));
  const items = [];
  for (const file of jsonFiles) {
    const raw = await readFile(join(PROJECTS_DIR, file), 'utf8');
    const data = JSON.parse(raw);
    items.push(data);
  }

  return projectListSchema.parse(items);
}
