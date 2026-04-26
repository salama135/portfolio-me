import { z } from 'zod';

/** Raw file shape at repo `poc/credly-badges.json`. */
export const credlyBadgeInventorySchema = z.object({
  badge_urls: z.array(
    z
      .string()
      .min(1)
      .refine((u) => /^https:\/\//i.test(u), { message: 'Badge URL must be HTTPS' }),
  ),
});

export const achievementMetaEntrySchema = z.object({
  badgeUrl: z.string().url(),
  displayTitle: z.string().min(1).optional(),
  issuer: z.string().optional(),
  issuedOn: z.string().optional(),
});

export const achievementMetaListSchema = z.array(achievementMetaEntrySchema);
