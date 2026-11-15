// Runtime สำหรับ card hover preview: อ่าน /data/cards.json แล้วแสดง tooltip เมื่อชี้/โฟกัส .card-embed
type Card = {
  name: string;
  game: string;
  clan?: string;
  grade?: string;
  cost?: string;
  power?: string;
  ability?: string;
  rarity?: string;
  image?: string;
};

let index: Map<string, Card> | null = null;
let tip: HTMLDivElement | null = null;

async function load(): Promise<Map<string, Card>> {
  if (index) return index;
  const base = (window as any).CARDSMATE_BASE || '';
  try {
    const res = await fetch(base + '/data/cards.json');
    const data: Card[] = await res.json();
    index = new Map(data.map((c) => [c.name.toLowerCase(), c]));
  } catch {
    index = new Map();
  }
  return index;
}

function ensureTip(): HTMLDivElement {
  if (tip) return tip;
  tip = document.createElement('div');
  tip.setAttribute('role', 'tooltip');
  tip.style.cssText =
    'position:fixed;z-index:80;max-width:280px;display:none;pointer-events:none;' +
    'background:var(--bg-elev);border:1px solid var(--border);border-radius:12px;' +
    'box-shadow:0 12px 40px rgba(0,0,0,.45);overflow:hidden;font-size:.85rem;color:var(--fg)';
  document.body.appendChild(tip);
  return tip;
}

function render(c: Card): string {
  const img = c.image
    ? `<img src="${(window as any).CARDSMATE_BASE || ''}${c.image}" alt="" style="width:100%;height:120px;object-fit:cover;background:var(--bg-elev-2)"/>`
    : '';
  const rows = [c.clan && `เคลน/สาย: ${c.clan}`, c.grade && `เลเวล/เกรด: ${c.grade}`, c.cost && `คอสต์: ${c.cost}`, c.power && `พาวเวอร์: ${c.power}`, c.rarity && `ความหายาก: ${c.rarity}`]
    .filter(Boolean)
    .join('<br>');
  return `${img}<div style="padding:10px 12px">
    <div style="font-weight:700;color:var(--gold)">${c.name}</div>
    <div style="color:var(--fg-muted);margin-top:4px">${rows}</div>
    ${c.ability ? `<div style="margin-top:6px">${c.ability}</div>` : ''}
    <div style="margin-top:6px;font-size:.7rem;color:var(--fg-muted)">ข้อมูลตัวอย่าง (placeholder)</div>
  </div>`;
}

function show(el: HTMLElement) {
  const name = el.getAttribute('data-card') || '';
  load().then((map) => {
    const c = map.get(name.toLowerCase());
    const t = ensureTip();
    t.innerHTML = c ? render(c) : `<div style="padding:10px 12px"><b>${name}</b><div style="color:var(--fg-muted);margin-top:4px">ไม่พบข้อมูลการ์ด (ตัวอย่าง)</div></div>`;
    const r = el.getBoundingClientRect();
    t.style.display = 'block';
    const tw = t.offsetWidth || 260;
    let left = r.left + r.width / 2 - tw / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
    let top = r.bottom + 8;
    if (top + t.offsetHeight > window.innerHeight - 8) top = r.top - t.offsetHeight - 8;
    t.style.left = left + 'px';
    t.style.top = Math.max(8, top) + 'px';
  });
}

function hide() {
  if (tip) tip.style.display = 'none';
}

export function initCardEmbed() {
  document.addEventListener('mouseover', (e) => {
    const el = (e.target as HTMLElement)?.closest?.('.card-embed') as HTMLElement | null;
    if (el) show(el);
  });
  document.addEventListener('mouseout', (e) => {
    const el = (e.target as HTMLElement)?.closest?.('.card-embed');
    if (el) hide();
  });
  document.addEventListener('focusin', (e) => {
    const el = (e.target as HTMLElement)?.closest?.('.card-embed') as HTMLElement | null;
    if (el) show(el);
  });
  document.addEventListener('focusout', hide);
  window.addEventListener('scroll', hide, { passive: true });
}
