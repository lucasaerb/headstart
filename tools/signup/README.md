# HeadStart optional email signup

The homepage form records optional consent to HeadStart launch/product updates. It is not verified-email identity, sign-in, a download gate, bag synchronization or an email sender. No confirmation message is sent. The response confirms storage only. Successful duplicate submissions return the same response and preserve the first record per purpose.

Selecting **Play demo** asks for an email before revealing the original demo link, as explicitly requested by the user. This is unverified lead capture; direct upstream game URLs remain public. Demo access and product updates use separate immutable purpose records under the email HMAC directory. The updates checkbox starts unchecked. Demo-only submission creates no marketing record; later explicit updates signup adds consent without replacing the demo record. Existing homepage consent remains intact. The demo record retains only the first requested game, not a browsing history. An in-memory flag permits later demos during the current page session; no email is saved to browser storage. After durable save, an explicit Open demo link preserves the upstream URL and user gesture. Escape/cancel never auto-opens a game; failure keeps the form available for retry.

## Runtime and deployment

The Vercel project root remains `HeadStart-Starter-Package/site/dist`. Node 22+ and pinned `@vercel/blob` 2.8.0 are declared there. Run `npm ci`, then `node build.mjs`. The public output is an explicit static allowlist under `public/`; Vercel separately bundles `api/subscribe.js`. No server code, package/dependency files, local environment or owner tooling belongs in the public output.

Required server environment: `BLOB_READ_WRITE_TOKEN` for a **private** Blob store. Set `SIGNUP_HASH_SECRET` to a stable independent secret and `HEADSTART_ALLOWED_ORIGINS` to comma-separated exact HTTPS site origins. Vercel deployment/project origins are accepted from platform environment variables. Local development allows localhost:8767. Private writes are explicit; a missing token or wrong store fails without claiming a signup was saved. Do not expose these settings through browser JavaScript or a public environment variable.

Private record paths use domain-separated HMAC-SHA256 of a normalized email. Records contain the email, submitted consent text/version, server time, purpose, source and explicit unverified/not-sent state. No IP is stored in the signup. The rate limiter uses per-hour HMAC IP buckets and five atomic write slots; duplicate attempts consume slots. It is a distributed fixed-hour limit, not a complete anti-bot service. Configure Vercel firewall/bot protections if traffic requires stricter global limits. Expired Blob objects do not delete themselves; prune them with the owner command below. A new request can fit five slots on either side of an hour boundary.

Changing the HMAC secret changes signup lookup paths; preserve it during token rotation. Token-derived fallback exists for development/bootstrap, but switching from it requires a migration to preserve deduplication and deletion lookup. Do not rotate the production secret casually. Email normalization lowercases and trims the address without stripping plus aliases; address ownership remains unverified.

## Owner retrieval and deletion

These commands run from the repository root with the same private credentials in the operator's environment. Use Node's `--env-file` with an owner-only file outside this repository, or an equivalent secret manager. Never commit/export credentials. No public export/list/delete endpoint exists.

```sh
node --env-file=/private/path/headstart.env tools/signup/manage.mjs export /private/path/new-signups.json
node --env-file=/private/path/headstart.env tools/signup/manage.mjs delete person@example.com
node --env-file=/private/path/headstart.env tools/signup/manage.mjs prune-rate-limits
```

Export creates a new mode-0600 JSON file and refuses to overwrite an existing path; it does not print emails. Delete uses the same normalization/HMAC secret; it deletes both purpose records for that subscriber and can be repeated. Shell history may retain the delete email argument—use a private operator shell/session. The prune command deletes only expired rate-limit buckets, retaining the current and previous hour. Run it daily or after testing. Exports contain personal information; keep them outside source control and remove them when no longer needed. Future email sending requires its own reviewed consent/withdrawal workflow; this implementation does not send campaigns or claim an unsubscribe mechanism exists.

## Validation

```sh
node --test tools/signup/subscribe.test.mjs
node --check HeadStart-Starter-Package/site/dist/signup.js
```

Tests cover storage privacy, consent fields, validation, origin/method/type/size, duplicate concurrency, bounded concurrent rate slots and ambiguous write recovery. Browser and real private-storage checks belong in the independent review record; mocked tests do not establish a live write. Official references inspected: [private Blob storage](https://vercel.com/docs/vercel-blob/private-storage), [Blob SDK](https://vercel.com/docs/vercel-blob/using-blob-sdk). SDK source/types were also inspected for the pinned version; duplicate writes have no exported `BlobAlreadyExistsError`, so the handler confirms the exact private stored record instead of assuming an error class means success.
