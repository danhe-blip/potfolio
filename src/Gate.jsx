import { useState } from "react";

export const GATE_KEY = "dh-gate-name";

export async function requestUnlock(work, name) {
  const res = await fetch("/api/unlock", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ work, name }),
  });
  if (res.ok) {
    const data = await res.json();
    return { ok: true, sections: data.sections, patch: data.patch ?? {} };
  }
  return { ok: false, status: res.status };
}

export default function Gate({ work, gate, onUnlock }) {
  const [name, setName] = useState("");
  const [state, setState] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    const value = name.trim();
    if (!value || state === "checking") return;
    setState("checking");
    try {
      const result = await requestUnlock(work, value);
      if (result.ok) {
        try {
          localStorage.setItem(GATE_KEY, value);
        } catch {}
        onUnlock(result);
        return;
      }
      setState(result.status === 403 ? "denied" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <section className="gate">
      <div className="label mono">{gate.label}</div>
      <h2>{gate.headline}</h2>
      <p>{gate.body}</p>
      <form className="gate-form" onSubmit={submit}>
        <input
          className="gate-input mono"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (state !== "idle") setState("idle");
          }}
          placeholder={gate.placeholder}
          aria-label={gate.placeholder}
          autoComplete="given-name"
          spellCheck="false"
          autoCapitalize="words"
        />
        <button className="gate-cta mono" type="submit" disabled={state === "checking"}>
          {state === "checking" ? gate.checking : gate.cta}
        </button>
      </form>
      <p className="gate-msg" role="status">
        {state === "denied" && <span className="bad">{gate.denied}</span>}
        {state === "error" && <span className="bad">{gate.error}</span>}
        {state !== "denied" && state !== "error" && (
          <>
            {gate.noteLead} <a href={`mailto:${gate.noteEmail}`}>{gate.noteEmail}</a> {gate.noteTail}
          </>
        )}
      </p>
    </section>
  );
}
