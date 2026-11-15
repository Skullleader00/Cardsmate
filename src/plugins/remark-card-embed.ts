// remark plugin: แปลง {{card:ชื่อการ์ด}} ใน Markdown ให้เป็น tooltip preview
// ใช้งาน: เขียน {{card:Blaster Overdrive Dragon}} แล้วจะกลายเป็น <span class="card-embed">
// ที่ JS ฝั่ง client อ่านข้อมูลจาก /data/cards.json เพื่อแสดงรูป+ข้อมูลการ์ด (placeholder)
import { visit } from 'unist-util-visit';

const TOKEN = /\{\{card:([^}]+)\}\}/g;

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string),
  );
}

export function remarkCardEmbed() {
  return (tree: any) => {
    visit(tree, 'text', (node: any, index: any, parent: any) => {
      if (!parent || typeof index !== 'number') return;
      const value = String(node.value ?? '');
      if (!value.includes('{{card:')) return;

      TOKEN.lastIndex = 0;
      const out: any[] = [];
      let last = 0;
      let m: RegExpExecArray | null;
      while ((m = TOKEN.exec(value))) {
        if (m.index > last) out.push({ type: 'text', value: value.slice(last, m.index) });
        const name = m[1].trim();
        const safe = escapeHtml(name);
        out.push({
          type: 'html',
          value: `<span class="card-embed" data-card="${safe}" tabindex="0">${safe}</span>`,
        });
        last = m.index + m[0].length;
      }
      if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
      if (out.length) parent.children.splice(index, 1, ...out);
      return index + out.length;
    });
  };
}

export default remarkCardEmbed;
