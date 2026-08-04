export const GATED = {
  policyguard: {
    patch: {
      context: { imgs: [
          { src: "/work/pg-dashboard-light.png", cap: "Dashboard, production scale" },
          { src: "/work/pg-dashboard-dark.png", cap: "Same dashboard, dark theme" },
        ] },
    },
    sections: [
      {
        id: "focus",
        label: "02 Focus",
        headline: "I bet the opportunity was who could use it, not what it could do.",
        body: "I could have kept hardening the API for the engineers who already loved it. I focused elsewhere. This was a genuinely powerful tool, but wielding it well meant thresholds, eval sets, and deployment cycles. The people accountable for what it enforces, the policy owners, couldn't touch it at all. If they could wield it directly, that reach is where the larger business value was, not another model feature. Widening who can hold a powerful tool beats deepening it for the few who already can.",
      },
      {
        id: "problem",
        label: "03 Problem & Opportunity",
        headline: "The person who owns the policy can't tune the model.",
        body: "Trust-and-safety leads at a bank think in rules and obligations. The ML team thinks in thresholds and eval sets. Our real buyers, healthcare and finance early in their ML maturity, needed our engineers to hand-hold every deployment. That friction wasn't a training gap. It was a product gap. The fix was not a better console for the ML team. It was opening the boundary, so the person accountable for the policy composes it, tests it, and judges the result beside the people who tune the model, not downstream of them. Whoever opened that boundary first would own the category.",
      },
      {
        id: "build",
        label: "04 The Build",
        headline: "Compose a guard, not configure a model.",
        body: "Both audiences needed one shared conceptual model: rules roll up into policy groups, policy groups into a guard. The policy owner assembles real enforcement by touching a single object, its complexity addressable but underneath. That's object-oriented UX. The objects and how they nest are the product, not a settings panel.\n\nThe layers are the point. The obvious shape, the one already on the market, is flat: one policy with rules inside it. Flat survives a demo and collapses in an enterprise, where compliance owns some rules, product teams own others, and both keep changing. Policy groups are the semantic layer between raw rules and the guard, for the same reason a design system separates primitive tokens from semantic ones: iterate underneath, and nothing built on top breaks.\n\nThe call that shaped it wasn't mine alone. My instinct was one clean screen: author now, test later. The product owner pushed back. In an AI-native tool, assembly you can't test is meaningless, because you can't judge a policy without running it. He was right. So authoring and evaluation became one loop, the editor beside a live playground. The busier interface I paid down with progressive disclosure: the playground stays disabled until the object exists, so a first-timer meets one path, not a wall.",
        diagram: "composition",
        imgs: [
          { src: "/work/pg-policy-groups.png", cap: "Policy groups: Governance and Customization" },
          { src: "/work/pg-new-policy-menu.png", cap: "Create from scratch, PDF, JSON, or by agent" },
          { src: "/work/pg-editor-playground.png", cap: "Editor and playground, side by side" },
          { src: "/work/pg-editor-playground-error.png", cap: "Validation states" },
        ],
      },
      {
        id: "outcome",
        label: "05 Outcome",
        headline: "The loop closed. Our engineers stepped out.",
        body: "Shipping in January was the start of the loop, not the end. A policy owner now runs the full lifecycle inside the product: compose a guard, evaluate it against real queries in Policy Lab, and review what an optimization run found. That review is the design move I care most about. The run returns a measured gain, but the decision is made on a diff of real examples, which inputs flip, what would change, before anything ships. A metric is something only the ML team can argue with. A diff of real examples is something a policy owner can read and argue with too, which is what puts them inside the review instead of downstream of it. Promote it, and monitoring traces enforcement across full multiturn agent sessions.\n\nAdoption exposed the real last mile. Enterprise customer teams rotate people, and every rotation restarted onboarding: docs existed, but new owners skipped them and asked us directly. I stopped treating it as a documentation problem and recorded interactive demos that walk a new owner through their first session, which is what finally made onboarding fast. In an enterprise product, the first hour is part of the product, not something a doc covers.",
        imgs: [
          { src: "/work/pg-policy-lab-step2.png", cap: "Evaluate a guard against real queries" },
          { src: "/work/pg-policy-lab-optimization-detail.png", cap: "Measured gain, with a diff to review and promote" },
          { src: "/work/pg-queries.png", cap: "Monitoring: flagged queries" },
          { src: "/work/pg-queries-session-trace.png", cap: "Multiturn agent session trace" },
        ],
      },
      {
        id: "contribution",
        label: "06 Contribution",
        headline: "What was mine: the abstraction, the component, the two-day loop.",
        body: "Founding design isn't touching every surface. It's setting the few things everything else inherits. Mine were the composition model the product is built on, the card component reused across policy groups, datasets, evaluations, and the query tables on the dashboard and monitoring views, and a way of working: prototyping in code alongside engineers, branching off the PO's branch and sharing two live links to pick a direction, which took Policy Lab from design to deployment in two days over three rounds.",
        imgs: [
          { src: "/work/pg-dashboard-query-table.png", cap: "The same query table component, reused on the dashboard" },
        ],
      },
      {
        id: "next",
        label: "07 Next",
        headline: "A system the next designer can extend without me.",
        body: "If I rebuilt PolicyGuard, one thing would move earlier: the first hour. Onboarding turned out to be product surface, and I treated it as a documentation problem until adoption proved otherwise. The rest of the test is whether the next hire can extend what I built without me in the room, using the same abstraction, the same components, the same rules. That is what the design-system work is about.",
        link: { to: "design-system", label: "Open the design system" },
      },
    ],
  },
};
