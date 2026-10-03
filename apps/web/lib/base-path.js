/** Prefix for root-relative asset URLs when the site is served from a sub-path (GitHub Pages). */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @param {string | undefined} path */
export function withBase(path) {
  return BASE && typeof path === 'string' && path.startsWith('/') && !path.startsWith(BASE + '/') ? BASE + path : path;
}
