import { CAPABILITIES } from "../data/portfolio";
import { Reveal } from "../hooks/hooks";
import { SectionHeading, TechBadge } from "../components/ui";

export default function Capabilities() {
  return (
    <section id="stack" aria-label="Engineering capabilities" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading
        eyebrow="What I do"
        title={<>Engineering across the <span style={{ color: "#818cf8" }}>complete stack</span></>}
        description="Not just interfaces. I own the layers behind them -APIs, business logic, data models, identity and infrastructure -so products behave correctly in production, not just in demos."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 90} className={i === 4 ? "md:col-span-2 lg:col-span-1" : ""}>
            <article
              className="card-lift flex h-full flex-col rounded-2xl border p-6"
              style={{ borderColor: "var(--line)", background: "var(--bg-card)" }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl font-mono text-[15px] font-bold" style={{ background: `${group.accent}1f`, color: group.accent, border: `1px solid ${group.accent}44` }} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[16px] font-bold tracking-tight" style={{ color: "var(--text)" }}>{group.title}</h3>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: "var(--text-faint)" }}>{group.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <TechBadge key={item} label={item} tone={group.accent} />
                ))}
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal delay={180}>
          <article
            className="flex h-full flex-col justify-between rounded-2xl border p-6 text-white"
            style={{ background: "linear-gradient(150deg,#4f46e5 0%,#6d28d9 55%,#0ea5e9 130%)", borderColor: "transparent" }}
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">The thread</p>
              <h3 className="mt-2 text-xl font-bold leading-snug">UI → API → server logic → database → third-party services → deployment.</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/80">
                I move comfortably between each layer, which means fewer handoff gaps, clearer contracts and products that ship as one coherent system.
              </p>
            </div>
            <p className="mt-6 font-mono text-[12px] text-white/70">React · Node.js · .NET · PostgreSQL · MongoDB · AWS</p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
