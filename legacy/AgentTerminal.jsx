import { useState, useRef, useEffect } from "react";
import { AGENT_BANNER, PROJECTS } from "./config";

const PROJECT_KEYS = ["project", "projects", "work", "作品", "项目", "做过"];

export default function AgentTerminal({ onLaunch }) {
  const [lines, setLines] = useState([
    { type: "cmd", text: "$ whoami" },
    { type: "out", text: "Dan He — Founding Designer @ Virtue AI. Try: projects? how do you work? contact?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const submit = async (e) => {
    if (e.key !== "Enter" || !input.trim() || loading) return;
    const q = input.trim();
    setInput("");
    setLoading(true);

    const ql = q.toLowerCase();
    if (onLaunch && PROJECT_KEYS.some((k) => ql.includes(k))) {
      setTimeout(() => onLaunch("preview", PROJECTS[0].id), 600);
    }

    const nextHistory = [...history, { role: "user", content: q }];
    setHistory(nextHistory);
    setLines((p) => [...p, { type: "cmd", text: "› " + q }, { type: "tool", text: "⏺ thinking…" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextHistory }),
      });
      const data = await res.json();
      const reply = data.reply || "Something went wrong.";
      setHistory((h) => [...h, { role: "assistant", content: reply }]);
      setLines((p) => {
        const n = [...p];
        n[n.length - 1] = { type: "tool", text: "⏺ done ✓" };
        return [...n, { type: "out", text: reply }];
      });
    } catch {
      setLines((p) => {
        const n = [...p];
        n[n.length - 1] = { type: "tool", text: "⏺ error ✗" };
        return [...n, { type: "out", text: "Network error — run: vercel dev" }];
      });
    } finally {
      setLoading(false);
    }
  };

  const C = { cmd: "#7fd17f", out: "#ccc", tool: "#888" };

  return (
    <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 13, height: "100%", display: "flex", flexDirection: "column" }}>
      <pre style={{ color: "#6c63ff", fontSize: 8, lineHeight: 1.1, margin: "0 0 8px" }}>{AGENT_BANNER}</pre>
      <div ref={scrollRef} style={{ flex: 1, overflow: "auto" }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: C[l.type], marginTop: l.type === "cmd" ? 8 : 4 }}>{l.text}</div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
        <span style={{ color: loading ? "#888" : "#7fd17f" }}>›</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={submit}
          disabled={loading}
          placeholder={loading ? "thinking…" : "输入问题,回车…"}
          style={{ flex: 1, background: "transparent", border: "none", color: "#e0e0e0", fontFamily: "inherit", fontSize: 13, outline: "none", opacity: loading ? 0.5 : 1 }}
        />
      </div>
    </div>
  );
}
