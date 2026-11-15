// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { remarkCardEmbed } from './src/plugins/remark-card-embed.ts';

// Site URL — แก้เป็นโดเมนจริงของคุณ (GitHub Pages: https://<user>.github.io/<repo>/)
const SITE = process.env.PUBLIC_SITE_URL || 'https://example.github.io/Cardsmate/';

export default defineConfig({
  // ตั้ง base อัตโนมัติเมื่อ deploy บน GitHub Pages (repo subpath)
  base: process.env.BASE_PATH || '/',
  site: SITE,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkCardEmbed],
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
  mdx: {
    remarkPlugins: [remarkCardEmbed],
  },
});
