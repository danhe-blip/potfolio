# Kernel — open-source extraction plan

Status: DRAFT, awaiting Dan's approval. Once approved, hand this file to the implementing agent.

Goal: extract the portfolio's generative ASCII engine + control deck into a standalone open-source repo (working name **Kernel**, from the art signature "Kernel — generative study"), deployed as its own page, plus a new image-to-ASCII feature ported from the portrait pipeline. The portfolio keeps its own copies untouched; this is a copy-out, not a move.

## 1. Files to copy out

| Source (this repo) | Destination (new repo) | Notes |
|---|---|---|
| `src/Kaleido.jsx` | `src/Kaleido.jsx` | The engine: 10 field variants, run-length colored renderer, pointer ripple, reduced-motion static mode, fill-sizing. Already props-driven; only one import to break (see 2.1). |
| `src/ArtPanel.jsx` | `src/ArtPanel.jsx` | The control deck. Two imports to break (see 2.2, 2.3). |
| `src/config.js` → only the `KALEIDO` and `ART` objects | `src/presets.js` | Ramp, grid dims, defaults, variants, palettes. Do NOT copy anything else from config.js (works content, gate copy, ABOUT). |
| `src/index.css` → subset | `src/styles.css` | Copy: `:root` vars, reset block, `.mono`, `.kaleido`, `.deck` and all `.deck-*`, `.chip`, `.swatch`, `.swatch--input`, `.range`, `.act`, `.lbl`, `.val`, scanline `body::after`. Leave behind: board/cells, doc/rail, gate, portrait, everything page-specific. |
| `index.html` → font link only | `index.html` | IBM Plex Mono only. Fraunces + Hanken Grotesk are portfolio branding; include only if the standalone page reuses the wordmark. |
| scratchpad `ascii.py` (the portrait converter I wrote in this session; logic reproduced in section 3) | `src/imageAscii.js` | Reimplemented in JS, client-side. Optionally also keep a `scripts/ascii.py` CLI companion for the phase-2 skill. |

Not copied, written fresh in the new repo: `App.jsx` (fullscreen kaleido + deck always visible + import-image entry), `main.jsx`, `package.json` (react, react-dom, vite only), `vite.config.js`, `LICENSE` (MIT), `README.md` (with a GIF demo and a "runs entirely in your browser, images never leave your machine" line).

## 2. Couplings to break

1. **`Kaleido.jsx` imports `KALEIDO` from `./config`** (ramp + fallback grid dims). Fix: move into `presets.js`, or better, accept `ramp` via props with the preset as default so forks can theme it.
2. **`ArtPanel.jsx` imports `SITE`** for `SITE.artSignature` inside `copyTxt`. Fix: `SIGNATURE` constant in `presets.js`, passed as prop or imported directly.
3. **Export is decoupled from display** (already done in the portfolio): `copyTxt` no longer reads the DOM at all. `Kaleido.jsx` exports a pure `frameText(params, W, H, elapsed)` that recomputes a frame at a fixed 64×32 grid, so the copied shape survives pasting regardless of how wide the on-screen render was. The new repo keeps this pattern; never export the display grid.
4. **Pointer ripple host**: `pre.closest("[data-art-host]")` with `parentElement` fallback. Keep the attribute convention, document it in the README; the fallback already makes it safe standalone.
5. **State persistence lives in `Home.jsx`** (`loadArt`, localStorage key `dh-art-v2`, accent side effects writing `--red`/`--mark`/`--on-accent` onto `document.documentElement`). The new `App.jsx` reimplements this pattern with its own key (`kernel-art-v1`). The accent-propagation effect is worth keeping — it is the "tune the color, the whole page follows" trick — but scope it to the standalone page's own vars.
6. **Portfolio-only behaviors not to copy**: cursor hint, deck-seen gating, `?deck=1` param, `IDLE_COLORS`/`iconParams` (work-cell thumbnails), glitch page transitions.
7. **Deployment**: new Vercel project from the new repo. No `api/` directory, no env vars. Suggested domain: `kernel.danhedesign.com` (Dan adds the CNAME). Footer: `Kernel — by Dan He` linking to danhedesign.com.

## 3. Image → ASCII, frontend port

Port of the Python portrait pipeline (PIL) to canvas. All client-side.

- **Input**: deck gains an `[ import image ]` button (file input, `accept="image/*"`) plus drag-and-drop onto the art area. `createImageBitmap(file)`.
- **Grid math**: `cols` from a slider (default 72, range ~40–160). `rows = round(cols * (cropH / cropW) * 0.6)` — 0.6 is IBM Plex Mono's advance width per em, so the character grid preserves the image's aspect ratio at `line-height: 1`.
- **Crop**: cover-center by default (mirrors `object-fit: cover`), draw to an offscreen canvas at exactly `cols × rows`, then `getImageData`.
- **Tone pipeline per pixel** (order matters, mirrors the tuned Python):
  1. Luminance `v = (0.2126R + 0.7152G + 0.0722B) / 255`.
  2. Autocontrast with 2% percentile clip (compute histogram, remap [p2, p98] → [0,1]).
  3. Contrast boost ×1.25 around 0.5, then gamma `v ** 1.15`.
  4. Optional vignette toggle (default ON for portraits): radial falloff centered at (0.50, 0.42), `fall = clamp(1.55 - d * 0.85, 0.25, 1)` with axes normalized by (0.60, 0.72) — the values tuned on the portrait; suppresses bright backgrounds so faces read.
  5. Char: `RAMP[min(floor(v * RAMP.length), RAMP.length - 1)]` with the site ramp `" .:-=+*o#%@"`. Bright = dense, correct for paper-on-ink.
- **Color**: reuse `colorFor(idx / (len-1), colors)` from the engine so imported images respect the active palette, including custom mono/multi and spectrum.
- **Render**: new `mode: "image"` in app state. When active, the animation loop is paused and a static `AsciiImage` render replaces the field output in the same `<pre>` (share the run-length span builder — extract it from `renderFrame` into a small shared helper rather than duplicating).
- **Export**: same `[ copy .txt ]` (with the copied-state feedback just added), plus `[ download .txt ]`, plus `[ export .png ]` drawing the grid to a canvas (mono font, ink background, palette colors) — the JS equivalent of the Python preview renderer. All text exports go through `frameText` at a user-pickable fixed width (40 / 64 / 80 cols, default 64), never the display grid, so pasted art keeps its shape. Add a "wrap in ``` fences" toggle so pastes into Markdown contexts (Slack, GitHub) stay monospace automatically.
- **Reset**: `[ clear image ]` returns to generative mode.

Estimated scope: `imageAscii.js` ~150 lines, deck additions ~40, App state ~30.

## 4. Suggested repo layout

```
kernel/
  index.html            LICENSE (MIT)         README.md
  package.json          vite.config.js
  src/
    main.jsx  App.jsx  Kaleido.jsx  ArtPanel.jsx
    imageAscii.js  presets.js  styles.css
  skill/                (phase 2, optional)
    SKILL.md  ascii.py
```

## 5. Build order for the implementing agent

1. Scaffold Vite React app; copy engine; break couplings 2.1–2.4; fullscreen render works.
2. Port deck + styles; state with `kernel-art-v1` persistence; accent propagation scoped.
3. Image pipeline (section 3) behind `[ import image ]`.
4. Exports: copy / download .txt / export .png, all with visible feedback.
5. README (GIF, privacy line, data-art-host note), LICENSE, deploy to Vercel.
6. Phase 2 (separate approval): `skill/` companion exposing the same pipeline as a Claude Code skill.

## 6. Decisions Dan owns before work starts

- Name: **Kernel**? (else rename repo + signature)
- License: MIT assumed.
- Domain: `kernel.danhedesign.com` or Vercel default.
- Deck default-open on the standalone page (recommended: yes, it IS the product).
- Keep the site's ink/paper/red theme, or neutralize the branding for forks (recommended: keep — it is the taste being demonstrated).
