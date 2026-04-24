import { z } from 'zod';

export const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  role: z.string(),
  outcomes: z.string().optional(),
  techLabels: z.array(z.string()).optional().default([]),
  links: z
    .object({
      repo: z.string().optional(),
      demo: z.string().optional(),
      caseStudy: z.string().optional(),
    })
    .optional()
    .default({}),
  coverImage: z.string().optional(),
  featured: z.boolean().optional().default(false),
  order: z.number().optional().default(0),
  /** Markdown body from colocated `.mdx` / `.md` (optional; JSON-only projects omit). */
  body: z.string().optional(),
});

export const projectListSchema = z.array(projectSchema);
