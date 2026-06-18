# Portfolio Website — Design Specification

**Owner:** Vijeth — Senior Integration Engineer (SAP ABAP · EDI/B2B · IDoc & ALE · OpenText Middleware)
*A single reference for visual design, content architecture, and build approach — detailed enough to hand to a coding agent or your future self.*

## Table of Contents
1. [Purpose & Positioning](#1-purpose--positioning)
2. [Key Decisions at a Glance](#2-key-decisions-at-a-glance)
3. [Tech Stack](#3-tech-stack)
4. [Visual Identity](#4-visual-identity)
5. [Site Architecture](#5-site-architecture)
6. [Component Inventory](#6-component-inventory)
7. [Content Starters](#7-content-starters)
8. [Engineering Standards](#8-engineering-standards)
9. [Implementation Scaffold](#9-implementation-scaffold)
10. [Anti-Patterns to Avoid](#10-anti-patterns-to-avoid)
11. [Content & Asset Checklist](#11-content--asset-checklist)
12. [Roadmap](#12-roadmap)

---

## 1. Purpose & Positioning

**What this site is for:** a credibility instrument, not a creative-dev showcase. The audience is technical hiring managers and recruiters — both Henkel-internal mobility reviewers and external EU teams — who skim in under a minute and look for one signal: real depth in SAP integration work, communicated clearly enough that a non-technical stakeholder would trust it too.

**Positioning statement:** an integration specialist who makes enterprise data move reliably between systems, and documents that work clearly enough for business users to trust it.

**Tone:** precise, understated, confident. No "passionate" / "rockstar" language — the systems vocabulary (IDoc, ALE, EDI, OpenText) carries the credibility on its own.

**On relocation messaging:** your path runs partly *through* Henkel (intra-company transfer), not just around it, so a hero-level "actively looking for new opportunities" banner risks reading as flight-risk internally. The fix is in the hero copy itself (§7) — it states availability through the same status-code language used everywhere else on the page, so it reads as "engaged in new integration work" to anyone, and as "open to new roles" to anyone reading closely. Edit the wording freely; keep the dual-meaning approach if you can.

## 2. Key Decisions at a Glance

| # | Decision | Recommendation | Status |
|---|---|---|---|
| 1 | Page structure | Single-page, anchor nav, built as one Astro page | Locked — revisit only if you want indexable, separate case-study URLs |
| 2 | Visual direction | Light "structured record" aesthetic (§4) — not a dark terminal theme, not cream-and-serif | Locked |
| 3 | Signature element | Hero formatted as a structured data record (DOCUMENT TYPE / SENDER / STATUS / SEGMENTS) | Locked concept — wording is yours |
| 4 | Relocation/availability framing | Folded into the hero STATUS line as dual-meaning copy, not a separate banner | Locked concept, edit wording freely |
| 5 | Side projects (KDP, micro-tools) | Optional, low-key "Beyond Work" section near the end | Your call |
| 6 | Case study content | Astro Content Collection (Markdown + frontmatter) instead of hardcoded JSX/data file | Recommended — frontmatter fields mirror the record concept directly |
| 7 | Deployment | Cloudflare Pages | Locked — you already have Cloudflare access |
| 8 | Contact method | `mailto:` + LinkedIn, no backend form for v1 | Locked — add a Cloudflare Pages Function later if you want one |

## 3. Tech Stack

- **Framework:** Astro — ships zero JS by default, which fits a content-led, mostly-static credibility site better than a full SPA framework would
- **Routing:** file-based, single route (`src/pages/index.astro`). Add more files under `src/pages/` only if you later split case studies into their own indexable URLs
- **Content:** an Astro **Content Collection** for case studies (`src/content/work/*.md`) — each entry's frontmatter (`title`, `challenge`, `approach`, `outcome`) is itself a small structured record, which is a nice quiet extension of the hero concept rather than a separate pattern
- **Interactivity:** none needed as a framework island. The two interactive bits — mobile nav toggle and scroll-reveal — are small enough for a plain `<script>` tag in the relevant `.astro` file; no React/Vue/Svelte island required. If a future feature genuinely needs client state, add `@astrojs/preact` (smallest island option) rather than reaching for React by default
- **Styling:** Tailwind CSS via the official `@astrojs/tailwind` integration, fully custom theme — no default palette or default fonts (§4)
- **Icons:** `astro-icon` (or hand-placed inline SVGs from Lucide's icon set — Lucide ships raw SVGs, so no React wrapper is needed in Astro)
- **Fonts:** Google Fonts, preconnected, loaded once in the base layout (§9)
- **Deployment:** Cloudflare Pages, static output (`astro build` → `dist/`) — no SSR adapter needed for this site
- **Analytics:** Cloudflare Web Analytics — privacy-friendly, no cookie banner required; skip Google Analytics

## 4. Visual Identity

### 4.1 Concept & rationale

AI-generated portfolios right now cluster around three defaults: a warm cream background with a serif display face and a terracotta accent; a near-black background with one bright neon accent; or a dense, hairline-ruled newspaper layout. All three are fine in isolation but none of them say anything specific about *you* — they'd look the same on anyone's site.

The actual material of your work is structured data: IDoc segments, ALE distribution, EDI status codes, fields with fixed labels and values. So the design borrows directly from that vocabulary instead of from generic developer-portfolio tropes. The **signature element** is the hero itself, formatted as a structured record — `DOCUMENT TYPE / SENDER / STATUS / SEGMENTS` — using the same field-label convention you'd see in an actual IDoc dump. It's echoed quietly afterward through small monospace "SEGMENT NN" eyebrow labels above each section heading, through the case-study frontmatter pattern (§3, §7), and through a two-color semantic system (below) rather than decoration for its own sake. Everything else on the page stays plain and disciplined so that one device stays memorable instead of competing with five others.

Base palette is light, not dark — partly because a light, paper/ledger-toned canvas fits EDI's actual history (structured electronic documents replacing paper trading documents), and partly because almost every technical portfolio defaults to dark-mode-terminal, so a light, precise treatment reads as more considered, not less serious.

### 4.2 Color system

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F2F3F1` | page background — cool, not warm-cream |
| `surface` | `#FBFBFA` | cards, nav background |
| `ink` | `#15171A` | primary text |
| `muted` | `#5B5F63` | secondary text, captions |
| `line` | `#D9DBD7` | hairline dividers — used sparingly, never a full grid |
| `posted` | `#2F6B4F` | semantic "production/active" accent — primary CTAs, current-role marker |
| `pending` | `#8F6315` | semantic "in-progress/building" accent — skills you're still deepening, e.g. German |

`posted` and `pending` aren't arbitrary brand colors — they map to real IDoc status semantics (posted = successfully processed; pending = still in progress), and that mapping is what gives them a job to do beyond decoration. Use them as small functional markers (a dot, a tag border, a button fill) — never as large color blocks.

### 4.3 Typography

One family, two cuts, two jobs — not three unrelated fonts:

| Face | Role | Used for |
|---|---|---|
| **IBM Plex Mono** (500/600/700) | Display | Hero record block, all headings, nav, buttons, tags, eyebrow labels — anything short and structural |
| **IBM Plex Sans** (400/500/600) | Body | Paragraphs, bio copy, case-study prose — anything in sentence form |

Type scale (rem/px): `xs 0.75/12` · `sm 0.875/14` · `base 1/16` · `lg 1.125/18` · `xl 1.25/20` · `2xl 1.5/24` · `3xl 1.875/30` · `4xl 2.25/36` · `5xl 3/48`. Hero record uses `lg`–`xl` per line (it's a list of fields, not one giant headline); section headings use `3xl`; body copy never drops below `sm`.

### 4.4 Spacing & grid

Tailwind's default 4px scale — no custom scale needed. Content max-width `72rem` (1152px), centered. Section vertical padding `py-24` desktop / `py-16` mobile. One hairline `border-line` rule under the nav and between major sections is enough; resist adding more — this isn't a newspaper layout.

### 4.5 Iconography

Lucide icon set, 1.5px stroke, sized to match adjacent text (16–20px inline, 24px standalone), placed as inline SVG or via `astro-icon`. No emoji as icons.

## 5. Site Architecture

Single-page, sticky nav. The hero is the only place the record concept appears at full size:

```
┌──────────────────────────────────────────────────────┐
│ VIJETH                About Skills Work Contact  [CV] │ ← sticky, hairline bottom border
├──────────────────────────────────────────────────────┤
│                                                         │
│  DOCUMENT TYPE   SAP INTEGRATION ENGINEER              │
│  SENDER          VIJETH                                │
│  STATUS          53 · POSTED — actively building,      │
│                   open to new systems                  │
│  SEGMENTS        ABAP · EDI/B2B · IDOC & ALE · OPENTEXT │
│                                                         │
│  [ View Work ]   [ Download Resume ]   [ Get in Touch ]│
│                                                         │
└──────────────────────────────────────────────────────┘
```

| Section | Eyebrow label | Content | Notes |
|---|---|---|---|
| **Nav** | — | Name/mark, About, Skills, Work, Contact, Resume button | Plain labels — nav is the one place clarity beats personality |
| **Hero** | — (it IS the document header) | Structured record block + 3 CTAs | Copy starter in §7 |
| **About** | SEGMENT 01 | 3–4 sentence narrative: Accenture → Henkel path, specialization, where you're based | One paragraph max |
| **Skills** | SEGMENT 02 | Grouped tag clusters with `posted`/`pending` dots: *ABAP Development*, *EDI/B2B & IDoc*, *ALE & Mapping*, *OpenText Middleware*, plus German (A1→A2) as a `pending` tag if you want the EU-intent signal | Tags, not progress bars — a bar implies false precision |
| **Experience** | SEGMENT 03 | Timeline: Henkel (2025–present), Accenture (prior) — 2–3 outcome bullets each | Approved/real outcomes only |
| **Selected Work** | SEGMENT 04 | 2–3 case studies, rendered from the `work` content collection, Challenge → Approach → Outcome | Template in §7 — generalize anything proprietary |
| **Beyond Work** *(optional)* | SEGMENT 05 | One line on side projects/interests, kept brief | Skip entirely if it dilutes the core narrative |
| **Contact** | SEGMENT 05/06 | Email, LinkedIn, location line | `mailto:` link, no form backend in v1 |
| **Footer** | — | Copyright, one-line built-with credit | Small, quiet |

## 6. Component Inventory

Astro components (`.astro` files), each owning its own markup + scoped `<style>` if needed:

`Layout.astro` (base HTML shell, fonts, meta) · `Nav.astro` · `Hero.astro` (the record block) · `SectionHeading.astro` (renders the `SEGMENT NN` eyebrow + heading together — the page's quiet echo of the signature) · `SkillTag.astro` (with `posted`/`pending` dot) · `TimelineItem.astro` · `CaseStudyCard.astro` (renders one entry from the `work` collection) · `Badge.astro` (certs/languages) · `ContactLink.astro` · `Footer.astro`

Build `SectionHeading.astro` first — every section below the hero reuses it. Astro components accept props the same way function components do, just via frontmatter (`const { title, segment } = Astro.props`) instead of a function signature.

## 7. Content Starters

**Hero record (starting point — edit freely, keep the dual-meaning STATUS line if it still fits when you're done):**

```
DOCUMENT TYPE   SAP INTEGRATION ENGINEER
SENDER          VIJETH
STATUS          53 · POSTED — actively building, open to new systems
SEGMENTS        ABAP · EDI/B2B · IDOC & ALE · OPENTEXT MIDDLEWARE
```

**About — location line:**
> Based in Mangaluru, India, working fully remote across enterprise SAP landscapes — with hands-on experience supporting cross-border integration work.

**Case study template** — one Markdown file per entry in `src/content/work/`, frontmatter doubling as the record fields:

```md
---
title: "[Project name — generic, not an internal system/transaction name]"
challenge: "[1 sentence — what was broken or missing]"
approach: "[1–2 sentences — what you built or changed]"
outcome: "[1 sentence, approved metric only — e.g. \"cut manual reprocessing time by X%\"]"
status: "posted" # or "pending" if still in progress — reuses the same semantic token
---
```

`CaseStudyCard.astro` reads these fields directly — no separate JS data file to keep in sync. Don't name internal transaction codes or proprietary tool names publicly — describe "a custom IDoc monitoring and governance framework" rather than the specific T-code. Specific enough to show real ownership, generic enough to protect anything Henkel or Accenture would consider internal.

## 8. Engineering Standards

**Motion:** scroll-reveal on section entry (opacity + 8px translate-y, 400ms, ~60ms stagger between siblings), implemented with a small inline `<script>` using `IntersectionObserver` — no animation library needed at this scale. Hover states shift color or underline only — no scale/skew gimmicks. Respect `prefers-reduced-motion` (check `window.matchMedia('(prefers-reduced-motion: reduce)')` before attaching the observer).

**Responsive:** mobile-first; Tailwind's default breakpoints (`sm` 640 / `md` 768 / `lg` 1024 / `xl` 1280) are sufficient. Nav collapses to a simple stacked menu below `md`, toggled by a few lines of vanilla JS in `Nav.astro` (no client framework needed for a single boolean). On mobile, stack the hero record's label/value pairs instead of trying to align them in columns.

**Accessibility:** `ink` (#15171A) on `paper` (#F2F3F1) clears AA comfortably for all text sizes. Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`); visible focus states, never `outline: none` without a replacement; meaningful `alt` text on anything non-decorative.

**Performance/SEO:** target Lighthouse 95+ across the board — Astro's zero-JS-by-default output makes this easier to hit than a full SPA framework would. A single bundle is fine at this scale. WebP images via Astro's built-in `<Image />` component (automatic optimization, no extra config). Real `<title>` / `<meta description>` / OG image (a clean screenshot of the hero, not a generic placeholder), set once in `Layout.astro` with per-page overrides if you later add routes. Add `Person` JSON-LD structured data — small effort, helps recruiter search visibility.

## 9. Implementation Scaffold

**Project init:**

```bash
npm create astro@latest -- --template minimal
npx astro add tailwind
```

**Tailwind config:**

```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F2F3F1',
        surface: '#FBFBFA',
        ink: '#15171A',
        muted: '#5B5F63',
        line: '#D9DBD7',
        posted: '#2F6B4F',
        pending: '#8F6315',
      },
      fontFamily: {
        display: ['"IBM Plex Mono"', 'monospace'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
      },
      maxWidth: { content: '72rem' },
    },
  },
};
```

**Content Collection config:**

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    challenge: z.string(),
    approach: z.string(),
    outcome: z.string(),
    status: z.enum(['posted', 'pending']).default('posted'),
  }),
});

export const collections = { work };
```

**Font loading (`src/layouts/Layout.astro`, in `<head>`):**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

**Folder structure:**

```
src/
  layouts/
    Layout.astro      # base HTML shell, head, fonts, meta
  components/          # Nav, SectionHeading, SkillTag, Badge, Footer...
  sections/            # Hero, About, Skills, Experience, Work, Contact
  content/
    work/               # case-study Markdown files (§7)
    config.ts           # collection schema above
  pages/
    index.astro         # assembles Layout + all sections, single route
  assets/               # images, used with Astro's <Image />
```

Keep copy that *isn't* a case study (hero record, about paragraph, skill tags) in simple exported constants near the component that uses it, or in a small `src/data/content.ts` if you'd rather centralize it — either is fine in Astro since there's no JSX/data-file split to maintain.

## 10. Anti-Patterns to Avoid

Skill progress bars ("ABAP 87%" means nothing — use the `posted`/`pending` tag system instead); stock photography of generic "diverse team at laptops"; hero copy like "passionate problem-solver"; carousels/sliders for case studies (bad for discoverability and accessibility); a contact form that emails nowhere because the backend was never wired up; reaching for a React/Vue/Svelte island out of habit when a few lines of vanilla `<script>` would do (defeats the point of choosing Astro). If you hand this to a coding agent and it drifts toward cream-background-plus-serif, near-black-plus-neon-accent, or a dense hairline-ruled newspaper grid — those are the three current AI-portfolio defaults, and this spec is deliberately none of them.

## 11. Content & Asset Checklist

- [ ] Headshot or simple styled avatar (no generic stock photo)
- [ ] Resume PDF, export-ready
- [ ] 2–3 case studies written from the §7 template as Markdown files, with approved/anonymized metrics
- [ ] 2–3 outcome-phrased bullets per role (Henkel, Accenture)
- [ ] Final call on the hero STATUS line wording (§1, §7)
- [ ] Decide whether "Beyond Work" appears, and what's in it
- [ ] Decide whether to surface "currently learning German (A1→A2)" as a `pending` skill tag
- [ ] Confirm current LinkedIn URL and contact email

## 12. Roadmap

1. **Content pass** (a weekend slot, like your usual research/heavy-thinking work): finalize copy from §7, gather assets from §11, write case studies as Markdown files.
2. **Scaffold:** `npm create astro@latest`, `npx astro add tailwind`, drop in the §9 config and content collection, build `Layout.astro`, `SectionHeading.astro`, and `Nav.astro` first.
3. **Build sections** top to bottom with placeholder copy.
4. **Swap in real content**, polish scroll-reveal and responsive behavior.
5. **Deploy** to Cloudflare Pages (`astro build`, static output), point your domain at it, check Lighthouse before calling it done.
