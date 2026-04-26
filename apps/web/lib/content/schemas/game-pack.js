import { z } from 'zod';

/** Rounds are game-specific; require id + arbitrary payload for loaders. */
export const gameRoundSchema = z
  .object({
    id: z.string(),
  })
  .passthrough();

export const gameOutcomeSchema = z.object({
  id: z.string(),
  message: z.string(),
});

export const gamePackSchema = z.object({
  gameId: z.string().min(1),
  title: z.string(),
  intro: z.string(),
  rounds: z.array(gameRoundSchema).default([]),
  outcomes: z.array(gameOutcomeSchema).default([]),
});
