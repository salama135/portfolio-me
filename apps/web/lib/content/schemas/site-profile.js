import { z } from 'zod';

export const siteProfileSchema = z.object({
  title: z.string(),
  tagline: z.string(),
  roles: z.array(z.string()).min(1),
  locale: z.string().default('en'),
  social: z
    .object({
      github: z.string().optional(),
      linkedin: z.string().optional(),
      email: z.string().optional(),
      calendar: z.string().optional(),
    })
    .optional()
    .default({}),
  seo: z
    .object({
      description: z.string().optional(),
      ogImage: z.string().optional(),
    })
    .optional()
    .default({}),
});
