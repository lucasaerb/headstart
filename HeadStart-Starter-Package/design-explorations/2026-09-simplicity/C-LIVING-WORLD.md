# C — The world is already waiting

Visual evolution · 10 September 2026 · static mockup, not an interactive build

Evolve the preferred C landing into an expressive living landscape. Preserve the [original C board](C-one-good-match.png), [matching browse library](C-BROWSE.md) and three-game bag journey.

[Open C4: living-world desktop landing](C4-living-world-landing.png). This image was directly inspected. Its footer identifies a static generated world with motion not implemented.

[Open C5: mobile and interaction storyboard](C5-mobile-and-motion.png). Also directly inspected: a mobile landing retains the headline, prompt, primary action, browse link, bag, helper and pause control. Three adjacent crops explain following the path, layered depth and a quiet state. These panels illustrate intent; their footer confirms pointer, touch and motion behavior is not implemented.

## One inviting scene, one clear task

C4 fills the desktop with a bright coastal castle world beneath a quiet Games / How it works / Bag header. **“Every great game starts somewhere.”** leads at the left, followed by “Find open-source games you love. Remix them into something yours.” The translucent white prompt panel contains **Find my starting point** and **Or browse all games**. The castle island, waterfalls, windmill, birds and blurred foreground leaves create depth around that calm text area.

A small cream-colored helper with a blue cape and backpack stands on the foreground path. A single “Let's find your starting point” bubble gives it personality; blue stepping dots and a cursor depict the intended response. **Pause world** and “Move your cursor to explore” are visible at the bottom. These are pictured controls, not functioning ones. The landscape is a welcoming first-party illustration, not a catalog game's source or gameplay evidence.

## Proposed interaction

On desktop, the helper follows the pointer toward the nearest reachable spot on defined walkable terrain, respecting cliffs, castles and interface controls. Use a gentle pace, settled idle pose and subtle path cue. Keep the normal pointer; the helper never captures clicks intended for the form or navigation.

Small foreground/background shifts can suggest depth while clouds and birds move slowly. Prioritize calm over constant novelty. Implement the visible **Pause world** control for ambient and character motion together. Reduced-motion preference should start with a still composition and no automatic following or parallax; all product actions remain available.

C5's quiet-state crop still depicts **Pause world**, a static-board label simplification. An implemented paused state must change this action to **Resume world** and expose its state accessibly.

On mobile, use a deliberate tap on open terrain to invite the helper to a reachable spot, with no motion required to discover or select games. Keep the form, browse link and bag reachable before decorative exploration. Keyboard users get the same search, browsing and bag functions through ordinary controls; they do not need to steer the helper. Preserve focus visibility and avoid placing text over busy artwork.

## Implementation boundaries and review

This is a visual/mockup request. A raster board can depict layers, a pointer and path cues, but cannot prove animation, pathfinding, accessibility, responsiveness or performance. There is no game or video implementation in this deliverable. The automatic MCP/plugin bag reference remains a required future behavior, not an available connection.

The decorative first-party hero must remain separate from externally supplied playable demos. Demo launch still requires an explicit user gesture and the appropriate isolation/fallback controls; the hero must not silently launch an untrusted game.

Review the generated board for immediate purpose clarity, a believable landscape, a distinctive readable helper, unobstructed controls and continuity with C2/C3. A later prototype must test pointer/tap boundaries, pause/reduced motion, keyboard use, mobile layouts and actual rendering cost before claiming the world works.

Generated with the built-in image tool. Prompts: [desktop](C-LIVING-WORLD-IMAGE-PROMPT.md) and [mobile/interaction states](C-MOBILE-MOTION-IMAGE-PROMPT.md).
