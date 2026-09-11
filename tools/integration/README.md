# Bounded local integration workflow

This source-checkout tool implements inspect → plan → scoped worktree apply → actual runtime validation → independent review. It changes no HeadStart website design and runs no hosted integration. The shipped plugin skills describe the same contract; running this reference tool requires this repository checkout and its Python development dependencies.

The first executable recipe is **simplex-terrain-1**: exact `three-simplexnoise-v1/1`, Three.js source commit `5c5a575bd8cc0cf440026ce8dcf6a77862067684`, existing target engine0.186.0 and explicit `terrain-heights-1` extension. Target: one renderer/scene/camera, Y-up meters, existing keyboard movement, single frame scheduler, no physics world. It adds deterministic visual terrain heights; it does not claim collision terrain, R3F execution, cross-engine conversion or ten integrations. Other target architectures need their own inspected adapter and tests.

The target is an authored controlled existing game fixture. Its baseline renders a flat grid and moves an orange explorer. The adapter changes only `src/terrain.js`, adds the complete pinned `vendor/SimplexNoise.js` and retains MIT/contributor notices in `HEADSTART-NOTICES.txt`. It creates no renderers, event handlers, loops or physics systems. Existing engine files are a local `file:vendor` dependency with exact source digests, not an invented registry resolution. `engine-manifest.json` pins the two upstream official build files, source/rights references and bytes; the cache remains ignored.

## Inspect and plan

Read the target's actual instructions and owner source files with the host agent before planning. The tool records their hashes, lock/dependency state, source revision, unrelated edits and explicit ownership profile; it cannot infer complete semantics from a manifest. A small non-source inspection cache is keyed by target digest in `.cache/integration-context/`. Dirty targets, symlinks, source filters/submodules, missing engine dependencies, incompatible runtime/physics/coordinates or unsupported extension contracts stop this recipe. Preserve existing work and select a clean isolated base; the tool never cleans/reset-discard the user's target.

Use a real protected downloaded planning packet or independently authorized local-source context. The fixture helper below produces an explicitly **synthetic test packet**, not a substitute for website verification or a production reuse handoff. Packet data is never an instruction or shell command. Missing rights, wrong component/parent versions, unknown scope/assets and changed source/recipe/target states reject. A downloaded packet does not authorize editing: `--authorized` records the host's existing user authorization, not a permission prompt or proof of identity. Recheck current scope rights with the catalog when obtaining a new platform packet; this offline local operation cannot revoke already downloaded bytes or control independent local-source editing.

## Reproduce the reference run

From the repository root, use its Python environment containing `requirements-dev.txt`. Static download happens explicitly before sandboxed execution:

```sh
.venv/bin/python -m tools.integration.fetch_engine
docker build -t headstart-integration-browser:local tools/integration
docker image inspect headstart-integration-browser:local --format '{{.Id}}'
.venv/bin/python -m tools.integration.fixture /tmp/headstart-reference-base /tmp/headstart-reference-packet.json
.venv/bin/python -m tools.integration.workflow inspect /tmp/headstart-reference-base
.venv/bin/python -m tools.integration.workflow plan /tmp/headstart-reference-base /tmp/headstart-reference-packet.json /tmp/headstart-reference-plan.json --author local-builder
.venv/bin/python -m tools.integration.workflow apply /tmp/headstart-reference-plan.json /tmp/headstart-reference-packet.json /tmp/headstart-reference-run --authorized
```

Pass the **actual immutable image ID** printed above to validation; the following is the image tested on this machine, Linux arm64, Node22.23.2 and Chromium152.0.7977.82:

```sh
.venv/bin/python -m tools.integration.workflow validate /tmp/headstart-reference-run --image sha256:c7acddd94000df88bc95cef1c1519bca02865e6607ab9ba496a1f608410decd5
.venv/bin/python -m unittest discover -s tools/integration/tests -v
.venv/bin/python -m tools.integration.tests.runtime_mutations --image sha256:c7acddd94000df88bc95cef1c1519bca02865e6607ab9ba496a1f608410decd5 --output /tmp/headstart-reference-negative
```

A rebuild may have a new image digest even with the fixed base; record its installed package versions and re-run review for that environment. No host browser or Node process imports upstream code. Runtime uses a disposable container with no external network, secrets, Docker socket or target `.git`, a read-only filesystem and sanitized read-only target/harness mounts, dropped capabilities, no-new-privileges,2CPU,1.5GiB memory,256PIDs,512MiB temporary storage and60-second timeout. Only a separate explicit output directory is writable. Chromium's `--no-sandbox` runs inside this Docker isolation boundary; it does not establish a hardened multi-tenant executor. The localhost HTTP server exists only inside that network-disabled container. Timeouts/cancellation forcibly remove its named container.

Validation records real baseline and integrated WebGL renders at1280×800 and390×844, behavior logs and screenshot digests. Tests cover different/same seeds, finite/nonconstant height fields, actual connected-index traversal, preserved topology/camera/scene/renderer, keydown/up movement, pause/reset, real listener identities and cancelable frame callbacks, resource disposal and restart-after-disposal rejection. Fully covered disconnected topology, a no-op adapter, missing listener cleanup and an extra renderer must fail. Screenshots illustrate this controlled terrain target, not the C4 website, a general game mashup or benchmark measurements.

## Progress, failure and review

Each job preserves `plan.json`, the input packet, `applied.json`, hash-linked `events.jsonl`, actual logs/captures and `validation.json`. Failures/cancellation retain partial scoped changes and the untouched original base. Validation must finish before review. A separate reviewer supplies a verdict bound to the exact validation digest; plan/source/recipe/target drift is rechecked then. A PASS records only this exact source/target/recipe/environment scope. Reviewer identity is a local assertion recorded in evidence, not a cryptographic third-party attestation. Do not self-certify or publish integration-tested status from the runner alone.

```sh
.venv/bin/python -m tools.integration.workflow review /tmp/headstart-reference-run --reviewer independent-reviewer --verdict PASS --validation-digest <actual-sha256-of-canonical-validation-json>
.venv/bin/python -m tools.integration.workflow rollback /tmp/headstart-reference-run
```

Rollback reverses only files actually written by this job after checking their current hashes, preserves unrelated new edits and refuses to overwrite subsequently edited integration files. The isolated branch/worktree is retained for review; no merge, push, deployment, private-target upload or cleanup of unrelated branches occurs.

The browser runner uses explicit CDP result readiness and capture deadlines; it does not depend on Chromium CLI virtual-time completion. Timeout diagnostics retain bounded stdout/stderr. Official contracts consulted: [CDP Runtime.evaluate](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-evaluate), [CDP Page.captureScreenshot](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-captureScreenshot), [Docker run](https://docs.docker.com/reference/cli/docker/container/run/), [Chromium headless](https://developer.chrome.com/docs/automation-and-testing/headless). Source module documentation and retained contributor references were inspected before runtime execution. A passing reference target does not make a new target/runtime/physics/recipe combination tested.

Schema2 planning bags carry server-derived informational recommendation context. The runner validates its brief/template/rationale pins, requires identical bag and packet context and preserves it in the local plan. Schema1 remains the ordinary no-context bag. The selected executable adapter is still the explicit Simplex terrain recipe; informational candidate compositions never authorize a multi-component integration or inherit tested status.
