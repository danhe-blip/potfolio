import { useState, useEffect, useRef } from "react";
import { WORKS } from "./config";
import ShotGrid from "./ShotGrid";
import CompositionDiagram from "./CompositionDiagram";

export default function WorkPage({ doc, navigate }) {
  const [active, setActive] = useState(doc.sections[0]?.id);
  const refs = useRef({});

  useEffect(() => {
    setActive(doc.sections[0]?.id);
    const onScroll = () => {
      const line = window.scrollY + window.innerHeight * 0.28;
      let current = doc.sections[0]?.id;
      for (const s of doc.sections) {
        const el = refs.current[s.id];
        if (el && el.offsetTop <= line) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [doc]);

  const jump = (id) => refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });

  const idx = WORKS.findIndex((w) => w.id === doc.id);
  const next = idx === -1 ? WORKS[0] : WORKS[(idx + 1) % WORKS.length];

  return (
    <div className="doc">
      <aside className="rail">
        {doc.sections.map((s) => (
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
            {doc.photo ? (
              <img src={doc.photo} alt={doc.title} />
            ) : (
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

        {doc.sections.map((s) => (
          <section key={s.id} className="sec" ref={(el) => (refs.current[s.id] = el)}>
            <div className="label">{s.label}</div>
            <h2>{s.headline}</h2>
            <p>{s.body}</p>
            {s.diagram === "composition" && <CompositionDiagram />}
            {s.link && (
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
