import type {
  ArchNode,
  ExperienceItem,
  NavItem,
  Project,
  ProjectId,
  CaseStudy,
  SocialLink,
  TechGroup,
  WorkflowStep,
} from "../types";

export const PROFILE = {
  name: "Innocent Akuh",
  role: "Full-Stack Software Developer",
  shortDescriptor: "Building reliable software products across the frontend and backend.",
  heroHeadlineA: "I build complete digital products,",
  heroHeadlineB: "from interface to backend.",
  heroSupport:
    "I design and build modern, reliable web applications across the frontend and backend -from intuitive React interfaces to secure APIs, business logic, databases and third-party integrations.",
  heroTech: ["React", "TypeScript", "Node.js", ".NET", "PostgreSQL", "MongoDB"],
  email: "innotexdev@gmail.com",
  location: "Nigeria · Open to remote",
  availability: "Open to full-time roles & product collaborations",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export const SOCIALS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/innotexak", handle: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/innotexak", handle: "linkedin" },
  { label: "Resume", href: `${import.meta.env.BASE_URL}resume.pdf`, handle: "resume" },
];

export const CAPABILITIES: TechGroup[] = [
  {
    title: "Frontend Engineering",
    description: "Interfaces people enjoy using -component-driven, accessible, fast.",
    accent: "#818cf8",
    items: [
      "React",
      "TypeScript",
      "Next.js",
      "JavaScript",
      "Tailwind CSS",
      "Responsive interfaces",
      "Component architecture",
      "State management",
      "API integration",
      "Form handling",
      "Accessibility",
      "Performance optimization",
    ],
  },
  {
    title: "Backend Engineering",
    description: "APIs and business logic that stay correct as products grow.",
    accent: "#22d3ee",
    items: [
      "Node.js",
      ".NET",
      "ASP.NET Core",
      "C#",
      "REST APIs",
      "GraphQL",
      "Authentication",
      "Authorization",
      "Business logic",
      "Background jobs",
      "Email services",
      "File management",
      "Payment integrations",
    ],
  },
  {
    title: "Database Engineering",
    description: "Data models that reflect the business -and queries that scale.",
    accent: "#a78bfa",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "Entity Framework Core",
      "Mongoose",
      "Database modeling",
      "Relationships",
      "Query optimization",
      "Data validation",
    ],
  },
  {
    title: "Security",
    description: "Identity, access control and auditability baked in from day one.",
    accent: "#34d399",
    items: [
      "JWT authentication",
      "HTTP-only cookies",
      "Role-based access control",
      "2FA / TOTP",
      "OTP verification",
      "Email verification",
      "Password reset",
      "Secure document sharing",
      "Audit logging",
      "Input validation",
    ],
  },
  {
    title: "Cloud / Infrastructure",
    description: "Shipping to production with repeatable, observable deploys.",
    accent: "#f472b6",
    items: [
      "AWS",
      "Amazon S3",
      "AWS Cognito",
      "AWS Lambda",
      "Docker",
      "Vercel",
      "Render",
      "GitHub Actions",
      "Redis / Valkey",
    ],
  },
];

export const ARCH_NODES: ArchNode[] = [
  {
    id: "user",
    layer: "User",
    detail: "Authenticated experience across roles and devices",
    tech: ["Browser", "Mobile web"],
    icon: "◉",
  },
  {
    id: "frontend",
    layer: "React / Next.js Frontend",
    detail: "Component architecture · forms · state · routing",
    tech: ["React", "TypeScript", "Next.js"],
    icon: "▣",
  },
  {
    id: "api",
    layer: "REST / GraphQL API",
    detail: "Versioned contracts · validation · error handling",
    tech: ["REST", "GraphQL Yoga"],
    icon: "⇄",
  },
  {
    id: "logic",
    layer: "Business Logic",
    detail: "Workflows · state machines · billing rules",
    tech: ["Node.js", ".NET"],
    icon: "⚙",
  },
  {
    id: "auth",
    layer: "Authentication / Authorization",
    detail: "JWT · sessions · RBAC · 2FA · audit logs",
    tech: ["JWT", "TOTP", "RBAC"],
    icon: "◈",
  },
  {
    id: "db",
    layer: "Database",
    detail: "Modeled relations · optimized queries",
    tech: ["PostgreSQL", "MongoDB"],
    icon: "▤",
  },
  {
    id: "ext",
    layer: "External Services",
    detail: "Payments · email · object storage · media · realtime",
    tech: ["Paystack", "SendGrid", "S3", "Cloudinary"],
    icon: "✦",
  },
  {
    id: "cloud",
    layer: "Cloud Infrastructure",
    detail: "Deploys · serverless · caching · CI/CD",
    tech: ["AWS", "Docker", "Redis"],
    icon: "⬡",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "VegaIT",
    role: "Software / Frontend Engineering",
    period: "Professional experience",
    location: "Engineering team · Enterprise software",
    summary:
      "Contributing within VegaIT's engineering environment on enterprise software -with a focus on frontend delivery, codebase health and close collaboration with backend services.",
    bullets: [
      "React and TypeScript development across enterprise web UI",
      "Feature implementation, bug fixing and component development",
      "Codebase maintenance across a large shared repository",
      "Git workflows, code review and team collaboration",
      "Integration with backend services and APIs",
      "Working around .NET 8, ASP.NET Core and Entity Framework Core services",
    ],
    stack: [
      "React",
      "TypeScript",
      ".NET 8",
      "ASP.NET Core",
      "Entity Framework Core",
      "PostgreSQL",
      "Valkey",
      "AWS Cognito",
      "AWS Lambda",
    ],
    repos: ["site_selection_fe", "usermanagment_fe"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "teiwill",
    index: "01",
    name: "TeiWill",
    category: "Full-Stack Product · Estate Management Platform",
    tagline: "Digital wills, beneficiaries, assets and estate workflows -end to end.",
    description:
      "A digital will and estate management platform designed to help individuals and professionals manage wills, beneficiaries, assets, documents and estate-related workflows digitally.",
    role: "Full-stack product development",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "REST",
      "SendGrid",
      "Paystack",
      "UploadThing",
      "Stream",
    ],
    capabilities: [
      "Will lifecycle & state transitions",
      "RBAC across 6 roles",
      "TOTP / 2FA + email verification",
      "Secure document sharing",
      "Billing & Paystack payments",
      "Audit logs & notifications",
    ],
    githubUrl: null,
    liveUrl: null,
    accent: "#6366f1",
    pattern: "estate",
  },
  {
    id: "teicraft",
    index: "02",
    name: "TeiCraft",
    category: "Full-Stack Marketplace",
    tagline: "A Nigerian artisan marketplace with localized commerce workflows.",
    description:
      "A Nigerian artisan marketplace designed to connect artisans and customers through a localized digital marketplace experience -Naira pricing, State/LGA structure and artisan storefronts.",
    role: "Full-stack development",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "GraphQL Yoga",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Paystack",
      "Cloudinary",
    ],
    capabilities: [
      "Marketplace architecture",
      "GraphQL API design",
      "MongoDB product modeling",
      "JWT authentication",
      "Paystack payments",
      "Cloudinary media + Naira localization",
    ],
    githubUrl: null,
    liveUrl: null,
    accent: "#22d3ee",
    pattern: "market",
  },
  {
    id: "pnuel",
    index: "03",
    name: "Pnuel",
    category: "Full-Stack Product · Real Estate Investment Platform",
    tagline: "Property crowdfunding -discover properties, participate in investments.",
    description:
      "A full-stack real estate investment platform supporting property crowdfunding -presenting property opportunities and participation flows through a modern Next.js experience backed by a GraphQL API.",
    role: "Full-stack development",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Apollo GraphQL",
      "GraphQL",
      "REST",
    ],
    capabilities: [
      "Property listings & investment flows",
      "Crowdfunding participation workflows",
      "Apollo GraphQL API integration",
      "Investor-facing web experience",
    ],
    githubUrl: null,
    liveUrl: null,
    accent: "#34d399",
    pattern: "realestate",
  },
  {
    id: "kycinsight",
    index: "04",
    name: "KYCInsight",
    category: "Backend-Driven Platform · Document Processing & Analytics",
    tagline: "Document processing with real-time analytics.",
    description:
      "A backend-driven system for document processing and real-time analytics -ingesting documents, running verification-oriented workflows, and surfacing operational insight for reviewers.",
    role: "Full-stack / backend development",
    stack: [
      "Node.js",
      "TypeScript",
      "GraphQL",
      "REST",
      "JWT",
      "Document processing",
    ],
    capabilities: [
      "Document ingestion & processing",
      "Verification workflows",
      "Real-time analytics views",
      "Secure API design",
    ],
    githubUrl: null,
    liveUrl: null,
    accent: "#f59e0b",
    pattern: "kyc",
  },
];

export const CASE_STUDIES: Record<ProjectId, CaseStudy> = {
  teiwill: {
    projectId: "teiwill",
    problem: {
      heading: "The problem",
      body: [
        "Estate planning is still largely paper-driven: wills live in filing cabinets, beneficiaries are tracked informally, and the chain of custody for sensitive documents is unclear.",
        "When something happens, families and professionals face the same questions -which will is current, who is entitled to what, who approved each step, and where the evidence is. TeiWill exists to replace that ambiguity with a structured, auditable digital workflow.",
      ],
    },
    solution: {
      heading: "The solution",
      body: [
        "TeiWill digitizes the full estate workflow: wills move through an explicit lifecycle (draft → submission → approval / rejection → signing → sealing → activation → execution, with revocation as a first-class path), while beneficiaries, assets, documents, lawyer assignment, death verification, check-ins and billing all live in one coherent system.",
      ],
      list: [
        "Explicit will lifecycle with guarded state transitions",
        "Lawyer assignment and review workflow",
        "Beneficiary, asset and document management",
        "Death verification and execution flow",
        "Billing, payments and scheduled check-ins",
      ],
    },
    role: {
      heading: "My role",
      body: [
        "Full-stack product development: I designed and implemented the system across frontend, server-side application architecture, database modeling, authentication, integrations and deployment considerations.",
      ],
    },
    frontend: {
      heading: "Frontend -React / Next.js / TypeScript",
      body: [
        "Role-aware application shell, will workspace, beneficiary and asset management views, document handling, approval queues for lawyers and admins, and billing screens -all typed end to end and integrated with the API layer.",
      ],
    },
    backend: {
      heading: "Backend -Node.js application & API architecture",
      body: [
        "REST/API architecture covering registration through execution: will CRUD, lifecycle transitions with authorization guards per role, notifications, audit logs, scheduled processes, payments webhooks and secure sharing links.",
      ],
    },
    database: {
      heading: "Database -PostgreSQL + Prisma",
      body: [
        "Relational model for users, roles, wills, beneficiaries, assets, documents, assignments, verifications, payments and audit events. Prisma schemas with relations, constraints and query patterns tuned for workflow reads.",
      ],
    },
    security: {
      heading: "Security",
      body: [
        "Registration, login, email verification, TOTP-based two-factor authentication, password reset and change flows, role-based authorization on every transition, secure document sharing and full audit trails.",
      ],
      list: [
        "SUPER_ADMIN · ADMIN · LAWYER · CLIENT · BENEFICIARY · EXECUTOR",
        "JWT sessions with HTTP-only cookies",
        "TOTP / 2FA, OTP and email verification",
        "Audit logging on sensitive actions",
      ],
    },
    integrations: {
      heading: "Integrations",
      body: ["Paystack for billing and payments, SendGrid for transactional email and OTP, UploadThing for document storage, Stream for communication features."],
    },
    challenges: [
      {
        title: "Guarded state machine",
        detail:
          "Every will transition (submit, approve, reject, sign, seal, activate, execute, revoke) is only valid from specific states and roles. The challenge was enforcing this in both API guards and UI so invalid actions are impossible, not just hidden.",
      },
      {
        title: "Role-based access at scale",
        detail:
          "Six roles with overlapping but distinct permissions across wills, documents, beneficiaries and billing. Solved with centralized authorization checks plus role-aware UI composition.",
      },
      {
        title: "Secure document sharing",
        detail:
          "Sensitive estate documents need time-boxed, permissioned sharing with auditability -balancing convenience for lawyers/executors against the risk of open links.",
      },
      {
        title: "Payments + notifications consistency",
        detail:
          "Billing events, payment webhooks, email notifications and audit logs must stay consistent even when external services retry or fail. Idempotent handlers and explicit event records were key.",
      },
      {
        title: "Relational depth",
        detail:
          "Wills connect to beneficiaries, assets, documents, assignments, verifications and payments. Modeling these relations without N+1 reads or orphaned records required careful Prisma schema design.",
      },
    ],
    outcome: {
      heading: "Outcome",
      body: [
        "TeiWill demonstrates the ability to carry a complex, regulated-feeling product from data model to deployed experience: secure APIs, layered business logic, relational database design, role-aware frontend applications and production integrations -the breadth of a real software product rather than a demo.",
      ],
    },
    roles: ["SUPER_ADMIN", "ADMIN", "LAWYER", "CLIENT", "BENEFICIARY", "EXECUTOR"],
  },
  teicraft: {
    projectId: "teicraft",
    problem: {
      heading: "The problem",
      body: [
        "Skilled Nigerian artisans often rely on word-of-mouth and social chats to find customers, while buyers struggle to discover reliable makers, compare work and pay with confidence.",
        "A generic marketplace template misses what matters locally: Naira pricing, State/LGA location structure, artisan storefronts and media-rich product presentation.",
      ],
    },
    solution: {
      heading: "The solution",
      body: [
        "TeiCraft is a localized artisan marketplace: artisans manage products and storefronts, customers browse by category and location, and orders flow through authentication, product workflows and Paystack payments.",
      ],
    },
    role: {
      heading: "My role",
      body: ["Full-stack development across the Next.js frontend, GraphQL API, MongoDB modeling, authentication, payments and media pipeline."],
    },
    frontend: {
      heading: "Frontend -Next.js / React / TypeScript",
      body: ["Marketplace browsing, artisan profiles, product management views, cart and checkout flows, auth screens and localized formatting for Naira and State/LGA selection."],
    },
    backend: {
      heading: "Backend -Node.js + GraphQL Yoga",
      body: ["GraphQL schema for users, products, categories, orders and reviews; resolvers with authentication guards; Paystack payment verification; SMTP/email notifications."],
    },
    database: {
      heading: "Database -MongoDB + Mongoose",
      body: ["Document models for products, artisans, customers and orders with indexes for marketplace queries, validation schemas and population patterns for storefront reads."],
    },
    security: {
      heading: "Security",
      body: ["JWT authentication, password hashing, route guards, input validation and ownership checks so artisans can only mutate their own listings."],
    },
    integrations: {
      heading: "Integrations",
      body: ["Paystack for Naira payments, Cloudinary for product imagery, SMTP/email services for transactional mail."],
    },
    challenges: [
      {
        title: "GraphQL marketplace modeling",
        detail: "Designing a schema flexible enough for varied artisan products while keeping queries efficient and the storefront fast.",
      },
      {
        title: "Nigerian localization",
        detail: "State/LGA hierarchy, Naira formatting and phone/address conventions had to feel native rather than bolted on.",
      },
      {
        title: "Media at scale",
        detail: "Artisan products are visual. Cloudinary transformations, upload flows and fallbacks keep listings rich without bloating page weight.",
      },
      {
        title: "Trust in payments",
        detail: "Payment verification, order state and email confirmation must agree -handling webhook retries and failed payments explicitly.",
      },
    ],
    outcome: {
      heading: "Outcome",
      body: [
        "TeiCraft shows marketplace architecture in practice: GraphQL API development, MongoDB modeling, authentication, payment integration, media management and localization for the Nigerian market.",
      ],
    },
  },
  pnuel: {
    projectId: "pnuel",
    problem: {
      heading: "The problem",
      body: [
        "Property investment is traditionally capital-intensive and opaque: opportunities circulate privately, terms are hard to compare, and tracking who participated in what -and on which terms -is left to spreadsheets and chat threads.",
        "Pnuel addresses this by presenting property opportunities and investment participation through one structured platform, so information is comparable and every participation is recorded.",
      ],
    },
    solution: {
      heading: "The solution",
      body: [
        "A full-stack investment platform: investors discover properties, review terms and participate online, while the system tracks listings, participations and transactions behind a GraphQL API.",
      ],
      list: [
        "Property listings with terms and media",
        "Investment participation workflows",
        "Investor accounts and activity records",
        "Transaction and participation tracking",
      ],
    },
    role: {
      heading: "My role",
      body: ["Full-stack development across the Next.js frontend and the Node.js / Apollo GraphQL backend -from listing and participation flows to API design and data modeling."],
    },
    frontend: {
      heading: "Frontend -Next.js / React / TypeScript",
      body: ["Property discovery and detail views, participation flows, investor account screens and auth -typed end to end and integrated with the GraphQL API layer."],
    },
    backend: {
      heading: "Backend -Node.js + Apollo GraphQL",
      body: ["GraphQL schema for properties, users, participations and transactions; resolvers with authentication guards; participation rules enforced server-side so funding totals stay consistent."],
    },
    database: {
      heading: "Database",
      body: ["Properties, listings, users, participations and transactions modeled with explicit relations and auditability, so every money-movement record traces back to a user, a property and a point in time."],
    },
    security: {
      heading: "Security",
      body: ["Authenticated sessions, ownership checks so investors only see and mutate their own records, input validation on every participation, and audit trails on investment events."],
    },
    integrations: {
      heading: "Integrations",
      body: ["Email notifications for account and investment events, and media storage for property imagery -all integrated behind the API surface."],
    },
    challenges: [
      {
        title: "Trust-critical money flows",
        detail: "Participation records must never drift from funding totals. All state changes go through guarded server-side transitions rather than trusting client input.",
      },
      {
        title: "Comparable listings",
        detail: "Properties arrive with varied details. Normalizing terms and media into a consistent listing shape keeps the investor experience fair and comparable.",
      },
      {
        title: "Media-rich performance",
        detail: "Property imagery sells the listing but bloats the page. Optimized image handling keeps discovery fast without sacrificing presentation.",
      },
      {
        title: "Access control",
        detail: "Investor data is sensitive by nature -strict ownership checks across listings, participations and account views.",
      },
    ],
    outcome: {
      heading: "Outcome",
      body: [
        "Pnuel demonstrates full-stack product delivery for a trust-sensitive domain: GraphQL API design, disciplined data modeling, guarded participation workflows and an investor-facing Next.js experience.",
      ],
    },
  },
  kycinsight: {
    projectId: "kycinsight",
    problem: {
      heading: "The problem",
      body: [
        "Reviewing identity and compliance documents manually is slow and error-prone: files arrive in different formats, review status lives in people's heads, and there is no live view of what has been processed, flagged or cleared.",
        "KYCInsight structures that work -documents are ingested, tracked through verification-oriented workflows, and reported on in real time.",
      ],
    },
    solution: {
      heading: "The solution",
      body: [
        "A backend-driven platform: documents are uploaded and processed through defined checks, each item carries an explicit verification status, and reviewers get real-time analytics over the whole pipeline.",
      ],
      list: [
        "Document ingestion and processing",
        "Verification checks with explicit statuses",
        "Reviewer queues and case views",
        "Real-time operational analytics",
      ],
    },
    role: {
      heading: "My role",
      body: ["Full-stack / backend development -API and processing-pipeline design on Node.js and GraphQL, plus the reviewer-facing views that consume them."],
    },
    frontend: {
      heading: "Frontend",
      body: ["Review queues, document case views with status history, and analytics views summarizing throughput, flags and clearances -all driven by the API."],
    },
    backend: {
      heading: "Backend -Node.js + GraphQL",
      body: ["Ingestion endpoints, check execution with explicit status transitions, and analytics resolvers aggregating pipeline activity for real-time reporting."],
    },
    database: {
      heading: "Database",
      body: ["Applicants, documents, checks and status events modeled so every verification decision is traceable -who submitted what, which checks ran, and what changed, in order."],
    },
    security: {
      heading: "Security",
      body: ["Identity documents are sensitive by definition: authenticated access, strict ownership and reviewer permissions, validation on upload, and audit logging on every status change."],
    },
    integrations: {
      heading: "Integrations",
      body: ["Secure document storage, status notifications for applicants and reviewers, and analytics aggregation behind the API."],
    },
    challenges: [
      {
        title: "Sensitive data handling",
        detail: "PII demands least-privilege access everywhere -uploads, case views and analytics each enforce their own permission boundary.",
      },
      {
        title: "Pipeline reliability",
        detail: "Processing steps can fail or retry. Idempotent handling and explicit status events keep the pipeline honest under failure.",
      },
      {
        title: "Analytics freshness",
        detail: "Reviewers need a live operational picture without expensive recomputation -aggregations are designed around the reads the dashboard actually performs.",
      },
      {
        title: "Evolving document types",
        detail: "New document formats arrive over time. The check model stays extensible so new verification steps slot into the existing workflow.",
      },
    ],
    outcome: {
      heading: "Outcome",
      body: [
        "KYCInsight shows backend-heavy product engineering: ingestion pipelines, guarded status machines, auditability for sensitive workflows, and real-time analytics over operational data.",
      ],
    },
  },
};

export const WORKFLOW: WorkflowStep[] = [
  { index: "01", title: "Understand", description: "Understand the product, users and requirements before writing code." },
  { index: "02", title: "Architect", description: "Design the application structure, data flow and APIs." },
  { index: "03", title: "Build", description: "Implement frontend and backend functionality in vertical slices." },
  { index: "04", title: "Integrate", description: "Connect databases, payments, email, storage and external services." },
  { index: "05", title: "Secure", description: "Authentication, authorization, validation and secure data handling." },
  { index: "06", title: "Test", description: "Verify functionality, edge cases and user flows." },
  { index: "07", title: "Deploy", description: "Prepare the application for production with repeatable deploys." },
  { index: "08", title: "Improve", description: "Monitor, maintain and continuously improve the system." },
];

export const DEPTH_LAYERS = [
  { layer: "Frontend architecture", detail: "Components · state · routing", tech: "React · TypeScript · Next.js" },
  { layer: "API design", detail: "Contracts · validation · errors", tech: "REST · GraphQL" },
  { layer: "Authentication", detail: "Identity · sessions · 2FA", tech: "JWT · TOTP · Cognito" },
  { layer: "Business rules", detail: "Workflows · permissions", tech: "Node.js · .NET" },
  { layer: "Database design", detail: "Modeling · relations · queries", tech: "PostgreSQL · MongoDB" },
  { layer: "External integrations", detail: "Payments · email · storage", tech: "Paystack · SendGrid · Cloudinary" },
  { layer: "Cloud infrastructure", detail: "Deploys · serverless · cache", tech: "AWS · S3 · Docker · Redis" },
  { layer: "Monitoring / maintenance", detail: "Logs · audits · iteration", tech: "CI/CD · Audit logs" },
];
