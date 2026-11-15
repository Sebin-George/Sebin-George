import { Suspense, lazy, useEffect, useRef, useState } from "react";

// The WebGL scene (three.js + react-three-fiber) is loaded lazily, client side only.
const Scene = lazy(() => import("@/scene/loadScene"));

export default function SceneBackground() {
  const [config, setConfig] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    window.__sceneReady = false;
    const params = new URLSearchParams(window.location.search);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setConfig({
      frozen: params.has("freeze") || reduced,
      reduced,
      lowQuality: window.matchMedia("(max-width: 768px)").matches,
    });
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030303]"
      style={{ opacity: 1 }}
    >
      {config ? (
        <Suspense fallback={null}>
          <Scene frozen={config.frozen} reduced={config.reduced} lowQuality={config.lowQuality} active />
        </Suspense>
      ) : null}
    </div>
  );
}
