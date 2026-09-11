// First-party review fixture. Toy kinematics, not a Rapier integration.
export const art = { accent: '#dfac5b', roof: '#566e88', shape: 'round', ground: '#87ad86' };
export class World {
  constructor() { this.position = 0; }
  step(dt) { this.position += dt; }
}
export function attachGame(input, existingWorld) {
  let moves = 0;
  const onMove = () => { moves++; };
  input.addEventListener('move', onMove);
  return {
    update(dt) { existingWorld.step(dt); },
    worlds() { return [existingWorld]; },
    moves() { return moves; },
    dispose() { input.removeEventListener('move', onMove); },
  };
}
