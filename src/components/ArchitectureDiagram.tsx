import { useState } from "react";
import { ARCH_NODES } from "../data/portfolio";

export default function ArchitectureDiagram({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState(ARCH_NODES[3].id);

  const active = ARCH_NODES.find((n) => n.id === selected) ?? ARCH_NODES[0];

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}
      role="region"
      aria-label="Full-stack architecture diagram"
    >
      <div className="flex items-center justify-between border-b px-5 py-3.5" style={{ borderColor: "var(--line)" }}>
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <p className="font-mono text-[11.5px]" style={{ color: "var(--text-faint)" }}>
          system-architecture.ts -how I think about products
        </p>
        <span
          className="hidden rounded-full border px-2.5 py-1 font-mono text-[10.5px] sm:inline-block"
          style={{ borderColor: "rgba(99,102,241,.35)", color: "#a5b4fc", background: "rgba(99,102,241,.1)" }}
        >
          ● live
        </span>
      </div>

      <div className={`grid ${compact ? "lg:grid-cols-1" : "lg:grid-cols-[1fr_300px]"}`}>
        <ol className={`relative space-y-0 px-5 py-6 sm:px-8 ${compact ? "" : ""}`}>
          {ARCH_NODES.map((node, i) => {
            const isActive = node.id === selected;
            const isLast = i === ARCH_NODES.length - 1;
            return (
              <li key={node.id} className="relative flex gap-4 pb-1 last:pb-0">
                <div className="flex flex-col items-center" aria-hidden="true">
                  <button
                    onClick={() => setSelected(node.id)}
                    aria-pressed={isActive}
                    aria-label={`Select layer: ${node.layer}`}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border text-[15px] transition-all"
                    style={{
                      borderColor: isActive ? "rgba(99,102,241,.6)" : "var(--line)",
                      background: isActive ? "rgba(99,102,241,.16)" : "var(--bg-card)",
                      color: isActive ? "#c7d2fe" : "var(--text-faint)",
                      boxShadow: isActive ? "0 0 24px rgba(99,102,241,.35)" : "none",
                    }}
                  >
                    {node.icon}
                  </button>
                  {!isLast && (
                    <span className="relative my-1 flex w-px flex-1 flex-col items-center" style={{ minHeight: 22 }}>
                      <svg width="2" height="30" aria-hidden="true">
                        <line x1="1" y1="0" x2="1" y2="30" stroke={isActive ? "#6366f1" : "var(--line-strong)"} strokeWidth="2" strokeDasharray="4 4" style={{ animation: "dash 1.6s linear infinite" }} />
                      </svg>
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setSelected(node.id)}
                  aria-pressed={isActive}
                  className="group mb-3 flex-1 rounded-xl border px-4 py-3 text-left transition-all"
                  style={{
                    borderColor: isActive ? "rgba(99,102,241,.5)" : "var(--line)",
                    background: isActive ? "rgba(99,102,241,.08)" : "var(--bg-card)",
                  }}
                >
                  <span className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[13.5px] font-bold" style={{ color: isActive ? "var(--text)" : "var(--text-dim)" }}>
                      <span className="mr-2 font-mono text-[11px]" style={{ color: "var(--text-faint)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {node.layer}
                    </span>
                    <span className="flex flex-wrap gap-1.5">
                      {node.tech.map((t) => (
                        <span key={t} className="rounded border px-1.5 py-0.5 font-mono text-[10.5px]" style={{ borderColor: "var(--line)", color: "var(--text-faint)", background: "var(--bg-elev)" }}>
                          {t}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="mt-1 block text-[12.5px]" style={{ color: "var(--text-faint)" }}>{node.detail}</span>
                </button>
              </li>
            );
          })}
        </ol>

        {!compact && (
          <aside className="border-t p-6 lg:border-l lg:border-t-0" style={{ borderColor: "var(--line)", background: "var(--bg-card)" }} aria-live="polite">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--text-faint)" }}>Selected layer</p>
            <h3 className="mt-2 text-lg font-bold leading-snug" style={{ color: "var(--text)" }}>{active.layer}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: "var(--text-dim)" }}>{active.detail}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {active.tech.map((t) => (
                <span key={t} className="rounded-md px-2 py-1 font-mono text-[11px]" style={{ background: "rgba(99,102,241,.12)", color: "#c7d2fe", border: "1px solid rgba(99,102,241,.3)" }}>
                  {t}
                </span>
              ))}
            </div>
            <div className="code-window mt-5 rounded-xl border p-4" style={{ borderColor: "var(--line)", background: "#0a0c13", color: "#c9d1e3" }}>
              <span style={{ color: "#7c7f9c" }}>{"// request path"}</span>
              <br />
              <span style={{ color: "#818cf8" }}>client</span>
              <span style={{ color: "#5b6074" }}>{" → "}</span>
              <span style={{ color: "#22d3ee" }}>api</span>
              <span style={{ color: "#5b6074" }}>{" → "}</span>
              <span style={{ color: "#a78bfa" }}>logic</span>
              <br />
              <span style={{ color: "#7c7f9c" }}>await</span> <span style={{ color: "#e2e8f0" }}>authorize(ctx, </span>
              <span style={{ color: "#fbbf24" }}>"{active.id}"</span>
              <span style={{ color: "#e2e8f0" }}>)</span>
            </div>
            <p className="mt-4 text-[12px] leading-relaxed" style={{ color: "var(--text-faint)" }}>
              Select any layer to inspect what I own there -UI, API contracts, domain rules, identity, data, integrations and infrastructure.
            </p>
          </aside>
        )}
      </div>
    </div>
  );
}
