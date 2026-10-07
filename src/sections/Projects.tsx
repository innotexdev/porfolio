import { useCallback, useEffect, useRef, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { PROJECTS } from "../data/portfolio";
import { useReducedMotion } from "../hooks/hooks";
import { SectionHeading } from "../components/ui";

const GAP = 24;

export default function Projects() {
  const [featured, ...rest] = PROJECTS;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const reduced = useReducedMotion();
  const raf = useRef(0);

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
    setActive(Math.min(rest.length - 1, Math.max(0, Math.round(track.scrollLeft / step()))));
  }, [rest.length, step]);

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
    const clamped = Math.min(rest.length - 1, Math.max(0, i));
    track.scrollTo({ left: clamped * step(), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section id="projects" aria-label="Selected projects" className="border-y" style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Selected work"
          title={<>Products that prove <span style={{ color: "#818cf8" }}>full-stack range</span></>}
          description="Each project below spans interface, API, business logic, database and integrations. Open a case study to see how the system actually works."
        />

        <div className="mt-12">
          <ProjectCard project={featured} delay={0} />
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <p className="font-mono text-[12px]" style={{ color: "var(--text-faint)" }} aria-live="polite">
            {String(active + 1).padStart(2, "0")} / {String(rest.length).padStart(2, "0")}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={!canPrev}
              aria-label="Previous projects"
              className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all disabled:cursor-not-allowed disabled:opacity-35"
              style={{ borderColor: "var(--line)", color: "var(--text)", background: "var(--bg-card)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={!canNext}
              aria-label="Next projects"
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
          aria-label="More projects -scroll or use the controls"
          className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-2 pt-1 sm:-mx-8 sm:px-8"
        >
          {rest.map((p, i) => (
            <div
              key={p.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${rest.length}: ${p.name}`}
              className="w-[86%] shrink-0 snap-start sm:w-[calc(50%-12px)]"
            >
              <ProjectCard project={p} delay={0} />
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2" role="group" aria-label="Choose project slide">
          {rest.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-current={i === active}
              aria-label={`Go to ${p.name}`}
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
    </section>
  );
}
