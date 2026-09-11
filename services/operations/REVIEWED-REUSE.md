# Reviewed reuse aggregate adapter

`EventStore.ingest_reviewed_references(repository_root, authorized=True)` is an explicit local operator action. It is disabled unless local collection is enabled. It is not reachable through the interaction-event API and accepts no client claim of verified reuse.

The initial trust registry pins the exact independent review document and receipt from commit `e937b30`. It validates all ten accepted author validation/attestation/recipe bindings, source and target revisions, complete successful baseline/integrated desktop/mobile reports, actual check/log relationships and all retained screenshot/log bytes. Missing, changed, oversized or symlinked evidence fails before any aggregate is inserted. Supporting another reviewed bundle requires a reviewed adapter update; changing a reviewer label or inventing a receipt cannot establish acceptance.

Only opaque evidence keys, the public acceptance digest and ingestion timestamp enter the private aggregate table. No target path, target identifier, source code, brief, capture, email or user identity is persisted there. Replay deduplicates; entries expire after30days. This is a registry of historical accepted evidence within its retention window, not a current-source-health claim.

After explicitly ingesting the supplied accepted matrix, `verifiedReuse` is10 and `verifiedReuseScope` is `reviewed_reference_integrations_not_user_adoption`. These ten authored reference integrations are **not ten user successes**, customer adoption, downloads or self-reports. Before activation the value remains null. Existing interaction counts and `reuse_self_reported` stay separate. No public or production ingestion runs automatically.

Author verification: nine event/adapter tests pass with the actual accepted matrix, including replay, retention, disabled activation, private-field absence, altered/self-authored review material, modified source-plan/validation/attestation/log/capture, missing evidence, symlinks and bounds. The adapter reads reviewed evidence; it does not rerun or reapprove the matrix. Independent review of this adapter is required separately.

```sh
python3 -m unittest discover -s services/operations/tests -p '*events.py' -v
```
