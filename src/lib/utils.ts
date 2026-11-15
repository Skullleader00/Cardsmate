import type { CollectionEntry } from 'astro:content';

/** เวลาอ่านโดยประมาณ (ภาษาไทยคิดจากจำนวนอักขระ) */
export function readingTime(body: string): number {
  const clean = body.replace(/```[\s\S]*?```/g, '').replace(/[#>*_`\-]/g, ' ');
  const chars = clean.replace(/\s+/g, '').length;
  const words = clean.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(chars / 900 + words / 200));
  return minutes;
}

const TH_DATE = new Intl.DateTimeFormat('th-TH', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  try {
    return TH_DATE.format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

export function isoDate(d: Date | string): string {
  return (typeof d === 'string' ? new Date(d) : d).toISOString();
}

export const LEVEL_LABEL: Record<string, string> = {
  meta: 'เมต้า',
  mid: 'ระดับกลาง',
  budget: 'งบประหยัด',
};

export const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: 'มือใหม่',
  intermediate: 'ระดับกลาง',
  advanced: 'ขั้นสูง',
};

export const PLATFORM_LABEL: Record<string, string> = {
  physical: 'การ์ดจริง (Physical)',
  pc: 'PC',
  mobile: 'มือถือ',
  console: 'คอนโซล',
};

export const SET_KIND_LABEL: Record<string, string> = {
  set: 'เซ็ตใหม่',
  event: 'อีเวนต์',
  banlist: 'แบนลิสต์',
  release: 'วางจำหน่าย',
  rotated: 'โรเตท',
};

/** สถานะรายการปฏิทินเทียบ "วันนี้" (ตอน build) */
export function setPhase(date: Date): 'upcoming' | 'soon' | 'released' {
  const today = Date.now();
  const d = date.getTime();
  const DAY = 86400000;
  if (d > today + 30 * DAY) return 'upcoming';
  if (d > today - DAY) return 'soon';
  return 'released';
}

export type Article = CollectionEntry<'articles'>;
export type Deck = CollectionEntry<'decks'>;
export type Game = CollectionEntry<'games'>;
export type SetItem = CollectionEntry<'sets'>;
export type Term = CollectionEntry<'glossary'>;

export function pubDate(a: Article): Date {
  return new Date(a.data.date);
}

export function sortByDate<T extends { data: { date: any } }>(items: T[]): T[] {
  return [...items].sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date));
}

/** slug ของแท็ก ให้ตรงกับที่ใช้ใน TagPill */
export function tagSlug(tag: string): string {
  return String(tag).toLowerCase().trim().replace(/\s+/g, '-');
}
