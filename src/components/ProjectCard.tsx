import { Link } from "react-router-dom";
import type { Project } from "../types";
import { Reveal } from "../hooks/hooks";
import { TechBadge } from "./ui";

function ProjectVisual({ pattern, accent }: { pattern: Project["pattern"]; accent: string }) {
  if (pattern === "estate") {
    return (
      <div className="relative h-52 overflow-hidden sm:h-60" style={{ background: "linear-gradient(160deg,#12142a 0%,#0d0f22 60%,#0a0c18 100%)" }} aria-hidden="true">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute left-1/2 top-8 w-[78%] max-w-[380px] -translate-x-1/2 rounded-xl border border-white/10 bg-[#171a30]/90 p-4 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" /></div>
            <span className="rounded-full px-2 py-0.5 font-mono text-[10px]" style={{ background: `${accent}26`, color: accent, border: `1px solid ${accent}55` }}>will · sealed</span>
          </div>
          <div className="mt-3 h-2.5 w-3/4 rounded bg-white/25" />
          <div className="mt-2 h-2.5 w-1/2 rounded bg-white/15" />
          <div className="mt-4 flex gap-2">
            {["Draft", "Signed", "Sealed", "Active"].map((s, i) => (
              <span key={s} className="flex-1 rounded-md px-1 py-1 text-center font-mono text-[9px]" style={{ background: i <= 2 ? `${accent}30` : "rgba(255,255,255,.06)", color: i <= 2 ? "#fff" : "rgba(255,255,255,.4)", border: `1px solid ${i <= 2 ? accent + "66" : "rgba(255,255,255,.1)"}` }}>{s}</span>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-black/30 px-3 py-2">
            <span className="font-mono text-[10px] text-white/50">audit · 248 events</span>
            <span className="font-mono text-[10px] text-emerald-300">● verified</span>
          </div>
        </div>
        <div className="absolute -left-10 -top-10 h-44 w-44 rounded-full blur-3xl" style={{ background: `${accent}44` }} />
      </div>
    );
  }
  if (pattern === "market") {
    return (
      <div className="relative h-52 overflow-hidden sm:h-60" style={{ background: "linear-gradient(160deg,#0b1e26 0%,#0b1420 60%,#0a0d16 100%)" }} aria-hidden="true">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute inset-x-6 top-7 grid grid-cols-3 gap-3">
          {[
            { n: "Carved Chair", p: "₦48,500", c: "#22d3ee" },
            { n: "Aso-Oke Set", p: "₦32,000", c: "#a78bfa" },
            { n: "Brass Lamp", p: "₦21,750", c: "#34d399" },
          ].map((card) => (
            <div key={card.n} className="rounded-xl border border-white/10 bg-white/[0.07] p-3 backdrop-blur">
              <div className="h-12 rounded-lg" style={{ background: `linear-gradient(135deg, ${card.c}44, transparent)` }} />
              <div className="mt-2 h-2 w-4/5 rounded bg-white/25" />
              <div className="mt-1.5 font-mono text-[10px] font-semibold" style={{ color: card.c }}>{card.p}</div>
              <div className="mt-1 font-mono text-[9px] text-white/40">Lagos · NG</div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-1.5 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[10.5px] text-white/70">graphql · mongodb · paystack verified</span>
        </div>
      </div>
    );
  }
  if (pattern === "realestate") {
    return (
      <div className="relative h-52 overflow-hidden sm:h-60" style={{ background: "linear-gradient(160deg,#0a2119 0%,#0b1410 60%,#0a0d16 100%)" }} aria-hidden="true">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute inset-x-6 top-7 grid grid-cols-3 gap-3">
          {[
            { n: "2BR Apartments", c: "#34d399" },
            { n: "Terrace Duplex", c: "#34d399" },
            { n: "Waterfront Plot", c: "#a7f3d0" },
          ].map((card) => (
            <div key={card.n} className="rounded-xl border border-white/10 bg-white/[0.07] p-3 backdrop-blur">
              <div className="h-12 rounded-lg" style={{ background: `linear-gradient(135deg, ${card.c}3d, transparent)` }} />
              <div className="mt-2 h-2 w-4/5 rounded bg-white/25" />
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full" style={{ width: "62%", background: card.c }} />
              </div>
              <div className="mt-1.5 font-mono text-[9px] text-white/40">funding progress</div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-1.5 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[10.5px] text-white/70">apollo · node · next.js</span>
        </div>
      </div>
    );
  }
  if (pattern === "kyc") {
    return (
      <div className="relative h-52 overflow-hidden sm:h-60" style={{ background: "linear-gradient(160deg,#221a0c 0%,#141210 60%,#0a0c16 100%)" }} aria-hidden="true">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute inset-x-6 top-7 grid grid-cols-[1fr_1fr] gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.07] p-3 backdrop-blur">
            <div className="font-mono text-[10px] text-white/40">verification queue</div>
            {[
              { n: "ID · Passport", s: "Verified", c: "#34d399" },
              { n: "Proof of address", s: "Pending", c: "#f59e0b" },
              { n: "Income record", s: "Flagged", c: "#f87171" },
            ].map((d) => (
              <div key={d.n} className="mt-2 flex items-center justify-between rounded-lg bg-black/30 px-2.5 py-1.5">
                <span className="font-mono text-[9.5px] text-white/70">{d.n}</span>
                <span className="font-mono text-[9px] font-semibold" style={{ color: d.c }}>● {d.s}</span>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.07] p-3 backdrop-blur">
            <div className="font-mono text-[10px] text-white/40">pipeline · live</div>
            <div className="mt-2 flex h-20 items-end gap-1.5">
              {[40, 65, 50, 80, 58, 92, 70].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: "linear-gradient(180deg,#f59e0b,#b45309)", opacity: 0.55 + (i % 3) * 0.15 }} />
              ))}
            </div>
            <div className="mt-2 font-mono text-[9.5px] text-white/50">live pipeline overview</div>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-1.5 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[10.5px] text-white/70">graphql · node · analytics</span>
        </div>
      </div>
    );
  }
  // Generic fallback visual for future project patterns.
  return (
    <div className="relative h-52 overflow-hidden sm:h-60" style={{ background: "linear-gradient(160deg,#141428 0%,#0e1020 60%,#0a0c16 100%)" }} aria-hidden="true">
      <div className="bg-grid absolute inset-0" />
      <div className="absolute left-1/2 top-7 w-[80%] max-w-[400px] -translate-x-1/2 rounded-xl border border-white/10 bg-[#171a30]/90 p-4 backdrop-blur">
        <div className="flex items-center justify-between font-mono text-[10px] text-white/50">
          <span>product workspace</span>
          <span className="text-emerald-300">● stable</span>
        </div>
        <div className="mt-3 grid grid-cols-[1fr_1fr_1fr] gap-2">
          {["Build", "Integrate", "Deploy"].map((t) => (
            <div key={t} className="rounded-lg bg-white/[0.06] p-2.5">
              <div className="h-2 w-3/4 rounded bg-white/25" />
              <div className="mt-1.5 h-2 w-1/2 rounded bg-white/10" />
              <div className="mt-2 font-mono text-[9px] text-white/40">{t}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-1.5 font-mono text-[9.5px]">
          <span className="rounded border border-white/10 bg-black/30 px-2 py-1 text-white/60">react</span>
          <span className="rounded border border-white/10 bg-black/30 px-2 py-1 text-white/60">node</span>
          <span className="rounded border border-white/10 bg-black/30 px-2 py-1 text-white/60">sql</span>
          <span className="rounded border border-white/10 bg-black/30 px-2 py-1 text-white/60">aws</span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <article
        className="group card-lift flex h-full flex-col overflow-hidden rounded-2xl border"
        style={{ borderColor: "var(--line)", background: "var(--bg-card)" }}
      >
        <Link to={`/work/${project.id}`} aria-label={`View ${project.name} case study`} className="block overflow-hidden">
          <div className="overflow-hidden">
            <div className="project-media">
              <ProjectVisual pattern={project.pattern} accent={project.accent} />
            </div>
          </div>
        </Link>
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] tracking-[0.14em]" style={{ color: project.accent }}>
                {project.index} -{project.category}
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
                <Link to={`/work/${project.id}`} className="transition-colors group-hover:text-indigo-300">
                  {project.name}
                </Link>
              </h3>
            </div>
            <Link
              to={`/work/${project.id}`}
              aria-label={`Open ${project.name} case study`}
              className="arrow-nudge mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
              style={{ borderColor: "var(--line)", color: "var(--text-dim)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg>
            </Link>
          </div>
          <p className="mt-2 text-[14px] font-medium" style={{ color: "var(--text-dim)" }}>{project.tagline}</p>
          <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: "var(--text-faint)" }}>{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5" aria-label={`${project.name} tech stack`}>
            {project.stack.slice(0, 7).map((s) => (
              <TechBadge key={s} label={s} tone={project.accent} />
            ))}
            {project.stack.length > 7 && (
              <span className="inline-flex items-center rounded-md border px-2 py-1 font-mono text-[11px]" style={{ borderColor: "var(--line)", color: "var(--text-faint)" }}>
                +{project.stack.length - 7} more
              </span>
            )}
          </div>

          <ul className="mt-4 space-y-1.5">
            {project.capabilities.slice(0, 3).map((c) => (
              <li key={c} className="flex items-start gap-2 text-[13px]" style={{ color: "var(--text-dim)" }}>
                <span style={{ color: project.accent }} aria-hidden="true">▸</span> {c}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
            <Link
              to={`/work/${project.id}`}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px"
              style={{ background: `linear-gradient(135deg, ${project.accent}, ${project.accent}bb)` }}
            >
              View case study
              <span className="arrow-nudge" aria-hidden="true">→</span>
            </Link>
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="rounded-lg border px-4 py-2.5 text-[13px] font-semibold" style={{ borderColor: "var(--line)", color: "var(--text-dim)" }}>
                GitHub
              </a>
            ) : (
              <span className="rounded-lg border border-dashed px-4 py-2.5 font-mono text-[12px]" style={{ borderColor: "var(--line)", color: "var(--text-faint)" }} title="Link available on request">
                GitHub · on request
              </span>
            )}
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-[13px] font-semibold underline-offset-4 hover:underline" style={{ color: "var(--text-dim)" }}>
                Live demo
              </a>
            ) : (
              <span className="font-mono text-[12px]" style={{ color: "var(--text-faint)" }}>Demo · on request</span>
            )}
          </div>
          <p className="mt-4 border-t pt-3 font-mono text-[11px]" style={{ borderColor: "var(--line)", color: "var(--text-faint)" }}>
            Role: {project.role}
          </p>
        </div>
      </article>
    </Reveal>
  );
}
