import Hero from "../sections/Hero";
import Capabilities from "../sections/Capabilities";
import ArchitectureSection from "../sections/ArchitectureSection";
import Experience from "../sections/Experience";
import Projects from "../sections/Projects";
import Ecosystems from "../sections/Ecosystems";
import Depth from "../sections/Depth";
import About from "../sections/About";
import Workflow from "../sections/Workflow";
import GlobeOrbit from "../sections/GlobeOrbit";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      {/* tech marquee */}
      <div className="overflow-hidden border-y py-4" style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }} aria-label="Technology ticker">
        <div className="animate-marquee flex w-max gap-3 pr-3">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="flex gap-3" aria-hidden={copy === 1}>
              {["React", "TypeScript", "Node.js", ".NET", "ASP.NET Core", "PostgreSQL", "MongoDB", "Prisma", "EF Core", "GraphQL", "Apollo", "AWS", "S3", "Docker", "Redis", "Paystack", "SendGrid", "JWT · 2FA · RBAC"].map((t) => (
                <span key={`${copy}-${t}`} className="whitespace-nowrap rounded-full border px-4 py-1.5 font-mono text-[12px]" style={{ borderColor: "var(--line)", color: "var(--text-dim)" }}>
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <About />
      <ArchitectureSection />
      <Experience />
      <Projects />
      <Ecosystems />
      <Depth />
      <Capabilities />
      <Workflow />
      <GlobeOrbit />
      <Contact />
    </>
  );
}
