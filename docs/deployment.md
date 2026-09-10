# HeadStart production site

Production: https://headstart-virid.vercel.app/

Plugin installation and download: https://headstart-virid.vercel.app/plugin.html

Current production release: `2f059a5` on `main`. Deployment `dpl_3RuMfr5R1ZGFN5y3aYhUY54Z6mc8` removes the homepage updates signup, keeps the pre-demo email flow and remembered-browser preference, and makes **Continue with Astra** copy the selected Gauntlet Loop prompt while opening `https://chatgpt.com/`. The site states that prompt pasting is still required because automatic bag sync is not implemented. Independent review is recorded in [the combined Astra action review](reviews/astra-action/FINAL-COMBINED-REVIEW.md).

The earlier email release `4ec72c1` introduced `/api/subscribe` and private Vercel Blob storage (`headstart-email-signups`). Demo marketing consent remains optional and unchecked. It does not create a verified account or send email. Owner export/deletion instructions are in [tools/signup/README.md](../tools/signup/README.md); backend evidence is in [email-signup review](reviews/email-signup.md).

The first production deployment on 10 September 2026 serves the independently reviewed static snapshot in commit `4a3bbc2` on `feat/plugin-discovery`. Follow-up `411bb7d` excludes a local catalog cache. Deployment ID: `dpl_H5z7SCKTavaqXcZQFyUbi3vZyAuF`; Vercel project `lucasaerbs-projects/headstart`.

Deploy only `HeadStart-Starter-Package/site/dist/`, using its `vercel.json`. The initial release was extracted from the staged snapshot to an isolated directory so concurrent workspace changes were not deployed. The email release builds an explicit public allowlist into `public/` and separately bundles its API function; server/dependency/environment files are not public static assets. Website bag synchronization, code-remix and royalty services remain unavailable.

For subsequent authorized deployments, use a clean checkout of the intended revision, run relevant checks, and obtain the required independent review. From the site's `dist` directory:

```sh
vercel link --yes --project headstart --scope lucasaerbs-projects
vercel deploy --prod --yes --scope lucasaerbs-projects
```

CLI deployment is configured; automatic deployment from GitHub has not been configured. Keep `.vercel/` local. Preserve `downloads/headstart-plugin-0.3.0.zip` and its checksum unless producing a newly verified distribution. Review evidence is in [site-release.md](reviews/site-release.md).
