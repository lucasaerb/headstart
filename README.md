# HeadStart

**A head start for your next game.** Discover playable games, understand their systems, and reuse suitable building blocks with guidance in your coding agent.

HeadStart is a working name. The existing specification and plugin starter use the earlier Playparts name.

## Start here

- [Project instructions](AGENTS.md)
- [Prioritized build backlog](docs/planning/README.md)
- [Coder and reviewer workflow](docs/development-workflow.md)
- [Provisional design direction](docs/design-direction.md)
- [Latest product direction](HeadStart-Starter-Package/Product-Direction-v0.4.md)
- [Technical PRD](HeadStart-Starter-Package/Playparts-Technical-PRD-v0.3.md)
- [Review package inventory](HeadStart-Starter-Package/START-HERE.md)

The repository currently contains the PRD, design prototype, images, initial data contracts, research seeds, and six-skill plugin starter. The production catalog, application, and live catalog connector remain to be implemented through the issue backlog.

## First deliverable

Build a structured research database of example games with real images, categories, playable/demo destinations, repository links, and traceable source and rights evidence. Start with that content, then build a working local discovery experience around it. Keep uncertain research separate from eligible published listings.

## Local preview

Python 3 can serve the supplied static design prototype:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory HeadStart-Starter-Package
```

Open [the prototype](http://127.0.0.1:8000/Playparts-UI-Prototype.html). This previews sample interactions; it does not start a catalog backend or install the plugin. Application setup and test commands will be added when implemented.

## Delivery approach

Localhost comes first. Vercel is the intended website host; Railway is an option if a persistent database, queue, or worker requires it. Hosting setup must not block initial research or a local working application.

Every issue uses a separate coder/author subagent and critical reviewer subagent. The reviewer evaluates the implementation, meaningful tests, and visual evidence where relevant. Findings return to the coder for correction and re-review until the issue's acceptance criteria pass. See the [workflow](docs/development-workflow.md) for the required evidence and completion rules.

Private reference recordings and the redundant full-package archive remain local and are excluded from Git. Existing upstream licensing and attribution records are preserved; no blanket license is assigned to third-party material by this repository.
