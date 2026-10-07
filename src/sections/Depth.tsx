import { useState } from "react";
import { DEPTH_LAYERS } from "../data/portfolio";
import { Reveal } from "../hooks/hooks";
import { SectionHeading } from "../components/ui";

export default function Depth() {
  const [active, setActive] = useState(3);
  return (
    <section aria-label="Engineering depth" className="border-y" style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:py-28">
        <div>
          <SectionHeading
            eyebrow="Engineering depth"
            title={<>More than <span style={{ color: "#818cf8" }}>just the UI</span></>}
            description="Interfaces are the visible 10%. The other 90% -contracts, identity, rules, data, integrations and operations -is where products succeed or fail. I build for all of it."
          />
          <Reveal delay={140}>
            <div className="code-window mt-8 rounded-2xl border p-5" style={{ borderColor: "var(--line)", background: "#0a0c13", color: "#c9d1e3" }}>
              <div className="mb-3 flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span style={{ color: "#5b6074" }}>{"// what happens on one click"}</span><br />
              <span style={{ color: "#818cf8" }}>POST</span> <span style={{ color: "#e2e8f0" }}>/api/wills/:id/submit</span><br />
              <span style={{ color: "#5b6074" }}>├─</span> <span style={{ color: "#22d3ee" }}>validate</span><span style={{ color: "#5b6074" }}>(payload, schema)</span><br />
              <span style={{ color: "#5b6074" }}>├─</span> <span style={{ color: "#22d3ee" }}>authorize</span><span style={{ color: "#5b6074" }}>(user, </span><span style={{ color: "#fbbf24" }}>"will:submit"</span><span style={{ color: "#5b6074" }}>)</span><br />
              <span style={{ color: "#5b6074" }}>├─</span> <span style={{ color: "#22d3ee" }}>transition</span><span style={{ color: "#5b6074" }}>(draft → pending_review)</span><br />
              <span style={{ color: "#5b6074" }}>├─</span> <span style={{ color: "#22d3ee" }}>notify</span><span style={{ color: "#5b6074" }}>(lawyer) + </span><span style={{ color: "#22d3ee" }}>audit</span><span style={{ color: "#5b6074" }}>(event)</span><br />
              <span style={{ color: "#34d399" }}>→ 200 · consistent, auditable, reversible</span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <ol className="space-y-2" role="listbox" aria-label="Layers behind the interface">
            {DEPTH_LAYERS.map((l, i) => {
              const isActive = i === active;
              return (
                <li key={l.layer}>
                  <button
                    onClick={() => setActive(i)}
                    aria-selected={isActive}
                    role="option"
                    className="flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-all"
                    style={{
                      borderColor: isActive ? "rgba(99,102,241,.5)" : "var(--line)",
                      background: isActive ? "rgba(99,102,241,.09)" : "var(--bg-card)",
                    }}
                  >
                    <span
                      className="flex h-9 w-12 shrink-0 items-center justify-center rounded-lg font-mono text-[12px] font-bold"
                      style={{
                        background: isActive ? "#6366f1" : "var(--bg-card-2)",
                        color: isActive ? "#fff" : "var(--text-faint)",
                        border: "1px solid var(--line)",
                      }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-bold" style={{ color: isActive ? "var(--text)" : "var(--text-dim)" }}>
                        {l.layer}
                      </span>
                      <span className="block truncate font-mono text-[11.5px]" style={{ color: "var(--text-faint)" }}>
                        {l.tech}
                      </span>
                    </span>
                    <span className="hidden max-w-[220px] truncate text-[12px] sm:block" style={{ color: "var(--text-faint)" }}>
                      {l.detail}
                    </span>
                    <span aria-hidden="true" style={{ color: isActive ? "#818cf8" : "var(--text-faint)" }}>
                      {isActive ? "●" : "○"}
                    </span>
                  </button>
                  {isActive && (
                    <div className="ml-[68px] mt-1.5 rounded-lg px-3 py-2 text-[12.5px] sm:hidden" style={{ color: "var(--text-dim)", background: "var(--bg-card)" }}>
                      {l.detail} · <span className="font-mono">{l.tech}</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
