import { z } from 'zod';

const resumeExperienceSchema = z.object({
  id: z.string(),
  title: z.string(),
  organization: z.string(),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional().default([]),
});

const resumeEducationSchema = z.object({
  id: z.string(),
  degree: z.string(),
  institution: z.string(),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  summary: z.string().optional(),
});

const skillListSchema = z.array(z.string()).default([]);

export const resumeDocumentSchema = z.object({
  experiences: z.array(resumeExperienceSchema).default([]),
  education: z.array(resumeEducationSchema).default([]),
  skillGroups: z
    .object({
      programmingLanguages: skillListSchema,
      frameworks: skillListSchema,
      concepts: skillListSchema,
      tools: skillListSchema,
    })
    .default({
      programmingLanguages: [],
      frameworks: [],
      concepts: [],
      tools: [],
    }),
});
