import { Reveal } from "../hooks/hooks";

export function TechBadge({ label, tone = "#818cf8" }: { label: string; tone?: string }) {
  return (
    <span
      className="inline-flex items-center rounded-md border px-2 py-1 font-mono text-[11px] leading-none tracking-tight"
      style={{
        borderColor: "var(--line)",
        background: "color-mix(in srgb, var(--bg-card) 70%, transparent)",
        color: "var(--text-dim)",
      }}
    >
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full" style={{ background: tone }} aria-hidden="true" />
      {label}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto text-center items-center" : "text-left items-start"} flex max-w-3xl flex-col gap-4`}>
      <span
        className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em]"
        style={{ borderColor: "var(--line)", color: "var(--text-faint)", background: "var(--bg-elev)" }}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]" style={{ color: "var(--text)" }}>
        {title}
      </h2>
      {description ? (
        <p className={`text-pretty text-base leading-relaxed sm:text-lg ${centered ? "mx-auto" : ""}`} style={{ color: "var(--text-dim)" }}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`card-lift rounded-2xl border ${className}`}
      style={{ borderColor: "var(--line)", background: "var(--bg-card)" }}
    >
      {children}
    </div>
  );
}
