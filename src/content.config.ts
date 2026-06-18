import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    challenge: z.string(),
    approach: z.string(),
    outcome: z.string(),
    status: z.enum(['posted', 'pending']).default('posted'),
  }),
});

export const collections = { work };
