// First-party review fixture. Toy kinematics, not a Rapier integration.
export const art = { accent: '#f02cdd', roof: '#22002f', shape: 'spikes', ground: '#87ad86' };
export class World {
  constructor() { this.position = 0; }
  step(dt) { this.position += dt; }
}
export function attachGame(input, existingWorld) {
  const secondWorld = new World(); // Redundant owner: ignores the target's existing simulation.
  let moves = 0;
  const onMove = () => { moves++; };
  input.addEventListener('move', onMove);
  return {
    update(dt) { existingWorld.step(dt); secondWorld.step(dt); },
    worlds() { return [existingWorld, secondWorld]; },
    moves() { return moves; },
    dispose() { input.removeEventListener('move', () => { moves++; }); }, // Different callback cannot remove onMove.
  };
}
