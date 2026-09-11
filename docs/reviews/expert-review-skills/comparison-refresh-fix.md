# Comparison refresh race — bounded CI and UI correction

Author: `reuse_plugin`. Requested alongside issue18 after GitHub Actions run34552876255 failed at `tests/dependency-details-ui.mjs` while scrolling a detached comparison field.

Cause: the Saved tab rendered immediately, then asynchronously checked current catalog metadata. If the user/test opened Compare before that request finished, completion called `savedView(true)`, replacing every comparison node and potentially resetting focus/scroll. Waiting for the initial text was insufficient because the pinned facts were identical before and after refresh.

The collection now marks the panel's refresh state with `aria-busy`, shares an in-flight refresh, and updates only the source-version status text when it completes. It preserves the active Saved/Compare controls and nodes. A `finally` clears busy state; failed metadata checks remain “Not checked.” Brief editing is not marked busy. No C4 assets, layout, style tokens or source facts changed.

The regression harness gates the **actual response** to the freshness request, opens Compare while refresh is pending, and releases that response after scrolling. It then asserts that the same dependency node remains connected, scroll is unchanged and busy clears. This deterministically reproduces the race without sleeps or retries. A separate503 fixture verifies failure cleanup. Desktop1440×1000 and mobile390×844 checks passed with Chrome. Captures are in `/tmp/headstart-dependency-race-fixed`.

Commands:

```sh
HEADSTART_CHROME_CHANNEL=chrome SCREENSHOT_DIR=/tmp/headstart-dependency-race-fixed node tests/dependency-details-ui.mjs
HEADSTART_CHROME_CHANNEL=chrome SCREENSHOT_DIR=/tmp/headstart-brief-refresh-regression node tests/brief-collections-ui.mjs
```

Independent reviewer acceptance is separate; this note records the author diagnosis and verification.
