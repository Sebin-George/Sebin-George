// Runs the compiled 3D water scene (three.js + react-three-fiber + custom shaders) from
// ./sceneChunk.js. That file is a self-contained Turbopack chunk, so this file provides the
// tiny module runtime it needs (only e.i / e.r / e.s / e.n are used by the chunk).
import React from "react";
import * as jsxRuntime from "react/jsx-runtime";
import chunkSource from "./sceneChunk.js?raw";

const SCENE_ENTRY = 26806;
const factories = new Map();
const cache = new Map();

// modules the chunk expects the host app to provide
const externals = {
  27324: React,
  86807: jsxRuntime,
  8444: { env: { NODE_ENV: "production" } },
};

function defineExports(target, entries) {
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

function toNamespace(mod) {
  if (mod.namespaceObject) return mod.namespaceObject;
  const ex = mod.exports;
  if (ex && ex.__esModule) return (mod.namespaceObject = ex);
  const ns = {};
  if (ex && (typeof ex === "object" || typeof ex === "function")) {
    for (const key of Object.getOwnPropertyNames(ex)) {
      if (key === "default") continue;
      Object.defineProperty(ns, key, { get: () => ex[key], enumerable: true });
    }
  }
  Object.defineProperty(ns, "default", { value: ex, enumerable: true });
  return (mod.namespaceObject = ns);
}

function getModule(id) {
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
}

function makeContext(mod) {
  return {
    m: mod,
    e: mod.exports,
    c: cache,
    g: globalThis,
    i: (id) => toNamespace(getModule(id)),
    r: (id) => getModule(id).exports,
    s: (entries, id) => {
      const target = id != null ? getModule(id) : mod;
      target.namespaceObject = target.exports;
      defineExports(target.exports, entries);
    },
    n: (value, id) => {
      const target = id != null ? getModule(id) : mod;
      target.exports = target.namespaceObject = value;
    },
    v: (value, id) => {
      (id != null ? getModule(id) : mod).exports = value;
    },
  };
}

function registerChunk() {
  const previous = globalThis.TURBOPACK;
  const registry = [];
  registry.push = (chunk) => {
    for (let i = 1; i < chunk.length; i += 2) {
      if (typeof chunk[i] === "number") factories.set(chunk[i], chunk[i + 1]);
    }
    return registry.length;
  };
  globalThis.TURBOPACK = registry;
  try {
    new Function(chunkSource)();
  } finally {
    if (previous === undefined) delete globalThis.TURBOPACK;
    else globalThis.TURBOPACK = previous;
  }
}

registerChunk();
const Scene = getModule(SCENE_ENTRY).exports.default;

export default Scene;
