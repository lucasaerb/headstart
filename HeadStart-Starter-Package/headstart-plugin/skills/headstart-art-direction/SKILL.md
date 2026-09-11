---
name: headstart-art-direction
description: Review a selected game's visual coherence and produce an editable, evidence-backed art guide tied to its brief, source versions and integration record.
---

# Art direction

Read [the shared review rubric](../../references/review-rubric.md) and only its art section, then inspect the selected brief, source versions and integration record. Resolve the user's actual visual references and capture or view the running target with available host tools. A screenshot is evidence of that rendered state, not code rights or measured performance. If screenshots are unavailable, say so and label source-only visual hypotheses; never describe an unseen image.

Return an **editable Markdown guide** with the brief and target/source context, reference/capture paths and digests, desired experience, palette roles, silhouettes and geometry, camera/composition, lighting/contrast, materials and texture density, motion/animation, and 2D/3D/asset-authoring choices. For each choice give an observable reason, an alternative and a tradeoff. Label aesthetic preference as editorial judgment; no universal preference for realism, low-poly or 3D is warranted.

Identify concrete mismatches by image region and source file/line when the implementation is inspected: for example, a neon high-gloss object interrupts a muted matte scene. Distinguish that evidence from the subjective decision to unify it. Treat placeholders, intentionally contrasted gameplay signals and accessibility cues thoughtfully rather than erasing useful difference. Explain minimum coherent changes, preserve user-selected references and confirm any materially new direction before applying an unrequested redesign.

A review-only request returns findings and the guide without target edits. For already authorized improvements, make only the bounded selected changes through the host tools, retain rights/notices and unrelated edits, then capture the same camera, viewport and state before/after. Explain whether the requested visual intention was met; do not infer FPS or integration readiness from the pictures. Keep raw private target captures local unless their transfer is authorized.


When a `headstart-local-integration-1` record is available, run the packaged read-only helper with the actual selected `plan.json` and `packet.json`:

```sh
python3 scripts/integration_review_context.py /selected/job/plan.json /selected/job/packet.json --brief-revision CURRENT_REVISION
```

Resolve the script relative to this plugin, and replace the selected paths/revision with actual local context. Carry its same `headstart-review-context-1` object into this review and any companion art/code/performance reviews. It verifies plan/packet/brief continuity, not current target state or successful integration. Inspect current target files and modes, validation/evidence and the independent reviewer result using the checkout workflow when present. Changed state requires fresh review; historical plugin versions stay labeled. Keep this context local. Use `--authorization bounded_improvement` only for already authorized target changes; the flag itself grants no permission.
