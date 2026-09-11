# Linux browser startup correction

CI run 34558256962 passed the integration matrix but the health worker exited before its first page request on Linux AMD64. The launch was outside the error handler, so it returned only `worker_failed` with no startup category.

The worker now gives Chromium an explicit minimal environment with writable XDG configuration/cache paths in the existing disposable `/tmp` mount. It does not change the user's HOME or mount host configuration. Startup failures return a fixed category; raw Chromium diagnostics, URLs and paths are not emitted. Container network, permissions, resource limits and source mounts are unchanged.

The real Docker positive/negative interaction and report-persistence fixture passed locally after this change, with evidence `/tmp/headstart-health-xdg.json`. Linux AMD64 CI confirmation remains required; the previous log did not retain Chromium stderr, so the exact original startup error was not observable and the writable-profile diagnosis remains an inference.
