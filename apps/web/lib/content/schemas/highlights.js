import { z } from 'zod';

export const highlightEntrySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional().default(''),
  date: z.string().optional(),
  icon: z.string().optional(),
});

export const highlightsFileSchema = z.array(highlightEntrySchema);
