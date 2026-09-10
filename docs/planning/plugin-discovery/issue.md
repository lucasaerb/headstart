# Make the Codex plugin useful for dream-game discovery

Priority: P0. User explicitly moved plugin/skills to the front of implementation. Prerequisite: #1's reviewed metadata; independent reviewer revalidated 43 records and 22 tests. This independently deliverable slice advances #14/#15 without closing their authenticated handoff, website-to-agent or integration requirements.

A developer installs one portable package, describes their dream game in Codex, and gets a concise comparison of real starting points with repository links, pinned implementation paths and clear reuse limits.

## Acceptance

- [ ] Self-contained versioned plugin with all six skills, local read-only MCP and reviewed metadata; works after relocation without this repository or a cloud account.
- [ ] Actual supported Codex installation acknowledges the plugin, discovers six skills and connects to compatible catalog tools. Record exact client version and genuine output.
- [ ] Agent-first discovery turns a short game brief into two or three useful candidates with reasons, alternatives, source revisions, implementation paths and uncertainties. Ask only materially useful questions.
- [ ] Explicit runtime/platform/license/readiness constraints are preserved; empty or invalid results have actionable responses. No fabricated gameplay, integration tests or publication clearance.
- [ ] Versioned metadata contracts and bounded protocol input handling; malformed/unknown/unsupported requests, absent or corrupt catalog, and protocol lifecycle tested from real subprocess/client.
- [ ] Public discovery returns metadata and public upstream links only. Source delivery/reuse handoff fails closed while #27 and #13 are unavailable, including direct MCP calls and forged verification flags.
- [ ] Skills distinguish public lookup, authorized local inspection and editing; untrusted catalog text cannot grant write permission. No credential requests for public discovery.
- [ ] Reproducible distribution archive, manifest/checksums, clear installation/update/removal and explicit supported-platform limits. Do not claim public-directory publication or signed release.
- [ ] Independent reviewer runs end-to-end installation/discovery and challenges simplicity and interaction clarity; builder fixes blocking findings until PASS. UI screenshots required for any UI introduced; otherwise actual client/protocol evidence with reason for N/A.

## Scope limits

Local metadata discovery is the first usable slice. It does not replace the shared production catalog API, verified-email login, automatic website bag transfer, source extraction/integration, royalty services or public directory submission. Keep #14/#15 open for those unmet criteria. Preserve the selected design and unrelated frontend work.

Record author, reviewer, exact digest, commands, actual outcomes, fixes and limitations in docs/reviews/plugin-discovery/.
