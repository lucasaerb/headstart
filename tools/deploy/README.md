# Full-site Vercel artifact

The previously reviewed local application now has a production adapter. This deploys the unchanged C4 static frontend, the existing Node `/api/subscribe` private-Blob function and the real Python read-only catalog API together. Local intake and curation stay offline operator commands, never public mutation routes.

Build from the repository root after the documented dependency/model setup:

```sh
.venv/bin/python tools/deploy/package.py /tmp/headstart-production-candidate
HEADSTART_DEPLOY_DIR=/tmp/headstart-production-candidate .venv/bin/python -m unittest tools.deploy.test_adapter
```

Choose a new artifact directory for each build. The command verifies public asset digests, reconstructs the evidence-gated snapshot from committed source data, verifies the exact pinned model hashes and primes only public metadata embeddings. `runtime/snapshot.json` records revision, snapshot digest and counts. Model binaries and artifacts remain outside Git. No `.env`, cursor key, development database or collected email is copied.

Deploy that artifact directory to the existing `headstart` Vercel project. Keep existing `SIGNUP_HASH_SECRET`, `BLOB_READ_WRITE_TOKEN` and `HEADSTART_ALLOWED_ORIGINS` production environment settings. Cursor signatures derive a purpose-separated HMAC key from the existing secret; a missing key fails closed. Validate the candidate's API, hybrid retrieval, public assets, downloadable plugin and private email persistence before assigning production domains. The catalog function denies mutations and never persists user data in SQLite. The bundled snapshot is durable as a versioned deployment artifact; its `/tmp` copy and vector cache are disposable. Catalog updates require a new reviewed build/deploy. Private signup storage remains in Vercel Blob.

Python source/data/model files are private function files; only `public/` is static. Function excludes remove all public media and Node dependencies from the Python bundle. Runtime dependencies are intentionally limited to jsonschema, numpy, onnxruntime and tokenizers with exact direct versions; Vercel resolves their dependencies for Python3.12/Linux. Confirm the actual remote build's installed dependency size and invoke the model before promotion.

Official contracts checked 2026-09-10: [Python runtime](https://vercel.com/docs/functions/runtimes/python) documents Python3.12 support, requirements.txt, `excludeFiles` and a500MB standard uncompressed Python bundle limit. [API-directory Python functions](https://vercel.com/docs/functions/runtimes/python/functions-api) describes the `BaseHTTPRequestHandler` export. We use the standard limit, with no large-function opt-in or external model API.

This adds no verified-email identity, automatic website bag connection, hosted source integration or royalty settlement. Those remain separate backlog work. Failures return honest errors or the already-implemented lexical fallback; neither is reported as successful semantic retrieval.
