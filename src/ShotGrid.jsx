import { useEffect, useRef, useState } from "react";

export default function ShotGrid({ imgs, label }) {
  const gridRef = useRef(null);
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (open < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(-1);
      else if (e.key === "ArrowRight") setOpen((i) => (i + 1) % imgs.length);
      else if (e.key === "ArrowLeft") setOpen((i) => (i - 1 + imgs.length) % imgs.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, imgs.length]);

  const pad = (n) => String(n).padStart(2, "0");
  const step = (d) => setOpen((i) => (i + d + imgs.length) % imgs.length);

  return (
    <div className={`shots ${shown ? "in" : ""}`}>
      <div className="shots-head mono">
        <span>Screens</span>
        <span className="shots-count">{pad(imgs.length)} total</span>
      </div>

      <div className="shots-grid" ref={gridRef}>
        {imgs.map((im, i) => (
          <button
            key={im.src}
            className="plate"
            style={{ "--i": i }}
            onClick={() => setOpen(i)}
            aria-label={`Open screen ${i + 1} of ${imgs.length}${im.cap ? `: ${im.cap}` : ""}`}
          >
            <img src={im.src} alt={im.alt || im.cap || label} loading="lazy" draggable="false" />
            <span className="plate-meta mono">
              <span className="plate-num">{pad(i + 1)}</span>
              {im.cap && <span className="plate-cap">{im.cap}</span>}
              <span className="plate-zoom">↗</span>
            </span>
          </button>
        ))}
      </div>

      {open >= 0 && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpen(-1)}>
          <div className="lightbox-bar mono" onClick={(e) => e.stopPropagation()}>
            <span>
              {pad(open + 1)} / {pad(imgs.length)}
            </span>
            <button className="lightbox-x" aria-label="Close" onClick={() => setOpen(-1)}>
              [ esc ]
            </button>
          </div>

          <button
            className="lightbox-nav prev"
            aria-label="Previous screen"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            ←
          </button>

          <figure className="lightbox-fig" onClick={(e) => e.stopPropagation()}>
            <img src={imgs[open].src} alt={imgs[open].alt || imgs[open].cap || label} />
            {imgs[open].cap && <figcaption className="mono">{imgs[open].cap}</figcaption>}
          </figure>

          <button
            className="lightbox-nav next"
            aria-label="Next screen"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
