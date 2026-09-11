# Local verified-email access

This adapter is localhost-only. It never sends email or consumes production credentials. Hosted delivery remains unavailable and fails closed, including HTTPS origins; a future hosted adapter must provide durable shared auth storage, real email delivery and Secure cookies. Demo email preferences never establish verified identity.

Run from repository root:

```sh
HEADSTART_AUTH_DELIVERY=preview HEADSTART_AUTH_ORIGIN=http://127.0.0.1:8767 npm run dev
```

Open `http://127.0.0.1:8767/auth.html`, or request a handoff from a selected source system. Submit an address. Read the development-only delivery using the displayed opaque preview reference:

```sh
HEADSTART_AUTH_DELIVERY=preview python3 -m services.auth.cli preview PREVIEW_REFERENCE
```

Open that link **in the same browser**. The token is in its fragment, removed immediately before interaction; verify by explicit POST. The local preview simulates delivery for development, not actual remote email control. Never commit or share `.local/auth-preview` or the local database. Preview files and database are mode0600, preview directory0700. Authentication URLs are displayed only by this explicit local operator command, never HTTP responses/logs.

Protected services use `services.auth.store.authorize(db, credential, purpose, kind)` on **every** generation and delivery. Identity comes from immutable random account id and server verification/session state. This does not resolve rights or authorize local edits. Revoked/expired credentials reject. Public catalog routes remain untouched. First-party plugin packages contain tool code and metadata, not platform source exports.

Browser POSTs require exact configured Origin and JSON; authenticated mutations also require session CSRF. Cookies are HttpOnly, SameSite=Strict, path/, bounded86400sec; only this explicitly configured loopback HTTP exception omits Secure. Challenges expire600sec, have256-bit tokens, browser binding, max5 attempts, atomic consumption, resend supersession, account+client throttles. New verification rotates/revokes the prior browser session and its MCP children. Authentication state contains no marketing consent.

Return intents allow only account, prepare_handoff and download_source. Only minimal immutable selections and digest survive server-side; the editable brief stays local. Auth returns `requiresScopeRevalidation:true`; the consuming handoff must revalidate the exact revision and source rights before continuing. Authentication itself never creates a source artifact.

## Local stdio MCP authorization

```sh
python3 -m services.auth.cli connect-mcp --file ~/.config/headstart/local-credential.json
```

The command refuses to overwrite existing files, writes a random inactive credential mode0600, and prints a noncredential pairing request link. Open in the verified browser and explicitly approve. Credential then authorizes local MCP for at most one hour, tied to parent session. Sign out revokes it. The plugin reads this file directly using its supported local stdio configuration; never paste its content, cookies, or verification links into model prompts. This is a local credential bridge, **not an OAuth implementation** or hosted client support. Pairing is single-use and expires10min. No client credential is returned through browser JavaScript.

Tests: `python3 -m unittest discover -s services/auth/tests`, `node --test tools/dev/auth-handler.test.mjs`, `HEADSTART_CHROME_CHANNEL=chrome node tests/auth-ui.mjs`.

Security references consulted: [OWASP token guidance](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html), [session management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html), [CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).
