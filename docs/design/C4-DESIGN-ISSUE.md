# Conform HeadStart UI to the selected C4 living-world storyboard

The user selected C4 and the related C screens as the current design baseline on 10 September 2026. Align the implemented journey with that selection and the final 60-second storyboard: enter the living world, browse and select three games, continue with automatically supplied bag context in Astra, play the actual source-code remix, and inspect the automatic record for pieces actually reused.

## Design source of truth

- [Final storyboard and evidence requirements](https://github.com/lucasaerb/headstart/blob/design/c4-final-storyboard/docs/design/C4-FINAL-STORYBOARD.md)
- [Visual storyboard source](https://github.com/lucasaerb/headstart/blob/design/c4-final-storyboard/HeadStart-Starter-Package/design-explorations/2026-09-simplicity/FINAL-STORYBOARD.html) — serve the package locally and open `/design-explorations/2026-09-simplicity/FINAL-STORYBOARD.html`.
- [Design-direction policy](https://github.com/lucasaerb/headstart/blob/design/c4-final-storyboard/docs/design-direction.md)
- [Independent design review](https://github.com/lucasaerb/headstart/blob/design/c4-final-storyboard/docs/reviews/headstart-c4-final-storyboard.md)

![C4b: living-world landing refinement](https://github.com/lucasaerb/headstart/blob/design/c4-final-storyboard/HeadStart-Starter-Package/design-explorations/2026-09-simplicity/C4b-living-world-bridge.png?raw=true)

The original C4 is the selected style; C4b is the requested refinement draft: smaller companion, fewer distant islands, preserved boats/birds/castle/windmill and a connected foreground bridge. C1 means `C-one-good-match.png`. C2 governs list browsing and dropdown filters; C3 governs grid browsing and the three-game bag; C5 governs mobile/motion intent; C14 drafts the continuation. Preserve the originals and keep the other directions as comparison references.

![C14: Astra, playable remix and creator record](https://github.com/lucasaerb/headstart/blob/design/c4-final-storyboard/HeadStart-Starter-Package/design-explorations/2026-09-simplicity/C14-remix-play-credit.png?raw=true)

## Scope and existing work

This is the design-conformance tracking issue for #6 (discovery), #7 (detail/demo), #8 (brief and bag), #14–#16 (MCP/plugin/integration) and #21 (end-to-end quality). It does not close or replace their functional/evidence requirements. This issue is not authorization to implement the entire backlog in this design task. The reviewed storyboard is a design deliverable; the application implementation remains open.

## Acceptance criteria

- [ ] Landing matches C4/C4b's light, color, layered coastal world, clear prompt/CTA, Browse all games and bag. Keep text and controls stable. Preserve a connected reachable bridge/path and smaller companion; do not add island clutter.
- [ ] C2 browsing supports scrollable list, accessible Genre/Style/Runtime dropdowns, search, useful empty/error states and list/grid toggle. C3 provides prominent authentic previews, play/source actions, three selected games, removal and a concise editable remix brief.
- [ ] Whole starters and reusable systems remain discoverable; source, rights and readiness facts remain evidence-backed. Website art direction does not override the chosen game's own brief.
- [ ] Astra's real MCP tool/plugin automatically references the correct selected bag revision and brief. No manual URL assembly, fabricated tool success, or simulated connection states.
- [ ] The demonstrated remix reuses traced code from all three selected games with resolved scope/rights, actual adaptation checks and a coherent playable result. Show genuine input/response. Varied games do not imply universal engine conversion.
- [ ] Automatically log original developers and pieces actually used; distinguish selected-but-unused material. Preserve source notices. Show unresolved royalty terms honestly; no invented rates, amounts or payment/settlement claims.
- [ ] Mobile preserves readable prompt/actions, accessible browsing/bag and touch alternatives. Pause world and reduced-motion start still. Keyboard users can complete the journey without decorative motion.
- [ ] Capture actual desktop and narrow-mobile states and compare them to exact reference digests. Record responsive adaptations, motion budget/fallback and intentional deviations. Do not mark static mockups as implemented motion or video.
- [ ] A coder/author subagent and separate critical reviewer inspect actual code, meaningful behavior checks and screenshots. Fix blocking findings and repeat review until explicit PASS in a durable review record. Only then close implementation criteria.

## Demo edit

0–6s arrive; 6–14s browse/play; 14–21s collect three; 21–29s ask Astra; 29–40s compressed real adaptation; 40–53s playable payoff; 53–60s actual-used creator/royalty record. The minute is video runtime, not build latency. The storyboard includes fictional game examples and generated art; replace them with verified source-backed examples for the final recording.
