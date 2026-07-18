export const PROFILE = {
  name: "Dan He",
  handle: "@danhe.design",
  role: "Founding Designer",
  company: "Virtue AI",
  location: "San Francisco Bay Area",
  tagline: "Founding designer. AI-native. Ships code.",
  headline: "Founding Designer at Virtue AI — AI-native product, 0→1.",
  email: "dhe052@hotmail.com",
};

export const KALEIDO = {
  width: 48,
  height: 20,
  symmetry: 6,
  speed: 2.0,
  runMs: 3500,
  ramp: " .:-=+*o#%@",
  colorByDensity: {
    base: "#4a4643",
    mid: "#8a817a",
    high: "#C8432A",
    peak: "#e86a4f",
  },
};

export const AGENT_QA = [
  { keys: ["项目", "做过", "project", "work", "作品"],
    answer: "Two case studies: PolicyGuard (0→1 AI compliance) and Red Teaming (interface refactor). Opening Preview…" },
  { keys: ["工作", "怎么", "how", "process"],
    answer: "Founding designer at Virtue AI. I own brand, product, web, and marketing — and I work in the codebase with engineers to close the gap between design and what ships." },
  { keys: ["联系", "邮件", "contact", "email"],
    answer: "Email dhe052@hotmail.com, or open the LinkedIn app in the Dock." },
  { keys: ["谁", "你是", "about", "who"],
    answer: "I'm " + PROFILE.name + " — Founding Designer at Virtue AI, based in the SF Bay Area." },
];

export const AGENT_FALLBACK = "Ask me about my projects, how I work, or how to get in touch.";

export const AGENT_BANNER =
`  ___ _  __ _ _   _ ___
 / __| |/ _\` | | | |   \\
| (__| | (_| | |_| | |) |
 \\___|_|\\__,_|\\___/|___/  code`;

export const LINKS = [
  { label: "LinkedIn", url: "#" },
  { label: "Email", url: "mailto:dhe052@hotmail.com" },
  { label: "GitHub", url: "#" },
];

export const PROJECTS = [
  {
    id: "policyguard",
    title: "PolicyGuard",
    subtitle: "0→1 AI compliance product",
    tags: ["0→1", "AI safety", "B2B"],
    cover: "#C8432A",
    result: "[One-line win — e.g. Mapped the deployment loop and put Compliance Audit on the roadmap]",
    images: [
      { id: "benchmark", label: "Benchmark", src: "", color: "#C8432A" },
      { id: "workflow", label: "Workflow", src: "", color: "#3a6ab0" },
      { id: "dashboard", label: "Dashboard", src: "", color: "#5a7a3a" },
    ],
    sections: [
      {
        id: "context",
        label: "01  Context",
        headline: "First designer on a 0→1 AI safety product.",
        body: "[Dan fills: what stage Virtue AI was at, what PolicyGuard needed to do, and who it was for.]",
      },
      {
        id: "gap",
        label: "02  The Gap",
        headline: "The deployment cycle wasn't closed.",
        body: "Red Teaming and Guardrail covered testing and runtime enforcement — but nothing audited compliance after deployment. I mapped the full deployment loop and identified Compliance Audit as the missing piece. It's now on the roadmap.",
      },
      {
        id: "fix",
        label: "03  The Fix",
        headline: "A workflow engineers could reason about.",
        body: "The MLE/PM shared a rough workflow spec: no signal of the current selection, no status constraints between steps. [Dan fills: how I restructured the flow — selection states, step gating — and why it built trust.]",
      },
      {
        id: "shipped",
        label: "04  What Shipped",
        headline: "[Dan fills: what went to production]",
        body: "[Dan fills: screenshots, the flows and components that shipped, the scope you owned.]",
      },
      {
        id: "outcome",
        label: "05  Outcome",
        headline: "[Dan fills: the impact]",
        body: "[Dan fills: metrics, adoption, what changed for the team or customers.]",
      },
    ],
  },
  {
    id: "redteaming",
    title: "Red Teaming",
    subtitle: "Interface refactor for AI security research",
    tags: ["Refactor", "AI safety", "Systems"],
    cover: "#111111",
    result: "[One-line win]",
    images: [
      { id: "before", label: "Before", src: "", color: "#8a8a8a" },
      { id: "after", label: "After", src: "", color: "#111111" },
      { id: "system", label: "System", src: "", color: "#6c63ff" },
    ],
    sections: [
      {
        id: "context",
        label: "01  Context",
        headline: "An engineer-built tool with no design system.",
        body: "[Dan fills: what the tool was, who used it, and what state it was in when you picked it up.]",
      },
      {
        id: "gap",
        label: "02  The Gap",
        headline: "[Dan fills: what you saw]",
        body: "[Dan fills: what prompted the refactor — where researchers were losing time or trust.]",
      },
      {
        id: "fix",
        label: "03  The Fix",
        headline: "[Dan fills: the key decision]",
        body: "[Dan fills: what you redesigned — IA, interaction patterns, visual system — and the one call you'd defend.]",
      },
      {
        id: "shipped",
        label: "04  What Shipped",
        headline: "[Dan fills]",
        body: "[Dan fills: what went to production and the scope you owned.]",
      },
      {
        id: "outcome",
        label: "05  Outcome",
        headline: "[Dan fills]",
        body: "[Dan fills: impact and what changed.]",
      },
    ],
  },
];

export const EXPERIENCE = [
  {
    company: "Virtue AI",
    role: "Founding Designer",
    period: "Apr 2025 — Present",
    description: "Sole designer. Own brand, product, web, and marketing. Shipped PolicyGuard (0→1) and refactored the Red Teaming interface.",
  },
  {
    company: "[Prior company]",
    role: "[Prior role]",
    period: "[Dates]",
    description: "[Dan fills, or delete this entry.]",
  },
];

export const SKILLS = [
  "AI Product Design",
  "0→1 Products",
  "Design Systems",
  "Enterprise UX",
  "Prototyping in Code",
  "Brand & Web",
];

export const ERAS = [
  { label: "Internet Era", year: "2000s", active: false },
  { label: "Mobile Era", year: "2010s", active: false },
  { label: "AI Era", year: "NOW", active: true },
];

export const LINKEDIN_POSTS = [
  { id: "p1", text: "[Dan fills: a post — a lesson from shipping PolicyGuard, or a take on AI-native design.]", likes: 0, reposts: 0, url: "#" },
  { id: "p2", text: "[Dan fills: another post.]", likes: 0, reposts: 0, url: "#" },
  { id: "p3", text: "[Dan fills: another post.]", likes: 0, reposts: 0, url: "#" },
];

export const GALLERY = [
  { id: "g1", title: "PolicyGuard", caption: "0→1 AI compliance product", coverColor: "#C8432A", caseStudyId: "policyguard" },
  { id: "g2", title: "Red Teaming", caption: "Interface refactor", coverColor: "#111111", caseStudyId: "redteaming" },
  { id: "g3", title: "Brand", caption: "[Dan fills: Virtue AI brand work]", coverColor: "#3a6ab0", caseStudyId: null },
  { id: "g4", title: "Website", caption: "[Dan fills: marketing site]", coverColor: "#5a7a3a", caseStudyId: null },
  { id: "g5", title: "Marketing", caption: "[Dan fills: launch / campaign]", coverColor: "#b0843a", caseStudyId: null },
  { id: "g6", title: "System", caption: "[Dan fills: design system]", coverColor: "#6c63ff", caseStudyId: null },
];

export const THEMES = {
  light: {
    label: "Light", dark: false,
    bg: "#F7F5F0", menuBg: "#FFFFFF", menuFg: "#111111", menuBorder: "#E8E5DE",
    menuSec: "#6b6b6b", dock: "#FFFFFF", dockBorder: "#E8E5DE", dockFg: "#111111",
    win: "#FFFFFF", body: "#FFFFFF", fg: "#111111", bar: "#F7F6F2", barFg: "#333333",
    radius: "12px", hint: "#9b9b9b", accent: "#C8432A",
    shadow: "0 8px 30px rgba(0,0,0,.10)", border: "0.5px solid #E8E5DE",
  },
  dark: {
    label: "Dark", dark: true,
    bg: "#111111", menuBg: "#1C1C1C", menuFg: "#F7F5F0", menuBorder: "#2a2a2a",
    menuSec: "#888888", dock: "#1C1C1C", dockBorder: "#2a2a2a", dockFg: "#F7F5F0",
    win: "#1C1C1C", body: "#161616", fg: "#F7F5F0", bar: "#242424", barFg: "#cccccc",
    radius: "12px", hint: "rgba(255,255,255,.4)", accent: "#C8432A",
    shadow: "0 10px 30px rgba(0,0,0,.5)", border: "0.5px solid #2a2a2a",
  },
};
