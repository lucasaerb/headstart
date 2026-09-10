# Independent judgment corpus and evaluation evidence

Author `/root/batch1_foundation`, independently from engine author `/root/batch2_brief`. This is author evidence for issue11, not the required critical reviewer verdict. No deployment/commit/issue closure.

Before any ranking evaluation, authored100graded queries from the pinned source comments, the actual29Three addon review specifications, and2048Tile code. Initialized an isolated store and froze the30eligible component metadata rows. Canonical scopes alone form the evaluation; none of the76research references is promoted. `services/retrieval/evaluation/freeze.json` pins queries.json SHA256 `ca9d32a79cc3ddfb79bd2e2cd864e472df9f2f9aca796a651657aec16421ccc6` and corpus.json `faf76c07af191536556741698688059e9ac07d4e6a4c4f3cf3c8f506d2f2ed79`. Freeze was communicated to engine author and parent before tuning; it remains unchanged.

Coverage:30exact titles,30ordinary-language paraphrases,20composites,20negative/constraint queries. Geospatial/simulation/RTS queries distinguish available camera/label/bounds pieces from absent map-coordinate conversion, terrain streaming, worker economies and pathfinding. WithheldWater2 flow maps are explicitly absent. Exact-title/paraphrase pairs stay together; tuning50/heldout50. All30IDs are graded for every query by explicit positives plus declared default0. Source references and claim rationales accompany the judgments. Grading methodology and limitations are documented in the evaluation README.

Implemented runner and independent hard-filter checker. Three metric tests pass: frozen counts/digests/split/category coverage; manually calculated discounted gain/recall including duplicate/no-answer handling; coupled tested-runtime/version and unknown-platform checks. Root CI now includes contracts, catalog, intake, curation, retrieval and evaluation suites plus explicit optional-model installation. Current full root tests:61Python,34NodePASS.

Initial tuning only: lexical0.375NDCG@10/0.375Recall@20; actual hybridv1 0.7974/0.7792 with zero hard-filter violations. Engine author tuned only tuning text projection/threshold, froze `ranking-freeze.json`, then ran heldout exactly once per mode. No label modifications or heldout tuning followed.

Final heldout evidence from heldout-lexical.json and heldout-hybrid.json, both with the original frozen digests:

| Mode | NDCG@10 | Recall@20 | Hard-filter violations | No-answer queries returning results |
| --- | ---: | ---: | ---: | ---: |
| Lexical | 0.3750 | 0.3750 | 0 | 0/10 |
| Actual local ONNX hybrid | 0.9503 | 0.9583 | 0 | 2/10 |

Each set includes40answerable and10no-answer queries. No-answer cases are excluded from gain/recall averages and reported separately, never counted as perfect scores. Targets≥0.75/≥0.90/0are met for this heldout answerable subset. Hybrid false positives remain for satellite-terrain streaming and foot-placement inverse kinematics; near metadata matches do not establish those capabilities. Do not generalize these results to all genres, unseen repositories or integration readiness.

Actual mode is hybrid on all50heldout queries with pinned MiniLM ONNX model metadata in each result. Local warm-process CPU median9.6985ms/p95 10.961ms versus lexical0.9475/1.189ms are observations from this workstation, not deployment budgets. Model failures are separately tested as explicit lexical fallback by the engine author.

The required separate batch reviewer must inspect all100judgments, final code/configuration hashes, failure cases and UI before accepting issue11. Engine/UI author evidence is separate. No private target source, raw captures or source code were submitted to a retrieval service; inference used local public metadata only.
