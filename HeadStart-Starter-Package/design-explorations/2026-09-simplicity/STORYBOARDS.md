# HeadStart: three simpler directions

Design exploration · 10 September 2026 · static mockups for review

These boards show alternative product concepts. Names, images, recommendations and controls are fictional; there are no live demos or agent connections. HeadStart remains a naming candidate. The images were directly inspected alongside this document.

**Updated target:** these samples predate the user's three-game grab-bag/remix direction and do not fulfill it. The next pass should adapt all three entry styles toward bag → remix brief → Astra → playable game → creator royalty record, with the MCP tool/plugin automatically referencing the selected bag. See [the current demo target](../../../docs/demo-target.md). No resulting game or video has been produced.

## The problem to solve first

**“Help me find a playable starting point for my game, understand which parts might help, and continue with my coding agent.”**

The first decision is choosing a promising example. The next is choosing a whole starter or a useful part. Technical inspection and rights become prominent at selection, when they can inform a concrete decision.

The existing discovery and tour mockups have a strong foundation: show an appealing game, then connect it to useful systems. Their competing header/sidebar navigation, repeated categories and duplicate racing imagery make that promise harder to see. The new boards reduce the number of decisions and give the images a clearer job.

## A — Find your starting point

[Open the full storyboard](A-find-your-starting-point.png)

**Calm library.** White surfaces, navy text, blue actions and three equal game previews. This is my recommended starting direction: clear enough for a specific search, open enough for browsing.

The headline is **“A head start for your next game.”** The supporting copy says “Find open-source games. Play them. Build on the parts you like.” One field asks “What do you want to build?” and the primary action is “Find a starting point”. Popular ideas include “Just a camera”, keeping part discovery visible.

| Beat | Actual board frame | Decision |
| --- | --- | --- |
| 1. Discover | Three fictional previews: **Coastline**, a coastal racer; **Little Borough**, a town builder; **Mossbound**, a pixel-art platformer. Each description offers a whole game or useful systems. | What looks closest to my idea? |
| 2. Compare and play | The query “A small browser racer” produces **Coastline** and **Dune Trail**. Both offer “Play demo” and “See parts”. | Which example is worth exploring? |
| 3. Choose a scope | Coastline offers “Whole starter” and the selected “Chase camera”. “Source & rights” says review is required before reuse. “Review with my agent” sits beside “View source”. | What should my agent inspect? |

**Desktop/mobile:** the desktop begins with three landscape cards. The mobile sample stacks the field, action, popular ideas and cards, showing Coastline fully and the next image beginning below it. There is no persistent sidebar.

**Tradeoff:** the most direct expression of a useful library, but good results and useful empty states will determine its value. The board illustrates the journey; it does not implement search or play.

**Image labeling:** A uses a board-wide footer identifying fictional examples and generated artwork. It does not label every individual preview. Share the board intact; add a concept label before reusing any isolated crop. Its on-screen speed/HUD values belong to fictional game art, not measured performance.

## B — Play. Then pick a part.

[Open the full storyboard](B-play-then-pick-a-part.png)

**Playable exhibit.** A dominant game image carries the color and energy, surrounded by quiet white chrome. The actual landing headline is **“Play it. Make it your starting point.”** Its supporting line connects open-source games to the parts behind them. Search remains available at the top.

| Beat | Actual board frame | Decision |
| --- | --- | --- |
| 1. Discover a game and its parts | **Skybound** shows a character jumping between floating platforms. One large “Play demo” action dominates. “Whole starter”, “Movement” and “Follow camera” sit beneath it. **Woodland Trail** and **Harborline** provide smaller alternatives. | Does this feel like something I want to make? |
| 2. Notice the part | Movement is selected beside the same game image, with an annotation pointing to the character. | Which part interests me? |
| 3. Understand before reuse | “Movement from Skybound” explains “Move, jump, land” and names the existing camera as something to preserve. Source and rights require review; the next actions are agent review and source viewing. | What would be adapted, and what stays mine? |

**Desktop/mobile:** the desktop uses a large preview and a narrow alternatives column. Mobile keeps the hero, play action and three vertically stacked scope choices. “Concept preview” labels appear on the main previews and alternatives.

**Tradeoff:** the strongest immediate visual appeal. It could be mistaken for a game portal if the whole-starter/part choices disappear below the fold. The movement annotation illustrates the concept; it is not evidence that any real code is separable.

## C — Start with one good match

[Open the full storyboard](C-one-good-match.png)

**Guided shortlist.** Pale blue surrounds a generous white workspace. A small editable brief leads to one recommendation and one alternative. The landing asks **“What are you making?”**, with “A tiny city builder for the browser” as its example.

| Beat | Actual board frame | Decision |
| --- | --- | --- |
| 1. Describe the need | A prompt, “A whole starter / One part” choice and runtime selector lead to “Find my starting point”. Runtime remains unchosen. An isometric coastal town illustrates the brief. | What am I trying to build? |
| 2. Compare one match | **Little Borough** receives the large preview and a short fit explanation. The tradeoff says economy systems still need review. **Blocktown** is the simpler-looking alternative. | Which starting point better suits my idea? |
| 3. Carry the brief forward | Little Borough is selected as a whole starter for the browser, with “Runtime to confirm”. Next: inspect source, rights and project fit. Agent review and a downloadable brief are proposed actions. | What should my agent investigate first? |

**Desktop/mobile:** the desktop pairs the short form with a large town image. Mobile puts the form and main action before the artwork. Later desktop panels preserve a compact recommendation and handoff summary. The board labels main game previews “Concept preview”.

**Tradeoff:** the smallest comparison burden, with more guidance. The extra runtime field adds a decision before discovery; a prototype should test whether it is necessary at that moment. Recommendation reasons and the alternative’s “lightweight” description are fictional editorial copy, not inspected capabilities or measurements.

## What a later prototype must establish

These are image boards, not a responsive application. They show desktop and mobile compositions, but cannot establish keyboard access, contrast compliance, working search, playable demos, downloads or integration.

- Keep whole-game and part discovery visible. Retain simulation/building and 2D examples alongside 3D games.
- Replace concept art with permissioned gameplay captures tied to real source/demo evidence. Do not convert fictional capability descriptions into catalog claims.
- At selection, expose source revision, selected scope, code/asset rights, dependencies and target fit. Unknowns remain explicit; unresolved rights block source-content reuse/export.
- Agent continuation starts inspection and planning. Show installation or integration success only after the corresponding real acknowledgment or validation. Preserve the brief, named systems and credits. A fallback brief carries appropriate metadata, without unresolved source content.
- Provide accessible controls, visible focus, useful empty/error states and mobile-appropriate game-launch guidance. Launch one demo only after a gesture; provide an external fallback.

Independent review should assess the actual boards for purpose clarity, distinct approaches, image usefulness, text legibility, desktop/mobile hierarchy and honest concept labeling. No usability research has been performed. A useful next evaluation is to show each opening frame briefly, ask what HeadStart does, then ask the person to find a whole starter and a single part.

## Sources inspected

- `../../START-HERE.md` and `../../Product-Direction-v0.4.md` — product promise and service boundaries.
- `../../Playparts-Technical-PRD-v0.3.md` — journey and evidence gates.
- `../../Playparts-UI-Prototype.html`, `../../mockups/screen-index.json`, `../../mockups/01-discover.png` and `../../mockups/03-tour.png` — current structure and directly viewed visual references.
- `../../../docs/development-workflow.md` — separate author/reviewer acceptance workflow.
