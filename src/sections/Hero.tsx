import { Link } from "react-router-dom";
import { PROFILE } from "../data/portfolio";

export default function Hero() {
  return (
    <section id="home" aria-label="Introduction" className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(640px 340px at 50% -40px, rgba(99,102,241,.22), transparent 70%), radial-gradient(480px 280px at 85% 20%, rgba(34,211,238,.12), transparent 70%), radial-gradient(520px 300px at 12% 30%, rgba(139,92,246,.12), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-32 sm:px-8 sm:pt-40 lg:pb-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="hero-rise inline-flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4" style={{ borderColor: "var(--line)", background: "var(--bg-elev)", ["--d" as string]: "0ms" }}>
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold text-white" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" aria-hidden="true" /> {PROFILE.availability.split("&")[0]}
            </span>
            <span className="font-mono text-[11.5px]" style={{ color: "var(--text-dim)" }}>{PROFILE.location}</span>
          </div>

          <p className="hero-rise mt-7 font-mono text-[12px] uppercase tracking-[0.24em]" style={{ color: "#a5b4fc", ["--d" as string]: "80ms" }}>
            {PROFILE.name} -{PROFILE.role}
          </p>

          <h1 className="hero-rise mt-4 text-balance text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl" style={{ color: "var(--text)", ["--d" as string]: "160ms" }}>
            {PROFILE.heroHeadlineA}
            <br />
            <span
              style={{
                background: "linear-gradient(100deg,#a5b4fc 0%,#818cf8 35%,#22d3ee 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {PROFILE.heroHeadlineB}
            </span>
          </h1>

          <p className="hero-rise mt-6 max-w-2xl text-pretty text-[15.5px] leading-relaxed sm:text-lg" style={{ color: "var(--text-dim)", ["--d" as string]: "240ms" }}>
            {PROFILE.heroSupport}
          </p>

          <div className="hero-rise mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row" style={{ ["--d" as string]: "320ms" }}>
            <Link
              to="/#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5 sm:w-auto"
              style={{ background: "linear-gradient(135deg,#6366f1,#7c6cf6)", boxShadow: "0 12px 40px -8px rgba(99,102,241,.55)" }}
            >
              View My Work <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border px-7 py-3.5 text-[15px] font-bold transition-colors sm:w-auto"
              style={{ borderColor: "var(--line-strong)", color: "var(--text)", background: "var(--bg-elev)" }}
            >
              Let&apos;s Connect
            </Link>
          </div>

          <div className="hero-rise mt-9 flex flex-wrap items-center justify-center gap-2" aria-label="Core technologies" style={{ ["--d" as string]: "400ms" }}>
            {PROFILE.heroTech.map((t) => (
              <span key={t} className="rounded-lg border px-3 py-1.5 font-mono text-[12px]" style={{ borderColor: "var(--line)", color: "var(--text-dim)", background: "var(--bg-elev)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* stack strip */}
        <div className="hero-rise mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border" style={{ borderColor: "var(--line)", background: "var(--bg-elev)", ["--d" as string]: "480ms" }}>
          <div className="flex items-center justify-between border-b px-5 py-2.5" style={{ borderColor: "var(--line)" }}>
            <p className="font-mono text-[11px]" style={{ color: "var(--text-faint)" }}>full-stack scope -frontend → api → logic → data → integrations → deploy</p>
            <span className="hidden font-mono text-[11px] text-emerald-400 sm:block">● all systems operational</span>
          </div>
          <div className="code-window overflow-x-auto whitespace-nowrap px-5 py-4" style={{ color: "var(--text-dim)" }}>
            <span style={{ color: "#818cf8" }}>const</span> <span style={{ color: "var(--text)" }}>product</span> = <span style={{ color: "var(--text-faint)" }}>await</span> <span style={{ color: "#22d3ee" }}>build</span>({"{"} ui: <span style={{ color: "#a5b4fc" }}>React</span>, api: <span style={{ color: "#a5b4fc" }}>Node + .NET</span>, data: <span style={{ color: "#a5b4fc" }}>Postgres · Mongo</span>, auth: <span style={{ color: "#a5b4fc" }}>JWT · 2FA</span>, cloud: <span style={{ color: "#a5b4fc" }}>AWS · Docker</span> {"}"});
          </div>
        </div>
      </div>
    </section>
  );
}
