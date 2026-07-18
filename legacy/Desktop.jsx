import { useState, useRef } from "react";
import { THEMES, PROFILE, PROJECTS } from "./config";
import Window from "./Window";
import AgentTerminal from "./AgentTerminal";
import PreviewApp from "./PreviewApp";
import LinkedInApp from "./LinkedInApp";
import GalleryApp from "./GalleryApp";
import Kaleido from "./Kaleido";

function PhotoThumb({ project, theme, size = 56 }) {
  const c = (project.images && project.images[0] && project.images[0].color) || project.cover;
  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <div style={{ position: "absolute", inset: 0, transform: "rotate(-6deg) translate(-3px,2px)", borderRadius: 7, background: theme.dark ? "#333" : "#fff", boxShadow: "0 2px 6px rgba(0,0,0,.2)", border: `1px solid ${theme.menuBorder}` }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 7, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,.25)", border: `2px solid ${theme.dark ? "#444" : "#fff"}` }}>
        <div style={{ width: "100%", height: "100%", background: `linear-gradient(150deg, ${c}, ${theme.dark ? "#000" : "#f0f0f0"} 200%)` }} />
      </div>
    </div>
  );
}

const APPS = {
  agent: { title: "Terminal — claude code", w: 460, h: 320, dark: true, render: (t, ctx) => <AgentTerminal onLaunch={ctx.onLaunch} /> },
  finder: {
    title: "Finder — Projects", w: 420, h: 280, render: (t, ctx) => (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(110px,1fr))", gap: 18, padding: 20 }}>
        {PROJECTS.map((p) => (
          <div key={p.id} onClick={() => ctx.onLaunch("preview", p.id)} style={{ textAlign: "center", cursor: "pointer" }}>
            <PhotoThumb project={p} theme={t} size={52} />
            <div style={{ fontSize: 12, marginTop: 6, fontWeight: 600 }}>{p.title}</div>
            <div style={{ fontSize: 10, marginTop: 2, opacity: 0.55 }}>{p.subtitle}</div>
          </div>
        ))}
      </div>
    ),
  },
  preview: { title: "Preview — Case Study", w: 580, h: 440, render: (t, ctx) => <PreviewApp theme={t} projectId={ctx.arg} /> },
  linkedin: { title: "LinkedIn", w: 360, h: 460, render: (t) => <LinkedInApp theme={t} /> },
  gallery: { title: "Gallery", w: 340, h: 420, render: (t, ctx) => <GalleryApp theme={t} onLaunch={ctx.onLaunch} /> },
  kaleido: { title: "🧩 generative-art", w: 336, h: 288, dark: true, render: () => <Kaleido /> },
  chat: {
    title: "Chat — Message me", w: 360, h: 300, render: (t) => (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 14 }}>
        <div style={{ flex: 1, fontSize: 13, opacity: 0.7 }}>Leave me a message — goes straight to my inbox.</div>
        <textarea placeholder="Write something…" style={{ width: "100%", height: 56, marginBottom: 8, padding: 8, borderRadius: 8, border: `0.5px solid ${t.menuBorder}`, background: t.body, color: t.fg }} />
        <button style={{ padding: "6px 16px", borderRadius: 8, border: `0.5px solid ${t.menuBorder}`, background: "transparent", color: t.fg }}>Send</button>
      </div>
    ),
  },
};

const DOCK = [
  { id: "agent", icon: "▦" },
  { id: "finder", icon: "📁" },
  { id: "preview", icon: "🖼" },
  { id: "linkedin", icon: "in" },
  { id: "gallery", icon: "⊞" },
  { id: "kaleido", icon: "🧩" },
  { id: "chat", icon: "💬" },
];

export default function Desktop() {
  const [themeKey, setThemeKey] = useState("light");
  const [open, setOpen] = useState([
    { id: "agent", z: 1, pos: { x: 64, y: 74 } },
    { id: "kaleido", z: 2, pos: { x: 566, y: 182 } },
  ]);
  const [topZ, setTopZ] = useState(2);
  const theme = THEMES[themeKey];
  const canvasRef = useRef(null);

  const launch = (id, arg) => {
    setOpen((prev) => {
      const exists = prev.find((w) => w.id === id);
      const z = topZ + 1;
      setTopZ(z);
      if (exists) return prev.map((w) => (w.id === id ? { ...w, z, arg } : w));
      return [...prev, { id, z, arg }];
    });
  };
  const focus = (id) => { const z = topZ + 1; setTopZ(z); setOpen((p) => p.map((w) => (w.id === id ? { ...w, z } : w))); };
  const close = (id) => setOpen((p) => p.filter((w) => w.id !== id));

  const onWheel = (e) => {
    if (e.target !== canvasRef.current) return;
    if (e.deltaY <= 40) return;
    if (open.find((w) => w.id === "preview")) return;
    launch("preview", PROJECTS[0].id);
  };

  return (
    <div ref={canvasRef} onWheel={onWheel} style={{ position: "absolute", inset: 0, overflow: "hidden", background: theme.bg }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 27, display: "flex", alignItems: "center", padding: "0 12px", gap: 16, fontSize: 13, zIndex: 500, background: theme.menuBg, color: theme.menuFg, borderBottom: `0.5px solid ${theme.menuBorder}` }}>
        <span style={{ fontWeight: 600 }}>⌘</span>
        <span style={{ fontWeight: 600 }}>{PROFILE.name}</span>
        {["File", "Edit", "View"].map((s) => <span key={s} style={{ color: theme.menuSec }}>{s}</span>)}
        <span style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {Object.entries(THEMES).map(([k, t]) => (
            <button key={k} onClick={() => setThemeKey(k)}
              style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, border: `0.5px solid ${theme.menuBorder}`, background: "transparent", fontWeight: themeKey === k ? 600 : 400, color: theme.menuFg }}>
              {t.label}
            </button>
          ))}
        </span>
      </div>

      <div style={{ position: "absolute", top: 44, right: 24, display: "flex", flexDirection: "column", gap: 22, zIndex: 1 }}>
        {PROJECTS.map((p) => (
          <div key={p.id} onClick={() => launch("preview", p.id)} title={p.title}
            style={{ width: 72, textAlign: "center", cursor: "pointer" }}>
            <PhotoThumb project={p} theme={theme} size={56} />
            <div style={{ fontSize: 11, marginTop: 6, color: theme.menuFg, fontWeight: 500 }}>{p.title}</div>
          </div>
        ))}
      </div>

      {open.map((w, i) => (
        <Window key={w.id} app={APPS[w.id]} theme={theme} zIndex={w.z} offset={i} arg={w.arg} initialPos={w.pos}
          onLaunch={launch} onFocus={() => focus(w.id)} onClose={() => close(w.id)} />
      ))}

      <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", height: 60, display: "flex", alignItems: "center", gap: 12, padding: "0 16px", zIndex: 400, borderRadius: 16, background: theme.dock, border: `0.5px solid ${theme.dockBorder}` }}>
        {DOCK.map((d) => (
          <div key={d.id} onClick={() => launch(d.id)} title={d.id}
            style={{ cursor: "pointer", fontSize: d.icon.length > 1 ? 22 : 30, fontWeight: d.icon.length > 1 ? 700 : 400, color: theme.dockFg, transition: "transform .15s", display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 40 }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.25) translateY(-4px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
            {d.icon}
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 16, left: 20, fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontWeight: 300, fontSize: 15, color: theme.hint, zIndex: 1 }}>
        {PROFILE.tagline}
      </div>

      <div style={{ position: "absolute", bottom: 16, right: 20, fontSize: 12, color: theme.hint, zIndex: 1 }}>
        Scroll down to open work · click a file · or ask the terminal
      </div>
    </div>
  );
}
