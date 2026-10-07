import { WORKFLOW } from "../data/portfolio";
import { Reveal } from "../hooks/hooks";
import { SectionHeading } from "../components/ui";

export default function Workflow() {
  return (
    <section aria-label="How I build software" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading
        eyebrow="Process"
        title={<>How I build <span style={{ color: "#818cf8" }}>software</span></>}
        description="A repeatable engineering workflow -from understanding the problem to improving the system in production."
        align="center"
      />
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {WORKFLOW.map((step, i) => (
          <Reveal key={step.index} delay={(i % 4) * 80}>
            <li
              className="card-lift group relative h-full overflow-hidden rounded-2xl border p-6"
              style={{ borderColor: "var(--line)", background: "var(--bg-card)" }}
            >
              <span className="pointer-events-none absolute -right-2 -top-4 font-mono text-[64px] font-extrabold leading-none opacity-[0.06]" style={{ color: "var(--text)" }} aria-hidden="true">
                {step.index}
              </span>
              <p className="font-mono text-[12px] font-bold tracking-[0.16em]" style={{ color: "#818cf8" }}>{step.index}</p>
              <h3 className="mt-2 text-[16px] font-bold" style={{ color: "var(--text)" }}>{step.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: "var(--text-dim)" }}>{step.description}</p>
              {i < WORKFLOW.length - 1 && (
                <span className="absolute bottom-5 right-5 hidden font-mono text-[13px] lg:block" style={{ color: "var(--text-faint)" }} aria-hidden="true">→</span>
              )}
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
