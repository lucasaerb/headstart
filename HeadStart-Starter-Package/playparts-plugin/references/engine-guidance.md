# Engine guidance

## Three.js and React Three Fiber
Inspect installed versions and lockfiles; do not prescribe a guessed latest version. Identify ownership of the renderer, scene, camera, animation loop and disposal. R3F useFrame logic must fit the existing Canvas and lifecycle; avoid creating a second renderer or unmanaged loop. Keep coordinate units and delta-time handling consistent. Check camera control ownership and event listeners. Inspect actual APIs from the installed source or current official documentation.

Inspect the physics engine and its integration before adapting behavior. Cannon and Rapier are not interchangeable APIs; adding a second physics world is a material design change. Preserve current input mapping and scene state unless explicitly changing them.

For assets, inspect actual paths, loader behavior, animation names, coordinate orientation, units, compression and external resources. A .blend source file is an asset workflow; glTF/GLB may be the runtime format. Verify rights separately.

## Phaser
Discovery and source inspection are supported in the initial product. Any integration needs a named Phaser version, scene lifecycle and physics subsystem assessment. Do not label it tested without a real target run.

## Godot and Unity
Initial behavior is discovery and feasibility. Inspect exact engine versions, source project files, asset import settings, renderer and dependencies. A browser demo does not make the implementation compatible with JavaScript. A cross-engine recreation is a separate adaptation task with its own cost and tests.

## Geospatial systems
Record projection, coordinate origin, scale, streaming boundaries, data-provider terms, attribution and API-key needs. Reusing the code does not automatically grant rights to map data, tiles, imagery or hosted services.
