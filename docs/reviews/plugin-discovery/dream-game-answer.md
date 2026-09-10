**I’d start with Poimandres Racing Game.** HeadStart’s connected local catalog returned two browser racing candidates. These findings come from its pinned source reviews; live GitHub verification was unavailable.

| Starting point | Fit for your game | Tradeoff |
|---|---|---|
| **[Poimandres Racing Game](https://github.com/pmndrs/racing-game)** — [browser demo](https://racing.pmnd.rs/) | Existing stylized 3D racer with vehicle, track and race interface. Closest starting point for a small game. | Older React 18 / R3F 8 / Cannon stack; vehicle code depends on shared state and effects. |
| **[Ecctrl](https://github.com/pmndrs/ecctrl)** — [browser demo](https://ecctrl.app/) | Vehicle-controller foundation using R3F and Rapier, with gears, torque curves and wheel state. Useful for building your own driving experience. | A controller toolkit; you would add track, race rules, UI and chase-camera integration. |

Exact relevant source paths, linked to the reviewed commits:

**Poimandres Racing Game** — `7816a5d954b75e6ad853ae4e4f0cbbd628072643`

- [`src/models/vehicle/Vehicle.tsx`](https://github.com/pmndrs/racing-game/blob/7816a5d954b75e6ad853ae4e4f0cbbd628072643/src/models/vehicle/Vehicle.tsx) — raycast vehicle, chassis and wheels.
- [`src/effects/Cameras.tsx`](https://github.com/pmndrs/racing-game/blob/7816a5d954b75e6ad853ae4e4f0cbbd628072643/src/effects/Cameras.tsx) — perspective/orthographic camera switching. **The catalog confirms switching, but does not establish chase-follow behavior.**

**Ecctrl** — `e2cab804f9f15661a642e76f52d09f0b2db63f35`

- [`src/vehicles/EcctrlVehicle.tsx`](https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/src/vehicles/EcctrlVehicle.tsx) — vehicle controller; depends on wheel/propeller helpers and gravity stores.
- [`src/input/Joystick.tsx`](https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/src/input/Joystick.tsx) — virtual joystick for potential touch controls. No inspected chase-camera path is recorded for this candidate.

Both have inspected MIT repository licenses; asset rights and reuse scope still require review. Demos and integration were not tested. Combining the two would be an untested proposal because their physics and React stacks differ.

No code was downloaded and no files were edited.
