# Connect a prepared selection — localhost preview

HeadStart 0.5.0 keeps offline discovery as its default. The optional connection needs a **HeadStart source checkout running locally**, not merely the extracted plugin ZIP. It does not connect to the production website or send real verification email. Review `catalog_info` and the available tool schemas before using either mode.

## Prepare on the website

From the source checkout, initialize the catalog and start the local preview:

```sh
npm run catalog:init
HEADSTART_AUTH_DELIVERY=preview HEADSTART_AUTH_ORIGIN=http://127.0.0.1:8767 npm run dev
```

Open `http://127.0.0.1:8767/`. Browse reviewed systems, select an eligible exact component version, enter your intent and choose **Prepare agent handoff**. Sign-in preserves the selected version and brief. The browser gives a development preview reference. In a separate terminal in the same source checkout, run:

```sh
HEADSTART_AUTH_DELIVERY=preview python3 -m services.auth.cli preview PREVIEW_REFERENCE
```

Open the returned verification link in the **same browser**, then explicitly verify. This is development delivery, not proof of control over a remote inbox. Never paste that link, a one-time token or a cookie into an agent prompt. Resume and prepare the selection. Rights or dependency failures remain blocked; choosing a game is not a reuse license.

## Pair the coding client

In the same source checkout and with the same auth environment/database, run:

```sh
HEADSTART_AUTH_ORIGIN=http://127.0.0.1:8767 python3 -m services.auth.cli connect-mcp --file ~/.config/headstart/local-credential.json
```

This source-checkout command is not packaged in the ZIP. It creates a new mode0600 private file and prints a pairing URL. Open that URL in your verified browser and approve. It never asks for the credential in chat. Existing files are not overwritten: revoke the previous pairing by signing out, then explicitly remove only that old credential file before pairing again. Keep the credential outside your project and plugin folder.

Configure the **local stdio process environment** with `HEADSTART_CATALOG_ORIGIN=http://127.0.0.1:8767` and `HEADSTART_CREDENTIAL_FILE` pointing to the absolute private file path. Neither value is a credential itself; never put the file contents in configuration or conversation. Use the supported client configuration documented with the tested release. Start a fresh thread after changing mode, then ask:

> Use HeadStart to retrieve my prepared website selection. Keep its exact source versions, brief and constraints. Inspect and plan only; do not edit my project yet.

The agent calls `catalog_info`, then `get_selected_bag {}`. Your account's most recently **prepared eligible scoped selection** is retrieved automatically. Anonymous research-game bags remain browser-local. No manual source-URL paste is needed for the prepared selection. For an authorized request, `prepare_handoff {}` revalidates that bag and records/retrieves its metadata-and-notices packet. It does not deliver source bytes or apply an integration.

Agent-first public discovery needs no identity: `catalog_info`, `search_components` and exact `get_component` work without a credential. Preserve runtime/platform/rights/readiness constraints. Snapshot and live tools have different version arguments; never mix their IDs. See [live contracts](live-catalog.md).

## Connection and fallback

Only an actual client acknowledgment **and** successful compatible catalog response establish a plugin connection. The website cannot inspect your local Codex installation. Its service check is only an HTTP check; downloading or clicking it never marks the plugin installed.

- **Service offline:** restart the configured localhost server and retry. The live connector does not substitute stale snapshot data. To return deliberately to offline research, remove the two connection environment settings and start a new thread.
- **Expired or denied pairing:** sign in again, create a new credential file and approve it in the browser. Sign-out revokes its child pairing. Do not request a token in chat.
- **Unsupported contract:** update compatible plugin/service versions together or return to the prior complete archive; never mix files or reinterpret a mismatched version as current.
- **Workspace denied:** retain the plan and ask the user to select an accessible intended workspace. Do not escalate permissions or upload private target files as a workaround.
- **Unsupported client:** use the website's authenticated **Download Markdown / Download JSON** buttons after preparing a handoff. Each download rechecks the session and scope. The anonymous Gauntlet planning prompt contains public metadata only and cannot bypass this gate. Neither fallback starts an agent or claims automatic connection.
- **Rollback:** keep the prior 0.3.0 archive. Remove only HeadStart, select the old archive's marketplace and re-add it using its README, then start a fresh thread with connection settings removed. Version 0.3.0 supports six skills and offline discovery only; current prepared packets remain on the local service, not silently consumed by an incompatible plugin.

Both modes use the host agent for selected-target inspection and authorized writes. Preserve the packet digest, bag revision, selected component/source versions, brief, constraints, rights/notices and actual validation through Find → Inspect → Plan → Integrate → Validate → Credit. A passing build alone is not gameplay evidence. No hosted remix, automatic royalty terms, payment or settlement is supplied.
