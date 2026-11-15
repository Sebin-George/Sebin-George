"use client";

import { useEffect, useState, type ComponentType } from "react";
import { loadScene } from "@/lib/loadScene";

type Config = { frozen: boolean; reduced: boolean; lowQuality: boolean };

// Fixed full-screen 3D water background, carried over from the old portfolioclonejs project.
export default function SceneBackground() {
  const [config, setConfig] = useState<Config | null>(null);
  const [Scene, setScene] = useState<ComponentType<any> | null>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reduced = false;
    setConfig({
      frozen: params.has("freeze") || reduced,
      reduced,
      lowQuality: window.matchMedia("(max-width: 768px)").matches,
    });

    let alive = true;
    loadScene()
      .then((C) => alive && setScene(() => C))
      .catch(() => {
        /* background is decorative; fail silently */
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div aria-hidden="true" className="scene-bg">
      {config && Scene ? (
        <Scene frozen={config.frozen} reduced={config.reduced} lowQuality={config.lowQuality} active />
      ) : null}
    </div>
  );
}
