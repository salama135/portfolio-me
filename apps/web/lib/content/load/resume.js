import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { resumeDocumentSchema } from '../schemas/resume.js';

const FILE = join(process.cwd(), 'content', 'resume.json');

/** @returns {Promise<import('zod').infer<typeof resumeDocumentSchema>>} */
export async function loadResume() {
  try {
    const raw = await readFile(FILE, 'utf8');
    return resumeDocumentSchema.parse(JSON.parse(raw));
  } catch {
    return resumeDocumentSchema.parse({
      experiences: [],
      education: [],
      skillGroups: {
        programmingLanguages: [],
        frameworks: [],
        concepts: [],
        tools: [],
      },
    });
  }
}
