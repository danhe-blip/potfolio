import { useRef, useState, useEffect } from "react";

export default function Window({ app, theme, zIndex, onFocus, onClose, offset, arg, onLaunch, initialPos }) {
  const [pos, setPos] = useState(initialPos || { x: 100 + offset * 30, y: 64 + offset * 26 });
  const [glitch, setGlitch] = useState(true);
  const drag = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setGlitch(false), 260);
    return () => clearTimeout(t);
  }, []);

  const onDown = (e) => {
    if (e.target.dataset.close) return;
    onFocus();
    drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    const move = (ev) => {
      if (!drag.current) return;
      setPos({ x: ev.clientX - drag.current.dx, y: Math.max(28, ev.clientY - drag.current.dy) });
    };
    const up = () => {
      drag.current = null;
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const dark = app.dark;
  const lights = ["#ff5f57", "#febc2e", "#28c840"];

  return (
    <div
      className={glitch ? "glitch-in" : undefined}
      onMouseDown={() => onFocus()}
      style={{
        position: "absolute", left: pos.x, top: pos.y, width: app.w, zIndex,
        background: theme.win, borderRadius: theme.radius, overflow: "hidden",
        boxShadow: theme.shadow, border: theme.border,
      }}
    >
      <div
        onMouseDown={onDown}
        style={{
          height: 32, display: "flex", alignItems: "center", gap: 8, padding: "0 10px",
          cursor: "grab", userSelect: "none", borderBottom: `0.5px solid ${theme.menuBorder}`,
          background: theme.bar,
        }}
      >
        <span data-close onClick={onClose} style={{ width: 12, height: 12, borderRadius: "50%", background: lights[0], cursor: "pointer" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: lights[1] }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: lights[2] }} />
        <span style={{ marginLeft: 8, fontSize: 13, fontWeight: 600, color: theme.barFg }}>{app.title}</span>
      </div>
      <div style={{ height: app.h - 32, overflow: "auto", fontSize: 14, background: dark ? "#1e1e1e" : theme.body, color: dark ? "#e0e0e0" : theme.fg }}>
        {app.render(theme, { onLaunch, arg })}
      </div>
    </div>
  );
}
