import { access, readdir, readFile } from 'node:fs/promises';
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

async function loadRegistry() {
  try {
    const raw = await readFile(REGISTRY, 'utf8');
    return privateDemoListSchema.parse(JSON.parse(raw));
  } catch {
    return [];
  }
}

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();

/** Reads `<title>` and `<meta name="description">` (plus optional `demo:*` metas) from a page's head. */
export function metaFromHtml(slug, html) {
  const head = html.slice(0, 20000);
  const meta = (name) => {
    const m =
      head.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`, 'i')) ||
      head.match(new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["']`, 'i'));
    return m ? decode(m[1]) : '';
  };
  const title = decode(head.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? '') || slug.replace(/-/g, ' ');
  return {
    slug,
    title,
    category: meta('demo:category') || 'demo',
    summary: meta('description') || `Interactive demo: ${title}.`,
    deviceNeeds: meta('demo:device') || 'Any current desktop or mobile browser.',
    durationHint: meta('demo:duration') || '~5 min',
  };
}

/**
 * The collection is every entry in `content/private-demos.json` plus any `private-demos/<slug>.html`
 * that has no entry yet, described from the page's own head. Dropping a file in the folder is enough.
 */
export async function loadPrivateDemos() {
  const listed = await loadRegistry();
  const known = new Set(listed.map((d) => d.slug));
  let files = [];
  try {
    files = (await readdir(HTML_DIR)).filter((f) => /^[a-z0-9-]+\.html$/.test(f)).sort();
  } catch {}
  const discovered = [];
  for (const f of files) {
    const slug = f.slice(0, -'.html'.length);
    if (known.has(slug)) continue;
    try {
      discovered.push(metaFromHtml(slug, await readFile(join(HTML_DIR, f), 'utf8')));
    } catch {}
  }
  return [...listed, ...discovered];
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
