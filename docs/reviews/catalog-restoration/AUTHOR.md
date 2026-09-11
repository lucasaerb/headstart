# Catalog restoration author evidence

Author: `/root/restore_author`. Independent reviewer: `/root/restore_reviewer` (verdict separate).
Base: `8bc33d92c9b668cb90977d736c9b98146a64464d`. Branch: `fix/restore-research-catalog`.

Restored exactly the 51 archived records, retaining their original source, rights, demo and readiness metadata. Discovery now has 92 entries, with the original 41 in unchanged order and restored entries alphabetically at 42–92. Public research and selected-ID retrieval use the same projection; scoped eligibility remains 32. Original exclusion audit is historical and unchanged. Full research links now target main.

Removed obsolete research-list-only source/license/demo/star requirements. Scoped publication, rights, verification, handoffs and integration contracts are unchanged. Null-star, missing-source/image and no-demo details have honest accessible fallback labels. Historical media records remain identical: only 11 restored images explicitly permitting catalog redistribution join 41 existing images. Other restored images remain placeholders. `public-media-policy.json` records the decision; both builders exclude unreferenced catalog image bytes. No asset license or public distribution grant was invented.

Checks: 53 research Python tests; 33 catalog Python tests; 41 Node tests; npm check, format:check, build; production site build. Both built asset directories exactly match 52 projected image filenames. catalog:init returns 92 research, 92 displayed, 32 eligible scoped versions. Current screenshots and focused browser suite cover desktop 1440×1000/mobile 390×844 Chrome with reduced motion, default pagination across 41/42, native/no-public-source/no-preview/no-demo details, legacy detail path, no overflow or page errors. Earlier test-only assertions incorrectly assumed Void Explorer stars were unavailable rather than Not on GitHub and used Yuka as a no-demo fixture; corrected to actual recorded metadata and BrowserQuest. No product defect was concealed by these corrections.

Selected visual references (C4 living world preserved; C3 grid and C5 responsive intent apply):
- `HeadStart-Starter-Package/design-explorations/2026-09-simplicity/C3-browse-grid-and-bag.png` SHA256 `dd9c24385fe96db0f11838b0ba43fb64d62ba81ff78a4dd985c04f45dd57397d`.
- `HeadStart-Starter-Package/design-explorations/2026-09-simplicity/C5-mobile-and-motion.png` SHA256 `2e4c2521027b296ab9555980c201edc87a2fcaa9d529de56454920d5ade5c2f6`.

Evidence: `evidence/*-restored-boundary.png` and `*-detail.png`; route is local server research query, viewport encoded in filename. Responsive cards preserve selected C3/C5 blue rounded control/card language, stacking at 390px. Mobile rank 42 screenshot inspected after waiting for image decode; native action and unknown stars are readable. Critical reviewer must inspect captures and record independent acceptance.

Limits: No fresh upstream play, source, stars or image approvals claimed. Restored metadata is historical research. Deployment is coordinated separately by root from the existing production baseline to avoid publishing unrelated localhost features.
