# HeadStart

**A head start for your next game.** Discover playable games, understand their systems, and reuse suitable building blocks with guidance in your coding agent.

HeadStart is the current app and plugin name. Original specification files retain their historical filenames.

**Live:** [headstart-virid.vercel.app](https://headstart-virid.vercel.app/)

![HeadStart production landing page](docs/reviews/evidence/release-review/production/landing-desktop.png)

<video src="https://github.com/lucasaerb/headstart/raw/main/headstart-demo/renders/headstart-demo-40s-final.mp4" controls width="100%"></video>

## Start here

- [Project instructions](AGENTS.md)
- [Prioritized build backlog](docs/planning/README.md)
- [Coder and reviewer workflow](docs/development-workflow.md)
- [Selected design direction](docs/design-direction.md)
- [Latest product direction](HeadStart-Starter-Package/Product-Direction-v0.4.md)
- [Technical PRD](HeadStart-Starter-Package/Playparts-Technical-PRD-v0.3.md)
- [Review package inventory](HeadStart-Starter-Package/START-HERE.md)

The repository includes the C4 living-world site, local Node/Python catalog API, versioned contracts, SQLite evidence storage, research inventory, scoped component reviews, local briefs/comparisons and optional semantic retrieval. Production catalog hosting, verified identity, automatic website-bag retrieval and tested game integration remain separate backlog work.

## First deliverable

Build a structured research database of example games with real images, categories, playable/demo destinations, repository links, and traceable source and rights evidence. Start with that content, then build a working local discovery experience around it. Keep uncertain research separate from eligible published listings.

The [first research database](research/catalog/README.md) currently contains 76 research entries and 153 candidate building blocks, with searchable SQLite/JSON/CSV exports and 12 authentic preview images. Browse the [index](research/catalog/INDEX.md), [shortlist](research/catalog/SHORTLIST.md), and [image contact sheet](research/catalog/contact-sheet.jpg). These are researched source leads with explicit limitations, not tested integrations. The [browser expansion](research/catalog/BROWSER-EXPANSION.md) adds 29 browser projects and creator-reported model attribution.

## Local application

Follow [the reproducible setup](docs/architecture/development.md) for Node, Python and required public media. The normal sequence is `npm ci --ignore-scripts`, create `.venv`, install `requirements-dev.txt`, run `npm run catalog:init`, then `npm run dev`. Open http://127.0.0.1:8767/ . The API separates 76 research references from 30 scoped source-reviewed components; none of those components is labeled integration-tested.

[Optional local semantic search](services/retrieval/README.md) uses pinned model weights; an unconfigured model falls back explicitly to lexical search. The local API is not a production Vercel service. See [batch reviews](docs/planning/batches/README.md) for exact acceptance and remaining work.

## Reference prototype

Python 3 can serve the supplied static design prototype:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory HeadStart-Starter-Package
```

Open [the prototype](http://127.0.0.1:8000/Playparts-UI-Prototype.html). This previews sample interactions; it does not start a catalog backend or install the plugin. Use the Node/Python setup above for the current API-backed site.

## Delivery approach

Localhost comes first. Vercel is the intended website host; Railway is an option if a persistent database, queue, or worker requires it. Hosting setup must not block initial research or a local working application.

Every issue uses a separate coder/author subagent and critical reviewer subagent. The reviewer evaluates the implementation, meaningful tests, and visual evidence where relevant. Findings return to the coder for correction and re-review until the issue's acceptance criteria pass. See the [workflow](docs/development-workflow.md) for the required evidence and completion rules.

Private reference recordings and the redundant full-package archive remain local and are excluded from Git. Existing upstream licensing and attribution records are preserved; no blanket license is assigned to third-party material by this repository.

## Built with GPT-6 Astra

GPT-6 Astra was used end to end on this project, not for a single feature. Early product and
market research — the problem framing, the game-dev market sizing, the initial spec — came out
of planning conversations with Astra via ChatGPT. From there, the research catalog, the
coding-agent plugin, and the local MCP server behind it were written by Astra running as the
coding agent through Codex. The [coder/reviewer workflow](docs/development-workflow.md) formalizes
this: every issue is built by a dedicated coder/author agent and checked by a separate
critical-reviewer agent, both running on Astra via Codex, iterating until the reviewer's
acceptance criteria pass. The plugin HeadStart ships is itself packaged in the Codex plugin
format, so the tool being built and the tool building it are the same model family.

## Codex plugin

The [HeadStart discovery plugin](HeadStart-Starter-Package/headstart-plugin/README.md) packages six skills and a real local metadata MCP server with 52 reviewed references and 105 candidate systems. [Build the portable ZIP](tools/plugin/README.md) and describe your game in Codex to get grounded source starting points. [Independent end-to-end evidence](docs/reviews/plugin-discovery/REVIEW.md) records real installation, skill discovery and a fresh-agent recommendation. Protected code handoffs remain unavailable pending verified-email access.
