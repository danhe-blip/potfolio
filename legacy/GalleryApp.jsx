import { useState } from "react";
import { PROFILE, GALLERY } from "./config";

export default function GalleryApp({ theme, onLaunch }) {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return (
      <div style={{ height: "100%", overflowY: "auto", background: theme.body, color: theme.fg }}>
        <div onClick={() => setSelected(null)} style={{ padding: "10px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", color: theme.accent, borderBottom: `0.5px solid ${theme.menuBorder}` }}>
          ← Back
        </div>
        <div style={{ aspectRatio: "1 / 1", background: selected.coverColor, display: "flex", alignItems: "flex-end", padding: 16 }}>
          <div style={{ color: "#fff", fontSize: 24, fontWeight: 700, fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic" }}>{selected.title}</div>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13.5, lineHeight: 1.55, marginBottom: 14 }}>{selected.caption}</div>
          {selected.caseStudyId && (
            <button onClick={() => onLaunch("preview", selected.caseStudyId)}
              style={{ fontSize: 12.5, fontWeight: 600, color: "#fff", background: theme.accent, border: "none", borderRadius: 20, padding: "7px 16px", cursor: "pointer" }}>
              View case study →
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", overflowY: "auto", background: theme.body, color: theme.fg }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, borderBottom: `0.5px solid ${theme.menuBorder}` }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: theme.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, flexShrink: 0 }}>DH</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{PROFILE.name}</div>
          <div style={{ fontSize: 12, opacity: 0.6 }}>{PROFILE.handle}</div>
          <div style={{ fontSize: 11.5, opacity: 0.7, marginTop: 2 }}>{GALLERY.length} projects · {PROFILE.role}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, padding: 2 }}>
        {GALLERY.map((item) => (
          <div key={item.id} onClick={() => setSelected(item)}
            style={{ aspectRatio: "1 / 1", background: item.coverColor, cursor: "pointer", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", padding: 8 }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.85)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}>
            <span style={{ color: "#fff", fontSize: 11, fontWeight: 600, textShadow: "0 1px 3px rgba(0,0,0,.4)" }}>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
