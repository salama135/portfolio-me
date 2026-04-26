import { z } from 'zod';

const sessionTypeSchema = z.enum(['one_to_one', 'group']);

export const mentoringTestimonialSchema = z.object({
  quote: z.string(),
  name: z.string(),
  context: z.string().optional(),
});

export const mentoringContentSchema = z.object({
  headline: z.string().optional(),
  body: z.string().optional(),
  sessionTypes: z.array(sessionTypeSchema).min(1),
  audience: z.string(),
  durationSummary: z.string().optional(),
  bookingUrl: z.string().url(),
  calendarEmbedUrl: z.string().url().optional(),
  testimonials: z.array(mentoringTestimonialSchema).default([]),
});
