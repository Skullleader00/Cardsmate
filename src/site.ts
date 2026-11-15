// ค่ากลางของเว็บ — แก้ที่เดียว
export const SITE = {
  name: 'Cardsmate',
  title: 'Cardsmate — ไกด์เกมการ์ดภาษาไทย',
  description:
    'เว็บไกด์ ข่าว รีวิว และเด็คเกมการ์ด (TCG / CCG / Digital card game) ภาษาไทย อ่านง่าย เริ่มเล่นได้จริง',
  // base path — Cloudflare Pages เสิร์ฟที่ root จึงเป็น '' ( Astro BASE_URL = '/' )
  path: (import.meta.env.BASE_URL || '/').replace(/\/$/, ''),
  locale: 'th',
  ogImage: '/og-default.png',
  twitter: '@cardsmate',
  email: 'hello@cardsmate.example',
};

export type NavItem = { label: string; href: string };
export const NAV: NavItem[] = [
  { label: 'ข่าว', href: '/news' },
  { label: 'รีวิว', href: '/review' },
  { label: 'ไกด์', href: '/guide' },
  { label: 'เด็ค', href: '/decks' },
  { label: 'ปฏิทิน', href: '/calendar' },
  { label: 'ศัพท์', href: '/glossary' },
];

export const CONTENT_TYPES = ['news', 'guide', 'review', 'feature'] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const TYPE_LABEL: Record<string, string> = {
  news: 'ข่าว',
  guide: 'ไกด์',
  review: 'รีวิว',
  feature: 'บทความพิเศษ',
  deck: 'เด็ค',
};

export const TYPE_COLOR: Record<string, string> = {
  news: 'var(--tag-news)',
  guide: 'var(--tag-guide)',
  review: 'var(--tag-review)',
  feature: 'var(--tag-feature)',
  deck: 'var(--tag-deck)',
};

/** สร้าง URL ที่รองรับ base path ของ GitHub Pages */
export function url(path = '/'): string {
  if (!path) return SITE.path + '/';
  if (/^(https?:)?\/\//.test(path)) return path; // ภายนอก
  const p = path.startsWith('/') ? path : '/' + path;
  return (SITE.path + p).replace(/\/{2,}/g, '/');
}
