# Local hybrid retrieval

The existing catalog API now fuses lexical and semantic candidates **after** eligibility and hard runtime/version/platform/rights/readiness filters. Research metadata remains on its separate endpoint. Nothing here retrieves source bytes, writes into a target project, uploads private inputs, verifies identity or proves an integration.

## Optional setup

Ordinary `requirements-dev.txt` installation needs no model. Missing dependencies/files return a deterministic original-query lexical fallback with `retrieval.mode=lexical` and a machine-readable reason. To enable local semantics:

```sh
.venv/bin/python -m pip install -r services/retrieval/requirements.txt
.venv/bin/python -m services.retrieval.setup
.venv/bin/python -m unittest discover -s services/retrieval/tests
```

`setup` explicitly downloads approximately 91 MB from immutable Hugging Face paths and verifies pinned byte sizes and SHA256. Query handling never performs network I/O. All inference runs locally on CPU with the pinned official `sentence-transformers/all-MiniLM-L6-v2` ONNX model, revision `1110a243fdf4706b3f48f1d95db1a4f5529b4d41`. See `model-manifest.json` for exact artifact digests. Mean pooling masks padding, followed by L2 normalization; 384 dimensions, maximum 256 wordpieces. Dependencies are separately pinned. Optional model files and derived vectors live under ignored `.cache/retrieval/`; `HEADSTART_EMBEDDING_DIR` and `HEADSTART_EMBEDDING_CACHE` override local paths. Corrupt/version-mismatched model or embedding data produces an explicit lexical fallback, never a pretend model result. Delete an invalid derived vector cache explicitly to rebuild it.

Primary contracts checked 10 September 2026: [official model card](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2), [ONNX Runtime Python API](https://onnxruntime.ai/docs/api/python/api_summary.html), [Tokenizer API](https://huggingface.co/docs/tokenizers/api/tokenizer). The model card declares Apache-2.0; setup retains its pinned copy alongside weights. Those rights do not change game/source licenses.

## Search contract and ranking

`retrieval=hybrid|lexical` and `interpret=on|off` are optional query parameters on both existing search surfaces. Defaults request hybrid and recognized aliases. Browser **Use exact words** disables both; **Edit search** keeps the original query editable. `retrieval` response metadata records actual mode, fallback, model/text/interpretation/ranking version, weights and embedding index identity. Exact title/repository/alias, explicit source-path and existing typo recovery retain their precise lexical lookup behavior. Empty browsing retains deterministic ordering.

`aliases.json` separates capability hints from style hints. Neither becomes a hard constraint or a tested-support claim. The original query is retained. Text projection is an explicit public metadata allowlist: title, aliases, summary/capabilities, then module names and first two factual scope notes. Repeated legal boilerplate, source contents, private captures and notices are excluded from embeddings. Research projects use their separately labeled public descriptions/building-block notes.

Proposed ranking v1: cosine candidate floor 0.25, reciprocal-rank constant 20, lexical weight 0.65 and semantic weight 0.35. Exact identities receive precedence. Candidate lists fuse by immutable record identity. Each parent receives up to two places on the first pass; remaining candidates follow and remain paginated. This promotes parent diversity without dropping valid versions. Cache/cursor keys include the actual retrieval configuration and fallback/index state, so model availability changes cannot silently switch results underneath an old cursor. No visitor preference is silently relaxed.

## Evaluation

The separate foundation author froze 100 graded judgments before tuning: `evaluation/freeze.json`, 50 tuning and 50 heldout. Corpus: 30 source-reviewed components in two upstream repositories, not a broad game benchmark. Labels and corpus cannot silently change; the runner checks their hashes and refuses overwriting results. See `evaluation/README.md` and `docs/reviews/hybrid-search-evaluation/` for every query, metric, latency, tuning iteration and freeze.

Heldout results after one frozen configuration: 40 answerable queries yield lexical NDCG@10 / Recall@20 **0.375 / 0.375**, hybrid **0.9503 / 0.9583**, with **zero hard-filter violations**. The ten no-answer queries are excluded from those means and reported separately: hybrid returned related suggestions for **2/10**; lexical returned none. These are false-positive coverage limits, not supported capabilities. Geographic and simulation/RTS full systems are still absent from the eligible corpus. Scores demonstrate this narrow judged task only. Local warm-process observed median hybrid latency 9.70 ms, p95 10.96 ms (Python 3.14, macOS ARM64, ONNX CPU, cached model/vectors); these exclude browser/network overhead and are not deployment latency claims.
