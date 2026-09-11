# Catalog restoration release — 11 September 2026

Status: **PROMOTED — independent remote acceptance and public post-promotion checks passed.**

The user requested every removed entry restored below the current list. The candidate contains all 92 research references: the prior 41 in unchanged order, followed by the 51 restored entries. There are 52 public images; other entries use honest placeholders. Eligible scoped versions remain 32, and discovery does not authorize source delivery or integration.

- Main implementation: `aef15b3`.
- Release source: `636d2ce16748aab2e2205f5f99908112a6ba5b9e`.
- Prior production baseline: `3f893341cc69e961f0efb0e9ba806544a4e70978`.
- Deployment: `dpl_85QsyxKo6DDoTsHSs2c4RcSHHF1b`.
- Candidate: https://headstart-nqlvskhwm-lucasaerbs-projects.vercel.app.
- Verified production alias: https://headstart-virid.vercel.app/.
- Catalog database SHA256: `49400c6fdec223df4dcab5fba3765eb40cd2f90068fe5616847d2be40cfc54f0`.

The release uses the previous production baseline plus restoration changes. Existing hosted plugin distribution, signup, Astra prompt, styling and brief flows are preserved. Main’s unrelated localhost authentication, owner bags, handoffs and operational flows are not implicitly published. Historical release evidence under `recent-vibe-games/` remains unchanged.

Author evidence is in [AUTHOR.md](AUTHOR.md). The independent reviewer returned final pre-promotion PASS after inspecting actual remote desktop and mobile UI. Root confirmed promotion of the exact deployment above and performed the following public checks:

- `/api/research?limit=100`: exactly 92 records, hybrid retrieval; original 41 in exact prior order and all 51 restored IDs in the tail.
- Pagination: page sizes 12, 12, 12, 12, 12, 12, 12, 8; 92 unique records.
- Public `catalog.js`, `index.html`, `app.js`, and `detail.js`: byte-equal to the accepted candidate.

The packaged artifact contains 52 public images and 32 eligible scoped versions. Restoration changes only discovery availability and its default order; historical source, rights and demo limitations remain explicit. No new play tests, reuse rights, verified-email service or integration outcomes are implied.
