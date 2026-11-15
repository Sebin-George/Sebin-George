// The original site used the "dialkit" live-tuning panel. Here every control simply
// resolves to its default value, so the animation numbers can be edited in code.
export function useDialKit(_name, config) {
  const out = {};
  for (const [key, value] of Object.entries(config)) {
    if (Array.isArray(value)) out[key] = value[0];
  }
  return out;
}
