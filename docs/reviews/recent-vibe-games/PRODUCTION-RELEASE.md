# Recent browser catalog — production release

The reviewed 41-game catalog was promoted to [production](https://headstart-virid.vercel.app/) from deployment `dpl_8Z4HxboLH8A6YkD9sL7Z6FRsJECM` at candidate URL `https://headstart-h2n9addcc-lucasaerbs-projects.vercel.app`. The artifact packages source `3f893341cc69e961f0efb0e9ba806544a4e70978`; its catalog database SHA-256 is `998d05349a14c9dcb40c39b2fb87eb399e74b0d71f4e0fd62f158f1653e30dc4`.

The release contains 41 research records, 41 display records, and 32 eligible scoped versions. Final catalog review is `d431559f9585158f4f60ca7f52b9c73f5a51d414`. The independent [pre-promotion review](RELEASE-CANDIDATE-REVIEW.md) passed before promotion.

Post-promotion checks recorded by the root release agent:

- Public home returned HTTP 200.
- `/api/research?limit=100` returned exactly 41 total records and 41 items in the reviewed order; recent catalog IDs were present.
- A P(DOOM) query returned P(DOOM) first. Its deployed gameplay media was byte-equal to the approved local file, SHA-256 `25b3ddd858038a5bae291cb14208df396c0df95c063b695a0a342dddb5a8a8a2`.
- Candidate negative checks returned HTTP 400 for an invalid query, 405 for a mutation attempt, and 404 for a private path.

The attempted post-promotion headless-Chrome mobile capture was aborted and is not reported as passed. Local final desktop/mobile captures and the pre-promotion deployed-asset review passed. This release does not establish gameplay integration testing, broader media reuse rights, verified identity, automatic source remix, royalty terms, or payment settlement.
