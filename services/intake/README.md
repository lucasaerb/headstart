# Bounded static source intake

Local curator interface for issue #9. No upstream scripts, manifests, install hooks or source code execute. Supported repository provider is public GitHub HTTPS; every request requires a full lowercase 40-character commit and an explicit list of selected source paths. Snapshot `tree_digest` describes **only the selected retained files**, not the repository's Git tree hash. Non-GitHub providers, mutable branches, credentials, archives and redirects are unsupported and rejected/excluded.

```python
from services.intake import Intake
intake = Intake('.local/intake')
job = intake.submit('https://github.com/gabrielecirulli/2048',
    '478b6ec346e3787f589e4af751378d06ded4cbbc', ['js/tile.js', 'LICENSE.txt'])
result = intake.run(job)
print(intake.status(job))
intake.close()
```

SQLite stores retry-safe jobs and normalize/snapshot/inspect stage, status, bounded error code, attempts, next retry and final report. A restarted running job can safely repeat work; complete jobs return stored results. Failures retry at exponential delays, up to three attempts, then dead-letter. Security/validation failures immediately dead-letter. `retry(job)` resets an explicitly selected job for manual retry. Analyzer cache keys combine selected-file tree digest and analyzer version. Blob filenames are SHA-256 digests; no upstream paths are materialized on disk. Reports retain pinned source paths, digests and source line ranges; README/code remain inert bytes and are never embedded as instructions.

Fetch security: raw.githubusercontent.com only, HTTPS with hostname/certificate validation, all DNS answers checked as globally routable, and the chosen numeric address is pinned to the TLS socket so the connect step cannot re-resolve. All redirects are rejected. No credentials are sent. Compressed HTTP responses and archives are never decompressed. Limits: 100 selected files, 256 KiB per response and 2 MiB total fetched per snapshot. Unsupported binary formats, dotfiles, likely credential filenames, detected credential strings and undecodable/null-containing content are excluded before blob storage and analysis. Error logs omit upstream exception messages. Detection is conservative pattern matching, not a guarantee to find every possible embedded secret; only curator-selected public files belong here.

The JS/TS analyzer records literal import/require references, line ranges, missing/out-of-subset imports, dynamic-import unknowns, literal asset paths and external service hosts (queries omitted). It is intentionally an approximation; comments can yield inert references and computed expressions remain unknown. `package.json` dependency/dev/peer/engine declarations are separated; physics package names are labeled, dev dependencies are build dependencies. Scripts are not copied into reports or run. package-lock `packages` entries are parsed as declarations; unsupported lock formats retain digests and explicit parser unknowns. License files remain evidence bytes and do not automatically establish rights clearance. Results do not create capabilities, tested compatibility or publication eligibility.

Tests: `python3 -m unittest discover -s services/intake/tests -v`. Real bounded evidence: `docs/reviews/batches/batch2-issue9-public-snapshot.json`. Source bytes for that local run live under `/tmp/headstart-intake-public-proof/blobs`; repeat the example to reproduce. GitHub network access is required for that demonstration, not the malicious-fixture suite.
