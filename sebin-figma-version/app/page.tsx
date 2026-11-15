import Hero from "@/components/Hero";
import About from "@/components/About";
import Stories from "@/components/Stories";
import Experience from "@/components/Experience";
import Work from "@/components/Work";
import Tools from "@/components/Tools";
import Contact from "@/components/Contact";
import Effects from "@/components/Effects";
import SceneBackground from "@/components/SceneBackground";
import GlassCube from "@/components/GlassCube";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <SceneBackground />
      <div className="backdrop-grid" aria-hidden="true" />
      <GlassCube />
      <main className="page">
      <Hero />
      <About />
      <Stories />
      <Experience />
      <Work />
      <Tools />
      <Contact />
      <Effects />
      </main>
    </>
  );
}
