import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import { projectSchema } from '../schemas/project.js';

const PROJECTS_DIR = join(process.cwd(), 'content', 'projects');

/** @returns {Promise<import('zod').infer<typeof import('../schemas/project.js').projectSchema>[]>} */
export async function loadProjects() {
  let files = [];
  try {
    files = await readdir(PROJECTS_DIR);
  } catch {
    return [];
  }

  const projects = [];
  for (const file of files) {
    const fullPath = join(PROJECTS_DIR, file);
    try {
      if (file.endsWith('.json')) {
        const raw = await readFile(fullPath, 'utf8');
        projects.push(projectSchema.parse(JSON.parse(raw)));
      } else if (file.endsWith('.mdx') || file.endsWith('.md')) {
        const raw = await readFile(fullPath, 'utf8');
        const { data, content } = matter(raw);
        projects.push(
          projectSchema.parse({
            ...data,
            body: typeof content === 'string' ? content.trim() : '',
          }),
        );
      }
    } catch {
      /* skip invalid editorial files in dev */
    }
  }

  return projects.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/** @returns {Promise<string[]>} */
export async function loadProjectSlugs() {
  const projects = await loadProjects();
  return [...new Set(projects.map((p) => p.slug))];
}

/**
 * @param {string} slug
 * @returns {Promise<import('zod').infer<typeof import('../schemas/project.js').projectSchema> | null>}
 */
export async function loadProjectBySlug(slug) {
  const projects = await loadProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}
