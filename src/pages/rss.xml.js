import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../site';

export async function GET(context) {
  const articles = (await getCollection('articles', ({ data }) => !data.draft))
    .sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date))
    .slice(0, 30);

  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    trailingSlash: false,
    customData: '<language>th</language>',
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: new Date(a.data.date),
      link: `${base}/article/${a.id}/`,
      categories: a.data.tags,
      author: a.data.author,
    })),
  });
}
