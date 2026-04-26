import { z } from 'zod';

export const blogCategorySchema = z.enum(['tech', 'life', 'health', 'hobbies']);

export const articleFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  author: z.string(),
  tags: z.array(z.string()).optional().default([]),
  /** Primary filing for blog index sections (FR-012). */
  categories: z.array(blogCategorySchema).optional().default([]),
  excerpt: z.string().optional(),
});

export const articleSchema = articleFrontmatterSchema.extend({
  body: z.string(),
});
