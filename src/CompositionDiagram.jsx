const OPTIONS = [
  { mark: "✕", label: "harden the API further", note: "deepens it for the few" },
  { mark: "✕", label: "a step-by-step wizard", note: "hides the real object" },
  { mark: "✓", label: "compose one object", note: "widens who can hold it", yes: true },
];

export default function CompositionDiagram() {
  return (
    <figure className="cdiagram">
      <div className="cd-grid">
        <div className="cd-col">
          <div className="cd-h mono">Weighed</div>
          <div className="cd-models">
            <div className="cd-model">
              <b>Trust &amp; Safety</b>
              <span className="mono">rules · obligations</span>
            </div>
            <div className="cd-model">
              <b>ML engineering</b>
              <span className="mono">thresholds · eval sets</span>
            </div>
          </div>
          <ul className="cd-opts">
            {OPTIONS.map((o) => (
              <li key={o.label} className={o.yes ? "yes" : "no"}>
                <i aria-hidden="true">{o.mark}</i>
                <span>{o.label}</span>
                <em>{o.note}</em>
              </li>
            ))}
          </ul>
        </div>

        <div className="cd-arrow mono" aria-hidden="true">→</div>

        <div className="cd-col">
          <div className="cd-h mono">The model</div>
          <div className="cd-tree">
            <div className="cd-rank cd-rules mono">
              <span>rule</span><span>rule</span><span>rule</span><span>rule</span>
            </div>
            <div className="cd-down mono" aria-hidden="true">↓</div>
            <div className="cd-rank">
              <span className="cd-box mono">policy group</span>
              <span className="cd-box mono">policy group</span>
            </div>
            <div className="cd-down mono" aria-hidden="true">↓</div>
            <div className="cd-rank">
              <span className="cd-box cd-guard mono">GUARD</span>
            </div>
            <div className="cd-note mono">one object the policy owner touches</div>
          </div>
        </div>
      </div>
      <figcaption className="mono">
        Composition model shaped with the product owner: rules roll up into policy groups, policy groups into a guard.
      </figcaption>
    </figure>
  );
}
