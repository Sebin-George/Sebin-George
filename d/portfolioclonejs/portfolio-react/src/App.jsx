import InitialPreloader from "@/components/InitialPreloader";
import SmoothScroll from "@/components/SmoothScroll";
import Home from "@/Home";

export default function App() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="hero-backdrop-grid absolute inset-0 opacity-[0.12]" />
      </div>
      <InitialPreloader />
      <SmoothScroll>
        <div className="relative z-1">
          <Home />
        </div>
      </SmoothScroll>
    </>
  );
}
