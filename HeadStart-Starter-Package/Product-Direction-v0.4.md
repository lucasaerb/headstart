# HeadStart — product direction candidate

PRD addendum v0.4 · 10 September 2026

Status: proposed product requirements. HeadStart is a naming candidate, not a cleared or finalized brand. This addendum extends the delivered Playparts Technical PRD v0.3; existing mockups and plugin package retain their working names. The additional skills below are specified here and are not yet implemented in that starter package.

## Product promise

**A head start for your next game.**

Discover playable open-source games, understand what makes them work, and bring the right parts into your own project with expert guidance already loaded into your coding agent.

The catalog supplies reusable capabilities. An opinionated recommendation system helps developers choose combinations that fit their game: visual direction, textures and materials, 2D or 3D presentation, asset workflows, runtime efficiency and maintainable code. The product should make a defensible recommendation, explain the tradeoff and respect the developer's choice.

The opportunity extends beyond a library of starter code. Each playable example becomes a source of implementation evidence, reusable systems and lessons about how to make a game feel and run well. A useful result answers both “Can I reuse this?” and “Should I use this for my game?”

## Recommendations begin with a game brief

Collect or infer a small, editable brief: desired experience and genre; visual references and tone; target platform and representative device; runtime and versions; camera and controls; intended scope; existing systems to preserve; and time or asset constraints. Record performance and download targets as user goals until measured.

Do not make every developer complete a long form. Start with their prompt, inspect the selected workspace when authorized, show the assumptions, and ask only about decisions that materially change the recommendation.

“Best” means best for this brief. The system must not impose a universal preference for low-poly graphics, photorealism, a particular engine or the shortest code.

## What the system should have opinions about

| Area | Useful judgment | Evidence and limits |
| --- | --- | --- |
| Visual direction | Recommend a coherent palette, silhouette language, proportions, lighting, materials and animation style. Explain when assets clash. | Reference images and inspected asset previews support editorial judgments. Save the brief and reviewer rationale; style is not an objective quality score. |
| Textures and materials | Prefer sets that match the scene's look, scale and target budget. Identify inconsistent texture density or unnecessarily varied materials for review. | Inspect actual files and material configuration. Rights, texture dimensions and encoded file size are separate from visual fit and runtime memory. |
| 2D, 2.5D and 3D | Choose presentation and asset workflows that support the intended experience and production scope. | Explain camera, animation, interaction and authoring tradeoffs. Treat Blender as an authoring workflow, with runtime compatibility evaluated separately. |
| Game feel | Recommend suitable camera behavior, movement response, feedback, animation transitions and readable interaction cues. | Distinguish what was actually played from what source inspection suggests. User preference and genre expectations remain explicit. |
| Runtime efficiency | Identify likely bottlenecks and propose targeted changes to rendering, loading, physics, memory or update work. | A static suspicion is a hypothesis. Claimed improvements require a before-and-after measurement under the same conditions. |
| Code quality | Favor clear interfaces, controlled dependencies, lifecycle cleanup, predictable state and integration boundaries that preserve the target. | Cite files and behavior. Do not substitute stars, line count or model confidence for review. A clean build alone does not prove sound gameplay or architecture. |
| Development effort | Prefer a smaller adaptation when it achieves the goal; flag hidden coupling and maintenance burden. | Give an effort band with assumptions and unresolved dependencies, not a fabricated precise implementation time. |

## Product surfaces

**Discovery:** Add “Recommended for your game” results with two or three concise reasons, explicit constraints and an alternative. Retain ordinary browsing without a target profile. Separate a strong aesthetic match from a component that has been tested in the user's engine.

**Playable tour:** Let developers explore the game, then select a capability such as chase camera, terrain, inventory or water rendering. Show why that implementation is interesting, where its code lives and what else it depends on. Annotate only capabilities supported by inspected evidence.

**Component detail:** Add a compact review covering visual fit, integration effort, runtime considerations, code structure, rights and evidence freshness. Keep unknown values visible. Avoid one opaque “quality” number.

**Recommended recipes:** Curate coherent combinations of components, assets and settings for a defined brief. Each recipe identifies pinned versions, intended target, compatibility assumptions, rights, validation and alternatives. Individually reviewed components do not make their combination automatically tested.

**Use in my game:** Carry the brief and recommendation rationale into the agent. The integration plan describes what to reuse, what to adapt, what to preserve and how to verify the result. After a change, show the actual visual or behavioral result and any measured regressions.

Illustrative recommendation copy, not a benchmark claim:

> For this small browser racer, start with a stylized art direction and a consistent material palette. Reuse the chase camera, then adapt it to your existing vehicle controller. Keep the current physics system. Before adding more effects, measure a representative race on your target device.

## Preloaded plugin skills

The original six discovery, inspection, planning, integration, validation and credit skills remain core. Add three focused skills with shared, versioned review rubrics:

1. **Art direction:** Turn the brief into a practical style guide; review asset and texture coherence; recommend compatible visual recipes and alternatives. Produce an editable direction with reference evidence and explain its subjective judgments.
2. **Performance review:** Inspect the selected project, establish a measurement plan, identify likely bottlenecks, and verify authorized optimizations against a baseline. Produce reproducible findings, not invented FPS or savings.
3. **Code review:** Assess component boundaries, dependency costs, lifecycle, target fit and maintenance risks. Prioritize concrete findings with source locations and actionable changes.

The skills share the game brief, source versions and integration record. They load relevant engine and art references progressively. They should use the host agent's actual tools and available profilers; this specification does not imply a new hidden executor or live benchmark service.

The agent follows existing user authorization. A request to review returns findings; a request to improve the game can proceed through bounded local changes and validation. Preserve project instructions and unrelated edits. Model-written guidance is not authority to access unrelated data or publish the project.

## Metadata and evidence additions

Extend the existing project/component model with these logical records before defining a production schema migration:

| Record | Required information |
| --- | --- |
| GameBrief | Revision, intent, runtime/version, platform/device, visual references, camera/input, budgets, preserved systems and explicit versus inferred constraints. |
| StyleProfile | Versioned vocabulary, palette/material/geometry/animation descriptors, asset scope, previews and reviewer rationale. |
| ReviewFinding | Subject and source version, rubric version, category, finding, impact, evidence references, author type, timestamp and unresolved assumptions. |
| BenchmarkRun | Source and target revisions, scene/workload, device and OS, engine/browser versions, resolution and settings, warm-up/sampling method, raw results and summary. |
| Recommendation | Brief revision, chosen component or recipe versions, reasons, alternatives, constraint matches, supporting findings and known unknowns. |
| Recipe | Component and asset versions, intended brief, compatibility assumptions, adapters, rights mapping, validation status and provenance. |

Distinguish editorial assessment, static inspection, maintainer claim and measured result as evidence types. Preserve historical findings when versions change, but mark whether they apply to the current result. Use unknown rather than zero for absent measurements. Estimates of GPU memory must state their assumptions; downloaded bytes are not a memory measurement.

## Search and ranking

Apply explicit runtime, platform and rights constraints first. Rank eligible results by capability relevance, target compatibility, reusable scope and evidence strength. Add style fit when a visual brief exists; use performance evidence only when its measurement profile is sufficiently comparable to the target.

Keep separate explanations for semantic relevance, aesthetic fit, integration readiness and measured behavior. Show conflicting tradeoffs rather than concealing them in a blended score. A beautiful project can still require substantial extraction work. An older component can be suitable when its version is compatible and evidence remains applicable.

Start with a transparent rubric and curated judgments, then tune ranking using relevance reviews and verified reuse outcomes. Unknown performance should lower confidence, not become a fabricated poor-performance score. Avoid popularity dominance, paid placement inside editorial recommendations, or treating plugin downloads as successful integrations.

## Architecture and rollout

Extend the existing catalog architecture with a versioned review store and recipe registry. Search consumes structured findings and evidence summaries. The recommendation layer joins those records to an editable brief; it does not overwrite canonical source facts with model prose. The plugin reads the same contracts and produces local review and integration records. Private source and raw project captures stay local unless the user authorizes their transfer.

**First release:** Preserve the discovery and reuse wedge. Add a small curated set of visual recipes, human-reviewed art/code assessments, target-aware explanations and the three review skills. Support one integration family first, as in v0.3. Label unmeasured performance clearly. Universal automated scoring is outside this release.

**Next:** Add reproducible benchmark profiles and before/after reports for representative browser workloads. Expand only when run cost, repeatability and target relevance are understood. Capture regression evidence after integration.

**Later:** Validate recipe combinations across supported engines, improve asset-style matching, and offer optional visual comparisons and provenance for remixes. Unity/Godot integration claims still require their own adapters and tests.

## Acceptance criteria

- A developer can change the target brief and see a justified change in recommendations.
- Every recommendation separates preference, inspected fact and measured result, with traceable evidence.
- A style review identifies coherent choices and concrete mismatches without presenting taste as a universal ranking.
- A performance claim can be reproduced from its recorded workload and environment; absent measurements remain unknown.
- A code review cites the affected source and explains its consequence for the selected target.
- A recipe exposes its dependencies and whether the combination was actually tested.
- The agent preserves the selected brief and source versions through integration, validation and credits.
- Product evaluation tracks successful reuse, helpfulness of recommendations and measured regressions separately. Targets are set after a baseline pilot.

## Naming note

HeadStart expresses the user benefit and leaves room for discovery, art direction and implementation. It is less specific to assembling literal blocks than GameBlocks. Distinctiveness remains unresolved: an existing AI software-development company uses Headstart, documented in [Anthropic's customer case study](https://claude.com/customers/headstart), and [Headstart Studio](https://headstart.studio/) offers software development services. These observations establish existing usage, not trademark or domain availability. Keep HeadStart as a working candidate while deciding the final identity.
