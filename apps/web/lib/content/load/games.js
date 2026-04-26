import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { gamePackSchema } from '../schemas/game-pack.js';

const GAMES_DIR = join(process.cwd(), 'content', 'games');

/** @returns {Promise<import('zod').infer<typeof gamePackSchema>[]>} */
export async function loadGamePacks() {
  let files = [];
  try {
    files = await readdir(GAMES_DIR);
  } catch {
    return [];
  }

  const packs = [];
  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const fullPath = join(GAMES_DIR, file);
    try {
      const raw = await readFile(fullPath, 'utf8');
      packs.push(gamePackSchema.parse(JSON.parse(raw)));
    } catch {
      /* skip invalid game JSON in dev */
    }
  }

  return packs.sort((a, b) => a.gameId.localeCompare(b.gameId));
}

/**
 * @param {string} gameId
 * @returns {Promise<import('zod').infer<typeof gamePackSchema> | null>}
 */
export async function loadGamePackById(gameId) {
  const packs = await loadGamePacks();
  return packs.find((p) => p.gameId === gameId) ?? null;
}
