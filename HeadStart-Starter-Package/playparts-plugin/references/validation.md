# Validation guidance

Start with the target’s own required checks and a baseline. Build and type checks establish basic compatibility but not gameplay correctness. Choose behavior checks for the changed capability and the user’s preservation constraints.

Camera: follow under movement, high-speed behavior, reset, pause/resume, scene transition, control ownership, listener and loop cleanup.
Controller: supported input, movement and collision expectations, current physics integration, reset and lifecycle.
Generator: deterministic seeds, bounds, connectivity when promised, extreme parameters and runtime cost.
Effects/assets: visual output, loader failures, resource disposal, draw-call or memory impact when relevant.

Record environment and actual observations. Label manual, automated, failed and not-run checks. Compare performance only on the same profile with an actual baseline. Keep unverified self-reports distinct from reproducible catalog attestations.
