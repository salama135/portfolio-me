import { z } from 'zod';

const demoCategorySchema = z.enum(['immersive', 'augmented', 'three_d', 'creative', 'mobile', 'web', 'web_sports', 'games']);

export const demoExperienceSchema = z.object({
  slug: z.string(),
  title: z.string(),
  category: demoCategorySchema,
  summary: z.string(),
  deviceNeeds: z.string(),
  durationHint: z.string(),
  entryPath: z.string(),
  featureFlag: z.string().optional(),
  mobileAppLink: z.string().optional(),
});

export const demoExperienceListSchema = z.array(demoExperienceSchema);
