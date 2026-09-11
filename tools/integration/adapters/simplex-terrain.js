import { SimplexNoise } from '../vendor/SimplexNoise.js';
// Adapter owns no render/input/physics resources. The target retains lifecycle.
export function heights(size, seed) {
  if (!Number.isInteger(size) || size < 2 || size > 128 || !Number.isInteger(seed)) throw new Error('Invalid bounded terrain parameters');
  let state = seed >>> 0;
  const noise = new SimplexNoise({ random() { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; } });
  return Float32Array.from({ length: size * size }, (_, i) => noise.noise((i % size) / 6, Math.floor(i / size) / 6) * 1.7);
}
export const capability = 'three-simplex-terrain-1';
