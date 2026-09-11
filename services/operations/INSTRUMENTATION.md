# Optional local plugin and planning outcomes

The checkout-only wrapper observes completed actions from the actual unchanged HeadStart MCP server and local integration planner. It records `plugin_lookup` only after a successful `search_components` or `get_component` tool result, and `first_plan` only after the real planner accepts the target/source context and writes its plan. Failed tools, rejected plans and failed writes do not count. The first successful plan deduplicates per local consent identity within the retention window. A plan is not verified reuse.

This is a separate **local opt-in**, not the website's browser consent. Normal packaged plugin execution collects nothing through this wrapper. To opt in, create a private directory and generate the consent token locally; never paste a token into prompts:

```sh
python3 - <<'PY'
import json, os, secrets
from pathlib import Path
directory = Path.home() / '.headstart-outcomes'
directory.mkdir(mode=0o700)
fd = os.open(directory / 'consent.json', os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
with os.fdopen(fd, 'w') as handle:
    json.dump({'version': 1, 'consent': True, 'deletionToken': secrets.token_hex(32)}, handle)
PY
export HEADSTART_TELEMETRY=1
export HEADSTART_TELEMETRY_CONSENT_FILE="$HOME/.headstart-outcomes/consent.json"
export HEADSTART_TELEMETRY_DATABASE="$HOME/.headstart-outcomes/events.sqlite3"
```

Run from this repository checkout with its Python environment. For an explicitly configured MCP client, use the absolute Python executable as its command and the absolute path to `services/operations/instrumented.py` followed by `mcp` as its arguments, with the three environment values above. This absolute-script entry works independently of the client's working directory. Existing optional `HEADSTART_CATALOG_ORIGIN` and private credential-file configuration keep their original behavior. This wrapper supports the existing offline snapshot or configured localhost catalog; it does not claim an installation acknowledgment or silently edit client configuration.

```sh
.venv/bin/python -m services.operations.instrumented mcp
.venv/bin/python -m services.operations.instrumented plan /path/to/target /path/to/packet.json /path/to/plan.json
```

Only a random event key, keyed deletion subject, category and timestamp enter the private SQLite database. No query, source content, target path, plan digest, tool arguments, raw response, email or credential is stored. Mode0600 files and an owned mode0700 database directory are required. Missing consent, disabled collection or unsafe configuration leaves the action usable and collection disabled. Optional storage failures do not turn completed product actions into failures. Client-submitted `plugin_lookup` and `first_plan` events are rejected by the ordinary event API; only the internal successful-action boundary can record them.

Delete this local identity's events and disable its consent, including after the environment opt-in has been removed:

```sh
.venv/bin/python -m services.operations.instrumented forget
```

Keep the two private file-path environment variables available for deletion. `forget` prints only the deletion count, never the token. The original30day retention applies. The separate reviewed-reference registry contains no user identity and is not user adoption.

Actual tests initialize and call the stdio MCP server, assert a successful lookup and failed lookup produce exactly one event, create real accepted/rejected local plans, check failed output writes, opt-out, private permissions and deletion. Tests require the existing pinned engine cache (`python -m tools.integration.fetch_engine`) for the real target inspection; they execute no upstream code and need no Docker.
