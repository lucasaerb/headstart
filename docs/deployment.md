# HeadStart production site

Production: https://headstart-virid.vercel.app/

Plugin installation and download: https://headstart-virid.vercel.app/plugin.html

The full catalog release packages source revision `7a3a587bef353810dfdb3d08e784de3c4323ca25` in deployment `dpl_Bj9R1Rhi4KhU9WVg34KMYQ2oBXiQ` (`https://headstart-fzfbzcdil-lucasaerbs-projects.vercel.app`). This deployment is promoted to the production address above. Independent acceptance is recorded in [production review](reviews/production-catalog-release.md).

This release preserves the C4 living world, header plugin/GitHub links, walkthrough video, demo email collection and Astra prompt handoff. It adds the reviewed catalog backend, scoped details, filters, comparisons, editable brief/collection and real local-model semantic retrieval. The snapshot contains 76 research references and 32 eligible version records (30 components and two project versions). Source review does not establish tested integration.

Catalog snapshot SHA-256: `4467e8045e51f564e43a9f8348ee396ee8d26ae2ba28ee19a0d96707c7863cc4`. The pinned MiniLM model and source evidence are private function files. SQLite and embedding cache copies in function scratch space are disposable; catalog updates require a reviewed deployment. No user data is stored there.

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

Post-promotion public checks passed on the production domain: homepage, plugin page, real hybrid research query, `/v1/search` and project details returned 200; private runtime database returned 404. Independent acceptance was committed in `13ba515`.
