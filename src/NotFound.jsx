import { NOT_FOUND, ART } from "./config";
import Kaleido from "./Kaleido";

const params = {
  variant: "orbit",
  symmetry: 8,
  speed: 1.1,
  scale: 13,
  density: -0.05,
  seed: 0.61,
  colors: ART.palettes[0].colors,
  fill: true,
};

export default function NotFound({ navigate }) {
  return (
    <main className="nf" data-art-host>
      <div className="nf-art" aria-hidden="true">
        <Kaleido params={params} />
      </div>
      <h1>{NOT_FOUND.code}</h1>
      <p className="mono">{NOT_FOUND.line}</p>
      <button className="act mono" onClick={() => navigate("home")}>{NOT_FOUND.cta}</button>
    </main>
  );
}
