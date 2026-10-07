import { useEffect, useState, type CSSProperties } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NAV_ITEMS, PROFILE, SOCIALS } from "../data/portfolio";
import { useActiveSection, useTheme } from "../hooks/hooks";

function GithubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2.5 5 2.5 5 2.5c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9.5c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function FileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const active = useActiveSection(["home", "about", "experience", "projects", "stack", "contact"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = renderMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [renderMenu]);

  // Professional open / close choreography:
  // open  -> mount, then rise from bottom to top (translateY 100% -> 0)
  // close -> slide from top to bottom (translateY 0 -> 100%), then unmount
  useEffect(() => {
    let showFrame = 0;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    if (open) {
      setRenderMenu(true);
      showFrame = requestAnimationFrame(() => {
        showFrame = requestAnimationFrame(() => setMenuVisible(true));
      });
    } else {
      setMenuVisible(false);
      hideTimer = setTimeout(() => setRenderMenu(false), 480);
    }
    return () => {
      cancelAnimationFrame(showFrame);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  const go = (href: string) => {
    setOpen(false);
    // Let the close (top -> bottom) animation start before navigating/scrolling
    window.setTimeout(() => {
      if (!isHome) {
        navigate(`/${href}`);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }, 120);
  };

  return (
    <>
    <header
      className="fixed inset-x-0 top-0 z-50 border-b transition-all"
      style={{
        background: "var(--nav-bg)",
        backdropFilter: "blur(14px)",
        borderColor: scrolled ? "var(--line)" : "transparent",
      }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:px-3 focus:py-2"
        style={{ background: "var(--accent)", color: "#fff" }}
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-3" aria-label="Innocent Akuh -home">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold tracking-tight text-white"
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6 55%,#22d3ee 130%)" }}
            aria-hidden="true"
          >
            IA
          </span>
          <span className="hidden flex-col leading-none min-[420px]:flex">
            <span className="text-[14px] font-bold tracking-tight" style={{ color: "var(--text)" }}>
              {PROFILE.name}
            </span>
            <span className="font-mono text-[10.5px] tracking-wide" style={{ color: "var(--text-faint)" }}>
              full-stack · react / .net
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = isHome && active === id;
            return (
              <li key={item.href}>
                {isHome ? (
                  <button
                    onClick={() => go(item.href)}
                    aria-current={isActive ? "true" : undefined}
                    className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors hover:bg-white/5"
                    style={{ color: isActive ? "var(--text)" : "var(--text-dim)" }}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    to={`/${item.href}`}
                    className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors"
                    style={{ color: "var(--text-dim)" }}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={SOCIALS[0].href}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile (placeholder)"
            className="rounded-lg border p-2 transition-colors hover:border-indigo-400/40"
            style={{ borderColor: "var(--line)", color: "var(--text-dim)" }}
          >
            <GithubIcon />
          </a>
          <a
            href={SOCIALS[1].href}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile (placeholder)"
            className="rounded-lg border p-2 transition-colors hover:border-indigo-400/40"
            style={{ borderColor: "var(--line)", color: "var(--text-dim)" }}
          >
            <LinkedinIcon />
          </a>
          <a
            href={SOCIALS[2].href}
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px"
            style={{ background: "linear-gradient(135deg,#6366f1,#7c6cf6)" }}
          >
            <FileIcon /> Resume
          </a>
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="rounded-lg border p-2 transition-colors"
            style={{ borderColor: "var(--line)", color: "var(--text-dim)" }}
          >
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-lg border p-2"
            style={{ borderColor: "var(--line)", color: "var(--text-dim)" }}
          >
            <span aria-hidden="true">{theme === "dark" ? "☾" : "☀"}</span>
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={`menu-btn rounded-lg border p-2 ${open ? "is-open" : ""}`}
            style={{ borderColor: "var(--line)", color: "var(--text)" }}
          >
            <span className="menu-btn-lines" aria-hidden="true">
              <span className="menu-btn-line" />
              <span className="menu-btn-line" />
              <span className="menu-btn-line" />
            </span>
          </button>
        </div>
      </nav>
    </header>

      {renderMenu && (
        <div className="lg:hidden" aria-hidden={!open}>
          <div
            className={`mobile-backdrop ${menuVisible ? "is-visible" : ""}`}
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className={`mobile-menu ${menuVisible ? "is-visible" : ""}`}
            style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}
          >
            <div className="mobile-menu-grabber" aria-hidden="true" />
            <ul className="space-y-1 overflow-y-auto px-5 pb-6 pt-2">
              {NAV_ITEMS.map((item, i) => {
                const id = item.href.replace("#", "");
                const isActive = isHome && active === id;
                return (
                  <li
                    key={item.href}
                    className={`mobile-menu-item ${menuVisible ? "is-visible" : ""}`}
                    style={{ "--i": i } as CSSProperties}
                  >
                    <button
                      onClick={() => go(item.href)}
                      tabIndex={renderMenu ? 0 : -1}
                      className="group flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[15px] font-semibold"
                      style={{
                        color: isActive ? "#fff" : "var(--text)",
                        background: isActive ? "linear-gradient(135deg,#6366f1,#7c6cf6)" : "var(--bg-card)",
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className="font-mono text-[11px]"
                          style={{ color: isActive ? "rgba(255,255,255,.75)" : "var(--text-faint)" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </span>
                      <span aria-hidden="true" className="opacity-40 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </button>
                  </li>
                );
              })}
              <li
                className={`mobile-menu-item flex gap-2 pt-3 ${menuVisible ? "is-visible" : ""}`}
                style={{ "--i": NAV_ITEMS.length } as CSSProperties}
              >
                <a href={SOCIALS[0].href} target="_blank" rel="noreferrer" tabIndex={renderMenu ? 0 : -1} className="flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold" style={{ borderColor: "var(--line)", color: "var(--text)" }}>
                  <GithubIcon /> GitHub
                </a>
                <a href={SOCIALS[1].href} target="_blank" rel="noreferrer" tabIndex={renderMenu ? 0 : -1} className="flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold" style={{ borderColor: "var(--line)", color: "var(--text)" }}>
                  <LinkedinIcon /> LinkedIn
                </a>
                <a href={SOCIALS[2].href} target="_blank" rel="noreferrer" tabIndex={renderMenu ? 0 : -1} className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white" style={{ background: "#6366f1" }}>
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
