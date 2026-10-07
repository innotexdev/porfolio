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
import Marquee from "../sections/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee/>
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

