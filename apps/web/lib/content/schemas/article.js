import { z } from 'zod';

export const articleFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  author: z.string(),
  tags: z.array(z.string()).optional().default([]),
  excerpt: z.string().optional(),
});
