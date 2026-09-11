# Target-aware recipe planning — independent draft slice

Issue19's three candidate composition templates are authored against the exact reviewed Three.js0.186.0 source map and source commit5c5a575bd8cc0cf440026ce8dcf6a77862067684. They propose an overhead cozy builder, first-person island exploration and free-flight landscape exploration. Each keeps exact source files/digests, dependency closure, creator/rights notes, explicit missing game systems, suggested visual settings and an alternative.

These files are **inactive planning data**, not canonical bound Recipe records, recommendations served by the site or tested compositions. `targetBinding`, `combinationValidation` and `performance` remain null. A canonical v0.2 Recipe requires an actual target commit, applicable adapter and versioned brief; no fabricated target commit or borrowed single-component test is supplied here. The versioned template format is a distinct internal planning contract (`headstart-recipe-template-1`) with its own digest, not a silent change to the normalized Recipe schema.

#16 currently supports only simplex-terrain-1 with one exact SimplexNoise source in a controlled terrain-heights target. That evidence cannot validate these multi-component assemblies. #17/#18 independent acceptance precedes activation. The intended recommendation implementation must apply explicit runtime/version/platform/rights/readiness constraints before explaining fit, resolve every component against the current eligible catalog, preserve unknown measurements, and carry the immutable template/brief/rationale into a protected planning handoff. It must not imply the existing local integration runner can execute an unsupported composition.

No extra third-party artwork, target code, source export, network service, renderer or physics world is introduced by these candidate files. C4 remains the design baseline for a later additive UI.


`planning.py` is a pure, inactive recommendation implementation. It verifies template and source-map digests, applies explicit target constraints before preference matching, checks current component eligibility and scoped rights, and returns three labeled reasons plus an eligible alternative. An explicit recipe readiness filter above `candidate` produces an empty result: source-reviewed parts do not establish source-reviewed or tested assemblies. No semantic retrieval or measurement is claimed by these transparent preference rules.

Run the focused rules checks with:

```sh
.venv/bin/python -m unittest discover -s services/recommendations/tests -v
```

The tests use small metadata projections assembled from the pinned templates to exercise ranking and exclusions. They do not replace independent inspection of the actual source, rights or dependency records. Integration and UI acceptance remain pending.
