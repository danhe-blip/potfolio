import { PROFILE, EXPERIENCE, LINKEDIN_POSTS, SKILLS, ERAS, LINKS } from "./config";

export default function LinkedInApp({ theme }) {
  const profileUrl = (LINKS.find((l) => l.label === "LinkedIn") || {}).url || "#";
  const border = `0.5px solid ${theme.menuBorder}`;
  const card = { border, borderRadius: 10, padding: 12, background: theme.dark ? "rgba(255,255,255,.03)" : "#fff" };
  const sectionTitle = { fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: theme.menuSec, fontWeight: 700, margin: "20px 0 10px" };

  return (
    <div style={{ height: "100%", overflowY: "auto", background: theme.body, color: theme.fg }}>
      <div style={{ height: 68, background: `linear-gradient(120deg, ${theme.accent}, ${theme.dark ? "#7a2418" : "#e07a5f"})` }} />
      <div style={{ padding: "0 16px 20px" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", marginTop: -32, background: theme.body, border: `3px solid ${theme.body}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: theme.shadow }}>
          <div style={{ width: 58, height: 58, borderRadius: "50%", background: theme.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700 }}>DH</div>
        </div>

        <div style={{ fontSize: 19, fontWeight: 700, marginTop: 8 }}>{PROFILE.name}</div>
        <div style={{ fontSize: 13, marginTop: 2 }}>{PROFILE.headline}</div>
        <div style={{ fontSize: 12, opacity: 0.6, marginTop: 3 }}>{PROFILE.location}</div>
        <a href={profileUrl} target="_blank" rel="noreferrer"
          style={{ display: "inline-block", marginTop: 10, fontSize: 12.5, fontWeight: 600, color: theme.accent, textDecoration: "none", border: `1px solid ${theme.accent}`, borderRadius: 20, padding: "5px 14px" }}>
          View full profile →
        </a>

        <div style={sectionTitle}>Activity</div>
        {LINKEDIN_POSTS.map((post) => (
          <div key={post.id} style={{ ...card, marginBottom: 8 }}>
            <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>{post.text}</div>
            <div style={{ display: "flex", gap: 14, marginTop: 8, fontSize: 11, opacity: 0.6 }}>
              <span>♡ {post.likes}</span>
              <span>🔁 {post.reposts}</span>
              <a href={post.url} target="_blank" rel="noreferrer" style={{ marginLeft: "auto", color: theme.accent, textDecoration: "none", fontWeight: 600 }}>See post →</a>
            </div>
          </div>
        ))}

        <div style={sectionTitle}>Experience</div>
        {EXPERIENCE.map((job, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: theme.accent, marginTop: 5, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>{job.role}</div>
              <div style={{ fontSize: 12.5 }}>{job.company}</div>
              <div style={{ fontSize: 11, opacity: 0.55, margin: "1px 0 4px" }}>{job.period}</div>
              <div style={{ fontSize: 12, lineHeight: 1.5, opacity: 0.8 }}>{job.description}</div>
            </div>
          </div>
        ))}

        <div style={sectionTitle}>Skills</div>
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {ERAS.map((era) => (
            <div key={era.label} style={{
              flex: 1, textAlign: "center", padding: "10px 4px", borderRadius: 8,
              border: `1px solid ${era.active ? theme.accent : theme.menuBorder}`,
              background: era.active ? (theme.dark ? "rgba(200,67,42,.14)" : "rgba(200,67,42,.06)") : "transparent",
              opacity: era.active ? 1 : 0.5,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: era.active ? theme.accent : theme.fg }}>{era.label}</div>
              <div style={{ fontSize: 9.5, fontFamily: "ui-monospace, Menlo, monospace", marginTop: 3, opacity: 0.8 }}>{era.year}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {SKILLS.map((s) => (
            <span key={s} style={{ fontSize: 11.5, padding: "4px 10px", borderRadius: 20, background: theme.dark ? "rgba(255,255,255,.06)" : "#f0efe9" }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
