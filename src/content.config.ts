import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    hook: z.string(),
    summary: z.string(),
    role: z.string().optional(),
    period: z.string(),
    order: z.number(),
    draft: z.boolean().default(false),

    tech: z.array(z.string()).min(1),
    bullets: z.array(z.string()).length(3),
    depth: z.array(z.string()).optional(),
    limitations: z.array(z.string()).optional(),

    links: z.object({
      repo: z.string().url().optional(),
      demo: z.string().url().optional(),
    }).default({}),

    media: z.array(z.object({
      src: image(),
      alt: z.string(),
      caption: z.string(),
    })).optional(),

    writeups: z.array(z.object({
      title: z.string(),
      entry: z.string(),
    })).optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, posts };