import { GATED } from "./_gated.js";

const norm = (s) => String(s ?? "").trim().toLowerCase();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const { name, work } = req.body ?? {};
  const payload = GATED[work];
  if (!payload) {
    return res.status(404).json({ error: "unknown_work" });
  }

  const allowed = (process.env.GATE_NAMES || "").split(",").map(norm).filter(Boolean);
  if (allowed.length === 0) {
    console.error("[api/unlock] GATE_NAMES is not set");
    return res.status(503).json({ error: "not_configured" });
  }

  const given = norm(name);
  if (!given || !allowed.includes(given)) {
    return res.status(403).json({ error: "denied" });
  }

  res.json({ sections: payload.sections, patch: payload.patch ?? {} });
}
