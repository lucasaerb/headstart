# GitHub header button

## Issue contract

Requested 10 September 2026. Add a clearly labeled **GitHub** button immediately beside the existing **Get the plugin** button in the HeadStart site header. The button opens the canonical public project repository, `https://github.com/lucasaerb/headstart`, in a new tab with an accessible description and isolated opener behavior.

Preserve the C4/C4b living-world header hierarchy, all discovery/catalog behavior, bag and Astra actions, remembered-demo-email behavior, and the existing plugin route. Treat GitHub as the quieter secondary project action and the plugin as the primary filled action. Keep both labels visible and usable without horizontal overflow at desktop and mobile widths.

## Acceptance checks

- One visible GitHub button appears directly adjacent to Get the plugin in the main header.
- The link target is the repository configured as this checkout's canonical `origin` URL.
- The external link clearly announces new-tab behavior to assistive technology and uses `noopener noreferrer`.
- Both project actions have at least a 40px mobile target and visible keyboard focus through the existing global focus style.
- At 320px, 390px, and desktop widths, the header remains legible with no horizontal overflow; the GitHub action is not hidden.
- Existing hero, catalog, bag, Astra, plugin, and email behavior continues to pass its focused regressions.

## Selected visual baseline

- C4: `HeadStart-Starter-Package/design-explorations/2026-09-simplicity/C4-living-world-landing.png`, SHA-256 `81f0dd99b3891c0ecd33605544e99617c5eaf8a803baf737c4b1597e44f0a8f9`.
- C4b refinement: `HeadStart-Starter-Package/design-explorations/2026-09-simplicity/C4b-living-world-bridge.png`, SHA-256 `a3c9f03a9c41a4866586130c20c18ab2a5d01026c967d4f47ecd13b00e2403be`.

Intentional adaptation: the selected boards predate the repository shortcut. The new GitHub action uses the header's existing rounded, translucent world-control language as a secondary outline beside the filled plugin action; it adds no new decorative system.
