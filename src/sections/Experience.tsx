import { EXPERIENCE } from "../data/portfolio";
import { Reveal } from "../hooks/hooks";
import { SectionHeading, TechBadge } from "../components/ui";

export default function Experience() {
  return (
    <section id="experience" aria-label="Professional experience" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading
        eyebrow="Experience"
        title={<>Engineering inside a <span style={{ color: "#818cf8" }}>real product team</span></>}
        description="Professional experience contributing to enterprise software -shipping frontend, integrating with backend services and maintaining a shared codebase."
      />
      <div className="relative mt-12">
        <div className="absolute bottom-6 left-[19px] top-2 hidden w-px sm:block" style={{ background: "var(--line-strong)" }} aria-hidden="true" />
        <div className="space-y-6">
          {EXPERIENCE.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 100}>
              <article className="relative rounded-2xl border p-6 sm:ml-12 sm:p-8" style={{ borderColor: "var(--line)", background: "var(--bg-card)" }}>
                <span className="absolute -left-12 top-8 hidden h-10 w-10 items-center justify-center rounded-xl text-sm font-extrabold text-white sm:flex" style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)", boxShadow: "0 0 0 6px var(--bg)" }} aria-hidden="true">
                  V
                </span>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-[11.5px] uppercase tracking-[0.18em]" style={{ color: "#818cf8" }}>{exp.company} · {exp.period}</p>
                    <h3 className="mt-1.5 text-xl font-bold tracking-tight sm:text-2xl" style={{ color: "var(--text)" }}>{exp.role}</h3>
                    <p className="mt-1 text-[13.5px]" style={{ color: "var(--text-faint)" }}>{exp.location}</p>
                  </div>
                  <span className="w-fit shrink-0 rounded-full border px-3 py-1.5 font-mono text-[11px]" style={{ borderColor: "rgba(52,211,153,.35)", color: "#34d399", background: "rgba(52,211,153,.08)" }}>
                    ● professional
                  </span>
                </div>
                <p className="mt-4 max-w-3xl text-[14.5px] leading-relaxed" style={{ color: "var(--text-dim)" }}>{exp.summary}</p>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {exp.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-[13.5px] leading-relaxed" style={{ borderColor: "var(--line)", background: "var(--bg-elev)", color: "var(--text-dim)" }}>
                      <span className="mt-0.5 font-bold" style={{ color: "#34d399" }} aria-hidden="true">✓</span> {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used at VegaIT">
                  {exp.stack.map((s) => (
                    <TechBadge key={s} label={s} />
                  ))}
                </div>
                {exp.repos && (
                  <p className="mt-4 font-mono text-[12px]" style={{ color: "var(--text-faint)" }}>
                    Frontend surfaces: {exp.repos.map((r) => (
                      <code key={r} className="mx-1 rounded border px-1.5 py-0.5" style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}>{r}</code>
                    ))}
                  </p>
                )}
                <p className="mt-4 border-t pt-4 text-[12.5px] italic leading-relaxed" style={{ borderColor: "var(--line)", color: "var(--text-faint)" }}>
                  Internal systems, credentials and proprietary details are intentionally omitted. Happy to discuss the engineering work in an interview setting.
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
