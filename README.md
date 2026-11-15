# Cardsmate 🃏

เว็บไกด์ **ข่าว / รีวิว / ไกด์ / เด็ค / ปฏิทิน / ศัพท์** สำหรับเกมการ์ด (TCG · CCG · Digital card game) ภาษาไทย
สร้างด้วย **Astro + TypeScript + Tailwind CSS v4** เป็น **static site ล้วน** (ไม่มี backend) ค้นหาด้วย **Pagefind** และ deploy ฟรีบน **GitHub Pages**

> ⚠️ เนื้อหา การ์ด ราคา วันที่ และเหตุการณ์ทั้งหมดในโปรเจกต์นี้เป็น **ข้อมูลตัวอย่าง/สมมติ** เพื่อสาธิตโครงสร้างเว็บเท่านั้น ไม่ใช่ข้อมูลทางการของเกมที่ถูกกล่าวถึง เกมและชื่อการ์ดเป็นเครื่องหมายการค้าของเจ้าของแต่ละราย

## ฟีเจอร์
- หน้าแรกครบทุกส่วน: hero, ถัดไป, ข่าวล่าสุด, ไกด์ยอดนิยม, เด็คมาแรง, เกมยอดนิยม, ปฏิทินเซ็ตใหม่, หัวข้อแนะนำ
- หน้ารายการ: `/news` `/guide` `/review` `/feature` `/decks` `/calendar` `/glossary` + หน้าเกม `/game/[slug]` + `/tag/[slug]` `/author/[slug]`
- Card hover preview — เขียน `{{card:ชื่อการ์ด}}` ใน Markdown แล้วชี้เมาส์ดู tooltip (ข้อมูลจาก `public/data/cards.json`, รูปเป็น placeholder)
- กล่องข้อมูลมาตรฐาน (ความยาก / งบ / เหมาะกับใคร), Table of Contents อัตโนมัติ, เวลาอ่าน, ปุ่มแชร์, บทความที่เกี่ยวข้อง
- ฟิลเตอร์เด็ค (เกม/ระดับ) และปฏิทิน (เกม + มุมมองเดือน/ลิสต์) แบบ client-side
- Light/Dark จำค่าใน `localStorage` (ธีมหลักมืด)
- SEO: meta ภาษาไทย, Open Graph, `sitemap.xml`, RSS `/rss.xml`, JSON-LD (Article / WebSite / VideoGame)
- PWA เบื้องต้น (manifest + icons) · Accessibility: skip link, focus ring, contrast ผ่าน WCAG AA, semantic HTML

## เริ่มใช้งาน
ต้องใช้ **Node.js 20+** (แนะนำ 22)

```bash
npm install      # ติดตั้ง dependencies
npm run dev      # เปิด dev server ที่ http://localhost:4321
npm run build    # สร้างเว็บลงโฟลเดอร์ dist/ + รัน Pagefind (postbuild)
npm run preview  # พรีวิวผล build (รวมการค้นหา)
```

> การค้นหาด้วย Pagefind จะพร้อมใช้งานหลัง `npm run build` แล้วเปิดผ่าน `npm run preview` (ตอน `npm run dev` ยังไม่มีดัชนี)

## Deploy ขึ้น GitHub Pages
1. Push โปรเจกต์นี้ไป GitHub repo (เช่นชื่อ `Cardsmate`)
2. ใน repo ไปที่ **Settings → Pages → Build and deployment → Source: GitHub Actions**
3. Workflow `.github/workflows/deploy.yml` จะ build และ deploy อัตโนมัติเมื่อ push เข้า `main`
   - มันตั้ง `BASE_PATH=/<repo>` และ `PUBLIC_SITE_URL` ให้อัตโนมัติ จึงรองรับการอยู่ใต้ subpath
4. เปิดเว็บที่ `https://<user>.github.io/<repo>/`

### รัน/ดีพลอยกับโดเมนหรือ path อื่น
- `astro dev`/`build` ใช้ค่า default `base: '/'`
- กำหนดเองได้ผ่าน env: `BASE_PATH=/sub`, `PUBLIC_SITE_URL=https://example.com/`

## โครงสร้างโฟลเดอร์
```
src/
  content.config.ts        # schema ของทุก collection
  content/
    games/     articles/   decks/   sets/   glossary/
  components/              # UI ที่ใช้ซ้ำ (Header, ArticleCard, InfoBox, …)
  layouts/                 # BaseLayout, ArticleLayout
  pages/                   # ทุกเส้นทาง (route) ของเว็บ
  lib/                     # utils + card-embed runtime
  plugins/                 # remark-card-embed
  data/                    # authors.json, cards.json
  styles/global.css        # 🎨 ตัวแปรสี/ฟอนต์ทั้งหมด (+ prose)
public/                    # favicon, manifest, icons/, placeholders/, data/cards.json
.github/workflows/         # deploy GitHub Pages
```

## 🎨 แก้ธีม
ตัวแปรสีและฟอนต์รวมไว้ที่ `src/styles/global.css` บล็อก `:root` (dark) และ `.theme-light` (light) — แก้ `--accent`, `--gold`, `--bg` ฯลฯ ได้ที่เดียว

## ➕ เพิ่มเนื้อหาใหม่ (ทุกอย่างเป็นไฟล์ ไม่ต้องแก้โค้ด)

### เพิ่มเกม → `src/content/games/<slug>.md`
```md
---
name: 'Game Name'
shortName: 'Short'
publisher: 'Publisher (ตัวอย่าง)'
platforms: [physical, pc, mobile]   # physical|pc|mobile|console
accent: '#b98cff'
startedYear: 2011
featured: true
order: 1
tags: [tcg]
description: 'คำอธิบายสั้น'
gettingStarted: 'สรุปวิธีเริ่มเล่น'
---
เนื้อหาอธิบายเกม (Markdown)…
```
`<slug>` ของไฟล์คือ id ที่ใช้เชื่อมจากบทความ/เด็ค/ศัพท์ (`game: <slug>`)

### เพิ่มบทความ → `src/content/articles/<slug>.md`
```md
---
title: 'ชื่อเรื่อง'
description: 'สรุปสั้นสำหรับ SEO/การ์ด'
type: guide            # news | guide | review | feature
game: cardfight-vanguard   # เลือกใส่ (slug เกม)
author: nova           # key ใน src/data/authors.json
date: 2026-11-08
updated: 2026-11-10   # เลือกใส่
difficulty: beginner   # beginner|intermediate|advanced (เลือกใส่ → แสดงใน InfoBox)
budget: 'หลักร้อย'     # เลือกใส่
audience: 'มือใหม่'    # เลือกใส่
reviewScore: 8.2       # 0–10 (เฉพาะ type: review)
tags: [มือใหม่, ไกด์]
featured: false
draft: false
hero: /placeholders/card.svg   # เลือกใส่ (ไม่ใส่จะใช้ gradient placeholder)
---
เขียนเนื้อหา Markdown ปกติ · ชี้เมาส์ดูการ์ด: {{card:ชื่อการ์ด}}
```
หน้ารายละเอียดจะไปอยู่ที่ `/article/<slug>`

### เพิ่มเด็ค → `src/content/decks/<slug>.md`
```md
---
title: 'ชื่อเด็ค'
game: cardfight-vanguard
classClan: 'Burnout Fight'
tier: A                # S | A | B | C (meta tier)
level: meta            # meta | mid | budget
difficulty: intermediate
budget: 'กลาง (สมมติ)'
author: nova
date: 2026-11-07
summary: 'สรุปแนวเด็ค'
playstyle: 'แนวทางเล่นสั้น ๆ'
strengths: ['กดดันต้นเกม', 'จบไว']
weaknesses: ['แพ้ board wipe']
cardList:
  - { section: 'Grade 3', name: 'Blaster Overdrive Dragon', qty: 4 }
  - { section: 'Grade 0', name: 'Starter Crit Example', qty: 8 }
featured: true
---
คู่มือการเล่นเด็ค (Markdown)…
```
หน้ารายละเอียดอยู่ที่ `/decks/<slug>` (มีตารางการ์ด + card preview)

### เพิ่มรายการปฏิทิน → `src/content/sets/<slug>.md`
```md
---
title: 'ชื่อเซ็ต/งาน'
game: cardfight-vanguard   # หรือ 'general' สำหรับหลายเกม
date: 2026-12-05
kind: set                  # set | event | banlist | release | rotated
region: 'ไทย'
description: 'คำอธิบายสั้น'
---
รายละเอียดเพิ่มเติม (Markdown)…
```

### เพิ่มศัพท์ → `src/content/glossary/<slug>.md`
```md
---
term: 'ไรด์'
termEn: 'Ride'
game: cardfight-vanguard   # หรือ 'general'
short: 'เรียก Vanguard เกรดสูงขึ้นทับตัวเดิม'
tags: [ศัพท์]
---
คำอธิบายฉบับเต็ม…
```

### เพิ่มผู้เขียน → แก้ `src/data/authors.json` (key = slug ที่ใช้ใน `author:`)

### เพิ่มการ์ดสำหรับ card preview → แก้ `src/data/cards.json`
(ไฟล์นี้ต้องถูก sync ไป `public/data/cards.json` ด้วย เพราะฝั่ง client อ่านจาก public)

## เทคโนโลยีหลัก
Astro 5 · MDX/Markdown Content Collections · Tailwind CSS v4 · Pagefind · @astrojs/sitemap · @astrojs/rss

## License
โค้ดของโปรเจกต์: MIT · เนื้อหา/ภาพในเกมอ้างอิงเป็นของเจ้าของแต่ละราย (ใช้ชื่อเพื่ออ้างอิงเท่านั้น)
