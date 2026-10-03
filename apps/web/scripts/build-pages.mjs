#!/usr/bin/env node
/**
 * Static export for GitHub Pages.
 *
 * Pages serves files only, so this prepares a throwaway copy of the app: it removes the
 * server-only routes (Netlify Blobs, quotes API, revalidation, middleware, the server-gated
 * private demos) and swaps in the client-side private demo pages from `pages-static/`.
 * The working tree is left untouched.
 *
 * Env: PAGES_BASE_PATH (e.g. "/portfolio-me"), PRIVATE_DEMOS_PASSWORD (optional).
 * Output: apps/web/out-pages/
 */
import { createHash } from 'node:crypto';
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const web = join(dirname(fileURLToPath(import.meta.url)), '..');
const work = join(web, '.pages-build');
const outDir = join(web, 'out-pages');
const base = process.env.PAGES_BASE_PATH ?? '';

const SERVER_ONLY = ['app/blobs', 'app/quotes', 'app/revalidation', 'app/image-cdn', 'app/demos/private', 'middleware.js'];
const SKIP = new Set(['node_modules', '.next', 'out', 'out-pages', '.pages-build', 'test-results', 'playwright-report']);

await rm(work, { recursive: true, force: true });
await mkdir(work);
for (const entry of await readdir(web)) {
  if (!SKIP.has(entry)) await cp(join(web, entry), join(work, entry), { recursive: true });
}
for (const p of SERVER_ONLY) await rm(join(work, p), { recursive: true, force: true });

// client-side private collection: same URLs, password checked in the browser
await cp(join(web, 'pages-static', 'demos-private'), join(work, 'app', 'demos', 'private'), { recursive: true });
const pw = process.env.PRIVATE_DEMOS_PASSWORD ?? '';
const hash = pw ? createHash('sha256').update(`private-demos:${pw}`).digest('hex') : '';
await writeFile(join(work, 'app', 'demos', 'private', 'password-hash.js'), `export const PASSWORD_HASH = ${JSON.stringify(hash)};\n`);
await mkdir(join(work, 'public', 'private-demos'), { recursive: true });
if (existsSync(join(web, 'private-demos'))) {
  for (const f of await readdir(join(web, 'private-demos'))) {
    if (f.endsWith('.html')) await cp(join(web, 'private-demos', f), join(work, 'public', 'private-demos', f));
  }
}

// workspace deps resolve from the monorepo root, which is the parent of both copies
execFileSync('npx', ['next', 'build'], { cwd: work, stdio: 'inherit', env: { ...process.env, PAGES_BASE_PATH: base } });

await rm(outDir, { recursive: true, force: true });
await cp(join(work, 'out'), outDir, { recursive: true });
await writeFile(join(outDir, '.nojekyll'), '');
const notFound = join(outDir, '404', 'index.html');
if (existsSync(notFound)) await writeFile(join(outDir, '404.html'), await readFile(notFound));
await rm(work, { recursive: true, force: true });
console.log(`GitHub Pages build ready in ${outDir} (base path "${base}")`);
