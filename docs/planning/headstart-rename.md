# Adopt HeadStart throughout active product surfaces

User explicitly requested replacing the old Playparts name with HeadStart.

- Rename the plugin directory, manifests, marketplace package and six skill identifiers to headstart-plugin/headstart-*.
- Update active commands, links, distribution builder and installation instructions; rebuild a portable package.
- Migrate both catalog schema copies from urn:playparts:catalog-record:0.1 to urn:headstart:catalog-record:0.1. Data fields and schema_version remain unchanged; consumers registering the previous URI must register the new URI.
- Install the new package and remove the old active installation only after the new one installs successfully. Preserve unrelated plugins and configuration.
- Independently verify package tests, six enabled skills, real catalog calls and fail-closed handoff under the new identity.
- Preserve archived specifications, original mockups and prior review transcripts as historical evidence; do not rewrite their observations or digests.

The app already displays HeadStart, so this migration changes no catalog layout or artwork. Plugin 0.3.0 marks the breaking public identifier rename. Review: docs/reviews/headstart-rename/.

Status: independent PASS; see [review receipt](../reviews/headstart-rename/REVIEW.md).
