import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ---------- GAMES ----------
const games = defineCollection({
  loader: glob({ base: './src/content/games', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    name: z.string(),
    shortName: z.string(),
    publisher: z.string(),
    platforms: z.array(z.enum(['physical', 'pc', 'mobile', 'console'])),
    accent: z.string().default('#b98cff'),
    startedYear: z.number().optional(),
    description: z.string(),
    gettingStarted: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    hero: z.string().optional(),
  }),
});

// ---------- ARTICLES (news / guide / review / feature) ----------
const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['news', 'guide', 'review', 'feature']),
    game: z.string().optional(),
    author: z.string(),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    hero: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),

    // review
    reviewScore: z.number().min(0).max(10).optional(),

    // info box (กล่องข้อมูลมาตรฐาน)
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    budget: z.string().optional(),
    audience: z.string().optional(),
  }),
});

// ---------- DECKS ----------
const decks = defineCollection({
  loader: glob({ base: './src/content/decks', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    game: z.string(),
    summary: z.string(),
    author: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tier: z.enum(['S', 'A', 'B', 'C']),
    level: z.enum(['meta', 'mid', 'budget']),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    budget: z.string().optional(),
    classClan: z.string().optional(), // คลาส/เคลน/เผ่า
    tags: z.array(z.string()).default([]),
    hero: z.string().optional(),
    playstyle: z.string().default(''),
    strengths: z.array(z.string()).default([]),
    weaknesses: z.array(z.string()).default([]),
    cardList: z
      .array(
        z.object({
          section: z.string().default('Main'),
          name: z.string(),
          qty: z.number().int().min(1),
        }),
      )
      .default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// ---------- SETS / EVENTS (ปฏิทิน) ----------
const sets = defineCollection({
  loader: glob({ base: './src/content/sets', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    game: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['set', 'event', 'banlist', 'release', 'rotated']).default('set'),
    region: z.string().default('Global'),
    description: z.string().default(''),
    link: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// ---------- GLOSSARY ----------
const glossary = defineCollection({
  loader: glob({ base: './src/content/glossary', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    term: z.string(),
    termEn: z.string().default(''),
    game: z.string().default('general'),
    short: z.string().default(''),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { games, articles, decks, sets, glossary };
