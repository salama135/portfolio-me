import { z } from 'zod';

export const interestSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string().optional(),
  image: z.string().optional(),
});

export const interestListSchema = z.array(interestSchema);
