import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  achievementMetaListSchema,
  credlyBadgeInventorySchema,
} from '../schemas/credly-inventory.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Repo root: `apps/web/lib/content/load` → five levels up to `portfolio-me`. */
const REPO_ROOT = join(__dirname, '..', '..', '..', '..', '..');

const CREDLY_FILE = join(REPO_ROOT, 'poc', 'credly-badges.json');
const META_FILE = join(process.cwd(), 'content', 'achievements-meta.json');

/**
 * @typedef {{ url: string; displayTitle?: string; issuer?: string; issuedOn?: string }} NormalizedBadge
 */

/**
 * Load Credly page URLs from `poc/credly-badges.json`, dedupe, validate HTTPS.
 * @returns {Promise<string[]>}
 */
export async function loadCredlyBadgeUrls() {
  try {
    const raw = await readFile(CREDLY_FILE, 'utf8');
    const parsed = credlyBadgeInventorySchema.parse(JSON.parse(raw));
    return [...new Set(parsed.badge_urls)];
  } catch {
    return [];
  }
}

/** @returns {Promise<{ badgeUrl: string; displayTitle?: string; issuer?: string; issuedOn?: string }[]>} */
async function loadAchievementMetaMap() {
  try {
    const raw = await readFile(META_FILE, 'utf8');
    return achievementMetaListSchema.parse(JSON.parse(raw));
  } catch {
    return [];
  }
}

/**
 * Badge URLs merged with optional `content/achievements-meta.json` titles.
 * @returns {Promise<NormalizedBadge[]>}
 */
export async function loadAchievements() {
  const urls = await loadCredlyBadgeUrls();
  const metaList = await loadAchievementMetaMap();
  const metaByUrl = new Map(metaList.map((m) => [m.badgeUrl, m]));

  return urls.map((url) => {
    const meta = metaByUrl.get(url);
    return {
      url,
      displayTitle: meta?.displayTitle,
      issuer: meta?.issuer,
      issuedOn: meta?.issuedOn,
    };
  });
}
