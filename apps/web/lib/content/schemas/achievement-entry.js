import { z } from 'zod';

const skillsSchema = z.array(z.string()).default([]);

/** Credly hosted badge iframe (official embed attributes). */
export const achievementCredlyEmbedSchema = z.object({
  kind: z.literal('credly_embed'),
  id: z.string().min(1),
  shareBadgeId: z
    .string()
    .min(1)
    .describe('UUID from Credly badge URL or dashboard embed snippet'),
  issuer: z.string().optional().default(''),
  skills: skillsSchema,
});

/** Fully manual certificate row (image + copy). */
export const achievementManualSchema = z.object({
  kind: z.literal('manual'),
  id: z.string().min(1),
  certificateImage: z
    .string()
    .min(1)
    .describe('Path under /public or absolute https URL'),
  title: z.string().min(1),
  description: z.string().default(''),
  issueDate: z.string().min(1),
  skills: skillsSchema,
  issuer: z.string().min(1),
});

export const achievementEntrySchema = z.discriminatedUnion('kind', [
  achievementCredlyEmbedSchema,
  achievementManualSchema,
]);

export const achievementsFileSchema = z.object({
  achievements: z.array(achievementEntrySchema).default([]),
});
