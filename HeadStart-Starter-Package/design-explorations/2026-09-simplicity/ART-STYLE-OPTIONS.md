# One living world, five variations

Still-image exploration · 10 September 2026 · provisional alternatives

The user likes [C4's living-world idea](C4-living-world-landing.png) and wants other art styles before considering video. These alternatives retain the same purpose and hierarchy while changing the material and visual language of the world. No implementation baseline has been selected; preserve all originals for comparison, following [design-direction.md](../../../docs/design-direction.md).

## What stays recognizable

A coastal castle island, foreground path and small cream companion with a blue cape and backpack establish continuity. A quiet header exposes Games and Bag. The left side keeps the headline, prompt, primary action and **Browse all games** legible. The companion and world make the page expressive; the form still makes its purpose clear.

## C6 — Paper theatre

[View Paper theatre](C6-paper-theatre.png). Directly inspected: cut-paper clouds and birds, textured castle forms, faceted cliff layers and leafy foreground shapes preserve C4's composition. The form, navigation and helper stay recognizable.

**Tradeoff:** the layers naturally communicate the proposed depth effect and give HeadStart a distinctive illustrated identity. Too many small paper details could compete with text or make the scene feel busy. Keep the reading area quiet and preserve the companion's shape against the path.

## C7 — Clay playground

[View Clay playground](C7-clay-playground.png). Directly inspected: rounded castle towers, modeled trees, puffy clouds and a sculpted companion make the world feel like a tactile miniature set. Clean interface text sits above the scene.

**Tradeoff:** strong warmth and character, with a good fit for the helper. Heavy texture, glossy highlights or overly toy-like proportions could distract from the developer-facing purpose. Give the UI clean edges and clear contrast beside the sculpted scene.

## C8 — Pixel quest

[View Pixel quest](C8-pixel-quest.png). Directly inspected: a detailed pixel-art castle world, blocky foliage, stepped clouds and a sprite-like companion beneath crisp modern interface text. It is a 16-bit-inspired interpretation, not an assertion of historical hardware constraints.

**Tradeoff:** immediately game-like and visually distinct from the other directions. It may suggest a retro/2D-only catalog unless the browsing experience shows broader game variety. Maintain crisp edges; don't turn the form itself into a hard-to-read pixel-font interface.

## C9 — Editorial dreamscape

An inspired interpretation of [Every's website](https://every.to/), observed by the coordinating agent on 10 September 2026. “Surreal editorial collage” is a descriptive label, not Every's official style name. The reference combines editorial serif typography, grayscale antique sculpture/engraving or halftone cutouts, bold colored fields and unexpected juxtapositions.

[View Editorial dreamscape](C9-editorial-dreamscape.png). Directly inspected: a large serif headline, etched castle and floating islands, off-white paper, cyan backdrop and yellow sun translate those qualities into HeadStart's own scene. The outlined companion, path, prompt and bag retain the original task. This is an inspired interpretation, not Every's official specification or reproduced branding/content.

**Tradeoff:** more editorial and unusual, with a strong sense of authorship. Collage can weaken the sense of one navigable world; keep the path and helper coherent so the future interaction still makes sense. [Generation prompt](C9-EDITORIAL-IMAGE-PROMPT.md).

## C10 — Wide world

[View Wide world](C10-wide-world.png). Directly inspected: C4's original 3D-like style and full-size interface remain, while the world view pulls back. A smaller companion and more distant castle reveal broad sea, additional islands, villages and winding terrain. C4 remains unchanged for comparison.

**Tradeoff:** a greater sense of scale and possibility, with a quieter foreground. The companion may become harder to notice, so its silhouette and path cues need to remain legible without enlarging it back into the foreground. This is a composition variation, not a new rendering or performance claim. [Generation prompt](C10-WIDE-WORLD-IMAGE-PROMPT.md).

## Still art first, motion later

These are flat raster concepts. They do not contain composited layers, working pointer response, live backgrounds or generated video. None establishes rendering performance or suitability for a particular video model.

If the user later chooses a direction, plan the background scenery separately from interactive foreground elements: HTML controls, companion, reachable path and pointer cues should remain independently controllable. That separation preserves readable controls, consistent character behavior and a paused/reduced-motion version. A flattened video cannot itself supply those interaction layers.

The user has allowed consideration of paid Replicate video generation later. The current sequence is to compare still art styles first; no video generation or paid API execution is part of this pass.

Review the completed images for stylistic difference, continuity of layout and character, immediate purpose clarity and unobstructed controls. These qualitative tradeoffs are design judgments, not measured results. Generated with the built-in image tool; [generation prompts](ART-STYLE-IMAGE-PROMPTS.md).
