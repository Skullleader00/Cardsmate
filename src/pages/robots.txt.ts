// robots.txt — Sitemap ชี้ไปที่โดเมนจาก site (SITE_URL ใน astro.config)
export const prerender = true;

export function GET() {
  const site = (import.meta.env.SITE || 'https://cardsmate.pages.dev').replace(/\/$/, '');
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${site}/sitemap-index.xml`,
    '',
  ].join('\n');
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
