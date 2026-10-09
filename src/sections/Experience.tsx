import { useCallback, useEffect, useRef, useState } from "react";
import { EXPERIENCE } from "../data/portfolio";
import { Reveal, useReducedMotion } from "../hooks/hooks";
import { SectionHeading, TechBadge } from "../components/ui";

const GAP = 24;

export default function Experience() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(EXPERIENCE.length > 1);
  const reduced = useReducedMotion();
  const raf = useRef(0);
  const total = EXPERIENCE.length;

  const step = useCallback(() => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    return (first?.offsetWidth ?? 320) + GAP;
  }, []);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setCanPrev(track.scrollLeft > 8);
    setCanNext(track.scrollLeft < max - 8);
    setActive(Math.min(total - 1, Math.max(0, Math.round(track.scrollLeft / step()))));
  }, [total, step]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(sync);
    };
    sync();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
      cancelAnimationFrame(raf.current);
    };
  }, [sync]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.min(total - 1, Math.max(0, i));
    track.scrollTo({ left: clamped * step(), behavior: reduced ? "auto" : "smooth" });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(active + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(active - 1); }
  };

  return (
    <section id="experience" aria-label="Professional experience" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading
        eyebrow="Experience"
        title={<>Engineering inside a <span style={{ color: "#818cf8" }}>real product team</span></>}
        description="Professional experience contributing to enterprise software -shipping frontend, integrating with backend services and maintaining a shared codebase."
      />

      <Reveal>
        <div className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <p className="font-mono text-[12px]" style={{ color: "var(--text-faint)" }} aria-live="polite">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                disabled={!canPrev}
                aria-label="Previous role"
                className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all disabled:cursor-not-allowed disabled:opacity-35"
                style={{ borderColor: "var(--line)", color: "var(--text)", background: "var(--bg-card)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                disabled={!canNext}
                aria-label="Next role"
                className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all disabled:cursor-not-allowed disabled:opacity-35"
                style={{ borderColor: "var(--line)", color: "var(--text)", background: "var(--bg-card)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          <div
            ref={trackRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Experience -scroll or use the controls"
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="no-scrollbar mt-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 pt-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
          >
            {EXPERIENCE.map((exp, i) => (
              <div
                key={exp.company}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${total}: ${exp.company}`}
                className="flex w-full shrink-0 snap-start"
              >
                <article className="flex w-full flex-col rounded-2xl border p-6 sm:p-8" style={{ borderColor: "var(--line)", background: "var(--bg-card)" }}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-white sm:flex" style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)" }} aria-hidden="true">
                        V
                      </span>
                      <div>
                        <p className="font-mono text-[11.5px] uppercase tracking-[0.18em]" style={{ color: "#818cf8" }}>{exp.company} · {exp.period}</p>
                        <h3 className="mt-1.5 text-xl font-bold tracking-tight sm:text-2xl" style={{ color: "var(--text)" }}>{exp.role}</h3>
                        <p className="mt-1 text-[13.5px]" style={{ color: "var(--text-faint)" }}>{exp.location}</p>
                      </div>
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

                  <div className="mt-5 flex flex-wrap gap-1.5" aria-label={`Technologies used at ${exp.company}`}>
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

                  <p className="mt-auto border-t pt-4 text-[12.5px] italic leading-relaxed" style={{ borderColor: "var(--line)", color: "var(--text-faint)" }}>
                    Internal systems, credentials and proprietary details are intentionally omitted. Happy to discuss the engineering work in an interview setting.
                  </p>
                </article>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2" role="group" aria-label="Choose role slide">
            {EXPERIENCE.map((exp, i) => (
              <button
                key={exp.company}
                type="button"
                aria-current={i === active}
                aria-label={`Go to ${exp.company}`}
                onClick={() => goTo(i)}
                className="h-2 rounded-full transition-all"
                style={{
                  width: i === active ? 28 : 8,
                  background: i === active ? "#6366f1" : "var(--line-strong)",
                }}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}