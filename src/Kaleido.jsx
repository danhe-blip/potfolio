import { useEffect, useRef } from "react";
import { KALEIDO } from "./config";

const FIELDS = {
  fold: (x, y, t, p, g) => {
    const dx = (x - g.cx) / 2.2, dy = y - g.cy;
    const r = Math.sqrt(dx * dx + dy * dy);
    const a = Math.atan2(dy, dx);
    const fold = Math.abs((((a * p.symmetry) / Math.PI) % 2) - 1);
    return Math.sin(r * 0.9 - t * p.speed) + Math.cos(fold * 3 + t) + Math.sin(r * 0.4 + t * p.speed * 0.75);
  },
  wave: (x, y, t, p) =>
    Math.sin(x * 0.5 + t * p.speed) +
    Math.sin(y * 0.85 - t * p.speed * 0.8) +
    Math.sin((x * 0.45 + y * 0.7) * (p.symmetry / 6) - t * p.speed * 0.5),
  orbit: (x, y, t, p, g) => {
    const dx = (x - g.cx) / 2.2, dy = y - g.cy;
    const r = Math.sqrt(dx * dx + dy * dy);
    const a = Math.atan2(dy, dx);
    return Math.sin(r * 0.8 - t * p.speed) + Math.sin(a * p.symmetry + t * p.speed * 0.6) + Math.cos(r * 0.3 + a * 2 - t * p.speed * 0.4);
  },
  grid: (x, y, t, p) =>
    3 * Math.sin(x * 0.7 * (p.symmetry / 6) + t * p.speed) * Math.cos(y * 0.8 - t * p.speed * 0.7),
  rings: (x, y, t, p, g) => {
    const dx = (x - g.cx) / 2.2, dy = y - g.cy;
    const r = Math.sqrt(dx * dx + dy * dy);
    return 2.4 * Math.sin(r * 1.1 - t * p.speed) - r * 0.16 + 0.8;
  },
  clash: (x, y, t, p, g) => {
    const d1 = Math.sqrt(((x - g.cx * 0.5) / 2.2) ** 2 + (y - g.cy) ** 2);
    const d2 = Math.sqrt(((x - g.cx * 1.5) / 2.2) ** 2 + (y - g.cy) ** 2);
    return 1.6 * Math.sin(d1 * 1.2 - t * p.speed * 1.4) + 1.6 * Math.sin(d2 * 1.2 + t * p.speed * 1.1);
  },
  lattice: (x, y, t, p) =>
    1.6 * Math.sin(x * 0.9 + Math.sin(t * p.speed) * 0.8) * Math.sin(y * 1.15 + Math.cos(t * p.speed * 0.8) * 0.8) +
    1.2 * Math.sin((x + y) * 0.22 + t * p.speed * 0.3),
  mark: (x, y, t, p, g) => {
    const d = Math.abs((x - g.cx) / 2.2) + Math.abs(y - g.cy);
    return 2.6 * Math.sin(d * 0.9 - t * p.speed) - d * 0.18 + 1;
  },
  flow: (x, y, t, p) =>
    2 * Math.sin(x * 0.55 - t * p.speed * 1.6 + Math.sin(y * 0.5) * 1.4) + Math.sin(y * 0.9 + Math.sin(x * 0.2 - t * p.speed) * 1.2),
};

const colorFor = (t, colors) => {
  if (colors === "spectrum") {
    return `hsl(${Math.round(280 - t * 300)},68%,${Math.round(38 + t * 30)}%)`;
  }
  if (t > 0.85) return colors.peak;
  if (t > 0.6) return colors.high;
  if (t > 0.3) return colors.mid;
  return colors.base;
};

export default function Kaleido({ params }) {
  const preRef = useRef(null);
  const pRef = useRef(params);
  pRef.current = params;
  const ptr = useRef({ x: -99, y: -99, tx: -99, ty: -99, e: 0 });
  const size = useRef({ w: 0, h: 0 });
  const dims = useRef({ W: KALEIDO.width, H: KALEIDO.height });

  useEffect(() => {
    const pre = preRef.current;
    const host = pre.closest("[data-art-host]") || pre.parentElement;
    const onMove = (ev) => {
      const r = pre.getBoundingClientRect();
      const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
      const cy = ev.touches ? ev.touches[0].clientY : ev.clientY;
      ptr.current.tx = ((cx - r.left) / r.width) * dims.current.W;
      ptr.current.ty = ((cy - r.top) / r.height) * dims.current.H;
      ptr.current.e = 1;
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("touchmove", onMove, { passive: true });
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("touchmove", onMove);
    };
  }, []);

  useEffect(() => {
    const { ramp } = KALEIDO;
    const len = ramp.length;
    let staticDone = null;

    const parent = preRef.current.parentElement;
    const measure = () => {
      const r = parent.getBoundingClientRect();
      size.current = { w: r.width, h: r.height };
      staticDone = null;
    };
    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(parent);

    const renderFrame = (elapsed) => {
      const p = pRef.current;
      const fs = p.scale || 12;
      let W, H;
      if (p.fill && size.current.w > 0) {
        W = Math.min(170, Math.ceil(size.current.w / (fs * 0.6 + 0.5)) + 1);
        H = Math.min(110, Math.ceil(size.current.h / (fs * 1.05)) + 1);
      } else {
        W = KALEIDO.width;
        H = KALEIDO.height;
      }
      dims.current = { W, H };
      const g = { cx: W / 2, cy: H / 2 };
      const P = ptr.current;
      if (P.e > 0.01) {
        P.x += (P.tx - P.x) * 0.3;
        P.y += (P.ty - P.y) * 0.3;
        P.e *= 0.955;
      }
      const rippleOn = !p.paused && P.e > 0.02;
      const t = p.seed * Math.PI * 2 + elapsed;
      const field = FIELDS[p.variant] || FIELDS.fold;
      const rows = [];
      for (let y = 0; y < H; y++) {
        let line = "", run = "", runColor = null;
        const flush = () => {
          if (!run) return;
          line += runColor ? `<span style="color:${runColor}">${run}</span>` : run;
          run = "";
          runColor = null;
        };
        for (let x = 0; x < W; x++) {
          let v = field(x, y, t, p, g);
          if (rippleOn) {
            const ddx = (x - P.x) / 2.2, ddy = y - P.y;
            const dd = Math.sqrt(ddx * ddx + ddy * ddy);
            const prox = P.e * Math.exp(-dd * 0.22);
            v = v * (1 - prox * 0.55) + prox * 2.8 * Math.sin(dd * 1.2 - t * 3.4);
          }
          let n = (v + 3) / 6 + p.density;
          n = Math.max(0, Math.min(1, n));
          const idx = Math.round(n * (len - 1));
          const ch = ramp[idx];
          const color = ch === " " ? null : colorFor(idx / (len - 1), p.colors);
          if (color !== runColor) flush();
          runColor = color;
          run += ch;
        }
        flush();
        rows.push(line);
      }
      if (preRef.current) preRef.current.innerHTML = rows.join("\n");
      return W * H;
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      renderFrame(0);
      const iv = setInterval(() => renderFrame(0), 400);
      return () => { clearInterval(iv); ro.disconnect(); };
    }

    let raf, last = 0, cells = 1000;
    const start = performance.now();
    const loop = (now) => {
      const p = pRef.current;
      if (p.paused) {
        if (staticDone !== p) {
          cells = renderFrame(0);
          staticDone = p;
        }
      } else {
        staticDone = null;
        const interval = Math.max(42, cells / 130);
        if (now - last > interval) {
          cells = renderFrame((now - start) / 1000);
          last = now;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <pre ref={preRef} className="kaleido" style={{ fontSize: params.scale }} />;
}
