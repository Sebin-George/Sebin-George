import Motion from "@/components/v3/Motion";
import Nav from "@/components/v3/Nav";
import Ambient from "@/components/v3/Ambient";
import Hero from "@/components/v3/Hero";
import Marquee from "@/components/v3/Marquee";
import About from "@/components/v3/About";
import Work from "@/components/v3/Work";
import Experience from "@/components/v3/Experience";
import SkillsLazy from "@/components/v3/SkillsLazy";
import Contact from "@/components/v3/Contact";
import Statement from "@/components/v3/Statement";

export default function Home() {
  return (
    <>
      <div id="progress" aria-hidden="true" />
      <Motion />
      <Ambient />
      <Nav />
      <main className="page">
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Experience />
        <SkillsLazy />
        <Statement />
      </main>
      <Contact />
    </>
  );
}
