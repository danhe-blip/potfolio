const TIERS = [
  { name: "Domain", parts: "policy card · query table · session trace", note: "ours alone" },
  { name: "Composites", parts: "card · data table · form row", note: "assembled from primitives" },
  { name: "Primitives", parts: "button · input · dialog · tabs", note: "shadcn, restyled" },
  { name: "Foundations", parts: "color · type · spacing · radius tokens", note: "the contract" },
];

export default function SystemLayers() {
  return (
    <figure className="sldiagram">
      <div className="sl-rows">
        {TIERS.map((t, i) => (
          <div key={t.name} className={`sl-row ${i === 0 ? "top" : ""}`}>
            <span className="sl-name mono">{t.name}</span>
            <span className="sl-parts mono">{t.parts}</span>
            <span className="sl-note mono">{t.note}</span>
          </div>
        ))}
      </div>
      <figcaption className="mono">
        Four tiers. A part earns a slot by how often it recurs and how much engineering it keeps costing.
      </figcaption>
    </figure>
  );
}
