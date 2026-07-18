import { ART, SITE } from "./config";

export default function ArtPanel({ art, setArt, onClose }) {
  const set = (k, v) => setArt((a) => ({ ...a, [k]: v }));

  const shuffle = () => {
    const v = ART.variants[Math.floor(Math.random() * ART.variants.length)].id;
    const pals = ART.palettes.map((p) => p.id);
    setArt((a) => ({
      ...a,
      variant: v,
      symmetry: 2 + Math.floor(Math.random() * 10),
      speed: +(0.6 + Math.random() * 2.8).toFixed(1),
      density: Math.floor((Math.random() - 0.5) * 40),
      palette: pals[Math.floor(Math.random() * pals.length)],
      seed: Math.random(),
    }));
  };

  const copyTxt = () => {
    const pre = document.querySelector(".kaleido");
    if (pre) {
      const txt = `${pre.innerText}\n\n${SITE.artSignature} · ${window.location.origin}`;
      navigator.clipboard?.writeText(txt).catch(() => {});
    }
  };

  const slider = (label, k, min, max, step, fmt) => (
    <div className="deck-ctl">
      <span className="lbl">{label}</span>
      <input
        className="range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={art[k]}
        onChange={(e) => set(k, +e.target.value)}
      />
      <span className="val">{fmt ? fmt(art[k]) : art[k]}</span>
    </div>
  );

  return (
    <div className="deck mono" onClick={(e) => e.stopPropagation()}>
      <div className="deck-row deck-head">
        <span style={{ color: "var(--red)" }}>extension://generative-art</span>
        <span style={{ color: "var(--mut-2)" }}>v1.0 — control deck</span>
        <button className="deck-x" onClick={onClose} aria-label="Close">×</button>
      </div>

      <div className="deck-row">
        <span className="lbl">Pattern</span>
        {ART.variants.map((v) => (
          <button key={v.id} className={`chip ${art.variant === v.id ? "on" : ""}`} onClick={() => set("variant", v.id)}>
            {v.label}
          </button>
        ))}
        <button className="act" onClick={shuffle}>[ shuffle ⚂ ]</button>
        <button className="act" onClick={copyTxt}>[ copy .txt ]</button>
      </div>

      <div className="deck-row">
        {slider("Sym", "symmetry", 2, 12, 1)}
        {slider("Speed", "speed", 0.4, 4, 0.1, (v) => v.toFixed(1))}
        {slider("Text", "scale", 7, 22, 1, (v) => `${v}px`)}
        {slider("Dense", "density", -30, 30, 5, (v) => (v > 0 ? `+${v}` : v))}
      </div>

      <div className="deck-row">
        <span className="lbl">Color</span>
        {ART.palettes.map((p) => (
          <button
            key={p.id}
            title={p.label}
            className={`swatch ${art.palette === p.id ? "on" : ""}`}
            style={{
              background: p.spectrum
                ? "linear-gradient(90deg,#7a5fff,#4fae5f,#e8c84f,#C8432A)"
                : `linear-gradient(135deg,${p.colors.high} 50%,${p.colors.peak} 50%)`,
            }}
            onClick={() => set("palette", p.id)}
          />
        ))}
        <input
          type="color"
          className={`swatch swatch--input ${art.palette === "custom" ? "on" : ""}`}
          title="Custom color"
          value={art.customColor}
          onChange={(e) => setArt((a) => ({ ...a, customColor: e.target.value, palette: "custom" }))}
        />
        <button
          className={`chip ${art.palette === "custom" && art.customMode === "mono" ? "on" : ""}`}
          onClick={() => setArt((a) => ({ ...a, customMode: "mono", palette: "custom" }))}
        >
          Mono
        </button>
        <button
          className={`chip ${art.palette === "custom" && art.customMode === "multi" ? "on" : ""}`}
          onClick={() => setArt((a) => ({ ...a, customMode: "multi", palette: "custom" }))}
        >
          Multi
        </button>
      </div>
    </div>
  );
}
