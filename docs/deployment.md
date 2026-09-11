# HeadStart production site

Production: https://headstart-virid.vercel.app/

Plugin installation and download: https://headstart-virid.vercel.app/plugin.html

The restoration release is **promoted to production**. It packages source `636d2ce16748aab2e2205f5f99908112a6ba5b9e` in deployment `dpl_85QsyxKo6DDoTsHSs2c4RcSHHF1b` ([deployment](https://headstart-nqlvskhwm-lucasaerbs-projects.vercel.app)). It contains 92 research/display references, 52 public images and 32 eligible scoped versions. The previously visible 41 retain their exact order; the restored 51 follow. Discovery includes native games and explicit source, rights, media, demo and popularity unknowns without promoting reuse eligibility. [Restoration release evidence](reviews/catalog-restoration/PRODUCTION-RELEASE.md) tracks independent checks and promotion evidence.

The restoration implementation on main is `aef15b3`. The release was isolated from prior production source `3f893341cc69e961f0efb0e9ba806544a4e70978` to preserve hosted plugin, demo signup, Astra prompt and API scope; unrelated localhost authentication, handoff and operations features are not deployed by this release. The C4 living world and existing public flows are preserved. Source review does not establish tested integration.

Catalog database SHA-256: `49400c6fdec223df4dcab5fba3765eb40cd2f90068fe5616847d2be40cfc54f0`. The pinned MiniLM model and source evidence are private function files. SQLite and embedding cache copies in function scratch space are disposable; catalog updates require a reviewed deployment. No user data is stored there.

The prior deployment `dpl_8Z4HxboLH8A6YkD9sL7Z6FRsJECM` contained 41 references. Its [pre-promotion review](reviews/recent-vibe-games/RELEASE-CANDIDATE-REVIEW.md) and [post-promotion checks](reviews/recent-vibe-games/PRODUCTION-RELEASE.md) remain historical release evidence.

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

Historical September 10 release checks passed on the production domain: the homepage returned 200; `/api/research?limit=100` returned exactly 41 total/items in reviewed order with the recent IDs present; a P(DOOM) query ranked it first; and its deployed media was byte-equal to SHA-256 `25b3ddd858038a5bae291cb14208df396c0df95c063b695a0a342dddb5a8a8a2`. Candidate checks returned 400 for an invalid query, 405 for a mutation attempt, and 404 for a private path. The attempted headless-Chrome mobile capture was aborted and is not a passed check; local final screenshots and the pre-promotion deployed-asset review passed.

Restoration post-promotion checks passed: the public research API returns exactly 92 references in hybrid retrieval, with the original 41 in unchanged order and the restored 51 as the tail set. Live pagination returns eight pages of 12, 12, 12, 12, 12, 12, 12 and 8 records, covering 92 unique IDs. Public `catalog.js`, `index.html`, `app.js` and `detail.js` are byte-equal to the accepted candidate. Independent pre-promotion review passed against the actual remote desktop and mobile UI.
