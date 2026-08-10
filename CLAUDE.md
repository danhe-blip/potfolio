# Dan He — Portfolio ("The Index")

> Before editing case-study content, read `CASE-STUDY-WORKING-DOC.md` in this repo. It holds the agreed storytelling framework, style rules (e.g. no em dash), current state of each case, image-wiring notes, and the open questions for the next case study.

## Identity
- Name: Dan He (she/her)
- Role: Founding Designer
- Location: San Francisco Bay Area / Oakland, CA
- Email: dhe052@hotmail.com
- Current: Virtue AI, Founding Designer (Apr 2025–present)

## Portfolio purpose
Technically sophisticated, design-forward tech-tool companies that value taste, execution, and shipping.

Three strengths to highlight in every major decision:
1. AI-native product experience — shipped real AI products (PolicyGuard, VirtueRed)
2. Technically fluent, not a strong coder — understands frontend constraints, works in the codebase alongside engineers using AI to close the gap between design intent and what actually ships
3. Founding designer / generalist — owned brand, product, web, and marketing simultaneously

Case studies lead with strategic insight and craft (the decision only she would have made), not process documentation. This audience skims — the payoff surfaces first (Result callout above sections).

## Concept: "The Index"
The portfolio as a live systems board. One dark screen, hairline modular grid (Dropbox brand-guidelines logic), a generative ASCII kaleidoscope always running in the hero cell, red as the only signal color. Techy, cool, edgy, ASCII — never rounded or soft.

References (approved):
- brand.dropbox.com — modular grid index, cell hover floods
- therawmaterials.com — detail pages: section side-nav + content column
- The kaleidoscope "extension://generative-art" caption is a kept artifact from the earlier desktop concept

## Design system (locked)
- Colors: ink #111111 (bg) / paper #F7F5F0 (fg). CSS vars in src/index.css.
- Type: Fraunces italic 300 (editorial display — doc titles, section headlines, hero em, NEXT links) · Hanken Grotesk (titles, body) · IBM Plex Mono (labels, nav, tags, ticker — always uppercase + letterspaced)
- Sharp corners everywhere. Zero border-radius. Hairline borders (--line) as grid.
- Bracket tags like [PRODUCT], not pills.
- Motion: cell hover floods red bottom-up (paper flood on meta cells); page transitions glitch-in 260ms; staggered rise reveal on the board; marquee ticker; blinking status dot. Scanline overlay at 2% on body.

## Contrast (measured against #111111)
Target is WCAG AA: 4.5:1 for text under 24px (nothing on this site qualifies as "large text").

- `--paper` 17.3:1 · `--mut` (0.52) 5.30:1 — both safe for any text.
- `--mut-2` (0.32) **2.74:1 — fails AA.** Decorative only: rules, dividers, icon strokes. Never for text a visitor needs to read. Currently misused on `.topbar .meta`, inactive `.project-rail` buttons, `.rail-foot`, and `.gate-input::placeholder`. Raising it to 0.47 would reach 4.54:1.
- `--red` as text **3.86:1 — fails AA** (3.59:1 when set on a `--red-dim` background, e.g. active rail items). Red is safe for borders, backgrounds, and graphics; it fails for the 10.5–11px labels it is currently used on (`.sec .label`, `.result .label`, `.sec-link`, active rail items, and `.gate-msg .bad` error text).
- Fix for red text, if taken: add a text-only `--red-text: #DC4A2E` (same hue, 4.55:1) and leave the locked `--red` untouched.

Never trade the concept for compliance, but never let an error message or a nav link fail either. When adding a muted colour, compute the ratio before shipping it.

## Tech stack
Vite + React 19, plain JSX. Layout/design in src/index.css (plain CSS, classes); inline styles only for one-offs. No Tailwind, no CSS-in-JS, no router lib (hash routing in App.jsx). Don't suggest switching frameworks.

## Architecture
- src/config.js is the single source of truth for ALL content: SITE, KALEIDO, WORKS (5 works: policyguard, virtuered, design-system, branding, website), ABOUT. Components hold logic only.
- Routing: hash-based (#/policyguard). App.jsx maps route → WORKS entry or ABOUT → WorkPage; else Home.
- Home.jsx: 4×3 modular grid. Hero cell (2×2, kaleido + headline), 5 work cells, About + Contact (paper-flood cells). Marquee footer.
- WorkPage.jsx: Raw Materials pattern — sticky left rail (numbered mono sections, scroll-tracked active state), content column (tags, Fraunces title, Result callout, sections with optional fig placeholders, NEXT link). Rail becomes horizontal chip bar on mobile.
- Kaleido.jsx: params-driven generative ASCII engine — 4 field variants (fold/wave/orbit/grid), palette or spectrum coloring, density bias, reduced-motion static mode. Params flow via ref (no effect re-runs).
- ArtPanel.jsx: the "control deck" — extension-popup-styled panel inside the hero cell (pattern chips, shuffle, copy-as-txt, sliders for sym/speed/scale/density, palette swatches + custom color with mono/multi modes). Opens via the hero caption button; `?deck=1` opens it on load. Palette/variant definitions live in config ART.
- legacy/ holds the retired desktop-OS build (Desktop, Window, PreviewApp, LinkedInApp, GalleryApp, AgentTerminal + config.desktop.js). Do not import from it; do not delete without asking.

## Mobile (must stay true)
Single-column board, hero ~62dvh, detail rail → sticky horizontal chips, fluid type via clamp(), tap targets ≥40px, arrows always visible on touch (hover:none media query).

## Code rules
- No comments in code
- All [Dan fills: …] strings in config are placeholders for her — leave them, never invent content for them
- Never change the locked color system without being asked

## Security
- Never put API keys / secrets in frontend code. Use .env or a backend proxy.

## Content scope (current)
Only Virtue AI work. Do not invent or add projects from other companies.
