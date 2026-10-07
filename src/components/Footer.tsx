import { Link } from "react-router-dom";
import { PROFILE, SOCIALS } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}>
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold text-white"
                style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6 55%,#22d3ee 130%)" }}
                aria-hidden="true"
              >
                IA
              </span>
              <div>
                <p className="text-[15px] font-bold" style={{ color: "var(--text)" }}>{PROFILE.name}</p>
                <p className="text-[13px]" style={{ color: "var(--text-faint)" }}>{PROFILE.role}</p>
              </div>
            </div>
            <p className="mt-4 font-mono text-[12px] tracking-tight" style={{ color: "var(--text-faint)" }}>
              React · TypeScript · Node.js · .NET
            </p>
            <p className="mt-2 max-w-xs text-[13.5px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
              {PROFILE.shortDescriptor}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--text-faint)" }}>Site</p>
              <ul className="space-y-2.5 font-medium" style={{ color: "var(--text-dim)" }}>
                <li><Link className="hover:underline" to="/#about">About</Link></li>
                <li><Link className="hover:underline" to="/#experience">Experience</Link></li>
                <li><Link className="hover:underline" to="/#projects">Projects</Link></li>
                <li><Link className="hover:underline" to="/#stack">Stack</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--text-faint)" }}>Case studies</p>
              <ul className="space-y-2.5 font-medium" style={{ color: "var(--text-dim)" }}>
                <li><Link className="hover:underline" to="/work/teiwill">TeiWill</Link></li>
                <li><Link className="hover:underline" to="/work/teicraft">TeiCraft</Link></li>
                <li><Link className="hover:underline" to="/work/pnuel">Pnuel</Link></li>
                <li><Link className="hover:underline" to="/work/kycinsight">KYCInsight</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--text-faint)" }}>Connect</p>
              <ul className="space-y-2.5 font-medium" style={{ color: "var(--text-dim)" }}>
                {SOCIALS.map((s) => (
                  <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="hover:underline">{s.label}</a></li>
                ))}
                <li><Link className="hover:underline" to="/#contact">Email</Link></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t pt-6 text-[13px] sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "var(--line)", color: "var(--text-faint)" }}>
          <p>© 2026 {PROFILE.name}. All rights reserved.</p>
          <p className="font-mono text-[12px]">Designed & built with React · TypeScript · Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
