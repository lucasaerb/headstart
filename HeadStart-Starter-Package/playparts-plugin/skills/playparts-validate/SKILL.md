---
name: playparts-validate
description: Verify a game building block integration against the target build, requested behavior, preserved systems, lifecycle and license notices.
---

# Validate

Use [validation guidance](../../references/validation.md). Run checks that establish the requested behavior: existing target checks plus focused capability validation. Record actual commands or checks, source/target revisions, environment, results and limitations. Never report a check as passed because a code change looks plausible.

For a camera, exercise follow, reset, pause and disposal while checking original controls. For a generator, test deterministic seeds and structural invariants. Compare performance only using an actual baseline and the same measurement profile. A successful build is not proof of correct gameplay.

Separate passed, failed, blocked and not-run checks. Failures do not erase the useful patch; preserve a reviewable result and explain how to reproduce. A local report is local evidence, not a catalog-issued integration attestation. Read [integration record](../../references/integration-record.md) for the result format. Stop repeated testing when the required checks pass and no new concerns justify it.
