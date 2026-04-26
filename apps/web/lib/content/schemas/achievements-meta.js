import { z } from 'zod';

/** Optional page copy and section labels for `/achievements`. */
export const achievementsMetaSchema = z.object({
  headline: z.string().optional(),
  intro: z.string().optional(),
  milestonesHeading: z.string().optional().default('Milestones'),
});
