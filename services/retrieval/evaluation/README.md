# Frozen retrieval evaluation

This evaluation was authored by `/root/batch1_foundation`, separately from retrieval engine author `/root/batch2_brief`, before evaluating or tuning ranking. `freeze.json` pins every judgment and the exact eligible corpus. `load_frozen()` refuses changed bytes. The authoring command refuses to overwrite an existing freeze; a new evaluation version and independent review are required for future judgment changes.

Scope:30source-reviewed components (29bounded Three.js addon scopes plus2048Tile), from two parent repositories. Research references are excluded and never promoted to eligible results. This is a narrow local canonical-catalog benchmark, not evidence of broad genre, runtime or whole-game retrieval quality. The100queries comprise30exact titles,30ordinary-language paraphrases,20composites and20no-answer/filter cases. Geospatial and simulation/RTS prompts distinguish useful camera/label/bounds pieces from absent coordinate conversion, worker economies or pathfinding. Water2 remains absent because its scope was withheld.

All100queries are judged against all30IDs: explicitly listed relevance grades are1–3, every unlisted ID is0. Grade3 is a direct scoped match,2substantial related capability,1useful partial piece/weak alternative,0no scoped support. A composite can have several useful pieces; grades do not establish that a piece implements the whole requested game or tested compatibility. `query_spec.py` is the readable independent judgment rationale; queries carry matching pinned source evidence references.

The50/50split is fixed in advance: exact title and paraphrase for each component remain in the same split; alternating component groups yield30queries per split. Alternating composites and negatives add10each per split. This prevents each exact/paraphrase pair from crossing splits, but shared components and vocabulary in composites remain a limitation of the small domain. Tune only the tuning split. Freeze the final rank/model/interpretation configuration before running heldout; report heldout failures without relabeling or further tuning against them.

Commands (after optional local model setup described in services/retrieval/README.md):

```sh
.venv/bin/python -m unittest services.retrieval.evaluation.test_evaluation
.venv/bin/python -m services.retrieval.evaluation.runner --split tuning --mode lexical --output /tmp/tuning-lexical.json
.venv/bin/python -m services.retrieval.evaluation.runner --split tuning --mode hybrid --output /tmp/tuning-hybrid.json
# Only after configuration freeze:
.venv/bin/python -m services.retrieval.evaluation.runner --split heldout --mode lexical --output /tmp/heldout-lexical.json
.venv/bin/python -m services.retrieval.evaluation.runner --split heldout --mode hybrid --output /tmp/heldout-hybrid.json
```

Outputs are exclusive-create to preserve prior runs. NDCG@10 uses exponential gains2^grade−1 and log2(rank+1) discount. Recall@20 counts all IDs with grade>0. Duplicate IDs cannot multiply gain or recall. No-answer queries are excluded from NDCG/recall means (neither inflated to1nor unfairly divided by0) and reported separately as no-answer queries returning any result. Hard-filter violations are checked independently against frozen row metadata, including one matching runtime/version/tested-support tuple and unknown platform rejection. Targets0.75NDCG,0.90Recall and0violations are PRD proposals, not modified to match observations.

Every run records requested and actual retrieval modes, per-query returned IDs/metrics, model/interpretation/index versions and elapsed latency. A requested hybrid run that falls back is explicitly counted as lexical and is not proof of semantic coverage. Latencies are local wall-clock observations, including first-use cache effects; they are not production performance claims. The local ONNX model sees only the public metadata projection. No private captures or target code are sent anywhere.

Initial tuning baseline: lexical0.375NDCG/0.375Recall; first actual hybrid0.7974/0.7792, both0hard-filter violations and0no-answer queries returning results. Subsequent tuning changes and final heldout results belong in `docs/reviews/hybrid-search-evaluation/`; frozen labels remain unchanged.
