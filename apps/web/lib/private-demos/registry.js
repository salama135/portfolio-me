import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { z } from 'zod';

const REGISTRY = join(process.cwd(), 'content', 'private-demos.json');
const HTML_DIR = join(process.cwd(), 'private-demos');

const privateDemoSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  category: z.string(),
  summary: z.string(),
  deviceNeeds: z.string(),
  durationHint: z.string(),
});

export const privateDemoListSchema = z.array(privateDemoSchema);

export async function loadPrivateDemos() {
  try {
    const raw = await readFile(REGISTRY, 'utf8');
    return privateDemoListSchema.parse(JSON.parse(raw));
  } catch {
    return [];
  }
}

/** Absolute path of a registered demo's standalone HTML file, or null for unknown slugs. */
export async function privateDemoFile(slug) {
  const demos = await loadPrivateDemos();
  if (!demos.some((d) => d.slug === slug)) return null;
  return join(HTML_DIR, `${slug}.html`);
}

export async function privateDemoFileExists(slug) {
  const file = await privateDemoFile(slug);
  if (!file) return false;
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}
