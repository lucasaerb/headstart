# Comparison refresh race — independent targeted review

**PASS** at `1daf49faa774018d84cfef609d1fbc86cfa08b00`. Reviewer `reuse_handoff`, author `reuse_plugin`.

Inspected the source change and deterministic regression. The original asynchronous Saved freshness lookup replaced the active comparison after the user switched tabs. The fix shares the pending request, marks its status accessibly, and refreshes only matching status text. Completion no longer destroys the comparison subtree, input state or scroll position. Brief editing clears its busy state; failed lookups remain unknown and `finally` clears busy. No timers, retries or weakened assertions hide the race.

Independently ran both browser suites with installed Chrome and separate evidence directories:

- `SCREENSHOT_DIR=/tmp/headstart-review-dependency-race node tests/dependency-details-ui.mjs`: desktop/mobile PASS. The test holds an actual catalog response until Compare is open and scrolled, then verifies the original dependency node remains connected, scroll is unchanged and busy clears. A separate 503 fixture verifies failure cleanup.
- `SCREENSHOT_DIR=/tmp/headstart-review-brief-race node tests/brief-collections-ui.mjs`: desktop/mobile PASS.

Inspected fresh desktop comparison and mobile dependency captures. Existing navy typography, blue outlines, pale panels and C4 background remain consistent with the selected C4/C2 visual baseline recorded in `batch3-subset-review.md`; the change adds no layout or artwork. Mobile dependency text wraps within the scrollable dialog. The mobile capture is intentionally scrolled, not evidence of a missing heading or close control. The patch preserves pinned source facts and explicitly unknown dependency resolution.

This verifies the reproduced browser race and bounded correction. It does not claim a subsequent remote CI run has completed.
