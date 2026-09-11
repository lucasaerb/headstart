// Existing flat terrain implementation. Seed is accepted by the target interface.
export function heights(size, seed) { return new Float32Array(size * size); }
export const capability = 'flat-baseline';
