# HeadStart production site

Production: https://headstart-virid.vercel.app/

Plugin installation and download: https://headstart-virid.vercel.app/plugin.html

The first production deployment on 10 September 2026 serves the independently reviewed static snapshot in commit `4a3bbc2` on `feat/plugin-discovery`. Follow-up `411bb7d` excludes a local catalog cache. Deployment ID: `dpl_H5z7SCKTavaqXcZQFyUbi3vZyAuF`; Vercel project `lucasaerbs-projects/headstart`.

Deploy only `HeadStart-Starter-Package/site/dist/`, using its `vercel.json`. The initial release was extracted from the staged snapshot to an isolated directory so concurrent workspace changes were not deployed. No server, database, website bag synchronization, code-remix service or royalty service is implied by this static deployment.

For subsequent authorized deployments, use a clean checkout of the intended revision, run relevant checks, and obtain the required independent review. From the site's `dist` directory:

```sh
vercel link --yes --project headstart --scope lucasaerbs-projects
vercel deploy --prod --yes --scope lucasaerbs-projects
```

CLI deployment is configured; automatic deployment from GitHub has not been configured. Keep `.vercel/` local. Preserve `downloads/headstart-plugin-0.3.0.zip` and its checksum unless producing a newly verified distribution. Review evidence is in [site-release.md](reviews/site-release.md).
