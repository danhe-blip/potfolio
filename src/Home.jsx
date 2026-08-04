import { useState, useMemo, useEffect, useRef } from "react";
import { SITE, WORKS, ART } from "./config";
import Kaleido from "./Kaleido";
import ArtPanel from "./ArtPanel";

const TICKER = `${SITE.name} — ${SITE.role} @ ${SITE.company} /// product · systems · brand · web /// ${" .:-=+*o#%@".repeat(3)} /// `;

const IDLE_COLORS = { base: "#2e2b27", mid: "#45413c", high: "#635e57", peak: "#847d74" };

const hexToRgb = (h) => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const mix = (hexA, hexB, k) => {
  const a = hexToRgb(hexA), b = hexToRgb(hexB);
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * k));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
};

const loadArt = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("dh-art-v2"));
    return saved ? { ...ART.defaults, ...saved } : ART.defaults;
  } catch {
    return ART.defaults;
  }
};

const loadDeckSeen = () => {
  try {
    return !!localStorage.getItem("dh-deck-seen");
  } catch {
    return false;
  }
};

export default function Home({ navigate }) {
  const [pg, vr, ds, br, web] = WORKS;
  const [art, setArt] = useState(loadArt);
  const [deckOpen, setDeckOpen] = useState(() => window.location.search.includes("deck"));
  const [hovered, setHovered] = useState(null);
  const [deckSeen, setDeckSeen] = useState(loadDeckSeen);
  const [hintOn, setHintOn] = useState(false);
  const hintRef = useRef(null);
  const hintPos = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 });

  const openDeck = () => {
    setDeckOpen(true);
    setDeckSeen(true);
    try {
      localStorage.setItem("dh-deck-seen", "1");
    } catch {}
  };

  const heroMove = (e) => {
    if (e.target.closest(".hero-meta")) {
      heroLeave();
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const p = hintPos.current;
    const hw = hintRef.current ? hintRef.current.offsetWidth : 0;
    const hh = hintRef.current ? hintRef.current.offsetHeight : 0;
    p.tx = Math.min(e.clientX - r.left + 14, r.width - hw - 10);
    p.ty = Math.min(e.clientY - r.top + 18, r.height - hh - 10);
    if (!hintOn) {
      p.x = p.tx;
      p.y = p.ty;
      setHintOn(true);
    }
    if (!p.raf) {
      const step = () => {
        p.x += (p.tx - p.x) * 0.42;
        p.y += (p.ty - p.y) * 0.42;
        if (hintRef.current) hintRef.current.style.transform = `translate(${p.x}px, ${p.y}px)`;
        if (Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > 0.3) {
          p.raf = requestAnimationFrame(step);
        } else {
          p.raf = 0;
        }
      };
      p.raf = requestAnimationFrame(step);
    }
  };

  const heroLeave = () => {
    const p = hintPos.current;
    if (p.raf) cancelAnimationFrame(p.raf);
    p.raf = 0;
    setHintOn(false);
  };


  useEffect(() => {
    try {
      localStorage.setItem("dh-art-v2", JSON.stringify(art));
    } catch {}
  }, [art]);

  const colors = useMemo(() => {
    if (art.palette === "custom") {
      const c = art.customColor;
      return art.customMode === "mono"
        ? { base: mix(c, "#111111", 0.8), mid: mix(c, "#111111", 0.55), high: mix(c, "#111111", 0.15), peak: mix(c, "#ffffff", 0.3) }
        : { base: "#4a4643", mid: "#8a817a", high: c, peak: mix(c, "#ffffff", 0.35) };
    }
    const p = ART.palettes.find((x) => x.id === art.palette) || ART.palettes[0];
    return p.spectrum ? "spectrum" : p.colors;
  }, [art.palette, art.customColor, art.customMode]);

  const accent = useMemo(() => {
    if (art.palette === "custom") return art.customColor;
    const p = ART.palettes.find((x) => x.id === art.palette) || ART.palettes[0];
    return p.accent || "#C8432A";
  }, [art.palette, art.customColor]);

  useEffect(() => {
    const [r, g, b] = hexToRgb(accent);
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    const root = document.documentElement.style;
    root.setProperty("--red", accent);
    root.setProperty("--red-dim", `rgba(${r},${g},${b},0.12)`);
    root.setProperty("--on-accent", lum > 0.6 ? "#111111" : "#F7F5F0");
    root.setProperty("--mark", accent);
  }, [accent]);

  const heroParams = {
    variant: art.variant,
    symmetry: art.symmetry,
    speed: art.speed,
    scale: art.scale,
    density: art.density / 100,
    seed: art.seed,
    colors,
    fill: true,
  };

  const iconParams = (w, i) => {
    const on = hovered === w.id;
    return {
      variant: w.motif,
      symmetry: art.symmetry,
      speed: art.speed,
      scale: 9,
      density: art.density / 100 - 0.04,
      seed: 0.13 + i * 0.19,
      colors: on ? colors : IDLE_COLORS,
      fill: true,
      paused: !on,
    };
  };

  const workCell = (w, i, extra = "") => {
    if (w.wip) {
      return (
        <div
          key={w.id}
          className={`cell cell--work cell--wip reveal ${extra}`}
          data-art-host
          style={{ animationDelay: `${90 + i * 70}ms` }}
          aria-disabled="true"
        >
          <div className="cell-art" aria-hidden="true">
            <Kaleido params={iconParams(w, i)} />
          </div>
          <div className="head mono">
            <span>{w.num}</span>
            <span className="head-end">
              <span>[{w.type}]</span>
              <span className="wip-status" aria-label="Case study in progress">WIP</span>
            </span>
          </div>
          <div className="cell-text">
            <div className="title">{w.title}</div>
            <div className="tagline">{w.tagline}</div>
          </div>
        </div>
      );
    }
    return (
      <button
        key={w.id}
        className={`cell link cell--work reveal ${extra}`}
        data-art-host
        style={{ animationDelay: `${90 + i * 70}ms` }}
        onClick={() => navigate(w.id)}
        onMouseEnter={() => setHovered(w.id)}
        onMouseLeave={() => setHovered((h) => (h === w.id ? null : h))}
      >
        <div className="cell-art" aria-hidden="true">
          <Kaleido params={iconParams(w, i)} />
        </div>
        <div className="head mono">
          <span>{w.num}</span>
          <span>[{w.type}]</span>
        </div>
        <div className="cell-text">
          <div className="title">{w.title}</div>
          <div className="tagline">{w.tagline}</div>
        </div>
      </button>
    );
  };

  return (
    <>
      <main className="board">
        <section
          className="cell cell--hero reveal"
          data-art-host
          style={{ animationDelay: "0ms" }}
          onMouseMove={deckOpen || deckSeen ? undefined : heroMove}
          onMouseLeave={deckOpen || deckSeen ? undefined : heroLeave}
        >
          <div className="hero-art" aria-hidden="true">
            <Kaleido params={heroParams} />
          </div>
          <div className="hero-body">
            <div className="hero-lede">
              <h1 className="hero-title">
                {SITE.heroTitleA}<br />
                <em>{SITE.heroTitleB}</em>
              </h1>
              <p className="hero-blurb mono">{SITE.heroBlurb}</p>
            </div>
            <div className="hero-foot mono">
              {!deckOpen && (
                <div className="hero-meta">
                  <span className="art-sig" aria-hidden="true">{SITE.artSignature}</span>
                  <button className="tune-tab" aria-expanded={false} onClick={openDeck}>
                    [ tune ]
                  </button>
                </div>
              )}
            </div>
          </div>
          {hintOn && !deckOpen && !deckSeen && (
            <span className="cursor-hint mono" ref={hintRef} aria-hidden="true">
              {SITE.artHint}
            </span>
          )}
          {deckOpen && <ArtPanel art={art} setArt={setArt} onClose={() => setDeckOpen(false)} />}
        </section>

        {workCell(pg, 0, "cell--w2")}
        {workCell(vr, 1)}
        {workCell(ds, 2)}
        {workCell(br, 3)}
        {workCell(web, 4)}
      </main>

      <footer className="marquee" aria-hidden="true">
        <span>{TICKER + TICKER}</span>
      </footer>
    </>
  );
}
