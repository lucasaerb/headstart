# Controlled existing terrain target
Preserve the sole renderer, scene/camera ownership, one animation-loop scheduler,
keyboard character movement, pause/reset behavior and terrain mesh topology.
World units are meters; Y is up. No physics world is present. Terrain is visual,
not a collision surface. Change only src/terrain.js and the documented vendor/
notice additions. Do not execute scripts on the host or create network traffic.
