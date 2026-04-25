import { z } from 'zod';

export const mediaAssetSchema = z.object({
  src: z.string(),
  alt: z.string().min(1),
  caption: z.string().optional(),
  type: z.enum(['image', 'video']),
});
