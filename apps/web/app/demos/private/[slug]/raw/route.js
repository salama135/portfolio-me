import { readFile } from 'node:fs/promises';
import { hasPrivateDemoAccess } from '../../../../../lib/private-demos/auth.js';
import { privateDemoFile } from '../../../../../lib/private-demos/registry.js';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow' };

export async function GET(_request, { params }) {
  if (!(await hasPrivateDemoAccess())) {
    return new Response('Locked', { status: 401, headers: { ...NO_STORE, 'Content-Type': 'text/plain' } });
  }
  const { slug } = await params;
  const file = await privateDemoFile(slug);
  if (!file) return new Response('Not found', { status: 404, headers: NO_STORE });

  let html;
  try {
    html = await readFile(file, 'utf8');
  } catch {
    return new Response('This demo has not been added yet.', { status: 404, headers: NO_STORE });
  }
  return new Response(html, {
    headers: { ...NO_STORE, 'Content-Type': 'text/html; charset=utf-8', 'X-Frame-Options': 'SAMEORIGIN' },
  });
}
