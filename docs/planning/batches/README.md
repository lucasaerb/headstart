# Backlog execution batches

Branch: `feat/backlog-batches`, isolated worktree `/tmp/headstart-backlog`, based on committed main `c4d4085` (includes the deployed C4, plugin CTA and email collection). Uncommitted work in the original workspace is preserved separately.

The user's 10 September instruction is to use multiple builders for five issues, then a distinct reviewer to critique the combined work, fix/re-review until acceptance passes, then take the next five. There are four agent slots total: parent plus up to three active builders; five tasks run in dependency order across those slots. Review begins after five author handoffs, while builder tests and interface coordination run continuously. A blocked acceptance item remains open and is never relabeled as completed merely to advance a batch.

## Batch 1 — foundation and discovery

1. #2 reproducible local application and engineering checks — builder `batch1_foundation`.
2. #3 versioned catalog, brief and evidence contracts — builder `batch1_contracts`.
3. #4 local persistence and enforced publication gates — builder `batch1_data`.
4. #5 exact filtered catalog API — assigned after foundation/persistence interfaces exist.
5. #6 visual discovery and URL/filter/error behavior — assigned after API shape stabilizes.

Builders own separate paths. Contracts and storage/API interfaces must agree before dependent integration is accepted. The separate reviewer will inspect each issue's complete acceptance criteria and the combined UI, not just author reports.

## Batch 2 — detail, briefs and evidence pipeline

Active after independent batch 1 PASS at `9a85fde`: #7 details/tours (builder `batch1_foundation`), #8 editable brief/comparisons (`batch2_brief`), #9 bounded intake (`batch1_data`), then #10 source capability curation and #11 semantic retrieval as their interfaces become available. Authors coordinate dependencies; final acceptance follows the combined independent review.

## Batch 1 accepted checkpoint

Issues #2–#6 passed independent review by `batch1_reviewer` at `9a85fde`. [Review and fix rounds](../../reviews/batches/batch1-review.md) and the adjacent final digest manifest record the exact implementation. The branch also integrates committed main through `508b91c`, preserving the simplified hero, remembered demo email and Astra action. All blocking findings were fixed; the email race received an additional delayed-response regression. The local catalog has 76 research references and one bounded source-reviewed component; no production API or game integration claim follows from this checkpoint. GitHub issues remain open until the reviewed branch is merged.

## Design constraint

Preserve C4/C4b world layers, motion/video, companion, typography, navy/blue palette, spacing, current signup flow and plugin CTA. Add new controls within existing cards, dropdowns and dialogs. Capture desktop/mobile default and changed states for independent review. No redesign, invented source evidence, simulated connection, fake integration or financial success.

## Release boundary

This branch is implementation/review work. The existing production site remains the stable baseline during batch development. Record per-issue tests, reviewer verdicts, commits, unresolved prerequisites and batch results in `docs/reviews/batches/`. Commercial terms, creator agreements, live account verification, real upstream execution and measured results require their actual prerequisites; never manufacture them to close an issue.
