import { useState, useEffect, useRef } from "react";
import { WORKS, ABOUT } from "./config";
import ShotGrid from "./ShotGrid";
import CompositionDiagram from "./CompositionDiagram";
import SystemLayers from "./SystemLayers";
import Gate, { GATE_KEY, requestUnlock } from "./Gate";

const renderBody = (text) => {
  const re = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  const parts = [];
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a key={m.index} href={m[2]} target="_blank" rel="noreferrer">
        {m[1]}
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last === 0) return text;
  if (last < text.length) parts.push(text.slice(last));
  return parts;
};

export default function WorkPage({ doc, navigate }) {
  const [active, setActive] = useState(doc.sections[0]?.id);
  const [unlocked, setUnlocked] = useState(null);
  const refs = useRef({});
  const sections = unlocked
    ? [
        ...doc.sections.map((s) =>
          unlocked.patch?.[s.id] ? { ...s, ...unlocked.patch[s.id] } : s
        ),
        ...(unlocked.sections ?? []),
      ]
    : doc.sections;

  useEffect(() => {
    setUnlocked(null);
    if (!doc.gate) return;
    let live = true;
    let saved = null;
    try {
      saved = localStorage.getItem(GATE_KEY);
    } catch {}
    if (!saved) return;
    requestUnlock(doc.id, saved)
      .then((r) => {
        if (live && r.ok) setUnlocked(r);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [doc]);

  useEffect(() => {
    setActive(sections[0]?.id);
    const onScroll = () => {
      const line = window.scrollY + window.innerHeight * 0.28;
      let current = sections[0]?.id;
      for (const s of sections) {
        const el = refs.current[s.id];
        if (el && el.offsetTop <= line) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [doc, unlocked]);

  const jump = (id) => refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });

  const idx = WORKS.findIndex((w) => w.id === doc.id);
  const pool = WORKS.filter((w) => !w.confidential && !w.hidden && w.id !== doc.id);
  const next = pool.find((w) => WORKS.indexOf(w) > idx) || pool[0] || ABOUT;

  return (
    <div className="doc">
      <aside className="rail">
        {sections.map((s) => (
          <button key={s.id} className={active === s.id ? "on" : ""} onClick={() => jump(s.id)}>
            {s.label}
          </button>
        ))}
        <div className="rail-foot mono">
          {doc.num} / {doc.title}
        </div>
      </aside>

      <article className="content">
        <div className="doc-tags mono">
          {doc.tags.map((t) => (
            <span key={t} className="t">({t})</span>
          ))}
        </div>
        <h1 className="doc-title">{doc.title}</h1>
        <p className="doc-sub">{doc.sub}</p>

        {doc.photo !== undefined && (
          <figure className="portrait">
            {doc.photo && <img src={doc.photo} alt={doc.title} />}
            {doc.portraitAscii && (
              <pre role="img" aria-label={doc.title}>{doc.portraitAscii}</pre>
            )}
            {!doc.photo && !doc.portraitAscii && (
              <span>[ drop portrait → /public/portrait.jpg, set ABOUT.photo ]</span>
            )}
          </figure>
        )}

        {doc.result && (
          <div className="result">
            <div className="label mono">Result</div>
            <p>{doc.result}</p>
          </div>
        )}

        {sections.map((s) => (
          <section key={s.id} className="sec" ref={(el) => (refs.current[s.id] = el)}>
            <div className="label">{s.label}</div>
            <h2>{s.headline}</h2>
            <p>{renderBody(s.body)}</p>
            {s.diagram === "composition" && <CompositionDiagram />}
            {s.diagram === "layers" && <SystemLayers />}
            {s.compare && (
              <figure className="compare">
                {[s.compare.left, s.compare.right].map((side) => (
                  <div key={side.label} className="compare-side">
                    <div className="compare-label mono">{side.label}</div>
                    {side.src ? (
                      <img src={side.src} alt={side.label} loading="lazy" />
                    ) : (
                      <div className="compare-slot mono">[ {side.fig} ]</div>
                    )}
                  </div>
                ))}
              </figure>
            )}
            {s.link && (s.link.to === "about" || WORKS.some((w) => w.id === s.link.to && !w.confidential)) && (
              <button className="sec-link mono" onClick={() => navigate(s.link.to)}>
                {s.link.label} <span className="a">→</span>
              </button>
            )}
            {s.imgs
              ? s.imgs.length > 1
                ? <ShotGrid imgs={s.imgs} label={s.headline} />
                : s.imgs.map((im) => (
                    <figure key={im.src} className="fig shot">
                      <img src={im.src} alt={im.alt || s.headline} />
                      {im.cap && <figcaption className="mono">{im.cap}</figcaption>}
                    </figure>
                  ))
              : s.fig !== undefined && (
                  <figure className="fig">
                    {s.img ? <img src={s.img} alt={s.fig} /> : <span>[ {s.fig} ]</span>}
                  </figure>
                )}
          </section>
        ))}

        {doc.gate && !unlocked && (
          <Gate work={doc.id} gate={doc.gate} onUnlock={setUnlocked} />
        )}

        <div className="next-wrap">
          <div className="label mono">Next</div>
          <button className="next-link" onClick={() => navigate(next.id)}>
            {next.title} <span className="a">→</span>
          </button>
        </div>
      </article>
    </div>
  );
}
