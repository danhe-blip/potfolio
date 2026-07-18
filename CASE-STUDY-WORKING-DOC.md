# Case Study Working Doc

Handoff notes for editing the portfolio case studies. Read this before touching `src/config.js`. It captures the storytelling framework, the style rules, current state, and the open work. Self-contained: a fresh session can continue from here.

## Which repo is this

This repo (`~/Downloads/desktop-portfolio`, Vite + React, runs on `localhost:5173` with hash routing) is the live portfolio ("The Index"). The other folder `~/Documents/Portfolio` (Next.js) is an older build. Do not cross-edit. All case-study content lives in `src/config.js` (WORKS array). Components hold logic only.

## Audience and goal

Targeting together.ai-type AI startups (technically sophisticated, design-forward), NOT enterprise-B2B hiring managers. Goal: present as a **senior** designer, not a scrappy generalist. Seniority = depth of judgment, not breadth of tasks.

## Storytelling framework (agreed)

Case studies follow Khalil Cader's skeleton, adapted:

1. **Context** — set the stage
2. **Focus** — the narrowing / what I chose to bet on (and implicitly what I cut)
3. **Problem & Opportunity** — the gap + why it was the opening
4. **The Build** — the craft, with the key decision and the tension in it
5. **Outcome** — product-level impact
6. **Contribution** — what was specifically mine (separated from Outcome on purpose)
7. **Next** — forward-looking, links to related work

Rules that make it read senior:

- **Every section headline is a claim, not a label.** Not "Context" but "The most profitable product was an API only ML engineers could use."
- **Show a trade-off as a 3-beat arc, not a clean win:** (1) my principle, (2) the domain broke it and I updated, (3) I paid down the cost on purpose. Missing beat 3 reads as compromise; including it reads as managed judgment.
- **Split Outcome from Contribution.** "The team shipped X" vs "what was mine was the abstraction, the component, the way of working."
- **Translate breadth into judgment.** Each thing owned must hang off a decision only she would make, or it reads junior.
- **Attach one transferable principle per section.** Test: state it without naming the product. If it still holds, it is a principle; if not, it is still a description. Bar: specific, non-obvious, transferable. Avoid platitudes ("keep it simple") which read junior.
- **Show, don't claim.** Prefer evidence a screenshot can prove ("the same card on 5 surfaces") over adjectives.
- **De-risk claims.** No customer names in published copy (NDA); say them verbally. Flag gaps honestly.
- **Restraint.** Curate images; do not dump everything.

## Hard style rules

- **No em dash (—) or en dash (–).** They read as AI polish. Use periods, commas, colons. (Arrows like `0→1` and `→` in links are fine, they are symbols.)
- Never invent content for `[Dan fills: ...]` placeholders. Ask her, or leave them.
- Content scope: Virtue AI work only. Do not invent projects from other companies.
- Locked color system (ink #111111 / paper #F7F5F0 / red #C8432A). Never change without being asked.
- Captions short, no dashes.
- No comments in code.

## config.js schema notes (for images / links)

Each `WORKS[i].sections[j]` supports:

- `id`, `label` (e.g. "04 The Build"), `headline` (a claim), `body` (plain string, `\n` renders as line break via `white-space: pre-line`)
- `fig`: string placeholder, renders as a dashed box with the text (use when no real image yet)
- `img`: single image path, renders inside a `.fig` box (16:9 crop)
- `imgs`: array of `{ src, cap }`, renders each as `.fig.shot` (no crop, height auto, optional mono caption). Preferred for real screenshots.
- `link`: `{ to: "<work-id>", label: "..." }`, renders a red mono shortcut button that navigates to another case (e.g. PolicyGuard Next links to design-system).
- `diagram`: string key for a custom diagram component. Currently `"composition"` renders `CompositionDiagram.jsx` (rule → policy group → guard), styled by `.cdiagram` in index.css. Add new diagrams as their own component and branch in WorkPage.

Images live in `public/work/`, referenced as `/work/<name>.png`. Original screenshots are kept in `Screenshot/` (not served).

## PolicyGuard — DONE

7-beat structure written (Context / Focus / Problem & Opportunity / The Build / Outcome / Contribution / Next). Key content:

- **Bet:** "Compose a guard, not configure a model." The reframe: the most profitable product was an API only ML engineers could use; the real buyers (healthcare, finance, no ML team) needed non-engineers to compose enforcement. Widening who can wield a powerful tool drives more business value than deepening it for the few.
- **The tension (in The Build):** her instinct was one-screen-one-job (compose, test later); the PO argued that in an AI-native tool, authoring and evaluation are one loop, not two steps, because a policy's quality is unknowable until run on real input. She agreed, accepted a busier interface, and paid it down with progressive disclosure (playground disabled until the object exists).
- **Contribution:** the composition model (rule → policy group → guard, "touch the guard, not the policy"); the card component reused across policy groups, datasets, evaluations, and the dashboard/monitoring query tables; prototyping in code (branch off PO's branch, two live links, design to deployment in 2 days / 3 rounds).
- **Facts:** launched Jan 2026, flagship, most profitable line. Enterprise customers (verbal only, NDA): ServiceNow, T-Mobile, AllianceBernstein, Intel, Samsung. Validated via internal testing + customer PMs.
- **Images wired (15):** dashboard light+dark (Context); old TextGuard config as the "before" (Problem); policy groups, new-policy menu, editor+playground, validation states (The Build); Policy Lab step1/step2, optimization history, optimization diff, queries, session trace x2 (Outcome); dashboard query table (Contribution).
- **Open polish:** Outcome has 7 images, possibly trim. Strongest to keep: optimization diff (measured F1 gain + diff-to-promote) and multiturn session trace.

## PolicyGuard — full copy (archive)

Verbatim snapshot of the shipped copy in `src/config.js`. Restore from here if an edit goes wrong.

**tagline:** The guardrail, rebuilt for the people who own the policy

**sub:** Virtue's most profitable product was an API only ML engineers could use. I reframed it into a product a policy owner at a bank or hospital composes, tests, and ships on their own.

**tags:** `0→1` · `AI safety` · `Enterprise` · `2026`

**result:** Reframed Virtue's most profitable API into a product non-engineers ship on their own. Live as the flagship since Jan 2026.

---

**01 Context — "The most profitable product was an API only ML engineers could use."**

When I joined, Virtue was a handful of people, one product owner per product, two products: Guard and red teaming. Guard shipped as an API you tested against, and it quietly became our most profitable line. The demand was there. The form wasn't. A profitable product proves demand, not that it's in the right shape.

*Images:* pg-dashboard-light ("Dashboard, production scale"), pg-dashboard-dark ("Same dashboard, dark theme")

---

**02 Focus — "I bet the opportunity was who could use it, not what it could do."**

I could have kept hardening the API for the engineers who already loved it. I focused elsewhere. This was a genuinely powerful tool, and its power was trapped behind ML expertise. If a PM, a compliance lead, or a stakeholder on any team could wield it, each of them could create impact with it, and that reach is where the larger business value was, not another model feature. Widening who can hold a powerful tool beats deepening it for the few who already can.

*No image. This beat is the argument.*

---

**03 Problem & Opportunity — "The person who owns the policy can't tune the model."**

Trust-and-safety leads at a bank think in rules and obligations. The ML team thinks in thresholds and eval sets. Our real buyers, healthcare and finance moving into AI with no ML team, needed our engineers to hand-hold every deployment. That friction wasn't a training gap. It was a product gap. Whoever let a non-engineer compose enforcement first would own the category.

*Images:* pg-old-config ("The before: checkboxes, a threshold slider, and a raw API call")

---

**04 The Build — "Compose a guard, not configure a model."**

I designed a composition model. Rules roll up into policy groups, policy groups into a guard, so a non-engineer assembles real enforcement by touching one object, with the model complexity addressable but underneath. Touch the guard, not the policy. Then came the disagreement that shaped the product. My instinct was one screen, one job: define a policy, keep the task clean, test it later. The product owner pushed back. In an AI-native tool, assembly you can't test is meaningless, because you can't know a policy is any good until you run it on real input. He was right. Here, authoring and evaluation are one loop, not two steps. So I paired the editor with a live playground and let people test the moment they write. The cost was a busier interface, and I paid it down on purpose. The playground stays disabled until the object exists, so a first-timer meets one clear path instead of a wall. When the domain forces complexity, you spend the craft on sequencing it, not on pretending it away.

*Diagram:* `diagram: "composition"` renders `CompositionDiagram.jsx` (rule → policy group → guard), styled via `.cdiagram` in index.css.

*Images:* pg-policy-groups ("Policy groups: Governance and Customization"), pg-new-policy-menu ("Create from scratch, PDF, JSON, or by agent"), pg-editor-playground ("Editor and playground, side by side"), pg-editor-playground-error ("Validation states")

---

**05 Outcome — "Virtue's flagship, in enterprise hands."**

PolicyGuard shipped January 2026 and is now the flagship, in continuous iteration since. It's used by enterprise customers across financial services, healthcare, and tech, and reaches from single-prompt checks to full multiturn agent sessions. It reset who a guardrail product is for.

*Images:* pg-policy-lab-step1 ("Policy Lab: pick a dataset"), pg-policy-lab-step2 ("Evaluate a guard against real queries"), pg-policy-lab-optimization-history ("Optimization runs"), pg-policy-lab-optimization-detail ("Measured gain, with a diff to review and promote"), pg-queries ("Monitoring: flagged queries"), pg-queries-session-trace ("Multiturn agent session trace"), pg-queries-session-trace-2 ("Per-turn flags")

---

**06 Contribution — "What was mine: the abstraction, the component, the two-day loop."**

Founding design isn't touching every surface. It's setting the few things everything else inherits. Mine were the composition model the product is built on, the card component reused across policy groups, datasets, evaluations, and the query tables on the dashboard and monitoring views, and a way of working: prototyping in code alongside engineers, branching off the PO's branch and sharing two live links to pick a direction, which took Policy Lab from design to deployment in two days over three rounds.

*Images:* pg-dashboard-query-table ("The same query table component, reused on the dashboard")

---

**07 Next — "A system the next designer can extend without me."**

The real test of what I built is whether the next hire can extend it without me in the room, using the same abstraction, the same components, the same rules. That is what the design-system work is about.

*Link:* `{ to: "design-system", label: "Open the design system" }`

## Screenshot inventory + naming

Naming convention: `pg-<feature>-<detail>`. Files in `public/work/`:
`pg-dashboard-light`, `pg-dashboard-dark`, `pg-dashboard-query-table`, `pg-old-config`, `pg-policy-groups`, `pg-new-policy-menu`, `pg-editor-playground`, `pg-editor-playground-error`, `pg-policy-lab-step1`, `pg-policy-lab-step2`, `pg-policy-lab-optimization-history`, `pg-policy-lab-optimization-detail`, `pg-queries`, `pg-queries-session-trace`, `pg-queries-session-trace-2`.

## Design System — research findings (Jul 2026)

What the target market actually asks for, researched before writing the case. Primary source: Together AI's live Lead Product Designer JD (SF, $200-240k, 7+ yrs).

**Verbatim JD requirements to echo:**
- "Demonstrated experience building, scaling, or significantly contributing to a **production** design system, including **component architecture** and **cross-product consistency**"
- "**Own and improve shared components** within the design system **in collaboration with Engineering**"
- "Ensure strong **implementation quality** by partnering closely with Engineering throughout delivery"
- "Develop **scalable design practices for team growth**" / "laying the foundation for our growing design organization"

**Three research insights shaping the case:**
1. **Restraint is the senior signal for 0→1 DS.** Premature standardization is a documented startup failure mode ("locks you into patterns you'll later abandon"). The trade-off beat should be: I systematized only where drift was costing us, and deliberately did not build the rest. Sizing judgment, not completeness.
2. **Code-first is the 2026 industry direction, so her workflow is the frontier, not a compensation.** Consensus: source of truth in the repo, Figma back-fills; token adoption 56%→84% in a year; W3C token format stable Oct 2025; AI tools standardize on React+Tailwind+shadcn; "Figma-first takes twice as long." Frame her AI-in-codebase workflow as the delivery mechanism of a code-first system.
3. **DS cases die as component spec dumps.** Frame around organizational impact ("what I made possible"), influence, and what she chose NOT to build. Hiring managers scan 6-8 seconds; result-first structure is correct.

**Spine mapping to JD language:** Focus beat = refusing to build a "complete" system (restraint) · Build beat = repo as source of truth + card component architecture + state matrix + semantic tokens · Outcome = cross-product consistency evidence · Contribution = practices a future team inherits.

Sources: Together AI Greenhouse JD (job-boards.greenhouse.io/togetherai/jobs/5062829007), zeroheight/W3C token adoption reporting, DesignSystems.one 2026 guidance, Fountain Institute / UXfolio hiring-manager research, statsig + kinde startup DS essays.

**CONFIRMED (from Dan, Jul 2026):** The system is code-first. `packages/shared-ui` in the Virtue frontend monorepo IS the design system. "Source of truth in the repo" is her strongest defensible judgment; build the Focus/Build beats around it.

## Design System — NEXT (spine + open questions)

This is the priority for the upcoming design-system interview. Recommended spine (all provable from PolicyGuard screenshots):

1. **Hero artifact: one card, many surfaces.** The card pattern reused across policy-group cards, dataset cards, test-target cards, optimization-run cards, and the query table on both the dashboard and the Queries page. Show the reuse map on one screen.
2. **Full state matrix.** empty (playground) → error (validation) → edited (diff) → flagged (PII) → locked (policy group badge). She designed states, not just components.
3. **Semantic theming.** light + dark at real data scale proves a token layer, not hardcoded color.
4. **Taxonomy as system.** Governance vs Customization; Semantic / PII / Regex types; consistent icons and bracket tags.
5. **Composition model** (rule → group → guard) as the top-level conceptual system.
6. **Design-to-code execution** as the through-line (a `packages/shared-ui` codebase exists; she works in it).

Gap to close: product screenshots prove the system is USED; a Figma token/component-library screenshot proves the system ITSELF. Ask her for it.

### Answers collected so far (do not invent beyond these)

**Q1 Origin (answered Jul 2026):** Before the system, everything was vibe-coded. Each product was built separately, and tight on-prem deadlines kept forcing quick builds, so different UI variations evolved across surfaces. The decision: while productizing PolicyGuard, build design system v1 out of PolicyGuard's own components. Then iterate it into v2 during the VirtueRed refactor. So: v1 extracted from the flagship, v2 hardened by the second product. (Framing note: this is the extract-don't-invent pattern, and the two-product arc is the cross-product consistency evidence the Together AI JD asks for.)

### Remaining open questions

Q3-original (which judgment to defend) is answered: code-first, `packages/shared-ui` is the system. Updated list:

1. Origin/trigger and rough timing. What forced the system into existence: drift between PolicyGuard and VirtueRed, engineers rebuilding variants, a specific "enough" moment (e.g. three implementations of one button)?
2. Layers inside `shared-ui`: tokens (color/type/spacing, light+dark), roughly how many shared components, any rules/docs (README, Storybook)? Does a Figma library exist, or is Figma sketch-only with code as the doc?
3. The code-first decision story: her push or organic? Was Figma-first-then-handoff considered and rejected, and why? Did anyone challenge it? (Tension material for The Build beat.)
4. Evidence of restraint: what she DELIBERATELY did not build (full docs? Figma variant library? marketing surfaces? components left unabstracted?) and why those were not worth it. (Focus beat hero, per research.)
5. Coverage: which surfaces run on shared-ui (PolicyGuard, VirtueRed, virtueai.com, other) and how fully.
6. Engineering collaboration mechanics: who writes shared-ui components, does she open PRs, who reviews her, process for changing a shared component, any "I changed a component and something broke elsewhere" incident and the lesson.
7. Outcome/inheritance signals: faster page builds (roughly how much), engineers reaching for shared components unprompted, visual convergence across the two products, where a second designer would start reading the system.
8. A "system itself" screenshot (product shots prove usage, not the system): shared-ui directory tree, token file code, Storybook, or a component's variant code. Which can she capture?

## Other cases — still `[Dan fills]`

`virtuered`, `branding`, `website` in config.js are untouched placeholders. Do them after design-system, same framework, same questions-first process.
