import { z } from 'zod';
import { mediaAssetSchema } from './media-asset.js';

export const adventureSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  media: z.array(mediaAssetSchema).min(1),
});

export const adventureListSchema = z.array(adventureSchema);
