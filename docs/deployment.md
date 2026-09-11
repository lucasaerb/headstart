# HeadStart production site

Production: https://headstart-virid.vercel.app/

Plugin installation and download: https://headstart-virid.vercel.app/plugin.html

The current catalog release packages source revision `3f893341cc69e961f0efb0e9ba806544a4e70978` in deployment `dpl_8Z4HxboLH8A6YkD9sL7Z6FRsJECM` (`https://headstart-h2n9addcc-lucasaerbs-projects.vercel.app`). This deployment is promoted to the production address above. The catalog’s final independent review is `d431559f9585158f4f60ca7f52b9c73f5a51d414`; [pre-promotion review](reviews/recent-vibe-games/RELEASE-CANDIDATE-REVIEW.md) and [post-promotion checks](reviews/recent-vibe-games/PRODUCTION-RELEASE.md) record the release evidence.

This release preserves the C4 living world, header plugin/GitHub links, walkthrough video, demo email collection and Astra prompt handoff. The snapshot contains 41 strictly gated research/display records and 32 eligible scoped versions. Each displayed game has pinned public source, an inspected open-source license, independently reviewed authentic media, positive dated GitHub stars, and a reachable browser-play URL. Source review does not establish tested integration.

Catalog database SHA-256: `998d05349a14c9dcb40c39b2fb87eb399e74b0d71f4e0fd62f158f1653e30dc4`. The pinned MiniLM model and source evidence are private function files. SQLite and embedding cache copies in function scratch space are disposable; catalog updates require a reviewed deployment. No user data is stored there.

Demo emails persist in private Vercel Blob (`headstart-email-signups`). Marketing consent is optional and unchecked; collection does not verify identity or send email. Owner export/deletion instructions: [signup management](../tools/signup/README.md). A synthetic candidate submission was verified in private storage with no marketing opt-in, then deleted. Automatic website bag sync, hosted source-code remix, verified identity and royalty services remain separate work.

## Deploying the full application

Use a clean checkout of the intended reviewed revision. Follow [development setup](architecture/development.md) for dependencies and the pinned model, then [artifact packaging](../tools/deploy/README.md). Deploy the generated artifact, not the static `site/dist/` directory alone.

```sh
.venv/bin/python tools/deploy/package.py /tmp/headstart-production-candidate
HEADSTART_DEPLOY_DIR=/tmp/headstart-production-candidate .venv/bin/python -m unittest tools.deploy.test_adapter
cd /tmp/headstart-production-candidate
vercel link --yes --project headstart --scope lucasaerbs-projects
vercel deploy --prod --skip-domain --yes --build-env VERCEL_SUPPORT_LARGE_FUNCTIONS=1 --scope lucasaerbs-projects
# After independent API, desktop/mobile and storage acceptance:
vercel promote <tested-deployment-url> --yes --scope lucasaerbs-projects
```

Keep `SIGNUP_HASH_SECRET`, `BLOB_READ_WRITE_TOKEN`, `HEADSTART_ALLOWED_ORIGINS` and `VERCEL_SUPPORT_LARGE_FUNCTIONS=1` in the Vercel project. The actual Python bundle exceeds the remote builder's standard limit and uses Large Functions beta with Fluid Compute. Do not change the model merely to bypass that limit. Keep generated artifacts, `.vercel/`, `.env` files and model binaries outside Git.

CLI deployment is configured; pushing GitHub does not automatically deploy. The project is `lucasaerbs-projects/headstart`. Candidate deployments retain Vercel protection and can be tested through authenticated `vercel curl`; promotion assigns the existing production domain. Only the explicit `public/` allowlist is static. Preserve plugin distribution checksums unless producing a newly verified distribution.

Post-promotion public checks passed on the production domain: the homepage returned 200; `/api/research?limit=100` returned exactly 41 total/items in reviewed order with the recent IDs present; a P(DOOM) query ranked it first; and its deployed media was byte-equal to SHA-256 `25b3ddd858038a5bae291cb14208df396c0df95c063b695a0a342dddb5a8a8a2`. Candidate checks returned 400 for an invalid query, 405 for a mutation attempt, and 404 for a private path. The attempted headless-Chrome mobile capture was aborted and is not a passed check; local final screenshots and the pre-promotion deployed-asset review passed.
