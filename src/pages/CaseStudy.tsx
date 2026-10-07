import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CASE_STUDIES, PROJECTS } from "../data/portfolio";
import type { ProjectId } from "../types";
import { Reveal } from "../hooks/hooks";
import { TechBadge } from "../components/ui";
import ArchitectureDiagram from "../components/ArchitectureDiagram";

const VALID_IDS: ProjectId[] = ["teiwill", "teicraft", "pnuel", "kycinsight"];

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [id]);

  if (!id || !(VALID_IDS as string[]).includes(id)) {
    return <Navigate to="/" replace />;
  }
  const projectId = id as ProjectId;
  const project = PROJECTS.find((p) => p.id === projectId)!;
  const cs = CASE_STUDIES[projectId];

  const blocks = [
    cs.problem, cs.solution, cs.role, cs.frontend, cs.backend, cs.database, cs.security, cs.integrations,
  ];

  return (
    <article className="mx-auto max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[12px]" style={{ color: "var(--text-faint)" }}>
        <Link to="/" className="hover:underline">Home</Link>
        <span aria-hidden="true"> / </span>
        <Link to="/#projects" className="hover:underline">Projects</Link>
        <span aria-hidden="true"> / </span>
        <span style={{ color: "var(--text-dim)" }}>{project.name}</span>
      </nav>

      <Reveal>
        <header
          className="overflow-hidden rounded-2xl border"
          style={{ borderColor: "var(--line)", background: "var(--bg-card)" }}
        >
          <div className="relative overflow-hidden px-7 py-10 sm:px-10 sm:py-14" style={{ background: `linear-gradient(140deg, ${project.accent}26, transparent 60%), var(--bg-elev)` }}>
            <div className="bg-grid absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <p className="font-mono text-[12px] tracking-[0.16em]" style={{ color: project.accent }}>
                {project.index} -{project.category}
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: "var(--text)" }}>
                {project.name}
              </h1>
              <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <TechBadge key={s} label={s} tone={project.accent} />
                ))}
              </div>
              <p className="mt-5 font-mono text-[12px]" style={{ color: "var(--text-faint)" }}>Role: {project.role}</p>
            </div>
          </div>
        </header>
      </Reveal>

      {cs.roles && (
        <Reveal delay={80}>
          <div className="mt-6 rounded-2xl border p-6" style={{ borderColor: "var(--line)", background: "var(--bg-card)" }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--text-faint)" }}>Role model -6 roles</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {cs.roles.map((r) => (
                <span key={r} className="rounded-lg border px-3 py-1.5 font-mono text-[12px] font-semibold" style={{ borderColor: "rgba(99,102,241,.35)", color: "#c7d2fe", background: "rgba(99,102,241,.08)" }}>
                  {r}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      )}  

      <div className="case-prose mt-10 grid gap-6 lg:grid-cols-2">
        {blocks.map((b, i) => (
          <Reveal key={b.heading} delay={(i % 2) * 80}>
            <section className="h-full rounded-2xl border p-6 sm:p-7" style={{ borderColor: "var(--line)", background: "var(--bg-card)" }} aria-label={b.heading}>
              <h2 className="text-[17px] font-bold tracking-tight" style={{ color: "var(--text)" }}>{b.heading}</h2>
              <div className="mt-3 space-y-3 text-[14px]">
                {b.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
              {b.list && (
                <ul className="mt-4 space-y-2">
                  {b.list.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13.5px]" style={{ color: "var(--text-dim)" }}>
                      <span style={{ color: project.accent }} aria-hidden="true">▸</span> {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6">
        <section aria-label="System architecture" className="rounded-2xl border p-6 sm:p-7" style={{ borderColor: "var(--line)", background: "var(--bg-card)" }}>
          <h2 className="text-[17px] font-bold" style={{ color: "var(--text)" }}>Architecture</h2>
          <p className="mt-2 max-w-3xl text-[14px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
            {projectId === "teiwill" &&
              "Next.js frontend → REST API → Node.js business logic (will lifecycle guards, RBAC, billing) → PostgreSQL via Prisma → SendGrid / Paystack / UploadThing / Stream → deployed infrastructure with scheduled jobs."}
            {projectId === "teicraft" &&
              "Next.js storefront → GraphQL Yoga API → Node.js resolvers (auth, catalog, orders, payments) → MongoDB via Mongoose → Paystack / Cloudinary / SMTP → deployed marketplace with localized Naira + State/LGA flows."}
            {projectId === "pnuel" &&
              "Next.js frontend → Apollo GraphQL API → Node.js business logic (listings, participations, accounts) → modeled persistence for properties, investments and transactions → notifications and media services → deployed platform."}
            {projectId === "kycinsight" &&
              "Reviewer frontend → GraphQL API → Node.js processing pipeline (ingestion, checks, status transitions) → document and event records → notifications and storage → deployed system."}
          </p>
          <div className="mt-5">
            <ArchitectureDiagram compact />
          </div>
        </section>
      </Reveal>

      <section aria-label="Engineering challenges" className="mt-6 rounded-2xl border p-6 sm:p-7" style={{ borderColor: "var(--line)", background: "var(--bg-card)" }}>
        <h2 className="text-[17px] font-bold" style={{ color: "var(--text)" }}>Engineering challenges</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {cs.challenges.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 80}>
              <div className="h-full rounded-xl border p-5" style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}>
                <h3 className="text-[14.5px] font-bold" style={{ color: "var(--text)" }}>{c.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: "var(--text-dim)" }}>{c.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="mt-6">
        <section aria-label="Outcome" className="rounded-2xl border p-6 text-white sm:p-8" style={{ background: "linear-gradient(140deg,#4f46e5,#6d28d9 60%,#0e7490 130%)", borderColor: "transparent" }}>
          <h2 className="text-[17px] font-bold">{cs.outcome.heading}</h2>
          {cs.outcome.body.map((p, i) => (
            <p key={i} className="mt-3 max-w-3xl text-[14.5px] leading-relaxed text-white/85">{p}</p>
          ))}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/#projects" className="rounded-xl bg-white px-5 py-2.5 text-[13.5px] font-bold text-indigo-700">← All projects</Link>
            <Link to="/#contact" className="rounded-xl border border-white/40 px-5 py-2.5 text-[13.5px] font-bold text-white">Discuss a build →</Link>
          </div>
        </section>
      </Reveal>
    </article>
  );
}
