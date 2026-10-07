import { Reveal } from "../hooks/hooks";
import { SectionHeading } from "../components/ui";

const NODE_STACK = ["API development", "Authentication", "Business logic", "Integrations", "Server-side apps", "GraphQL", "Database interaction"];
const DOTNET_STACK = ["ASP.NET Core", "C#", "Entity Framework Core", "PostgreSQL", "REST APIs", "AWS Lambda", "AWS Cognito", "Enterprise backends"];

export default function Ecosystems() {
  return (
    <section aria-label="Backend ecosystems" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading
        eyebrow="Two backend ecosystems"
        title={<>Fluent in <span style={{ color: "#22d3ee" }}>Node.js</span> <span style={{ color: "var(--text-faint)" }}>and</span> <span style={{ color: "#818cf8" }}>.NET</span></>}
        description="Most developers commit to one server ecosystem. I work across both -the modern JavaScript stack for product velocity, and the Microsoft stack for enterprise systems."
        align="center"
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <article className="card-lift h-full rounded-2xl border p-7 sm:p-8" style={{ borderColor: "rgba(34,211,238,.28)", background: "linear-gradient(170deg, rgba(34,211,238,.09), var(--bg-card) 55%)" }}>
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold text-black" style={{ background: "#22d3ee" }} aria-hidden="true">JS</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "#22d3ee" }}>Modern JS ecosystem</span>
            </div>
            <h3 className="mt-5 text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>Node.js</h3>
            <div className="mt-4 rounded-xl border p-4 font-mono text-[12.5px]" style={{ borderColor: "var(--line)", background: "rgba(0,0,0,.25)", color: "var(--text-dim)" }}>
              React <span style={{ color: "#22d3ee" }}>→</span> Node.js <span style={{ color: "#22d3ee" }}>→</span> PostgreSQL / MongoDB
            </div>
            <ul className="mt-5 space-y-2">
              {NODE_STACK.map((s) => (
                <li key={s} className="flex items-center gap-2.5 text-[13.5px]" style={{ color: "var(--text-dim)" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#22d3ee" }} aria-hidden="true" /> {s}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] leading-relaxed" style={{ color: "var(--text-faint)" }}>
              Proven in TeiWill (REST + Prisma + PostgreSQL) and TeiCraft (GraphQL Yoga + Mongoose + MongoDB).
            </p>
          </article>
        </Reveal>
        <Reveal delay={120}>
          <article className="card-lift h-full rounded-2xl border p-7 sm:p-8" style={{ borderColor: "rgba(99,102,241,.32)", background: "linear-gradient(170deg, rgba(99,102,241,.1), var(--bg-card) 55%)" }}>
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold text-white" style={{ background: "linear-gradient(135deg,#6366f1,#7c3aed)" }} aria-hidden="true">.N</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "#a5b4fc" }}>Microsoft ecosystem</span>
            </div>
            <h3 className="mt-5 text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>.NET / ASP.NET Core</h3>
            <div className="mt-4 rounded-xl border p-4 font-mono text-[12.5px]" style={{ borderColor: "var(--line)", background: "rgba(0,0,0,.25)", color: "var(--text-dim)" }}>
              React <span style={{ color: "#818cf8" }}>→</span> ASP.NET Core <span style={{ color: "#818cf8" }}>→</span> EF Core <span style={{ color: "#818cf8" }}>→</span> PostgreSQL
            </div>
            <ul className="mt-5 space-y-2">
              {DOTNET_STACK.map((s) => (
                <li key={s} className="flex items-center gap-2.5 text-[13.5px]" style={{ color: "var(--text-dim)" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#818cf8" }} aria-hidden="true" /> {s}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] leading-relaxed" style={{ color: "var(--text-faint)" }}>
              Applied within VegaIT's engineering environment: .NET 8 services, EF Core data access, Cognito identity and Lambda workloads.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
