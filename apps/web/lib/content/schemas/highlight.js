import { z } from 'zod';

export const highlightSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  date: z.string().optional(),
  icon: z.string().optional(),
});

export const highlightListSchema = z.array(highlightSchema);
