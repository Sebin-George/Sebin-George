/* eslint-disable @typescript-eslint/no-explicit-any */
// Loads the 3D water scene (three.js + react-three-fiber + custom shaders) that was used in the old
// portfolioclonejs project. The compiled Turbopack chunk lives in /public/scene/sceneChunk.js and is
// fetched at runtime; this file provides the tiny module runtime that chunk needs.
import React from "react";
import * as jsxRuntime from "react/jsx-runtime";

const SCENE_ENTRY = 26806;

// modules the chunk expects the host app to provide
const externals: Record<number, any> = {
  27324: React,
  86807: jsxRuntime,
  8444: { env: { NODE_ENV: "production" } },
};

function defineExports(target: any, entries: any[]) {
  Object.defineProperty(target, "__esModule", { value: true });
  let i = 0;
  while (i < entries.length) {
    const name = entries[i++];
    const next = entries[i++];
    if (typeof next === "number") {
      Object.defineProperty(target, name, { value: entries[i++], enumerable: true, writable: false, configurable: true });
    } else if (typeof entries[i] === "function") {
      Object.defineProperty(target, name, { get: next, set: entries[i++], enumerable: true, configurable: true });
    } else {
      Object.defineProperty(target, name, { get: next, enumerable: true, configurable: true });
    }
  }
}

// The compiled scene bundles its own (older) react-reconciler. While it renders it installs its own
// "async dispatcher" on React's shared internals, and that object has no getOwner(). React's *development*
// build calls dispatcher.getOwner() on every element it creates, which crashes with
// "dispatcher.getOwner is not a function" in `next dev` (production builds never call it).
// Give any dispatcher that gets installed a harmless getOwner so both React copies can coexist.
function patchReactInternals() {
  const internals = (React as any).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  if (!internals || (internals as any).__ownerPatched) return;
  const ensure = (d: any) => {
    if (d && typeof d === "object" && typeof d.getOwner !== "function") {
      try {
        d.getOwner = () => null;
      } catch {
        /* frozen object: nothing we can do */
      }
    }
    return d;
  };
  let current = ensure(internals.A);
  Object.defineProperty(internals, "A", {
    configurable: true,
    enumerable: true,
    get: () => current,
    set: (v) => {
      current = ensure(v);
    },
  });
  Object.defineProperty(internals, "__ownerPatched", { value: true });
}

let scenePromise: Promise<React.ComponentType<any>> | null = null;

export function loadScene(): Promise<React.ComponentType<any>> {
  if (scenePromise) return scenePromise;

  patchReactInternals();
  scenePromise = fetch("/scene/sceneChunk.js")
    .then((r) => r.text())
    .then((chunkSource) => {
      const factories = new Map<number, any>();
      const cache = new Map<number, any>();

      const toNamespace = (mod: any) => {
        if (mod.namespaceObject) return mod.namespaceObject;
        const ex = mod.exports;
        if (ex && ex.__esModule) return (mod.namespaceObject = ex);
        const ns: any = {};
        if (ex && (typeof ex === "object" || typeof ex === "function")) {
          for (const key of Object.getOwnPropertyNames(ex)) {
            if (key === "default") continue;
            Object.defineProperty(ns, key, { get: () => ex[key], enumerable: true });
          }
        }
        Object.defineProperty(ns, "default", { value: ex, enumerable: true });
        return (mod.namespaceObject = ns);
      };

      const getModule = (id: number): any => {
        let mod = cache.get(id);
        if (mod) return mod;
        mod = { id, exports: {}, namespaceObject: null };
        cache.set(id, mod);
        if (id in externals) {
          mod.exports = externals[id];
          return mod;
        }
        const factory = factories.get(id);
        if (factory) factory.call(mod.exports, makeContext(mod), mod, mod.exports);
        return mod;
      };

      const makeContext = (mod: any) => ({
        m: mod,
        e: mod.exports,
        c: cache,
        g: globalThis,
        i: (id: number) => toNamespace(getModule(id)),
        r: (id: number) => getModule(id).exports,
        s: (entries: any[], id?: number) => {
          const target = id != null ? getModule(id) : mod;
          target.namespaceObject = target.exports;
          defineExports(target.exports, entries);
        },
        n: (value: any, id?: number) => {
          const target = id != null ? getModule(id) : mod;
          target.exports = target.namespaceObject = value;
        },
        v: (value: any, id?: number) => {
          (id != null ? getModule(id) : mod).exports = value;
        },
      });

      const g = globalThis as any;
      const previous = g.TURBOPACK;
      const registry: any[] = [];
      registry.push = (chunk: any[]) => {
        for (let i = 1; i < chunk.length; i += 2) {
          if (typeof chunk[i] === "number") factories.set(chunk[i], chunk[i + 1]);
        }
        return registry.length;
      };
      g.TURBOPACK = registry;
      try {
        new Function(chunkSource)();
      } finally {
        if (previous === undefined) delete g.TURBOPACK;
        else g.TURBOPACK = previous;
      }

      return getModule(SCENE_ENTRY).exports.default as React.ComponentType<any>;
    });

  return scenePromise;
}
