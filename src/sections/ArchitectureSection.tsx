import ArchitectureDiagram from "../components/ArchitectureDiagram";
import { Reveal } from "../hooks/hooks";
import { SectionHeading } from "../components/ui";

export default function ArchitectureSection() {
  return (
    <section aria-label="Full-stack architecture" className="border-y" style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading
          eyebrow="How I think"
          title={<>One product, <span style={{ color: "#22d3ee" }}>every layer</span> accounted for</>}
          description="Every application I build follows the same mental model: a user touches an interface, but correctness lives in the layers beneath it. Select any layer to see what I own there."
        />
        <Reveal delay={120} className="mt-12">
          <ArchitectureDiagram />
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2" aria-label="Technologies around the architecture">
            {["React", "TypeScript", "Node.js", ".NET", "PostgreSQL", "MongoDB", "AWS", "Redis", "Paystack", "SendGrid"].map((t) => (
              <span key={t} className="rounded-full border px-3.5 py-1.5 font-mono text-[12px] transition-colors hover:border-indigo-400/50" style={{ borderColor: "var(--line)", color: "var(--text-dim)", background: "var(--bg-card)" }}>
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
