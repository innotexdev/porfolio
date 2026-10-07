import { Suspense, lazy, useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";

// Split the case-study bundle off the initial load -visitors only
// download it when they open a project.
const CaseStudy = lazy(() => import("./pages/CaseStudy"));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // allow route render first
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      });
    } else if (!pathname.startsWith("/work")) {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, hash]);
  return null;
}

function RouteFallback() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32" role="status" aria-label="Loading case study">
      <div className="h-8 w-48 animate-pulse rounded-lg" style={{ background: "var(--bg-card-2)" }} />
      <div className="mt-4 h-64 animate-pulse rounded-2xl" style={{ background: "var(--bg-card)" }} />
      <span className="sr-only">Loading case study…</span>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollManager />
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route
            path="work/:id"
            element={
              <Suspense fallback={<RouteFallback />}>
                <CaseStudy />
              </Suspense>
            }
          />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
