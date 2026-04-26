import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { credlyBadgeInventorySchema } from '../schemas/credly-inventory.js';
import { achievementsFileSchema } from '../schemas/achievement-entry.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** `apps/web/lib/content/load` → five levels up to monorepo root. */
const REPO_ROOT = join(__dirname, '..', '..', '..', '..', '..');

const CREDLY_POC_FILE = join(REPO_ROOT, 'poc', 'credly-badges.json');
const ACHIEVEMENTS_FILE = join(process.cwd(), 'content', 'achievements.json');

/**
 * @param {string} url
 * @returns {string | null}
 */
export function parseShareBadgeIdFromCredlyUrl(url) {
  const m = url.match(/badges\/([a-f0-9-]{36})/i);
  return m ? m[1] : null;
}

/**
 * @returns {Promise<import('zod').infer<typeof import('../schemas/achievement-entry.js').achievementEntrySchema>[]>}
 */
async function loadAchievementsFromFile() {
  try {
    const raw = await readFile(ACHIEVEMENTS_FILE, 'utf8');
    const parsed = achievementsFileSchema.parse(JSON.parse(raw));
    return parsed.achievements;
  } catch {
    return [];
  }
}

/**
 * Fallback: POC URL list → credly_embed rows (no issuer/skills until you edit JSON).
 * @returns {Promise<import('zod').infer<typeof import('../schemas/achievement-entry.js').achievementEntrySchema>[]>}
 */
async function loadAchievementsFromPocFallback() {
  try {
    const raw = await readFile(CREDLY_POC_FILE, 'utf8');
    const { badge_urls: badgeUrls } = credlyBadgeInventorySchema.parse(JSON.parse(raw));
    const unique = [...new Set(badgeUrls)];
    const out = [];
    let i = 0;
    for (const url of unique) {
      const shareBadgeId = parseShareBadgeIdFromCredlyUrl(url);
      if (!shareBadgeId) continue;
      out.push({
        kind: 'credly_embed',
        id: `poc-credly-${i}`,
        shareBadgeId,
        issuer: '',
        skills: [],
      });
      i += 1;
    }
    return out;
  } catch {
    return [];
  }
}

/**
 * Curated achievements: `content/achievements.json` when non-empty; otherwise POC Credly URLs.
 * @returns {Promise<import('zod').infer<typeof import('../schemas/achievement-entry.js').achievementEntrySchema>[]>}
 */
export async function loadAchievements() {
  const fromFile = await loadAchievementsFromFile();
  if (fromFile.length > 0) return fromFile;
  return loadAchievementsFromPocFallback();
}

/** @returns {Promise<string[]>} */
export async function loadCredlyBadgeUrls() {
  try {
    const raw = await readFile(CREDLY_POC_FILE, 'utf8');
    const parsed = credlyBadgeInventorySchema.parse(JSON.parse(raw));
    return [...new Set(parsed.badge_urls)];
  } catch {
    return [];
  }
}
