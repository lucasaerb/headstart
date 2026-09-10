# C — A simple library behind the landing

Design extension · 10 September 2026 · static companion boards, directly inspected

Keep the existing [C landing](C-one-good-match.png) unchanged. These matching views let people browse before describing an idea. The latest living-world landing direction retains this library; it does not replace it.

- [C2: desktop list, open Genre dropdown and mobile list](C2-browse-list.png).
- [C3: image grid and three-game bag](C3-browse-grid-and-bag.png).

## Entry and structure

In a future interactive version, add a visible **“Browse all games”** secondary link beside or below “Find my starting point”. The header's **“Games”** link reaches the same library. Neither action requires completing the brief.

The boards show **Games / Game systems** navigation, search, **Genre / Style / Runtime** dropdowns and **Grid / List** controls. C2 includes **Sort: Curated** and an open Genre menu with All genres, Racing, Platformer, City builder, Exploration and Simulation. Mobile consolidates filters behind **Filters**. C3 omits sort; a future implementation should retain it in both views. Keep game/part navigation available on mobile too.

C2 shows fictional Little Borough, Coastline, Mossbound, Starling and Assembly Yard, with previews, descriptions and **Play demo / Add to bag** actions. The first two are already in the illustrative bag. C3 gives the same content larger images and shows Little Borough, Coastline and Mossbound selected. Source links appear in desktop list rows; C3 does not show them, so the future grid needs an accessible source route. Detailed source/rights checks belong at selection.

## Proposed behavior

Dropdown choices apply immediately. Show active choices clearly and let users clear individual filters or all filters. Maintain hard constraints; an empty state should retain the query and selections, explain that no games match, and offer **Clear filters** without silently changing them.

Preserve bag contents, scroll position, filters and view choice when returning from a game. Filter changes may restart results at the top, announced accessibly. The board's scrollbar suggests more content; prefer ordinary page scrolling in implementation. Mobile rows stack actions beneath image/text. Keyboard behavior and scroll restoration remain unimplemented.

## The three-game bag

C3 opens a bag with three thumbnails, remove controls and the brief “A town-building racer with forest adventures.” **Continue with Astra** is followed by “Your plugin will read this bag.” This is target copy, not a connected-service result. Inclusion does not establish reuse, rights or compatibility.

The target is for the user's MCP tool/plugin to reference this bag automatically in Astra. It must identify the selected bag revision and its game/source versions, without manual URL pasting or a hand-assembled handoff. Read-only bag retrieval stays separate from authorized local integration. The eventual payoff is a real playable remix and a creator royalty record reflecting actual reused pieces, with unresolved terms explicit. These services are not implemented by the boards.

## Visual tokens

Use C's generation-prompt tokens as design intent, not measured pixel samples: canvas `#EAF0FF`, white workspace `#FFFFFF`, ink `#23344A`, action blue `#3157DB`, separators `#DEE5EF`. Use a rounded humanist sans resembling Nunito Sans, generous line spacing and restrained medium/bold headings. Keep warmth and saturated color mainly inside game images. Prefer fine separators and a few spacious panels over nested cards.

## Scope and acceptance

These raster states cannot prove scrolling, filters, responsiveness, demos or agent connection. Board-wide footers identify fictional games and generated previews; keep boards intact or label isolated crops. No installed, integrated, tested, licensed or paid outcome is demonstrated.

Review actual images for consistency with C, readable list rows, useful crops, obvious browse/filter controls and a bag that supports browsing without overwhelming it. Behavioral checks above belong to the later implementation.

Generated with the built-in image tool. [Generation prompts](C-BROWSE-IMAGE-PROMPTS.md).
