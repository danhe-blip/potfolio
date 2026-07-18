import { useState, useRef, useEffect } from "react";
import { PROJECTS } from "./config";

export default function PreviewApp({ theme, projectId }) {
  const [activeId, setActiveId] = useState(projectId || PROJECTS[0].id);
  const [selImg, setSelImg] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [progress, setProgress] = useState(0);
  const infoRef = useRef(null);

  useEffect(() => { if (projectId) setActiveId(projectId); }, [projectId]);

  const project = PROJECTS.find((p) => p.id === activeId) || PROJECTS[0];
  const images = project.images || [];
  const image = images[selImg] || images[0];

  useEffect(() => {
    setSelImg(0);
    setZoom(1);
    setProgress(0);
    if (infoRef.current) infoRef.current.scrollTop = 0;
  }, [activeId]);

  const onInfoScroll = (e) => {
    const el = e.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 0);
  };

  const serif = { fontFamily: "'Fraunces', Georgia, serif" };
  const canvasBg = theme.dark ? "#0e0e0e" : "#c9c6bf";
  const railBg = theme.dark ? "#161616" : "#efede7";
  const tbBg = theme.bar;
  const iconBtn = (active) => ({
    display: "flex", alignItems: "center", justifyContent: "center", width: 26, height: 22,
    borderRadius: 5, cursor: "pointer", fontSize: 13, border: "none",
    background: active ? (theme.dark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.08)") : "transparent",
    color: theme.barFg,
  });

  const renderImage = (img, big) => {
    if (img && img.src) {
      return <img src={img.src} alt={img.label} style={{ display: "block", maxWidth: "100%", maxHeight: "100%", objectFit: "contain", boxShadow: big ? "0 4px 24px rgba(0,0,0,.35)" : "none" }} />;
    }
    return (
      <div style={{
        width: big ? "78%" : "100%", aspectRatio: "4 / 3", borderRadius: big ? 6 : 3,
        background: `linear-gradient(150deg, ${img ? img.color : theme.accent}, ${theme.dark ? "#000" : "#fff"} 220%)`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        color: "#fff", boxShadow: big ? "0 6px 30px rgba(0,0,0,.4)" : "none", textAlign: "center",
      }}>
        <div style={{ fontSize: big ? 22 : 9, fontWeight: 700, ...serif, fontStyle: "italic" }}>{img ? img.label : "—"}</div>
        {big && <div style={{ fontSize: 11, opacity: 0.8, marginTop: 6 }}>Drop screenshot here (set src in config)</div>}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: theme.body }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, height: 46, padding: "0 10px", background: tbBg, borderBottom: `0.5px solid ${theme.menuBorder}`, flexShrink: 0 }}>
        <button title="Sidebar" onClick={() => setShowSidebar((v) => !v)} style={iconBtn(showSidebar)}>▤</button>
        <div style={{ flex: 1, textAlign: "center", lineHeight: 1.1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: theme.barFg }}>{project.title}</div>
          <div style={{ fontSize: 10, color: theme.menuSec }}>{images.length} images</div>
        </div>
        <button title="Info" onClick={() => setShowInfo((v) => !v)} style={iconBtn(showInfo)}>ⓘ</button>
        <button title="Zoom out" onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))} style={iconBtn(false)}>−</button>
        <button title="Zoom in" onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))} style={iconBtn(false)}>+</button>
        <span style={{ ...iconBtn(false), cursor: "default", opacity: 0.5 }}>⤴</span>
        <span style={{ ...iconBtn(false), cursor: "default", opacity: 0.5 }}>✎</span>
        <span style={{ ...iconBtn(false), cursor: "default", opacity: 0.5 }}>🔍</span>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {showSidebar && (
          <div style={{ width: 120, flexShrink: 0, overflowY: "auto", background: railBg, borderRight: `0.5px solid ${theme.menuBorder}`, padding: 10 }}>
            {images.map((img, i) => (
              <div key={img.id} onClick={() => setSelImg(i)} style={{ marginBottom: 12, cursor: "pointer" }}>
                <div style={{ borderRadius: 4, overflow: "hidden", border: `2px solid ${i === selImg ? theme.accent : "transparent"}`, background: theme.dark ? "#222" : "#fff", padding: 3 }}>
                  {renderImage(img, false)}
                </div>
                <div style={{ fontSize: 10, textAlign: "center", marginTop: 4, color: i === selImg ? theme.accent : theme.fg, fontWeight: i === selImg ? 700 : 400 }}>{img.label}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ flex: 1, overflow: "auto", background: canvasBg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ transform: `scale(${zoom})`, transition: "transform .15s", display: "flex", justifyContent: "center", width: "100%" }}>
            {renderImage(image, true)}
          </div>
        </div>

        {showInfo && (
          <div style={{ width: 210, flexShrink: 0, display: "flex", flexDirection: "column", borderLeft: `0.5px solid ${theme.menuBorder}`, background: theme.body }}>
            <div style={{ height: 2, background: theme.menuBorder, flexShrink: 0 }}>
              <div style={{ height: "100%", width: `${progress * 100}%`, background: theme.accent, transition: "width .08s linear" }} />
            </div>
            <div ref={infoRef} onScroll={onInfoScroll} style={{ overflowY: "auto", padding: "16px 16px 30px", color: theme.fg }}>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
                {project.tags.map((tg) => (
                  <span key={tg} style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, border: `0.5px solid ${theme.menuBorder}`, color: theme.menuSec, textTransform: "uppercase", letterSpacing: 0.5 }}>{tg}</span>
                ))}
              </div>
              <h1 style={{ ...serif, fontStyle: "italic", fontWeight: 300, fontSize: 28, lineHeight: 1.05, letterSpacing: -0.5, marginBottom: 4 }}>{project.title}</h1>
              <div style={{ fontSize: 11.5, opacity: 0.6, marginBottom: 16 }}>{project.subtitle}</div>

              <div style={{ borderLeft: `3px solid ${theme.accent}`, paddingLeft: 10, marginBottom: 22 }}>
                <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1, color: theme.accent, fontWeight: 700, marginBottom: 3 }}>Result</div>
                <div style={{ ...serif, fontSize: 14, lineHeight: 1.3 }}>{project.result}</div>
              </div>

              {project.sections.map((s) => (
                <section key={s.id} style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 10, fontFamily: "ui-monospace, Menlo, monospace", color: theme.accent, fontWeight: 700, marginBottom: 5, letterSpacing: 0.5 }}>{s.label}</div>
                  <h2 style={{ ...serif, fontSize: 15, lineHeight: 1.2, fontWeight: 400, marginBottom: 6 }}>{s.headline}</h2>
                  <p style={{ fontSize: 11.5, lineHeight: 1.55, opacity: 0.82 }}>{s.body}</p>
                </section>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
