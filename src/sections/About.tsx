import { Reveal } from "../hooks/hooks";
import { SectionHeading, TechBadge } from "../components/ui";

export default function About() {
  return (
    <section id="about" aria-label="About me" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <SectionHeading
            eyebrow="About"
            title={<>Turning requirements into <span style={{ color: "#818cf8" }}>reliable products</span></>}
          />
          <Reveal delay={100}>
            <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
              <p>
                I am a full-stack software engineer who enjoys turning ideas and business requirements into reliable
                digital products. My work spans frontend engineering, backend development, databases, authentication,
                integrations and deployment.
              </p>
              <p>
                I work comfortably across <strong style={{ color: "var(--text)" }}>React and TypeScript</strong> on the
                frontend and <strong style={{ color: "var(--text)" }}>Node.js and .NET</strong> on the backend, with
                experience designing systems around <strong style={{ color: "var(--text)" }}>PostgreSQL, MongoDB</strong> and
                modern cloud services.
              </p>
              <p>
                What I care about most: clear data models, honest API contracts, secure-by-default auth, and interfaces
                that respect the people using them. If a product needs it, I will learn the layer -from a Paystack
                webhook to a Lambda function to a Prisma migration.
              </p>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-7 flex flex-wrap gap-1.5" aria-label="Currently working with">
              {["React", "TypeScript", "Next.js", "Node.js", ".NET", "PostgreSQL", "MongoDB", "Prisma", "AWS", "Docker", "Paystack", "SendGrid"].map((t) => (
                <TechBadge key={t} label={t} />
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={140}>
          <aside className="flex h-fit flex-col gap-4 rounded-2xl border p-7 lg:sticky lg:top-24" style={{ borderColor: "var(--line)", background: "var(--bg-card)" }} aria-label="Profile summary">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-extrabold text-white" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6 50%,#22d3ee 120%)" }} aria-hidden="true">
                IA
              </span>
              <div>
                <p className="text-[16px] font-bold" style={{ color: "var(--text)" }}>Innocent Akuh</p>
                <p className="text-[13px]" style={{ color: "var(--text-faint)" }}>Full-Stack Software Engineer</p>
              </div>
            </div>
            <dl className="space-y-3 border-t pt-5 text-[13.5px]" style={{ borderColor: "var(--line)" }}>
              {[
                ["Focus", "Full-stack product development"],
                ["Frontend", "React · TypeScript · Next.js"],
                ["Backend", "Node.js · .NET / ASP.NET Core"],
                ["Data", "PostgreSQL · MongoDB · Prisma · EF Core"],
                ["Cloud", "AWS · S3 · Docker · Vercel · Render"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="font-mono text-[12px] uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>{k}</dt>
                  <dd className="text-right font-medium" style={{ color: "var(--text-dim)" }}>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="rounded-xl border p-4 font-mono text-[12px] leading-relaxed" style={{ borderColor: "rgba(52,211,153,.3)", background: "rgba(52,211,153,.06)", color: "var(--text-dim)" }}>
              <span style={{ color: "#34d399" }}>● available</span> -open to full-time roles &amp; product collaborations.
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
