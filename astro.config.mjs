// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { remarkCardEmbed } from './src/plugins/remark-card-embed.ts';

// Site URL — ตั้งผ่านตัวแปร SITE_URL เพื่อสลับเป็นโดเมนจริงทีหลังได้
// ค่าเริ่มต้นคือโดเมนของ Cloudflare Pages (cardsmate.pages.dev)
const SITE = process.env.SITE_URL || 'https://cardsmate.pages.dev';

export default defineConfig({
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
