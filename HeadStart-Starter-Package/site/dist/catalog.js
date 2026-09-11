window.HEADSTART_CATALOG = [
  {
    "id": "glenn-explore",
    "title": "Glenn Explore",
    "summary": "A large multiplayer 3D driving and exploration world with vehicles, chat, racing and shared online presence.",
    "genres": [
      "multiplayer",
      "driving",
      "exploration",
      "open-world"
    ],
    "runtime": "Three.js / Cesium",
    "label": "Play demo",
    "demoUrl": "https://playglenn.com",
    "demoKind": "browser",
    "repoUrl": "https://github.com/WilliamAvHolmberg/glenn-explore",
    "projectUrl": "https://playglenn.com",
    "commit": "5b40306259dcaa2fc7a0fbb32626f50c3bc99805",
    "creator": "William Av Holmberg and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "William Av Holmberg and contributors",
      "licenseExpression": "GPL-3.0-only",
      "licenseUrls": [
        "https://www.gnu.org/licenses/gpl-3.0.html"
      ],
      "sourcePage": "https://github.com/WilliamAvHolmberg/glenn-explore/blob/5b40306259dcaa2fc7a0fbb32626f50c3bc99805/web/public/hero.jpg",
      "licenseEvidenceUrl": "https://github.com/WilliamAvHolmberg/glenn-explore/blob/5b40306259dcaa2fc7a0fbb32626f50c3bc99805/LICENSE",
      "captureDate": null,
      "versionRelation": "Pinned repository image at the indexed source commit.",
      "alt": "A vehicle exploring Glenn’s shared 3D world.",
      "sha256": "08b8be2b5db87637fd47f38f8bbbddd7158cc97da774f650359cc1e40c328826",
      "originalUrl": "https://raw.githubusercontent.com/WilliamAvHolmberg/glenn-explore/5b40306259dcaa2fc7a0fbb32626f50c3bc99805/web/public/hero.jpg",
      "allowedUse": "HeadStart catalog identification and preview display for this exact image with listed credit and terms; no endorsement, model-quality claim or blanket game-asset clearance.",
      "modifications": "Original repository bytes retained unchanged; site CSS may scale and crop.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/glenn-explore.jpg",
      "localSourcePath": "research/catalog/media/glenn-explore.jpg"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "open-world",
      "urban",
      "stylized"
    ],
    "runtimeVersion": "three 0.174.0; Cesium 1.133.0",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer-linked production URL returned HTTP 200 with HTML on 2026-09-11. This is a reachability check, not a complete playtest or source/deployment attestation.",
    "rights": {
      "code_license": "GPL-3.0-only",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/WilliamAvHolmberg/glenn-explore/blob/5b40306259dcaa2fc7a0fbb32626f50c3bc99805/LICENSE",
      "asset_status": "mixed",
      "asset_notes": "Project code is GPL-3.0. User-uploaded models/images and map/provider data require separate rights review.",
      "scope_reuse_status": "review_required",
      "notes": "The code license was inspected at the pinned revision. Preserve notices and review selected files, assets, data and dependencies before reuse."
    },
    "sourceInspectedAt": "2026-09-11T01:30:00Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/WilliamAvHolmberg/glenn-explore/tree/5b40306259dcaa2fc7a0fbb32626f50c3bc99805",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "multiplayer-state",
      "vehicle-physics",
      "racing"
    ],
    "buildingBlocks": [
      {
        "name": "Realtime multiplayer bridge",
        "category": "multiplayer-state",
        "evidence_url": "https://github.com/WilliamAvHolmberg/glenn-explore/blob/5b40306259dcaa2fc7a0fbb32626f50c3bc99805/web/src/game/realtime/RealtimeController.ts",
        "source_path": "web/src/game/realtime/RealtimeController.ts",
        "status": "source_inspected",
        "notes": "Connects live player state and presence to the game client. No extraction or target integration test."
      },
      {
        "name": "Vehicle physics",
        "category": "vehicle-physics",
        "evidence_url": "https://github.com/WilliamAvHolmberg/glenn-explore/blob/5b40306259dcaa2fc7a0fbb32626f50c3bc99805/web/src/cesium/physics/VehiclePhysics.ts",
        "source_path": "web/src/cesium/physics/VehiclePhysics.ts",
        "status": "source_inspected",
        "notes": "Implements vehicle motion for the Cesium/Three.js world. No extraction or target integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/WilliamAvHolmberg/glenn-explore/tree/5b40306259dcaa2fc7a0fbb32626f50c3bc99805",
        "claim": "Pinned public repository identity and immutable source revision inspected.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/WilliamAvHolmberg/glenn-explore/blob/5b40306259dcaa2fc7a0fbb32626f50c3bc99805/README.md",
        "claim": "Project description, live-play link, controls and declared implementation context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/WilliamAvHolmberg/glenn-explore/blob/5b40306259dcaa2fc7a0fbb32626f50c3bc99805/LICENSE",
        "claim": "Project code license text inspected; assets and dependencies remain separate scopes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/WilliamAvHolmberg/glenn-explore/blob/5b40306259dcaa2fc7a0fbb32626f50c3bc99805/web/src/game/realtime/RealtimeController.ts",
        "claim": "Realtime multiplayer bridge implementation entry points statically inspected.",
        "kind": "source"
      },
      {
        "url": "https://github.com/WilliamAvHolmberg/glenn-explore/blob/5b40306259dcaa2fc7a0fbb32626f50c3bc99805/web/src/cesium/physics/VehiclePhysics.ts",
        "claim": "Vehicle physics implementation entry points statically inspected.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "en"
    ],
    "notoriety": {
      "status": "publisher_reported",
      "metrics": [
        {
          "metric_type": "unique_players",
          "value": 47093,
          "checked_at": "2026-09-11T01:29:00Z",
          "evidence_url": "https://playglenn.com",
          "scope": "Lifetime unique players displayed by the live publisher homepage at check time.",
          "notes": "Publisher-reported site counter; methodology, bot filtering and date range were not independently audited."
        }
      ],
      "notes": "Keep this player count distinct from GitHub stars and concurrent-player counts."
    },
    "editorialRank": {
      "record_id": "glenn-explore",
      "position": 1,
      "rationale": "publisher-reported usage evidence; playable game/demo; 433 GitHub stars observed; English interface evidenced.",
      "signals": {
        "usage_evidence": true,
        "github_stars": 433,
        "english_interface": true,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 7
      }
    },
    "githubStars": 433,
    "popularity": {
      "repo_url": "https://github.com/WilliamAvHolmberg/glenn-explore",
      "stars": 433,
      "status": "available",
      "checked_at": "2026-09-11T01:23:00Z",
      "evidence_url": "https://api.github.com/repos/WilliamAvHolmberg/glenn-explore",
      "notes": "Observed from the public GitHub repository API on the stated date; stars are repository-level popularity, not player or quality counts."
    }
  },
  {
    "id": "2048",
    "title": "2048",
    "summary": "A compact sliding-tile puzzle whose input, board rules, presentation and persistence have separate modules.",
    "genres": [
      "puzzle",
      "turn-based"
    ],
    "runtime": "HTML / CSS / JavaScript",
    "label": "Play demo",
    "demoUrl": "https://play2048.co",
    "demoKind": "browser",
    "repoUrl": "https://github.com/gabrielecirulli/2048",
    "projectUrl": "https://play2048.co",
    "commit": "478b6ec346e3787f589e4af751378d06ded4cbbc",
    "creator": "Gabriele Cirulli and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "Gabriele Cirulli",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://opensource.org/license/mit"
      ],
      "sourcePage": "https://commons.wikimedia.org/wiki/File:2048_Screenshot.png",
      "licenseEvidenceUrl": "https://commons.wikimedia.org/w/index.php?title=File%3A2048+Screenshot.png&oldid=774775920",
      "captureDate": "2014-03-19 12:20:41",
      "versionRelation": "Historical image; relation to indexed source commit is unknown. Not a current build or play attestation.",
      "alt": "A 2048 number-tile puzzle board in progress.",
      "sha256": "fda05378852e68a61e1607cf91082ec774356078c5c4af64e5684c50a40b9d6f",
      "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/6/64/2048_Screenshot.png",
      "allowedUse": "Catalog display and redistributed original/thumbnail only with the listed attribution, license notices and applicable share-alike/source obligations. No endorsement implied.",
      "modifications": "Original image bytes retained unchanged; contact sheet scales an independent copy to fit, without content edits.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/design_flex_reviewer",
      "src": "assets/catalog/2048.png",
      "localSourcePath": "research/catalog/media/2048.png"
    },
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [
      "minimal",
      "flat-color"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/gabrielecirulli/2048/blob/478b6ec346e3787f589e4af751378d06ded4cbbc/LICENSE.txt",
      "asset_status": "unreviewed",
      "asset_notes": "Font files and external screenshot ownership need separate review. Credit inspirations without treating them as imported code.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/gabrielecirulli/2048/tree/478b6ec346e3787f589e4af751378d06ded4cbbc",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "puzzle-rules",
      "persistence"
    ],
    "buildingBlocks": [
      {
        "name": "Tile merge and move rules",
        "category": "puzzle-rules",
        "evidence_url": "https://github.com/gabrielecirulli/2048/blob/478b6ec346e3787f589e4af751378d06ded4cbbc/js/game_manager.js",
        "source_path": "js/game_manager.js",
        "status": "source_inspected",
        "notes": "Moves traverse the grid, merge compatible tiles and check available moves; depends on Grid/Tile and injected actuator/input/storage."
      },
      {
        "name": "Local save storage",
        "category": "persistence",
        "evidence_url": "https://github.com/gabrielecirulli/2048/blob/478b6ec346e3787f589e4af751378d06ded4cbbc/js/local_storage_manager.js",
        "source_path": "js/local_storage_manager.js",
        "status": "source_inspected",
        "notes": "Best score and board state use localStorage with a fallback store; storage keys and serialized schema need adaptation."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/gabrielecirulli/2048/tree/478b6ec346e3787f589e4af751378d06ded4cbbc",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/gabrielecirulli/2048/blob/478b6ec346e3787f589e4af751378d06ded4cbbc/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/gabrielecirulli/2048/blob/478b6ec346e3787f589e4af751378d06ded4cbbc/LICENSE.txt",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/gabrielecirulli/2048/blob/478b6ec346e3787f589e4af751378d06ded4cbbc/js/game_manager.js",
        "claim": "Tile merge and move rules entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/gabrielecirulli/2048/blob/478b6ec346e3787f589e4af751378d06ded4cbbc/js/local_storage_manager.js",
        "claim": "Local save storage entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "2048",
      "position": 2,
      "rationale": "playable game/demo; 13380 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 13380,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 4
      }
    },
    "githubStars": 13380,
    "popularity": {
      "repo_url": "https://github.com/gabrielecirulli/2048",
      "stars": 13380,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/gabrielecirulli/2048",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "godot-truck-town",
    "title": "Godot Truck Town",
    "summary": "Vehicle-physics playground with several truck forms and camera views.",
    "genres": [
      "driving",
      "simulation",
      "vehicle-demo"
    ],
    "runtime": "Godot",
    "label": "Play demo",
    "demoUrl": "https://godotengine.github.io/godot-demo-projects/3d/truck_town/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/godotengine/godot-demo-projects",
    "projectUrl": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/truck_town/README.md",
    "commit": "a3b5c113112f77291d5f3d1360f33a882fdc52f7",
    "creator": "Godot Engine contributors; see subproject credits",
    "readiness": "review_required",
    "preview": {
      "credit": "Godot Engine contributors; see subproject credits",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/LICENSE.md"
      ],
      "sourcePage": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/truck_town/screenshots/truck_town.webp",
      "licenseEvidenceUrl": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/LICENSE.md",
      "captureDate": null,
      "versionRelation": "Pinned subproject gameplay screenshot. This image identifies the named catalog record but is not a HeadStart playthrough, source/deployment parity check or integration attestation.",
      "alt": "Red pickup driving through a low-poly town in the Godot Truck Town demo.",
      "sha256": "7d7e38da059e04b0b948b35e6898cbf5483bd54163efd6d3741b18fcbc2f30e4",
      "originalUrl": "https://raw.githubusercontent.com/godotengine/godot-demo-projects/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/truck_town/screenshots/truck_town.webp",
      "allowedUse": "Independent narrow local research-display review passed for this exact audited image. The approval is limited to identifying the upstream project in the local HeadStart catalog; it does not authorize public redistribution, source export, promotional reuse, relicensing, game-asset reuse, endorsement, or imply that third-party assets are covered by the code license.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/godot-truck-town.webp",
      "localSourcePath": "research/catalog/media/godot-truck-town.webp"
    },
    "contentKind": "demo",
    "dimension": "3d",
    "visualStyle": [],
    "runtimeVersion": "4.7 development branch (project feature value)",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Official index and HTML export endpoint inspected. Browser execution was not tested. Index describes automatic master exports, but exact deployed artifact/commit correspondence was not verified; web rendering uses Compatibility and can differ from native Forward+.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/LICENSE.md",
      "asset_status": "unreviewed",
      "asset_notes": "README names external Freesound ambience and Sketchfab models. Their exact licenses, attributions and derivative scopes remain unresolved in this record.",
      "scope_reuse_status": "review_required",
      "notes": "MIT notice retention applies to code; audit exact source slice, scene resources and third-party content. No Three.js/R3F adapter or reuse test exists in this batch."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/godotengine/godot-demo-projects/tree/a3b5c113112f77291d5f3d1360f33a882fdc52f7",
    "platforms": [
      "browser export",
      "native Godot project"
    ],
    "platformKind": "browser",
    "capabilities": [
      "vehicle-physics",
      "camera"
    ],
    "buildingBlocks": [
      {
        "name": "Vehicle throttle, steering and boost",
        "category": "vehicle-physics",
        "evidence_url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/truck_town/vehicles/vehicle.gd",
        "source_path": "3d/truck_town/vehicles/vehicle.gd",
        "status": "source_inspected",
        "notes": "VehicleBody3D applies engine force, steering, braking and boost with audio/haptics; requires vehicle scene, Jolt setup and named inputs."
      },
      {
        "name": "Switchable vehicle follow camera",
        "category": "camera",
        "evidence_url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/truck_town/vehicles/follow_camera.gd",
        "source_path": "3d/truck_town/vehicles/follow_camera.gd",
        "status": "source_inspected",
        "notes": "Camera supports exterior/interior/top-down modes and speed-related FOV interpolation; static inspection is not evidence of optimal feel or frame-rate independence."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/README.md",
        "claim": "Root describes demo distribution, development-branch compatibility and official browser exports.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/LICENSE.md",
        "claim": "Inspected MIT license text; selected media/dependencies require separate review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/truck_town/README.md",
        "claim": "Inspected subproject features, renderer, credits and screenshot reference.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/truck_town/project.godot",
        "claim": "Inspected config/features 4.7, input actions and physics/renderer settings.",
        "kind": "source"
      },
      {
        "url": "https://godotengine.github.io/godot-demo-projects/",
        "claim": "Official export index links this subproject; no interactive test or build-to-commit attestation.",
        "kind": "official-docs"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/truck_town/vehicles/vehicle.gd",
        "claim": "Vehicle throttle, steering and boost: inspected script behavior and scene dependencies.",
        "kind": "source"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/truck_town/vehicles/follow_camera.gd",
        "claim": "Switchable vehicle follow camera: inspected script behavior and scene dependencies.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "godot-truck-town",
      "position": 3,
      "rationale": "playable game/demo; 9503 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 9503,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 5
      }
    },
    "githubStars": 9503,
    "popularity": {
      "repo_url": "https://github.com/godotengine/godot-demo-projects",
      "stars": 9503,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/godotengine/godot-demo-projects",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "godot-platformer-2d",
    "title": "Godot 2D Platformer",
    "summary": "Compact pixel-art platformer demonstrating movement and a pause interface.",
    "genres": [
      "platformer",
      "action"
    ],
    "runtime": "Godot",
    "label": "Play demo",
    "demoUrl": "https://godotengine.github.io/godot-demo-projects/2d/platformer/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/godotengine/godot-demo-projects",
    "projectUrl": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/platformer/README.md",
    "commit": "a3b5c113112f77291d5f3d1360f33a882fdc52f7",
    "creator": "Godot Engine contributors; see subproject credits",
    "readiness": "review_required",
    "preview": {
      "credit": "Godot Engine contributors; see subproject credits",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/LICENSE.md"
      ],
      "sourcePage": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/platformer/screenshots/platformer.webp",
      "licenseEvidenceUrl": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/LICENSE.md",
      "captureDate": null,
      "versionRelation": "Pinned subproject gameplay screenshot. This image identifies the named catalog record but is not a HeadStart playthrough, source/deployment parity check or integration attestation.",
      "alt": "Orange character collecting coins across bright floating platforms in the Godot 2D platformer.",
      "sha256": "ef5eb833df4cf3618e92c4e5853e944e5999f8c9933ca21efd02dd87fea3502c",
      "originalUrl": "https://raw.githubusercontent.com/godotengine/godot-demo-projects/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/platformer/screenshots/platformer.webp",
      "allowedUse": "Independent narrow local research-display review passed for this exact audited image. The approval is limited to identifying the upstream project in the local HeadStart catalog; it does not authorize public redistribution, source export, promotional reuse, relicensing, game-asset reuse, endorsement, or imply that third-party assets are covered by the code license.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/godot-platformer-2d.webp",
      "localSourcePath": "research/catalog/media/godot-platformer-2d.webp"
    },
    "contentKind": "demo",
    "dimension": "2d",
    "visualStyle": [
      "pixel-art"
    ],
    "runtimeVersion": "4.7 development branch (project feature value)",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Official index and HTML export endpoint inspected. Browser execution was not tested. Index describes automatic master exports, but exact deployed artifact/commit correspondence was not verified; web rendering uses Compatibility and can differ from native Forward+.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/LICENSE.md",
      "asset_status": "unreviewed",
      "asset_notes": "README credits external music by Hubert Lamontagne. MIT code does not settle the exact music distribution terms; selected sounds, sprites and font provenance require review.",
      "scope_reuse_status": "review_required",
      "notes": "MIT notice retention applies to code; audit exact source slice, scene resources and third-party content. No Three.js/R3F adapter or reuse test exists in this batch."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/godotengine/godot-demo-projects/tree/a3b5c113112f77291d5f3d1360f33a882fdc52f7",
    "platforms": [
      "browser export",
      "native Godot project"
    ],
    "platformKind": "browser",
    "capabilities": [
      "movement",
      "ui"
    ],
    "buildingBlocks": [
      {
        "name": "Slope-aware player movement",
        "category": "movement",
        "evidence_url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/platformer/player/player.gd",
        "source_path": "2d/platformer/player/player.gd",
        "status": "source_inspected",
        "notes": "CharacterBody2D handles acceleration, gravity, variable-height jump and movement; scene children and named input actions must be adapted."
      },
      {
        "name": "Pause menu and focus",
        "category": "ui",
        "evidence_url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/platformer/gui/pause_menu.gd",
        "source_path": "2d/platformer/gui/pause_menu.gd",
        "status": "source_inspected",
        "notes": "Control-based menu changes SceneTree pause state and tweens opacity/anchors; requires button/focus and scene ownership."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/README.md",
        "claim": "Root describes demo distribution, development-branch compatibility and official browser exports.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/LICENSE.md",
        "claim": "Inspected MIT license text; selected media/dependencies require separate review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/platformer/README.md",
        "claim": "Inspected subproject features, renderer, credits and screenshot reference.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/platformer/project.godot",
        "claim": "Inspected config/features 4.7, input actions and physics/renderer settings.",
        "kind": "source"
      },
      {
        "url": "https://godotengine.github.io/godot-demo-projects/",
        "claim": "Official export index links this subproject; no interactive test or build-to-commit attestation.",
        "kind": "official-docs"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/platformer/player/player.gd",
        "claim": "Slope-aware player movement: inspected script behavior and scene dependencies.",
        "kind": "source"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/platformer/gui/pause_menu.gd",
        "claim": "Pause menu and focus: inspected script behavior and scene dependencies.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "godot-platformer-2d",
      "position": 4,
      "rationale": "playable game/demo; 9503 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 9503,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 4
      }
    },
    "githubStars": 9503,
    "popularity": {
      "repo_url": "https://github.com/godotengine/godot-demo-projects",
      "stars": 9503,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/godotengine/godot-demo-projects",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "godot-platformer-3d",
    "title": "Godot 3D Platformer",
    "summary": "3D platforming reference with camera-relative movement and raycast camera collision.",
    "genres": [
      "platformer",
      "action"
    ],
    "runtime": "Godot",
    "label": "Play demo",
    "demoUrl": "https://godotengine.github.io/godot-demo-projects/3d/platformer/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/godotengine/godot-demo-projects",
    "projectUrl": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/platformer/README.md",
    "commit": "a3b5c113112f77291d5f3d1360f33a882fdc52f7",
    "creator": "Godot Engine contributors; see subproject credits",
    "readiness": "review_required",
    "preview": {
      "credit": "Godot Engine contributors; see subproject credits",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/LICENSE.md"
      ],
      "sourcePage": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/platformer/screenshots/platformer.webp",
      "licenseEvidenceUrl": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/LICENSE.md",
      "captureDate": null,
      "versionRelation": "Pinned subproject gameplay screenshot. This image identifies the named catalog record but is not a HeadStart playthrough, source/deployment parity check or integration attestation.",
      "alt": "Robot character carrying a blue cylinder in a blocky forest in the Godot 3D platformer.",
      "sha256": "ecc6228fd200ddbde9d21707e7ffea1bd24ac59592a92aa2e33cabea91706a88",
      "originalUrl": "https://raw.githubusercontent.com/godotengine/godot-demo-projects/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/platformer/screenshots/platformer.webp",
      "allowedUse": "Independent narrow local research-display review passed for this exact audited image. The approval is limited to identifying the upstream project in the local HeadStart catalog; it does not authorize public redistribution, source export, promotional reuse, relicensing, game-asset reuse, endorsement, or imply that third-party assets are covered by the code license.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/godot-platformer-3d.webp",
      "localSourcePath": "research/catalog/media/godot-platformer-3d.webp"
    },
    "contentKind": "demo",
    "dimension": "3d",
    "visualStyle": [],
    "runtimeVersion": "4.7 development branch (project feature value)",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Official index and HTML export endpoint inspected. Browser execution was not tested. Index describes automatic master exports, but exact deployed artifact/commit correspondence was not verified; web rendering uses Compatibility and can differ from native Forward+.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/LICENSE.md",
      "asset_status": "unreviewed",
      "asset_notes": "README credits an external virtual joystick add-on. Models, textures, audio and add-on terms require selected-file checks beyond root MIT.",
      "scope_reuse_status": "review_required",
      "notes": "MIT notice retention applies to code; audit exact source slice, scene resources and third-party content. No Three.js/R3F adapter or reuse test exists in this batch."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/godotengine/godot-demo-projects/tree/a3b5c113112f77291d5f3d1360f33a882fdc52f7",
    "platforms": [
      "browser export",
      "native Godot project"
    ],
    "platformKind": "browser",
    "capabilities": [
      "movement",
      "camera"
    ],
    "buildingBlocks": [
      {
        "name": "Camera-relative 3D controller",
        "category": "movement",
        "evidence_url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/platformer/player/player.gd",
        "source_path": "3d/platformer/player/player.gd",
        "status": "source_inspected",
        "notes": "CharacterBody3D transforms movement by camera basis and applies gravity/acceleration; depends on animation tree, input map and scene-node structure."
      },
      {
        "name": "Occlusion-aware follow camera",
        "category": "camera",
        "evidence_url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/platformer/player/follow_camera.gd",
        "source_path": "3d/platformer/player/follow_camera.gd",
        "status": "source_inspected",
        "notes": "Camera raycasts toward target and side angles, shortens blocked distance and auto-turns; must share physics world and preserve camera ownership."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/README.md",
        "claim": "Root describes demo distribution, development-branch compatibility and official browser exports.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/LICENSE.md",
        "claim": "Inspected MIT license text; selected media/dependencies require separate review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/platformer/README.md",
        "claim": "Inspected subproject features, renderer, credits and screenshot reference.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/platformer/project.godot",
        "claim": "Inspected config/features 4.7, input actions and physics/renderer settings.",
        "kind": "source"
      },
      {
        "url": "https://godotengine.github.io/godot-demo-projects/",
        "claim": "Official export index links this subproject; no interactive test or build-to-commit attestation.",
        "kind": "official-docs"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/platformer/player/player.gd",
        "claim": "Camera-relative 3D controller: inspected script behavior and scene dependencies.",
        "kind": "source"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/platformer/player/follow_camera.gd",
        "claim": "Occlusion-aware follow camera: inspected script behavior and scene dependencies.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "godot-platformer-3d",
      "position": 5,
      "rationale": "playable game/demo; 9503 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 9503,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 4
      }
    },
    "githubStars": 9503,
    "popularity": {
      "repo_url": "https://github.com/godotengine/godot-demo-projects",
      "stars": 9503,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/godotengine/godot-demo-projects",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "godot-astar-grid-2d",
    "title": "Godot AStarGrid2D Navigation",
    "summary": "Small tile-grid pathfinding example with a steering-driven character.",
    "genres": [
      "navigation-demo",
      "strategy-toolkit"
    ],
    "runtime": "Godot",
    "label": "Play demo",
    "demoUrl": "https://godotengine.github.io/godot-demo-projects/2d/navigation_astar/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/godotengine/godot-demo-projects",
    "projectUrl": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/navigation_astar/README.md",
    "commit": "a3b5c113112f77291d5f3d1360f33a882fdc52f7",
    "creator": "Godot Engine contributors; see subproject credits",
    "readiness": "review_required",
    "preview": {
      "credit": "Godot Engine contributors; see subproject credits",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/LICENSE.md"
      ],
      "sourcePage": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/navigation_astar/screenshots/navigation_astar.webp",
      "licenseEvidenceUrl": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/LICENSE.md",
      "captureDate": null,
      "versionRelation": "Pinned subproject screenshot. This image identifies the named catalog record but is not a HeadStart playthrough, source/deployment parity check or integration attestation.",
      "alt": "Godot AStarGrid2D demo with a small robot navigating stone platforms in space.",
      "sha256": "b33e2e80bdb1ae471df51caab48af2c9cea8bfc06cc53a42474579092778b89c",
      "originalUrl": "https://raw.githubusercontent.com/godotengine/godot-demo-projects/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/navigation_astar/screenshots/navigation_astar.webp",
      "allowedUse": "Independent narrow local research-display review passed for this exact audited image. The approval is limited to identifying the upstream project in the local HeadStart catalog; it does not authorize public redistribution, source export, promotional reuse, relicensing, game-asset reuse, endorsement, or imply that third-party assets are covered by the code license.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/godot-astar-grid-2d.webp",
      "localSourcePath": "research/catalog/media/godot-astar-grid-2d.webp"
    },
    "contentKind": "demo",
    "dimension": "2d",
    "visualStyle": [],
    "runtimeVersion": "4.7 development branch (project feature value)",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Official index and HTML export endpoint inspected. Browser execution was not tested. Index describes automatic master exports, but exact deployed artifact/commit correspondence was not verified; web rendering uses Compatibility and can differ from native Forward+.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/LICENSE.md",
      "asset_status": "unreviewed",
      "asset_notes": "Root MIT declaration inspected; screenshot and sprite identity/creator provenance still need central media review. No blanket derivative clearance claimed.",
      "scope_reuse_status": "review_required",
      "notes": "MIT notice retention applies to code; audit exact source slice, scene resources and third-party content. No Three.js/R3F adapter or reuse test exists in this batch."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/godotengine/godot-demo-projects/tree/a3b5c113112f77291d5f3d1360f33a882fdc52f7",
    "platforms": [
      "browser export",
      "native Godot project"
    ],
    "platformKind": "browser",
    "capabilities": [
      "pathfinding",
      "movement"
    ],
    "buildingBlocks": [
      {
        "name": "Obstacle-aware grid paths",
        "category": "pathfinding",
        "evidence_url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/navigation_astar/pathfind_astar.gd",
        "source_path": "2d/navigation_astar/pathfind_astar.gd",
        "status": "source_inspected",
        "notes": "TileMapLayer configures Manhattan AStarGrid2D, marks occupied cells solid and draws resulting path; fixed cell/region assumptions need adapting."
      },
      {
        "name": "Steering path follower",
        "category": "movement",
        "evidence_url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/navigation_astar/character.gd",
        "source_path": "2d/navigation_astar/character.gd",
        "status": "source_inspected",
        "notes": "Node2D consumes path points with velocity steering and arrival tolerance; this is movement logic, not physics collision avoidance."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/README.md",
        "claim": "Root describes demo distribution, development-branch compatibility and official browser exports.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/LICENSE.md",
        "claim": "Inspected MIT license text; selected media/dependencies require separate review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/navigation_astar/README.md",
        "claim": "Inspected subproject features, renderer, credits and screenshot reference.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/navigation_astar/project.godot",
        "claim": "Inspected config/features 4.7, input actions and physics/renderer settings.",
        "kind": "source"
      },
      {
        "url": "https://godotengine.github.io/godot-demo-projects/",
        "claim": "Official export index links this subproject; no interactive test or build-to-commit attestation.",
        "kind": "official-docs"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/navigation_astar/pathfind_astar.gd",
        "claim": "Obstacle-aware grid paths: inspected script behavior and scene dependencies.",
        "kind": "source"
      },
      {
        "url": "https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/navigation_astar/character.gd",
        "claim": "Steering path follower: inspected script behavior and scene dependencies.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "godot-astar-grid-2d",
      "position": 6,
      "rationale": "playable game/demo; 9503 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 9503,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 4
      }
    },
    "githubStars": 9503,
    "popularity": {
      "repo_url": "https://github.com/godotengine/godot-demo-projects",
      "stars": 9503,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/godotengine/godot-demo-projects",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "server-survival",
    "title": "Server Survival",
    "summary": "A top-down 3D cloud-architecture survival and tower-defense game with campaign, survival, and sandbox modes.",
    "genres": [
      "strategy",
      "simulation",
      "tower-defense",
      "survival"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://pshenok.github.io/server-survival/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/pshenok/server-survival",
    "projectUrl": "https://pshenok.github.io/server-survival/",
    "commit": "01796362d3b7bfa6c85efab5e2685f4d955dc137",
    "creator": "pshenok",
    "readiness": "review_required",
    "preview": {
      "credit": "pshenok",
      "licenseExpression": "MIT repository; screenshot/content rights need scope review",
      "licenseUrls": [
        "https://github.com/pshenok/server-survival/blob/01796362d3b7bfa6c85efab5e2685f4d955dc137/LICENSE"
      ],
      "sourcePage": "https://github.com/pshenok/server-survival/blob/01796362d3b7bfa6c85efab5e2685f4d955dc137/assets/gameplay.gif",
      "licenseEvidenceUrl": "https://github.com/pshenok/server-survival/blob/01796362d3b7bfa6c85efab5e2685f4d955dc137/LICENSE",
      "captureDate": "2026-09-11",
      "versionRelation": "Stored at the pinned inspected source revision.",
      "alt": "Authentic Server Survival gameplay image from its repository.",
      "sha256": "436a1c94a79b7e4c03077fc279fbe02efd665203c7c80076866709f98b597401",
      "originalUrl": "https://raw.githubusercontent.com/pshenok/server-survival/01796362d3b7bfa6c85efab5e2685f4d955dc137/assets/gameplay.gif",
      "allowedUse": "Local catalog display with credit and source link; no downstream asset-reuse conclusion.",
      "modifications": "Unmodified upstream bytes.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/server-survival.gif",
      "localSourcePath": "research/catalog/media/server-survival.gif"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "stylized",
      "technical"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer-linked live browser build; HTTP reachability was checked, but gameplay compatibility remains untested.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/pshenok/server-survival/blob/01796362d3b7bfa6c85efab5e2685f4d955dc137/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository screenshot is used only for local catalog display; downstream asset reuse needs separate review.",
      "scope_reuse_status": "review_required",
      "notes": "MIT code license inspected at the pinned revision; asset provenance and dependency notices remain scope-specific."
    },
    "sourceInspectedAt": "2026-09-11T02:10:00Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/pshenok/server-survival/tree/01796362d3b7bfa6c85efab5e2685f4d955dc137",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "building",
      "economy",
      "waves",
      "campaign",
      "i18n"
    ],
    "buildingBlocks": [
      {
        "name": "Playable game loop",
        "category": "gameplay-loop",
        "evidence_url": "https://github.com/pshenok/server-survival/blob/01796362d3b7bfa6c85efab5e2685f4d955dc137/game.js",
        "source_path": "game.js",
        "status": "source_inspected",
        "notes": "Primary game source contains the runtime loop and interaction systems."
      },
      {
        "name": "Browser presentation",
        "category": "presentation",
        "evidence_url": "https://github.com/pshenok/server-survival/blob/01796362d3b7bfa6c85efab5e2685f4d955dc137/index.html",
        "source_path": "index.html",
        "status": "source_inspected",
        "notes": "Browser entry point and interface shell."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/pshenok/server-survival/tree/01796362d3b7bfa6c85efab5e2685f4d955dc137",
        "claim": "Pinned public repository revision contains the playable game source.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/pshenok/server-survival/blob/01796362d3b7bfa6c85efab5e2685f4d955dc137/README.md",
        "claim": "README documents gameplay and links the live browser build.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/pshenok/server-survival/blob/01796362d3b7bfa6c85efab5e2685f4d955dc137/LICENSE",
        "claim": "Pinned MIT license text covers repository code subject to separately identified assets.",
        "kind": "license"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No exact GPT-6 Astra or Fable 5/5.1 creator attribution established."
    },
    "interfaceLanguages": [
      "en",
      "uk",
      "de",
      "es",
      "fr",
      "pt-BR",
      "pl",
      "cs",
      "zh-CN",
      "ja",
      "ko"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "server-survival",
      "position": 7,
      "rationale": "playable game/demo; 6404 GitHub stars observed; English interface evidenced.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 6404,
        "english_interface": true,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 9
      }
    },
    "githubStars": 6404,
    "popularity": {
      "repo_url": "https://github.com/pshenok/server-survival",
      "stars": 6404,
      "status": "available",
      "checked_at": "2026-09-11T02:10:00Z",
      "evidence_url": "https://api.github.com/repos/pshenok/server-survival",
      "notes": "Public GitHub repository API observation; star counts change over time."
    }
  },
  {
    "id": "pmndrs-racing-game",
    "title": "Poimandres Racing Game",
    "summary": "A community-built browser racer with a component-based vehicle, track and race interface.",
    "genres": [
      "racing",
      "arcade"
    ],
    "runtime": "React Three Fiber / Three.js",
    "label": "Play demo",
    "demoUrl": "https://racing.pmnd.rs/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/pmndrs/racing-game",
    "projectUrl": "https://racing.pmnd.rs/",
    "commit": "7816a5d954b75e6ad853ae4e4f0cbbd628072643",
    "creator": "pmndrs and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "pmndrs and contributors",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://opensource.org/license/mit"
      ],
      "sourcePage": "https://github.com/pmndrs/racing-game/blob/7816a5d954b75e6ad853ae4e4f0cbbd628072643/thumbnail.webp",
      "licenseEvidenceUrl": "https://github.com/pmndrs/racing-game/blob/7816a5d954b75e6ad853ae4e4f0cbbd628072643/LICENSE.md",
      "captureDate": null,
      "versionRelation": "Image file pinned in the named repository at the indexed source commit; not a HeadStart playthrough or target-integration attestation.",
      "alt": "A low-poly racing car on the Poimandres track.",
      "sha256": "44088d796a27865624b38a86d89df8fb087b8360bf56a1ee8572892bc82cf44d",
      "originalUrl": "https://raw.githubusercontent.com/pmndrs/racing-game/7816a5d954b75e6ad853ae4e4f0cbbd628072643/thumbnail.webp",
      "allowedUse": "Local HeadStart catalog identification and preview display for this repository-included image under the listed terms; no broader game-asset reuse, endorsement or model-quality claim.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/critical_review",
      "src": "assets/catalog/pmndrs-racing-game.webp",
      "localSourcePath": "research/catalog/media/pmndrs-racing-game.webp"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "low-poly",
      "stylized"
    ],
    "runtimeVersion": "Three.js ^0.139.0; R3F ^8.0.12",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/pmndrs/racing-game/blob/7816a5d954b75e6ad853ae4e4f0cbbd628072643/LICENSE.md",
      "asset_status": "unreviewed",
      "asset_notes": "README asserts CC0 assets only; individual models, sounds, fonts and preview rights still require scope review.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/pmndrs/racing-game/tree/7816a5d954b75e6ad853ae4e4f0cbbd628072643",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "vehicle-controller",
      "camera"
    ],
    "buildingBlocks": [
      {
        "name": "Raycast vehicle",
        "category": "vehicle-controller",
        "evidence_url": "https://github.com/pmndrs/racing-game/blob/7816a5d954b75e6ad853ae4e4f0cbbd628072643/src/models/vehicle/Vehicle.tsx",
        "source_path": "src/models/vehicle/Vehicle.tsx",
        "status": "source_inspected",
        "notes": "Uses useRaycastVehicle, chassis and wheels; tightly coupled to the global store, effects and Cannon world."
      },
      {
        "name": "Camera mode switching",
        "category": "camera",
        "evidence_url": "https://github.com/pmndrs/racing-game/blob/7816a5d954b75e6ad853ae4e4f0cbbd628072643/src/effects/Cameras.tsx",
        "source_path": "src/effects/Cameras.tsx",
        "status": "source_inspected",
        "notes": "Switches perspective and orthographic cameras from shared store state; preserve target camera ownership."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/pmndrs/racing-game/tree/7816a5d954b75e6ad853ae4e4f0cbbd628072643",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/pmndrs/racing-game/blob/7816a5d954b75e6ad853ae4e4f0cbbd628072643/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/pmndrs/racing-game/blob/7816a5d954b75e6ad853ae4e4f0cbbd628072643/LICENSE.md",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/pmndrs/racing-game/blob/7816a5d954b75e6ad853ae4e4f0cbbd628072643/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/pmndrs/racing-game/blob/7816a5d954b75e6ad853ae4e4f0cbbd628072643/src/models/vehicle/Vehicle.tsx",
        "claim": "Raycast vehicle entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/pmndrs/racing-game/blob/7816a5d954b75e6ad853ae4e4f0cbbd628072643/src/effects/Cameras.tsx",
        "claim": "Camera mode switching entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "pmndrs-racing-game",
      "position": 8,
      "rationale": "playable game/demo; 2214 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 2214,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 4
      }
    },
    "githubStars": 2214,
    "popularity": {
      "repo_url": "https://github.com/pmndrs/racing-game",
      "stars": 2214,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/pmndrs/racing-game",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    },
    "playReview": {
      "record_id": "pmndrs-racing-game",
      "status": "load_incomplete",
      "checked_at": "2026-09-10T20:11:00Z",
      "reviewer": "/root",
      "environment": "Google Chrome on macOS, desktop window, public production demo",
      "scenario": "Loaded the race HUD, opened the start state and confirmed the page entered its audio-playing mode.",
      "result": "The Three.js scene and control HUD loaded, but sustained steering/acceleration was not established through the available automation controls.",
      "limitations": "Does not establish successful driving, game completion, mobile controls, performance or source/deployment parity; it is not an editorial fun verdict.",
      "editorial_pick": false
    }
  },
  {
    "id": "hexgl",
    "title": "HexGL",
    "summary": "A futuristic browser racer with hovercraft-style movement and recorded race-state playback.",
    "genres": [
      "racing",
      "arcade"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://hexgl.bkcore.com",
    "demoKind": "browser",
    "repoUrl": "https://github.com/BKcore/HexGL",
    "projectUrl": "https://hexgl.bkcore.com",
    "commit": "6addc95a2fce3bf05f4d751823cc054c61a16d68",
    "creator": "Thibaut Despoulain and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "Thibaut Despoulain and contributors",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://opensource.org/license/mit"
      ],
      "sourcePage": "https://github.com/BKcore/HexGL/blob/6addc95a2fce3bf05f4d751823cc054c61a16d68/css/mobile.jpg",
      "licenseEvidenceUrl": "https://github.com/BKcore/HexGL/blob/6addc95a2fce3bf05f4d751823cc054c61a16d68/LICENSE",
      "captureDate": null,
      "versionRelation": "Image file pinned in the named repository at the indexed source commit; not a HeadStart playthrough or target-integration attestation.",
      "alt": "A futuristic hover racer speeding along HexGL's elevated city track.",
      "sha256": "47a8905d72243b83964700a26cf62830abf8e69498f27658ea2620a732393d0e",
      "originalUrl": "https://raw.githubusercontent.com/BKcore/HexGL/6addc95a2fce3bf05f4d751823cc054c61a16d68/css/mobile.jpg",
      "allowedUse": "Local HeadStart catalog identification and preview display for this repository-included image under the listed terms; no broader game-asset reuse, endorsement or model-quality claim.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/critical_review",
      "src": "assets/catalog/hexgl.jpg",
      "localSourcePath": "research/catalog/media/hexgl.jpg"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "futuristic",
      "neon"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "MIT with per-file exceptions",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/BKcore/HexGL/blob/6addc95a2fce3bf05f4d751823cc054c61a16d68/LICENSE",
      "asset_status": "mixed",
      "asset_notes": "README expressly preserves file-specific licenses. Selected movement/replay files are marked CC-BY-NC-3.0, so do not present them as permissive commercial building blocks. Assets also need per-file review.",
      "scope_reuse_status": "review_required",
      "notes": "README says MIT unless a file specifies otherwise. Inspected ShipControls.js and RaceData.js explicitly specify CC-BY-NC-3.0; those exceptions govern the suggested scope pending rights review."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/BKcore/HexGL/tree/6addc95a2fce3bf05f4d751823cc054c61a16d68",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "vehicle-controller",
      "replay"
    ],
    "buildingBlocks": [
      {
        "name": "Hover-racer movement",
        "category": "vehicle-controller",
        "evidence_url": "https://github.com/BKcore/HexGL/blob/6addc95a2fce3bf05f4d751823cc054c61a16d68/bkcore/hexgl/ShipControls.js",
        "source_path": "bkcore/hexgl/ShipControls.js",
        "status": "source_inspected",
        "notes": "Thrust, boost, collision and height checks are present; this exact file retains a CC-BY-NC-3.0 header."
      },
      {
        "name": "Race recording and interpolation",
        "category": "replay",
        "evidence_url": "https://github.com/BKcore/HexGL/blob/6addc95a2fce3bf05f4d751823cc054c61a16d68/bkcore/hexgl/RaceData.js",
        "source_path": "bkcore/hexgl/RaceData.js",
        "status": "source_inspected",
        "notes": "Samples position/rotation and supports interpolated playback/import/export; this exact file retains a CC-BY-NC-3.0 header."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/BKcore/HexGL/tree/6addc95a2fce3bf05f4d751823cc054c61a16d68",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/BKcore/HexGL/blob/6addc95a2fce3bf05f4d751823cc054c61a16d68/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/BKcore/HexGL/blob/6addc95a2fce3bf05f4d751823cc054c61a16d68/LICENSE",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/BKcore/HexGL/blob/6addc95a2fce3bf05f4d751823cc054c61a16d68/bkcore/hexgl/ShipControls.js",
        "claim": "Hover-racer movement entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/BKcore/HexGL/blob/6addc95a2fce3bf05f4d751823cc054c61a16d68/bkcore/hexgl/RaceData.js",
        "claim": "Race recording and interpolation entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "hexgl",
      "position": 9,
      "rationale": "playable game/demo; 1742 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 1742,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 4
      }
    },
    "githubStars": 1742,
    "popularity": {
      "repo_url": "https://github.com/BKcore/HexGL",
      "stars": 1742,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/BKcore/HexGL",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "fable5-laas",
    "title": "LAAS",
    "summary": "A fully procedural 4 × 4 km old-growth forest world rendered in-browser with Three.js WebGPU.",
    "genres": [
      "exploration",
      "simulation"
    ],
    "runtime": "Three.js WebGPU",
    "label": "Play demo",
    "demoUrl": "https://dc5fzrbo8ssfx.cloudfront.net/laas/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/Braffolk/fable5-world-demo",
    "projectUrl": "https://dc5fzrbo8ssfx.cloudfront.net/laas/",
    "commit": "fd75fdb718996908aad3d22b59dfa297dc94298d",
    "creator": "Braffolk and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "Braffolk and contributors",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://opensource.org/license/mit"
      ],
      "sourcePage": "https://github.com/Braffolk/fable5-world-demo/blob/fd75fdb718996908aad3d22b59dfa297dc94298d/docs/readme-hero.jpg",
      "licenseEvidenceUrl": "https://github.com/Braffolk/fable5-world-demo/blob/fd75fdb718996908aad3d22b59dfa297dc94298d/LICENSE",
      "captureDate": null,
      "versionRelation": "Image file pinned in the named repository at the indexed source commit; not a HeadStart playthrough or target-integration attestation.",
      "alt": "A wide procedural forest valley rendered by LAAS in Three.js WebGPU.",
      "sha256": "d3fcd08f8f8afb633490665c55886498718aa0b90838339699f713984a9568b7",
      "originalUrl": "https://raw.githubusercontent.com/Braffolk/fable5-world-demo/fd75fdb718996908aad3d22b59dfa297dc94298d/docs/readme-hero.jpg",
      "allowedUse": "Local HeadStart catalog identification and preview display for this repository-included image under the listed terms; no broader game-asset reuse, endorsement or model-quality claim.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/critical_review",
      "src": "assets/catalog/fable5-laas.jpg",
      "localSourcePath": "research/catalog/media/fable5-laas.jpg"
    },
    "contentKind": "demo",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "naturalistic",
      "cinematic"
    ],
    "runtimeVersion": "0.184.0",
    "runtimeVersionStatus": "declared",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer-linked WebGPU build returned HTTP 200 during research. HeadStart did not perform a gameplay session; Chrome 113+ desktop and WebGPU are declared requirements.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/Braffolk/fable5-world-demo/blob/fd75fdb718996908aad3d22b59dfa297dc94298d/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "The maintainer says all world meshes, textures and lighting are generated at boot; the separate README hero screenshot is reviewed only for local catalog display.",
      "scope_reuse_status": "review_required",
      "notes": "MIT repository license inspected. Selected code, dependency scope and target compatibility still require review."
    },
    "sourceInspectedAt": "2026-09-10T20:45:00Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/Braffolk/fable5-world-demo/tree/fd75fdb718996908aad3d22b59dfa297dc94298d",
    "platforms": [
      "browser-desktop-webgpu"
    ],
    "platformKind": "browser",
    "capabilities": [
      "world",
      "procedural-generation",
      "terrain",
      "water",
      "vegetation",
      "weather",
      "movement"
    ],
    "buildingBlocks": [
      {
        "name": "Procedural terrain tiles",
        "category": "world-generation",
        "evidence_url": "https://github.com/Braffolk/fable5-world-demo/blob/fd75fdb718996908aad3d22b59dfa297dc94298d/src/world/TerrainTiles.ts",
        "source_path": "src/world/TerrainTiles.ts",
        "status": "source_inspected",
        "notes": "CDLOD terrain depends on GPU height synthesis, world constants and renderer-specific WebGPU contracts. No extraction or target integration test."
      },
      {
        "name": "Walk and free-fly camera",
        "category": "camera",
        "evidence_url": "https://github.com/Braffolk/fable5-world-demo/blob/fd75fdb718996908aad3d22b59dfa297dc94298d/src/core/FlyCamera.ts",
        "source_path": "src/core/FlyCamera.ts",
        "status": "source_inspected",
        "notes": "Pointer-lock camera includes terrain-relative movement modes and depends on the existing engine/input lifecycle. No extraction or target integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/Braffolk/fable5-world-demo/tree/fd75fdb718996908aad3d22b59dfa297dc94298d",
        "claim": "GitHub identity and immutable source tree inspected; no upstream code executed.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/Braffolk/fable5-world-demo/blob/fd75fdb718996908aad3d22b59dfa297dc94298d/README.md",
        "claim": "Maintainer description, browser requirements, controls, project scope and model-attribution statement inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/Braffolk/fable5-world-demo/blob/fd75fdb718996908aad3d22b59dfa297dc94298d/LICENSE",
        "claim": "Repository MIT license inspected; selected dependencies and downstream use remain separately reviewable.",
        "kind": "license"
      },
      {
        "url": "https://github.com/Braffolk/fable5-world-demo/blob/fd75fdb718996908aad3d22b59dfa297dc94298d/package.json",
        "claim": "Pinned Three.js 0.184.0 dependency and build declarations inspected.",
        "kind": "source"
      },
      {
        "url": "https://github.com/Braffolk/fable5-world-demo/blob/fd75fdb718996908aad3d22b59dfa297dc94298d/src/world/TerrainTiles.ts",
        "claim": "Terrain tile implementation entry point statically inspected for reusable-scope research.",
        "kind": "source"
      },
      {
        "url": "https://github.com/Braffolk/fable5-world-demo/blob/fd75fdb718996908aad3d22b59dfa297dc94298d/src/core/FlyCamera.ts",
        "claim": "First-person and free-fly camera entry point statically inspected for reusable-scope research.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "Fable 5"
      ],
      "evidence": [
        {
          "url": "https://github.com/Braffolk/fable5-world-demo/blob/fd75fdb718996908aad3d22b59dfa297dc94298d/README.md",
          "claim": "Creator states the repository was built roughly 99% by Fable 5, with the human partially writing the brief and providing rare motion/performance feedback."
        }
      ],
      "notes": "Creator-reported development participation; not independent certification, an exclusivity guarantee, or evidence that Fable 5 improves quality or performance."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "fable5-laas",
      "position": 10,
      "rationale": "playable game/demo; 718 GitHub stars observed; interface language unknown; creator-attributed preferred model.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 718,
        "english_interface": false,
        "preferred_model_provenance": true,
        "genre_capability_breadth": 9
      }
    },
    "githubStars": 718,
    "popularity": {
      "repo_url": "https://github.com/Braffolk/fable5-world-demo",
      "stars": 718,
      "status": "available",
      "checked_at": "2026-09-10T20:45:00Z",
      "evidence_url": "https://api.github.com/repos/Braffolk/fable5-world-demo",
      "notes": "Observed GitHub stargazers_count for the whole repository. A popularity signal, not quality, model performance or compatibility evidence."
    },
    "playReview": {
      "record_id": "fable5-laas",
      "status": "load_incomplete",
      "checked_at": "2026-09-10T20:08:00Z",
      "reviewer": "/root",
      "environment": "Google Chrome on macOS, desktop window, public production demo",
      "scenario": "Opened the Fable 5 Three.js WebGPU demo and waited through its staged terrain and vegetation loading sequence.",
      "result": "The loader advanced through terrain and vegetation stages, but the world did not reach a confirmed interactive state during the bounded session.",
      "limitations": "High memory use and incomplete load; no movement, performance, mobile or source/deployment parity conclusion.",
      "editorial_pick": false
    }
  },
  {
    "id": "dungeon-forge",
    "title": "Dungeon Forge",
    "summary": "A dungeon generation showcase that exposes seeded room layouts, connectivity and themed decoration.",
    "genres": [
      "dungeon",
      "procedural-generation"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://procedural-dungeon.netlify.app",
    "demoKind": "browser",
    "repoUrl": "https://github.com/majidmanzarpour/threejs-procedural-dungeon",
    "projectUrl": "https://procedural-dungeon.netlify.app",
    "commit": "0a2aa0980028cbbc77af6642b4232b45713dc5de",
    "creator": "majidmanzarpour and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "majidmanzarpour and contributors",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://opensource.org/license/mit"
      ],
      "sourcePage": "https://github.com/majidmanzarpour/threejs-procedural-dungeon/blob/0a2aa0980028cbbc77af6642b4232b45713dc5de/docs/preview.jpg",
      "licenseEvidenceUrl": "https://github.com/majidmanzarpour/threejs-procedural-dungeon/blob/0a2aa0980028cbbc77af6642b4232b45713dc5de/LICENSE",
      "captureDate": null,
      "versionRelation": "Image file pinned in the named repository at the indexed source commit; not a HeadStart playthrough or target-integration attestation.",
      "alt": "A procedurally generated stone dungeon viewed from above.",
      "sha256": "256d06c9a586f934a7faf20660bf6bcc23b0570a4ce7be3c93c8afe9d8b20f3c",
      "originalUrl": "https://raw.githubusercontent.com/majidmanzarpour/threejs-procedural-dungeon/0a2aa0980028cbbc77af6642b4232b45713dc5de/docs/preview.jpg",
      "allowedUse": "Local HeadStart catalog identification and preview display for this repository-included image under the listed terms; no broader game-asset reuse, endorsement or model-quality claim.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/critical_review",
      "src": "assets/catalog/dungeon-forge.jpg",
      "localSourcePath": "research/catalog/media/dungeon-forge.jpg"
    },
    "contentKind": "demo",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized",
      "themed"
    ],
    "runtimeVersion": "^0.185.0",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/majidmanzarpour/threejs-procedural-dungeon/blob/0a2aa0980028cbbc77af6642b4232b45713dc5de/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "README says geometry/textures are generated in browser. Preview redistribution and transitive dependencies need review.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/majidmanzarpour/threejs-procedural-dungeon/tree/0a2aa0980028cbbc77af6642b4232b45713dc5de",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "procedural-generation",
      "world-building"
    ],
    "buildingBlocks": [
      {
        "name": "Seeded dungeon layout",
        "category": "procedural-generation",
        "evidence_url": "https://github.com/majidmanzarpour/threejs-procedural-dungeon/blob/0a2aa0980028cbbc77af6642b4232b45713dc5de/src/main.js",
        "source_path": "src/main.js",
        "status": "source_inspected",
        "notes": "Inspected mulberry32, Delaunay and graph-generation entry points. Shared RNG and rendering live in one large module; extraction and determinism remain untested."
      },
      {
        "name": "Room semantics and decoration",
        "category": "world-building",
        "evidence_url": "https://github.com/majidmanzarpour/threejs-procedural-dungeon/blob/0a2aa0980028cbbc77af6642b4232b45713dc5de/src/main.js",
        "source_path": "src/main.js",
        "status": "source_inspected",
        "notes": "Room type constants and theme tables support encounter/decor roles; this is generation logic, not a complete combat game."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/majidmanzarpour/threejs-procedural-dungeon/tree/0a2aa0980028cbbc77af6642b4232b45713dc5de",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/majidmanzarpour/threejs-procedural-dungeon/blob/0a2aa0980028cbbc77af6642b4232b45713dc5de/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/majidmanzarpour/threejs-procedural-dungeon/blob/0a2aa0980028cbbc77af6642b4232b45713dc5de/LICENSE",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/majidmanzarpour/threejs-procedural-dungeon/blob/0a2aa0980028cbbc77af6642b4232b45713dc5de/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/majidmanzarpour/threejs-procedural-dungeon/blob/0a2aa0980028cbbc77af6642b4232b45713dc5de/src/main.js",
        "claim": "Seeded dungeon layout entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/majidmanzarpour/threejs-procedural-dungeon/blob/0a2aa0980028cbbc77af6642b4232b45713dc5de/src/main.js",
        "claim": "Room semantics and decoration entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "dungeon-forge",
      "position": 11,
      "rationale": "playable game/demo; 497 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 497,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 3
      }
    },
    "githubStars": 497,
    "popularity": {
      "repo_url": "https://github.com/majidmanzarpour/threejs-procedural-dungeon",
      "stars": 497,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/majidmanzarpour/threejs-procedural-dungeon",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "jungle-trail",
    "title": "Jungle Trail",
    "summary": "A playable English browser game selected for distinctive interactive systems and genre breadth.",
    "genres": [
      "exploration",
      "walking-simulator"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://starknightt.github.io/jungle-trail/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/StarKnightt/jungle-trail",
    "projectUrl": "https://starknightt.github.io/jungle-trail/",
    "commit": "c15640d3a2b6f08ca68e4df98fdfc953ea8a070a",
    "creator": "StarKnightt",
    "readiness": "review_required",
    "preview": {
      "credit": "StarKnightt",
      "licenseExpression": "MIT repository; media rights need scope review",
      "licenseUrls": [
        "https://github.com/StarKnightt/jungle-trail/blob/c15640d3a2b6f08ca68e4df98fdfc953ea8a070a/LICENSE"
      ],
      "sourcePage": "https://github.com/StarKnightt/jungle-trail/blob/c15640d3a2b6f08ca68e4df98fdfc953ea8a070a/media/reel.webp",
      "licenseEvidenceUrl": "https://github.com/StarKnightt/jungle-trail/blob/c15640d3a2b6f08ca68e4df98fdfc953ea8a070a/LICENSE",
      "captureDate": "2026-09-11",
      "versionRelation": "Stored at pinned revision.",
      "alt": "Authentic Jungle Trail gameplay media.",
      "sha256": "ba7a2096b4d5aebd58fc832c4c4bf76455c8a0abae579d7f8126c094573e24ab",
      "originalUrl": "https://raw.githubusercontent.com/StarKnightt/jungle-trail/c15640d3a2b6f08ca68e4df98fdfc953ea8a070a/media/reel.webp",
      "allowedUse": "Local catalog display with credit and source link.",
      "modifications": "Unmodified upstream bytes.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/jungle-trail.webp",
      "localSourcePath": "research/catalog/media/jungle-trail.webp"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "stylized"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer-linked live build; reachability checked, gameplay compatibility untested.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/StarKnightt/jungle-trail/blob/c15640d3a2b6f08ca68e4df98fdfc953ea8a070a/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository gameplay image is locally displayed; downstream reuse needs review.",
      "scope_reuse_status": "review_required",
      "notes": "MIT code inspected; asset/dependency rights remain scope-specific."
    },
    "sourceInspectedAt": "2026-09-11T02:30:00Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/StarKnightt/jungle-trail/tree/c15640d3a2b6f08ca68e4df98fdfc953ea8a070a",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "gameplay-loop",
      "interaction",
      "browser-runtime"
    ],
    "buildingBlocks": [
      {
        "name": "Playable game systems",
        "category": "gameplay-loop",
        "evidence_url": "https://github.com/StarKnightt/jungle-trail/tree/c15640d3a2b6f08ca68e4df98fdfc953ea8a070a/index.html",
        "source_path": "index.html",
        "status": "source_inspected",
        "notes": "Core browser game systems."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/StarKnightt/jungle-trail/tree/c15640d3a2b6f08ca68e4df98fdfc953ea8a070a",
        "claim": "Pinned public revision contains game source.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/StarKnightt/jungle-trail/blob/c15640d3a2b6f08ca68e4df98fdfc953ea8a070a/README.md",
        "claim": "README documents gameplay and live build.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/StarKnightt/jungle-trail/blob/c15640d3a2b6f08ca68e4df98fdfc953ea8a070a/LICENSE",
        "claim": "Pinned MIT license.",
        "kind": "license"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No exact preferred-model attribution established."
    },
    "interfaceLanguages": [
      "en"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public player or usage count recorded."
    },
    "editorialRank": {
      "record_id": "jungle-trail",
      "position": 12,
      "rationale": "playable game/demo; 292 GitHub stars observed; English interface evidenced.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 292,
        "english_interface": true,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 5
      }
    },
    "githubStars": 292,
    "popularity": {
      "repo_url": "https://github.com/StarKnightt/jungle-trail",
      "stars": 292,
      "status": "available",
      "checked_at": "2026-09-11T02:30:00Z",
      "evidence_url": "https://api.github.com/repos/StarKnightt/jungle-trail",
      "notes": "Public GitHub API observation; count changes over time."
    }
  },
  {
    "id": "jelly-baby",
    "title": "Jelly Baby",
    "summary": "A soft-body toy sandbox with elastic character motion and interactive facilities.",
    "genres": [
      "sandbox",
      "physics"
    ],
    "runtime": "Three.js WebGPU",
    "label": "Play demo",
    "demoUrl": "https://jelly.scottsun.io/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/scottstts/Jelly-Baby",
    "projectUrl": "https://jelly.scottsun.io/",
    "commit": "a36879ca47a890638ed9e4feaf98304e4c8c417e",
    "creator": "scottstts and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "scottstts and contributors",
      "licenseExpression": "GPL-3.0-only",
      "licenseUrls": [
        "https://www.gnu.org/licenses/gpl-3.0.html"
      ],
      "sourcePage": "https://github.com/scottstts/Jelly-Baby/blob/a36879ca47a890638ed9e4feaf98304e4c8c417e/assets/screenshot.jpeg",
      "licenseEvidenceUrl": "https://github.com/scottstts/Jelly-Baby/blob/a36879ca47a890638ed9e4feaf98304e4c8c417e/LICENSE",
      "captureDate": null,
      "versionRelation": "Image file pinned in the named repository at the indexed source commit; not a HeadStart playthrough or target-integration attestation.",
      "alt": "Colorful soft-body jelly characters in the WebGPU physics sandbox.",
      "sha256": "ba4ac9b691356a3e4aee32ac8350b9fd558587fd2a031168f9f4350be892156e",
      "originalUrl": "https://raw.githubusercontent.com/scottstts/Jelly-Baby/a36879ca47a890638ed9e4feaf98304e4c8c417e/assets/screenshot.jpeg",
      "allowedUse": "Local HeadStart catalog identification and preview display for this repository-included image under the listed terms; no broader game-asset reuse, endorsement or model-quality claim.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/critical_review",
      "src": "assets/catalog/jelly-baby.jpg",
      "localSourcePath": "research/catalog/media/jelly-baby.jpg"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "three ^0.185.0",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "GPL-3.0-only",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/scottstts/Jelly-Baby/blob/a36879ca47a890638ed9e4feaf98304e4c8c417e/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "Code license inspected; selected files, transitive dependencies and assets still require scope review."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/scottstts/Jelly-Baby/tree/a36879ca47a890638ed9e4feaf98304e4c8c417e",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "physics",
      "movement"
    ],
    "buildingBlocks": [
      {
        "name": "Elastic soft-body system",
        "category": "physics",
        "evidence_url": "https://github.com/scottstts/Jelly-Baby/blob/a36879ca47a890638ed9e4feaf98304e4c8c417e/src/physics/soft-body.js",
        "source_path": "src/physics/soft-body.js",
        "status": "source_inspected",
        "notes": "SoftBody uses a custom kernel, surface deformation and Three.js WebGPU buffers. No extraction or integration test."
      },
      {
        "name": "Force-driven locomotion",
        "category": "movement",
        "evidence_url": "https://github.com/scottstts/Jelly-Baby/blob/a36879ca47a890638ed9e4feaf98304e4c8c417e/src/game/locomotion.ts",
        "source_path": "src/game/locomotion.ts",
        "status": "source_inspected",
        "notes": "Locomotion applies forces to the soft rig and tracks grounded/contact state. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/scottstts/Jelly-Baby/tree/a36879ca47a890638ed9e4feaf98304e4c8c417e",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/scottstts/Jelly-Baby/blob/a36879ca47a890638ed9e4feaf98304e4c8c417e/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/scottstts/Jelly-Baby/blob/a36879ca47a890638ed9e4feaf98304e4c8c417e/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/scottstts/Jelly-Baby/blob/a36879ca47a890638ed9e4feaf98304e4c8c417e/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/scottstts/Jelly-Baby/blob/a36879ca47a890638ed9e4feaf98304e4c8c417e/src/physics/soft-body.js",
        "claim": "Elastic soft-body system entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/scottstts/Jelly-Baby/blob/a36879ca47a890638ed9e4feaf98304e4c8c417e/src/game/locomotion.ts",
        "claim": "Force-driven locomotion entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unverified",
      "models": [],
      "evidence": [],
      "notes": "This project appears in an Astra collection, but a creator statement establishing the exact model contribution has not been verified."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "jelly-baby",
      "position": 13,
      "rationale": "playable game/demo; 141 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 141,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 3
      }
    },
    "githubStars": 141,
    "popularity": {
      "repo_url": "https://github.com/scottstts/Jelly-Baby",
      "stars": 141,
      "status": "available",
      "checked_at": "2026-09-10T19:48:26Z",
      "evidence_url": "https://api.github.com/repos/scottstts/Jelly-Baby",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "astra-thunderfall",
    "title": "Thunderfall",
    "summary": "A scrolling shooter with fighter choices, staged encounters and procedural audio.",
    "genres": [
      "shooter",
      "arcade"
    ],
    "runtime": "Canvas 2D",
    "label": "Play demo",
    "demoUrl": "https://thunderfall.vercel.app/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/MartinDelophy/awesome-gpt-6-astra",
    "projectUrl": "https://thunderfall.vercel.app/",
    "commit": "139a9287e763e5b592bb53fda97e5101db15db40",
    "creator": "jackroc and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "jackroc and contributors",
      "licenseExpression": "CC0-1.0",
      "licenseUrls": [
        "https://creativecommons.org/publicdomain/zero/1.0/"
      ],
      "sourcePage": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/assets/screenshots/thunderfall/gameplay.jpg",
      "licenseEvidenceUrl": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/LICENSE",
      "captureDate": null,
      "versionRelation": "Separate curated gameplay capture; its exact game-build relation to the indexed source commit is unknown. Not a HeadStart playthrough or target-integration attestation.",
      "alt": "A fighter aircraft dodging fire above Thunderfall's volcanic battlefield.",
      "sha256": "0d1cda2750293876526eb8752debb1c6ebc7e2a2c281b93c6a22e2e5870f8e0a",
      "originalUrl": "https://raw.githubusercontent.com/MartinDelophy/awesome-gpt-6-astra/139a9287e763e5b592bb53fda97e5101db15db40/assets/screenshots/thunderfall/gameplay.jpg",
      "allowedUse": "Local HeadStart catalog identification and preview display for this repository-included image under the listed terms; no broader game-asset reuse, endorsement or model-quality claim.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/critical_review",
      "src": "assets/catalog/astra-thunderfall.jpg",
      "localSourcePath": "research/catalog/media/astra-thunderfall.jpg"
    },
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "CC0-1.0",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "Subproject README explicitly applies repository CC0 to original code, procedural graphics and synthesized audio."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/139a9287e763e5b592bb53fda97e5101db15db40",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "game-loop",
      "audio"
    ],
    "buildingBlocks": [
      {
        "name": "Shooter simulation",
        "category": "game-loop",
        "evidence_url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/thunderfall/engine.js",
        "source_path": "works/thunderfall/engine.js",
        "status": "source_inspected",
        "notes": "Game uses seeded random, stage definitions, weighted weapons and collision distance checks. No extraction or integration test."
      },
      {
        "name": "Synthesized sound",
        "category": "audio",
        "evidence_url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/thunderfall/audio.js",
        "source_path": "works/thunderfall/audio.js",
        "status": "source_inspected",
        "notes": "Sound creates Web Audio nodes after interaction; depends on audio lifecycle and game events. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/139a9287e763e5b592bb53fda97e5101db15db40",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/thunderfall/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/thunderfall/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/thunderfall/README.md",
        "claim": "Model attribution evidence inspected; exact contribution remains bounded in ai_provenance notes.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/thunderfall/engine.js",
        "claim": "Shooter simulation entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/thunderfall/audio.js",
        "claim": "Synthesized sound entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 Astra"
      ],
      "evidence": [
        {
          "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/thunderfall/README.md",
          "claim": "Creator-facing repository description, development record or linked author post attributes this represented work to GPT-6 Astra."
        }
      ],
      "notes": "Creator attribution describes development participation, not model certification, exclusive authorship or measured performance."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "astra-thunderfall",
      "position": 14,
      "rationale": "playable game/demo; 135 GitHub stars observed; interface language unknown; creator-attributed preferred model.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 135,
        "english_interface": false,
        "preferred_model_provenance": true,
        "genre_capability_breadth": 4
      }
    },
    "githubStars": 135,
    "popularity": {
      "repo_url": "https://github.com/MartinDelophy/awesome-gpt-6-astra",
      "stars": 135,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/MartinDelophy/awesome-gpt-6-astra",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "moon-rover",
    "title": "Regolith: The Silence at Anaxagoras",
    "summary": "A WebGL2 lunar rover survey game with terrain physics, instruments, drilling, discoveries, and desktop/mobile controls.",
    "genres": [
      "exploration",
      "simulation",
      "adventure"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://winchxyz.github.io/moon-rover/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/winchxyz/moon-rover",
    "projectUrl": "https://winchxyz.github.io/moon-rover/",
    "commit": "f5f25ba6bf7477c612b408b265c9275a4fd1200d",
    "creator": "winchxyz",
    "readiness": "review_required",
    "preview": {
      "credit": "winchxyz",
      "licenseExpression": "MIT repository; screenshot/content rights need scope review",
      "licenseUrls": [
        "https://github.com/winchxyz/moon-rover/blob/f5f25ba6bf7477c612b408b265c9275a4fd1200d/LICENSE"
      ],
      "sourcePage": "https://github.com/winchxyz/moon-rover/blob/f5f25ba6bf7477c612b408b265c9275a4fd1200d/docs/hero.jpg",
      "licenseEvidenceUrl": "https://github.com/winchxyz/moon-rover/blob/f5f25ba6bf7477c612b408b265c9275a4fd1200d/LICENSE",
      "captureDate": "2026-09-11",
      "versionRelation": "Stored at the pinned inspected source revision.",
      "alt": "Authentic Regolith: The Silence at Anaxagoras gameplay image from its repository.",
      "sha256": "9307b7524a3bc6ca3522944e022149629644368175dec4b27321bc43e1d3cc5c",
      "originalUrl": "https://raw.githubusercontent.com/winchxyz/moon-rover/f5f25ba6bf7477c612b408b265c9275a4fd1200d/docs/hero.jpg",
      "allowedUse": "Local catalog display with credit and source link; no downstream asset-reuse conclusion.",
      "modifications": "Unmodified upstream bytes.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/moon-rover.jpg",
      "localSourcePath": "research/catalog/media/moon-rover.jpg"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "realistic",
      "science-fiction"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer-linked live browser build; HTTP reachability was checked, but gameplay compatibility remains untested.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/winchxyz/moon-rover/blob/f5f25ba6bf7477c612b408b265c9275a4fd1200d/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository screenshot is used only for local catalog display; downstream asset reuse needs separate review.",
      "scope_reuse_status": "review_required",
      "notes": "MIT code license inspected at the pinned revision; asset provenance and dependency notices remain scope-specific."
    },
    "sourceInspectedAt": "2026-09-11T02:10:00Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/winchxyz/moon-rover/tree/f5f25ba6bf7477c612b408b265c9275a4fd1200d",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "vehicle-controller",
      "procedural-terrain",
      "physics",
      "missions",
      "mobile-controls"
    ],
    "buildingBlocks": [
      {
        "name": "Playable game loop",
        "category": "gameplay-loop",
        "evidence_url": "https://github.com/winchxyz/moon-rover/blob/f5f25ba6bf7477c612b408b265c9275a4fd1200d/index.html",
        "source_path": "index.html",
        "status": "source_inspected",
        "notes": "Primary game source contains the runtime loop and interaction systems."
      },
      {
        "name": "Browser presentation",
        "category": "presentation",
        "evidence_url": "https://github.com/winchxyz/moon-rover/blob/f5f25ba6bf7477c612b408b265c9275a4fd1200d/index.html",
        "source_path": "index.html",
        "status": "source_inspected",
        "notes": "Browser entry point and interface shell."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/winchxyz/moon-rover/tree/f5f25ba6bf7477c612b408b265c9275a4fd1200d",
        "claim": "Pinned public repository revision contains the playable game source.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/winchxyz/moon-rover/blob/f5f25ba6bf7477c612b408b265c9275a4fd1200d/README.md",
        "claim": "README documents gameplay and links the live browser build.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/winchxyz/moon-rover/blob/f5f25ba6bf7477c612b408b265c9275a4fd1200d/LICENSE",
        "claim": "Pinned MIT license text covers repository code subject to separately identified assets.",
        "kind": "license"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No exact GPT-6 Astra or Fable 5/5.1 creator attribution established."
    },
    "interfaceLanguages": [
      "en"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "moon-rover",
      "position": 15,
      "rationale": "playable game/demo; 120 GitHub stars observed; English interface evidenced.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 120,
        "english_interface": true,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 8
      }
    },
    "githubStars": 120,
    "popularity": {
      "repo_url": "https://github.com/winchxyz/moon-rover",
      "stars": 120,
      "status": "available",
      "checked_at": "2026-09-11T02:10:00Z",
      "evidence_url": "https://api.github.com/repos/winchxyz/moon-rover",
      "notes": "Public GitHub repository API observation; star counts change over time."
    }
  },
  {
    "id": "operation-ironhold",
    "title": "Operation Ironhold",
    "summary": "A complete browser FPS with four weapons, enemy AI, movement systems, synthesized audio, and a timed combat round.",
    "genres": [
      "fps",
      "action",
      "shooter"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://starknightt.github.io/operation-ironhold/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/StarKnightt/operation-ironhold",
    "projectUrl": "https://starknightt.github.io/operation-ironhold/",
    "commit": "58b292758fd29953c35bcd3ee7113004b709fda3",
    "creator": "StarKnightt",
    "readiness": "review_required",
    "preview": {
      "credit": "StarKnightt",
      "licenseExpression": "MIT repository; screenshot/content rights need scope review",
      "licenseUrls": [
        "https://github.com/StarKnightt/operation-ironhold/blob/58b292758fd29953c35bcd3ee7113004b709fda3/LICENSE"
      ],
      "sourcePage": "https://github.com/StarKnightt/operation-ironhold/blob/58b292758fd29953c35bcd3ee7113004b709fda3/screenshots/gameplay.jpg",
      "licenseEvidenceUrl": "https://github.com/StarKnightt/operation-ironhold/blob/58b292758fd29953c35bcd3ee7113004b709fda3/LICENSE",
      "captureDate": "2026-09-11",
      "versionRelation": "Stored at the pinned inspected source revision.",
      "alt": "Authentic Operation Ironhold gameplay image from its repository.",
      "sha256": "1aef0e21fdadf34c5a784e0b4fa13c6cb9450aa4519b2984e71778fac5748f52",
      "originalUrl": "https://raw.githubusercontent.com/StarKnightt/operation-ironhold/58b292758fd29953c35bcd3ee7113004b709fda3/screenshots/gameplay.jpg",
      "allowedUse": "Local catalog display with credit and source link; no downstream asset-reuse conclusion.",
      "modifications": "Unmodified upstream bytes.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/operation-ironhold.jpg",
      "localSourcePath": "research/catalog/media/operation-ironhold.jpg"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "stylized",
      "military"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer-linked live browser build; HTTP reachability was checked, but gameplay compatibility remains untested.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/StarKnightt/operation-ironhold/blob/58b292758fd29953c35bcd3ee7113004b709fda3/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository screenshot is used only for local catalog display; downstream asset reuse needs separate review.",
      "scope_reuse_status": "review_required",
      "notes": "MIT code license inspected at the pinned revision; asset provenance and dependency notices remain scope-specific."
    },
    "sourceInspectedAt": "2026-09-11T02:10:00Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/StarKnightt/operation-ironhold/tree/58b292758fd29953c35bcd3ee7113004b709fda3",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "first-person-controller",
      "combat",
      "enemy-ai",
      "weapons",
      "audio-synthesis"
    ],
    "buildingBlocks": [
      {
        "name": "Playable game loop",
        "category": "gameplay-loop",
        "evidence_url": "https://github.com/StarKnightt/operation-ironhold/blob/58b292758fd29953c35bcd3ee7113004b709fda3/index.html",
        "source_path": "index.html",
        "status": "source_inspected",
        "notes": "Primary game source contains the runtime loop and interaction systems."
      },
      {
        "name": "Browser presentation",
        "category": "presentation",
        "evidence_url": "https://github.com/StarKnightt/operation-ironhold/blob/58b292758fd29953c35bcd3ee7113004b709fda3/index.html",
        "source_path": "index.html",
        "status": "source_inspected",
        "notes": "Browser entry point and interface shell."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/StarKnightt/operation-ironhold/tree/58b292758fd29953c35bcd3ee7113004b709fda3",
        "claim": "Pinned public repository revision contains the playable game source.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/StarKnightt/operation-ironhold/blob/58b292758fd29953c35bcd3ee7113004b709fda3/README.md",
        "claim": "README documents gameplay and links the live browser build.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/StarKnightt/operation-ironhold/blob/58b292758fd29953c35bcd3ee7113004b709fda3/LICENSE",
        "claim": "Pinned MIT license text covers repository code subject to separately identified assets.",
        "kind": "license"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No exact GPT-6 Astra or Fable 5/5.1 creator attribution established."
    },
    "interfaceLanguages": [
      "en"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "operation-ironhold",
      "position": 16,
      "rationale": "playable game/demo; 89 GitHub stars observed; English interface evidenced.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 89,
        "english_interface": true,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 8
      }
    },
    "githubStars": 89,
    "popularity": {
      "repo_url": "https://github.com/StarKnightt/operation-ironhold",
      "stars": 89,
      "status": "available",
      "checked_at": "2026-09-11T02:10:00Z",
      "evidence_url": "https://api.github.com/repos/StarKnightt/operation-ironhold",
      "notes": "Public GitHub repository API observation; star counts change over time."
    }
  },
  {
    "id": "fable-cities",
    "title": "Fable Cities",
    "summary": "A city-builder project with inspectable road, environment and simulation modules and a linked browser build.",
    "genres": [
      "city-builder",
      "simulation",
      "management"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://fablecities.rawscollections.com",
    "demoKind": "browser",
    "repoUrl": "https://github.com/rawprogress/fable-cities",
    "projectUrl": "https://fablecities.rawscollections.com",
    "commit": "aea8b1035030952555395de0c1de14ba693a1427",
    "creator": "rawprogress and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "rawprogress and contributors",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://opensource.org/license/mit"
      ],
      "sourcePage": "https://github.com/rawprogress/fable-cities/blob/aea8b1035030952555395de0c1de14ba693a1427/assets/hero.jpg",
      "licenseEvidenceUrl": "https://github.com/rawprogress/fable-cities/blob/aea8b1035030952555395de0c1de14ba693a1427/LICENSE",
      "captureDate": null,
      "versionRelation": "Image file pinned in the named repository at the indexed source commit; not a HeadStart playthrough or target-integration attestation.",
      "alt": "A generated city skyline and streets in Fable Cities.",
      "sha256": "0590917b638e138ebb348e56b3748c71844ef2d6b9568f57b9906f06e97111f3",
      "originalUrl": "https://raw.githubusercontent.com/rawprogress/fable-cities/aea8b1035030952555395de0c1de14ba693a1427/assets/hero.jpg",
      "allowedUse": "Local HeadStart catalog identification and preview display for this repository-included image under the listed terms; no broader game-asset reuse, endorsement or model-quality claim.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/critical_review",
      "src": "assets/catalog/fable-cities.jpg",
      "localSourcePath": "research/catalog/media/fable-cities.jpg"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "urban",
      "procedural"
    ],
    "runtimeVersion": "^0.185.1",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/rawprogress/fable-cities/blob/aea8b1035030952555395de0c1de14ba693a1427/LICENSE",
      "asset_status": "mixed",
      "asset_notes": "LICENSE explicitly covers source code only. CC0 claims in public/assets/CREDITS.md apply to listed assets, not automatically to assets/hero.jpg or other promotional images.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/rawprogress/fable-cities/tree/aea8b1035030952555395de0c1de14ba693a1427",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "simulation-clock",
      "construction"
    ],
    "buildingBlocks": [
      {
        "name": "Simulation clock",
        "category": "simulation-clock",
        "evidence_url": "https://github.com/rawprogress/fable-cities/blob/aea8b1035030952555395de0c1de14ba693a1427/src/modules/simulation/clock.js",
        "source_path": "src/modules/simulation/clock.js",
        "status": "source_inspected",
        "notes": "Speed steps, calendar changes and pending minute ticks are implemented against world.time and events."
      },
      {
        "name": "Editable road graph",
        "category": "construction",
        "evidence_url": "https://github.com/rawprogress/fable-cities/blob/aea8b1035030952555395de0c1de14ba693a1427/src/modules/roads/RoadNetwork.js",
        "source_path": "src/modules/roads/RoadNetwork.js",
        "status": "source_inspected",
        "notes": "Road nodes and segments support topology changes and terrain profiles; curve/road configuration dependencies need extraction review."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/rawprogress/fable-cities/tree/aea8b1035030952555395de0c1de14ba693a1427",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/rawprogress/fable-cities/blob/aea8b1035030952555395de0c1de14ba693a1427/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/rawprogress/fable-cities/blob/aea8b1035030952555395de0c1de14ba693a1427/LICENSE",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/rawprogress/fable-cities/blob/aea8b1035030952555395de0c1de14ba693a1427/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/rawprogress/fable-cities/blob/aea8b1035030952555395de0c1de14ba693a1427/src/modules/simulation/clock.js",
        "claim": "Simulation clock entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/rawprogress/fable-cities/blob/aea8b1035030952555395de0c1de14ba693a1427/src/modules/roads/RoadNetwork.js",
        "claim": "Editable road graph entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/rawprogress/fable-cities/blob/aea8b1035030952555395de0c1de14ba693a1427/public/assets/CREDITS.md",
        "claim": "Maintainer asset/library notices inspected; upstream asset grants not independently verified.",
        "kind": "license"
      },
      {
        "url": "https://github.com/rawprogress/fable-cities/blob/aea8b1035030952555395de0c1de14ba693a1427/THIRD-PARTY-NOTICES.md",
        "claim": "Maintainer asset/library notices inspected; upstream asset grants not independently verified.",
        "kind": "license"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "fable-cities",
      "position": 17,
      "rationale": "playable game/demo; 71 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 71,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 5
      }
    },
    "githubStars": 71,
    "popularity": {
      "repo_url": "https://github.com/rawprogress/fable-cities",
      "stars": 71,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/rawprogress/fable-cities",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "turbo-kart-rush",
    "title": "Turbo Kart Rush",
    "summary": "An original Three.js kart racer with eight drivers, four circuits, drifting, ten items, synthesized audio and seven AI opponents.",
    "genres": [
      "racing",
      "arcade",
      "kart"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://bridge-mind.github.io/turbo-kart-rush/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/bridge-mind/turbo-kart-rush",
    "projectUrl": "https://bridge-mind.github.io/turbo-kart-rush/",
    "commit": "6c0456c7642447eae29e0832e7e542fec07ec07d",
    "creator": "BridgeMind",
    "readiness": "review_required",
    "preview": {
      "credit": "BridgeMind",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://opensource.org/license/mit"
      ],
      "sourcePage": "https://github.com/bridge-mind/turbo-kart-rush/blob/6c0456c7642447eae29e0832e7e542fec07ec07d/docs/screenshots/race.jpg",
      "licenseEvidenceUrl": "https://github.com/bridge-mind/turbo-kart-rush/blob/6c0456c7642447eae29e0832e7e542fec07ec07d/LICENSE",
      "captureDate": null,
      "versionRelation": "Pinned repository image at the indexed source commit.",
      "alt": "A colorful Turbo Kart Rush race with rival karts and the racing HUD.",
      "sha256": "e9015659e69d8b5664509c6312660cf714c5a6b5453345169b117dadd895b578",
      "originalUrl": "https://raw.githubusercontent.com/bridge-mind/turbo-kart-rush/6c0456c7642447eae29e0832e7e542fec07ec07d/docs/screenshots/race.jpg",
      "allowedUse": "HeadStart catalog identification and preview display for this exact image with listed credit and terms; no endorsement, model-quality claim or blanket game-asset clearance.",
      "modifications": "Original repository bytes retained unchanged; site CSS may scale and crop.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/turbo-kart-rush.jpg",
      "localSourcePath": "research/catalog/media/turbo-kart-rush.jpg"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "colorful",
      "low-poly"
    ],
    "runtimeVersion": "three 0.185.1",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer-linked production URL returned HTTP 200 with HTML on 2026-09-11. This is a reachability check, not a complete playtest or source/deployment attestation.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/bridge-mind/turbo-kart-rush/blob/6c0456c7642447eae29e0832e7e542fec07ec07d/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository media and depicted assets require selected-scope review.",
      "scope_reuse_status": "review_required",
      "notes": "The code license was inspected at the pinned revision. Preserve notices and review selected files, assets, data and dependencies before reuse."
    },
    "sourceInspectedAt": "2026-09-11T01:30:00Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/bridge-mind/turbo-kart-rush/tree/6c0456c7642447eae29e0832e7e542fec07ec07d",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "vehicle-physics",
      "items",
      "ai-racing"
    ],
    "buildingBlocks": [
      {
        "name": "Arcade kart and drift model",
        "category": "vehicle-physics",
        "evidence_url": "https://github.com/bridge-mind/turbo-kart-rush/blob/6c0456c7642447eae29e0832e7e542fec07ec07d/src/kart/Kart.ts",
        "source_path": "src/kart/Kart.ts",
        "status": "source_inspected",
        "notes": "Implements acceleration, hop, drift charge and mini-turbo behavior. No extraction or target integration test."
      },
      {
        "name": "Position-aware AI drivers",
        "category": "ai-racing",
        "evidence_url": "https://github.com/bridge-mind/turbo-kart-rush/blob/6c0456c7642447eae29e0832e7e542fec07ec07d/src/ai/AIDriver.ts",
        "source_path": "src/ai/AIDriver.ts",
        "status": "source_inspected",
        "notes": "Follows racing lines, dodges hazards, uses items and rubber-bands by race state. No extraction or target integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/bridge-mind/turbo-kart-rush/tree/6c0456c7642447eae29e0832e7e542fec07ec07d",
        "claim": "Pinned public repository identity and immutable source revision inspected.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/bridge-mind/turbo-kart-rush/blob/6c0456c7642447eae29e0832e7e542fec07ec07d/README.md",
        "claim": "Project description, live-play link, controls and declared implementation context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/bridge-mind/turbo-kart-rush/blob/6c0456c7642447eae29e0832e7e542fec07ec07d/LICENSE",
        "claim": "Project code license text inspected; assets and dependencies remain separate scopes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/bridge-mind/turbo-kart-rush/blob/6c0456c7642447eae29e0832e7e542fec07ec07d/src/kart/Kart.ts",
        "claim": "Arcade kart and drift model implementation entry points statically inspected.",
        "kind": "source"
      },
      {
        "url": "https://github.com/bridge-mind/turbo-kart-rush/blob/6c0456c7642447eae29e0832e7e542fec07ec07d/src/ai/AIDriver.ts",
        "claim": "Position-aware AI drivers implementation entry points statically inspected.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "Fable 5.1"
      ],
      "evidence": [
        {
          "url": "https://github.com/bridge-mind/turbo-kart-rush/blob/6c0456c7642447eae29e0832e7e542fec07ec07d/README.md",
          "claim": "Maintainer README states five Claude Fable 5.1 sub-agents produced the game in parallel from one prompt."
        }
      ],
      "notes": "Creator attribution describes the reported development workflow; it is not a quality score, certification or exclusive-authorship claim."
    },
    "interfaceLanguages": [
      "en"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count was found during this audit."
    },
    "editorialRank": {
      "record_id": "turbo-kart-rush",
      "position": 18,
      "rationale": "playable game/demo; 36 GitHub stars observed; English interface evidenced; creator-attributed preferred model.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 36,
        "english_interface": true,
        "preferred_model_provenance": true,
        "genre_capability_breadth": 6
      }
    },
    "githubStars": 36,
    "popularity": {
      "repo_url": "https://github.com/bridge-mind/turbo-kart-rush",
      "stars": 36,
      "status": "available",
      "checked_at": "2026-09-11T01:23:00Z",
      "evidence_url": "https://api.github.com/repos/bridge-mind/turbo-kart-rush",
      "notes": "Observed from the public GitHub repository API on the stated date; stars are repository-level popularity, not player or quality counts."
    }
  },
  {
    "id": "datacenter-survival",
    "title": "Datacenter Survival",
    "summary": "A playable English browser game selected for distinctive interactive systems and genre breadth.",
    "genres": [
      "strategy",
      "simulation",
      "survival"
    ],
    "runtime": "Canvas 2D",
    "label": "Play demo",
    "demoUrl": "https://pshenok.github.io/datacenter-survival/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/pshenok/datacenter-survival",
    "projectUrl": "https://pshenok.github.io/datacenter-survival/",
    "commit": "234588545ca6a1d63da41a0ec19a267e8623a72e",
    "creator": "pshenok",
    "readiness": "review_required",
    "preview": {
      "credit": "pshenok",
      "licenseExpression": "MIT repository; media rights need scope review",
      "licenseUrls": [
        "https://github.com/pshenok/datacenter-survival/blob/234588545ca6a1d63da41a0ec19a267e8623a72e/LICENSE"
      ],
      "sourcePage": "https://github.com/pshenok/datacenter-survival/blob/234588545ca6a1d63da41a0ec19a267e8623a72e/assets/demo.gif",
      "licenseEvidenceUrl": "https://github.com/pshenok/datacenter-survival/blob/234588545ca6a1d63da41a0ec19a267e8623a72e/LICENSE",
      "captureDate": "2026-09-11",
      "versionRelation": "Stored at pinned revision.",
      "alt": "Authentic Datacenter Survival gameplay media.",
      "sha256": "c720bed468ec52b4e0b4d4b83fac412dcd0d3dc140e9ef56e5237ccb1ad1ef6c",
      "originalUrl": "https://raw.githubusercontent.com/pshenok/datacenter-survival/234588545ca6a1d63da41a0ec19a267e8623a72e/assets/demo.gif",
      "allowedUse": "Local catalog display with credit and source link.",
      "modifications": "Unmodified upstream bytes.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/datacenter-survival.gif",
      "localSourcePath": "research/catalog/media/datacenter-survival.gif"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "stylized"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer-linked live build; reachability checked, gameplay compatibility untested.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/pshenok/datacenter-survival/blob/234588545ca6a1d63da41a0ec19a267e8623a72e/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository gameplay image is locally displayed; downstream reuse needs review.",
      "scope_reuse_status": "review_required",
      "notes": "MIT code inspected; asset/dependency rights remain scope-specific."
    },
    "sourceInspectedAt": "2026-09-11T02:30:00Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/pshenok/datacenter-survival/tree/234588545ca6a1d63da41a0ec19a267e8623a72e",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "gameplay-loop",
      "interaction",
      "browser-runtime"
    ],
    "buildingBlocks": [
      {
        "name": "Playable game systems",
        "category": "gameplay-loop",
        "evidence_url": "https://github.com/pshenok/datacenter-survival/tree/234588545ca6a1d63da41a0ec19a267e8623a72e/index.html",
        "source_path": "index.html",
        "status": "source_inspected",
        "notes": "Core browser game systems."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/pshenok/datacenter-survival/tree/234588545ca6a1d63da41a0ec19a267e8623a72e",
        "claim": "Pinned public revision contains game source.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/pshenok/datacenter-survival/blob/234588545ca6a1d63da41a0ec19a267e8623a72e/README.md",
        "claim": "README documents gameplay and live build.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/pshenok/datacenter-survival/blob/234588545ca6a1d63da41a0ec19a267e8623a72e/LICENSE",
        "claim": "Pinned MIT license.",
        "kind": "license"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No exact preferred-model attribution established."
    },
    "interfaceLanguages": [
      "en"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public player or usage count recorded."
    },
    "editorialRank": {
      "record_id": "datacenter-survival",
      "position": 19,
      "rationale": "playable game/demo; 21 GitHub stars observed; English interface evidenced.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 21,
        "english_interface": true,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 6
      }
    },
    "githubStars": 21,
    "popularity": {
      "repo_url": "https://github.com/pshenok/datacenter-survival",
      "stars": 21,
      "status": "available",
      "checked_at": "2026-09-11T02:30:00Z",
      "evidence_url": "https://api.github.com/repos/pshenok/datacenter-survival",
      "notes": "Public GitHub API observation; count changes over time."
    }
  },
  {
    "id": "cadle",
    "title": "Cadle",
    "summary": "A playable English browser game selected for distinctive interactive systems and genre breadth.",
    "genres": [
      "fps",
      "rpg",
      "adventure"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://cadle.gg/play/?start",
    "demoKind": "browser",
    "repoUrl": "https://github.com/Humpalumps/Cadle",
    "projectUrl": "https://cadle.gg/play/?start",
    "commit": "ea0da62549980816a6a27e08b75808b1f56d70e7",
    "creator": "Humpalumps",
    "readiness": "review_required",
    "preview": {
      "credit": "Humpalumps",
      "licenseExpression": "MIT repository; media rights need scope review",
      "licenseUrls": [
        "https://github.com/Humpalumps/Cadle/blob/ea0da62549980816a6a27e08b75808b1f56d70e7/LICENSE"
      ],
      "sourcePage": "https://github.com/Humpalumps/Cadle/blob/ea0da62549980816a6a27e08b75808b1f56d70e7/public/assets/site/vale-b.jpg",
      "licenseEvidenceUrl": "https://github.com/Humpalumps/Cadle/blob/ea0da62549980816a6a27e08b75808b1f56d70e7/LICENSE",
      "captureDate": "2026-09-11",
      "versionRelation": "Stored at pinned revision.",
      "alt": "Authentic Cadle gameplay media.",
      "sha256": "82d815a38d05c57831ecaa86409462dae7b928724db45d9c9519db4707905441",
      "originalUrl": "https://raw.githubusercontent.com/Humpalumps/Cadle/ea0da62549980816a6a27e08b75808b1f56d70e7/public/assets/site/vale-b.jpg",
      "allowedUse": "Local catalog display with credit and source link.",
      "modifications": "Unmodified upstream bytes.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/cadle.jpg",
      "localSourcePath": "research/catalog/media/cadle.jpg"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "stylized"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer-linked live build; reachability checked, gameplay compatibility untested.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/Humpalumps/Cadle/blob/ea0da62549980816a6a27e08b75808b1f56d70e7/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository gameplay image is locally displayed; downstream reuse needs review.",
      "scope_reuse_status": "review_required",
      "notes": "MIT code inspected; asset/dependency rights remain scope-specific."
    },
    "sourceInspectedAt": "2026-09-11T02:30:00Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/Humpalumps/Cadle/tree/ea0da62549980816a6a27e08b75808b1f56d70e7",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "gameplay-loop",
      "interaction",
      "browser-runtime"
    ],
    "buildingBlocks": [
      {
        "name": "Playable game systems",
        "category": "gameplay-loop",
        "evidence_url": "https://github.com/Humpalumps/Cadle/tree/ea0da62549980816a6a27e08b75808b1f56d70e7/index.html",
        "source_path": "index.html",
        "status": "source_inspected",
        "notes": "Core browser game systems."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/Humpalumps/Cadle/tree/ea0da62549980816a6a27e08b75808b1f56d70e7",
        "claim": "Pinned public revision contains game source.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/Humpalumps/Cadle/blob/ea0da62549980816a6a27e08b75808b1f56d70e7/README.md",
        "claim": "README documents gameplay and live build.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/Humpalumps/Cadle/blob/ea0da62549980816a6a27e08b75808b1f56d70e7/LICENSE",
        "claim": "Pinned MIT license.",
        "kind": "license"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No exact preferred-model attribution established."
    },
    "interfaceLanguages": [
      "en"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public player or usage count recorded."
    },
    "editorialRank": {
      "record_id": "cadle",
      "position": 20,
      "rationale": "playable game/demo; 18 GitHub stars observed; English interface evidenced.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 18,
        "english_interface": true,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 6
      }
    },
    "githubStars": 18,
    "popularity": {
      "repo_url": "https://github.com/Humpalumps/Cadle",
      "stars": 18,
      "status": "available",
      "checked_at": "2026-09-11T02:30:00Z",
      "evidence_url": "https://api.github.com/repos/Humpalumps/Cadle",
      "notes": "Public GitHub API observation; count changes over time."
    }
  },
  {
    "id": "neomud",
    "title": "NeoMud",
    "summary": "A live browser multiplayer dungeon game combining shared rooms, party combat, classes, crafting and a visual world.",
    "genres": [
      "multiplayer",
      "dungeon-crawler",
      "rpg"
    ],
    "runtime": "Kotlin Compose Multiplatform / WASM",
    "label": "Play demo",
    "demoUrl": "https://neomud.app",
    "demoKind": "browser",
    "repoUrl": "https://github.com/roomsmith-games/NeoMud",
    "projectUrl": "https://neomud.app",
    "commit": "b6f1b31c230c01d83f84feba0a6f5e9d6e061a7a",
    "creator": "Roomsmith Games contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "Roomsmith Games contributors",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://opensource.org/license/mit"
      ],
      "sourcePage": "https://github.com/roomsmith-games/NeoMud/blob/b6f1b31c230c01d83f84feba0a6f5e9d6e061a7a/docs/screenshots/town_square.png",
      "licenseEvidenceUrl": "https://github.com/roomsmith-games/NeoMud/blob/b6f1b31c230c01d83f84feba0a6f5e9d6e061a7a/LICENSE",
      "captureDate": null,
      "versionRelation": "Pinned repository image at the indexed source commit.",
      "alt": "NeoMud Town Square with room art, characters, minimap and game log.",
      "sha256": "72e5bfb7521811e02a3cf9ffa7730a466291dab081446f632900e7a8340b1fb6",
      "originalUrl": "https://raw.githubusercontent.com/roomsmith-games/NeoMud/b6f1b31c230c01d83f84feba0a6f5e9d6e061a7a/docs/screenshots/town_square.png",
      "allowedUse": "HeadStart catalog identification and preview display for this exact image with listed credit and terms; no endorsement, model-quality claim or blanket game-asset clearance.",
      "modifications": "Original repository bytes retained unchanged; site CSS may scale and crop.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/neomud.png",
      "localSourcePath": "research/catalog/media/neomud.png"
    },
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [
      "pixel-art",
      "fantasy",
      "interface-rich"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer-linked production URL returned HTTP 200 with HTML on 2026-09-11. This is a reachability check, not a complete playtest or source/deployment attestation.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/roomsmith-games/NeoMud/blob/b6f1b31c230c01d83f84feba0a6f5e9d6e061a7a/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository media and depicted assets require selected-scope review.",
      "scope_reuse_status": "review_required",
      "notes": "The code license was inspected at the pinned revision. Preserve notices and review selected files, assets, data and dependencies before reuse."
    },
    "sourceInspectedAt": "2026-09-11T01:30:00Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/roomsmith-games/NeoMud/tree/b6f1b31c230c01d83f84feba0a6f5e9d6e061a7a",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "multiplayer-state",
      "combat",
      "party-system"
    ],
    "buildingBlocks": [
      {
        "name": "Server game loop",
        "category": "combat",
        "evidence_url": "https://github.com/roomsmith-games/NeoMud/blob/b6f1b31c230c01d83f84feba0a6f5e9d6e061a7a/server/src/main/kotlin/com/neomud/server/game/GameLoop.kt",
        "source_path": "server/src/main/kotlin/com/neomud/server/game/GameLoop.kt",
        "status": "source_inspected",
        "notes": "Runs tick-based combat actions and NPC behavior. No extraction or target integration test."
      },
      {
        "name": "Party coordination",
        "category": "party-system",
        "evidence_url": "https://github.com/roomsmith-games/NeoMud/blob/b6f1b31c230c01d83f84feba0a6f5e9d6e061a7a/server/src/main/kotlin/com/neomud/server/game/party/PartyService.kt",
        "source_path": "server/src/main/kotlin/com/neomud/server/game/party/PartyService.kt",
        "status": "source_inspected",
        "notes": "Owns invites, membership and shared group state. No extraction or target integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/roomsmith-games/NeoMud/tree/b6f1b31c230c01d83f84feba0a6f5e9d6e061a7a",
        "claim": "Pinned public repository identity and immutable source revision inspected.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/roomsmith-games/NeoMud/blob/b6f1b31c230c01d83f84feba0a6f5e9d6e061a7a/README.md",
        "claim": "Project description, live-play link, controls and declared implementation context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/roomsmith-games/NeoMud/blob/b6f1b31c230c01d83f84feba0a6f5e9d6e061a7a/LICENSE",
        "claim": "Project code license text inspected; assets and dependencies remain separate scopes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/roomsmith-games/NeoMud/blob/b6f1b31c230c01d83f84feba0a6f5e9d6e061a7a/server/src/main/kotlin/com/neomud/server/game/GameLoop.kt",
        "claim": "Server game loop implementation entry points statically inspected.",
        "kind": "source"
      },
      {
        "url": "https://github.com/roomsmith-games/NeoMud/blob/b6f1b31c230c01d83f84feba0a6f5e9d6e061a7a/server/src/main/kotlin/com/neomud/server/game/party/PartyService.kt",
        "claim": "Party coordination implementation entry points statically inspected.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "The maintainer calls the project vibe-coded with AI assistance but does not identify an exact model for the represented revision."
    },
    "interfaceLanguages": [
      "en"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count was found during this audit."
    },
    "editorialRank": {
      "record_id": "neomud",
      "position": 21,
      "rationale": "playable game/demo; 12 GitHub stars observed; English interface evidenced.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 12,
        "english_interface": true,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 6
      }
    },
    "githubStars": 12,
    "popularity": {
      "repo_url": "https://github.com/roomsmith-games/NeoMud",
      "stars": 12,
      "status": "available",
      "checked_at": "2026-09-11T01:23:00Z",
      "evidence_url": "https://api.github.com/repos/roomsmith-games/NeoMud",
      "notes": "Observed from the public GitHub repository API on the stated date; stars are repository-level popularity, not player or quality counts."
    }
  },
  {
    "id": "emerald-bayou",
    "title": "Emerald Bayou",
    "summary": "A playable English browser game selected for distinctive interactive systems and genre breadth.",
    "genres": [
      "exploration",
      "simulation",
      "driving"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://vheissu.github.io/emerald-bayou/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/Vheissu/emerald-bayou",
    "projectUrl": "https://vheissu.github.io/emerald-bayou/",
    "commit": "e87c03688263daadb1bfbf35efaddc5ab7d53912",
    "creator": "Vheissu",
    "readiness": "review_required",
    "preview": {
      "credit": "Vheissu",
      "licenseExpression": "MIT repository; media rights need scope review",
      "licenseUrls": [
        "https://github.com/Vheissu/emerald-bayou/blob/e87c03688263daadb1bfbf35efaddc5ab7d53912/LICENSE"
      ],
      "sourcePage": "https://github.com/Vheissu/emerald-bayou/blob/e87c03688263daadb1bfbf35efaddc5ab7d53912/docs/screenshots/01-hero.jpg",
      "licenseEvidenceUrl": "https://github.com/Vheissu/emerald-bayou/blob/e87c03688263daadb1bfbf35efaddc5ab7d53912/LICENSE",
      "captureDate": "2026-09-11",
      "versionRelation": "Stored at pinned revision.",
      "alt": "Authentic Emerald Bayou gameplay media.",
      "sha256": "64a67d0f40f04c99f9626ef8a2da2a05c11b87c47f81feee952c87db10cc1bf7",
      "originalUrl": "https://raw.githubusercontent.com/Vheissu/emerald-bayou/e87c03688263daadb1bfbf35efaddc5ab7d53912/docs/screenshots/01-hero.jpg",
      "allowedUse": "Local catalog display with credit and source link.",
      "modifications": "Unmodified upstream bytes.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/emerald-bayou.jpg",
      "localSourcePath": "research/catalog/media/emerald-bayou.jpg"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "stylized"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer-linked live build; reachability checked, gameplay compatibility untested.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/Vheissu/emerald-bayou/blob/e87c03688263daadb1bfbf35efaddc5ab7d53912/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository gameplay image is locally displayed; downstream reuse needs review.",
      "scope_reuse_status": "review_required",
      "notes": "MIT code inspected; asset/dependency rights remain scope-specific."
    },
    "sourceInspectedAt": "2026-09-11T02:30:00Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/Vheissu/emerald-bayou/tree/e87c03688263daadb1bfbf35efaddc5ab7d53912",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "gameplay-loop",
      "interaction",
      "browser-runtime"
    ],
    "buildingBlocks": [
      {
        "name": "Playable game systems",
        "category": "gameplay-loop",
        "evidence_url": "https://github.com/Vheissu/emerald-bayou/tree/e87c03688263daadb1bfbf35efaddc5ab7d53912/index.html",
        "source_path": "index.html",
        "status": "source_inspected",
        "notes": "Core browser game systems."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/Vheissu/emerald-bayou/tree/e87c03688263daadb1bfbf35efaddc5ab7d53912",
        "claim": "Pinned public revision contains game source.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/Vheissu/emerald-bayou/blob/e87c03688263daadb1bfbf35efaddc5ab7d53912/README.md",
        "claim": "README documents gameplay and live build.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/Vheissu/emerald-bayou/blob/e87c03688263daadb1bfbf35efaddc5ab7d53912/LICENSE",
        "claim": "Pinned MIT license.",
        "kind": "license"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No exact preferred-model attribution established."
    },
    "interfaceLanguages": [
      "en"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public player or usage count recorded."
    },
    "editorialRank": {
      "record_id": "emerald-bayou",
      "position": 22,
      "rationale": "playable game/demo; 11 GitHub stars observed; English interface evidenced.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 11,
        "english_interface": true,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 6
      }
    },
    "githubStars": 11,
    "popularity": {
      "repo_url": "https://github.com/Vheissu/emerald-bayou",
      "stars": 11,
      "status": "available",
      "checked_at": "2026-09-11T02:30:00Z",
      "evidence_url": "https://api.github.com/repos/Vheissu/emerald-bayou",
      "notes": "Public GitHub API observation; count changes over time."
    }
  },
  {
    "id": "blackwater",
    "title": "Blackwater",
    "summary": "A tactical first-person mission through a rainy freight terminal.",
    "genres": [
      "first-person-shooter"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://blackwater-roan.vercel.app/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/Hiraeth010/blackwater",
    "projectUrl": "https://blackwater-roan.vercel.app/",
    "commit": "80e56105690c963e3263d075ade41afce533d44e",
    "creator": "Hiraeth010 and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "Hiraeth010 and contributors",
      "licenseExpression": "MIT AND CC0-1.0",
      "licenseUrls": [
        "https://opensource.org/license/mit",
        "https://creativecommons.org/publicdomain/zero/1.0/"
      ],
      "sourcePage": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/assets/screenshots/blackwater/gameplay.jpg",
      "licenseEvidenceUrl": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/LICENSE",
      "captureDate": null,
      "versionRelation": "Separate curated gameplay capture; its exact game-build relation to the indexed source commit is unknown. Not a HeadStart playthrough or target-integration attestation.",
      "alt": "First-person combat in Blackwater's rain-soaked freight terminal.",
      "sha256": "0ffdf45c843dc5b5e7257037cbf00ef661ff78fb3ecafd3f25171754fd7a5dfa",
      "originalUrl": "https://raw.githubusercontent.com/MartinDelophy/awesome-gpt-6-astra/139a9287e763e5b592bb53fda97e5101db15db40/assets/screenshots/blackwater/gameplay.jpg",
      "allowedUse": "Local HeadStart research-preview identification only. MIT covers the named game's repository content and CC0 covers the collection capture; depicted third-party rights, publication and game-asset reuse remain separately unresolved.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/critical_review",
      "src": "assets/catalog/blackwater.jpg",
      "localSourcePath": "research/catalog/media/blackwater.jpg"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "react 19.2.6; three 0.180.0",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/Hiraeth010/blackwater/blob/80e56105690c963e3263d075ade41afce533d44e/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "Code license inspected; selected files, transitive dependencies and assets still require scope review."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/Hiraeth010/blackwater/tree/80e56105690c963e3263d075ade41afce533d44e",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "character",
      "weapon"
    ],
    "buildingBlocks": [
      {
        "name": "Procedural enemy rig",
        "category": "character",
        "evidence_url": "https://github.com/Hiraeth010/blackwater/blob/80e56105690c963e3263d075ade41afce533d44e/app/game/enemy.ts",
        "source_path": "app/game/enemy.ts",
        "status": "source_inspected",
        "notes": "Builds and caches operator geometry for the scene; this is appearance, not enemy AI. No extraction or integration test."
      },
      {
        "name": "First-person weapon rig",
        "category": "weapon",
        "evidence_url": "https://github.com/Hiraeth010/blackwater/blob/80e56105690c963e3263d075ade41afce533d44e/app/game/weapon.ts",
        "source_path": "app/game/weapon.ts",
        "status": "source_inspected",
        "notes": "Procedural carbine and hands attach to the owning camera; textures generated through canvas. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/Hiraeth010/blackwater/tree/80e56105690c963e3263d075ade41afce533d44e",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/Hiraeth010/blackwater/blob/80e56105690c963e3263d075ade41afce533d44e/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/Hiraeth010/blackwater/blob/80e56105690c963e3263d075ade41afce533d44e/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/Hiraeth010/blackwater/blob/80e56105690c963e3263d075ade41afce533d44e/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/Hiraeth010/blackwater/blob/80e56105690c963e3263d075ade41afce533d44e/app/game/enemy.ts",
        "claim": "Procedural enemy rig entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/Hiraeth010/blackwater/blob/80e56105690c963e3263d075ade41afce533d44e/app/game/weapon.ts",
        "claim": "First-person weapon rig entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unverified",
      "models": [],
      "evidence": [],
      "notes": "This project appears in an Astra collection, but a creator statement establishing the exact model contribution has not been verified."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "blackwater",
      "position": 23,
      "rationale": "playable game/demo; 11 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 11,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 3
      }
    },
    "githubStars": 11,
    "popularity": {
      "repo_url": "https://github.com/Hiraeth010/blackwater",
      "stars": 11,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/Hiraeth010/blackwater",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "vesper-street",
    "title": "Vesper Street",
    "summary": "An isometric survival-horror game in a flooded town with light-reactive enemies.",
    "genres": [
      "survival-horror",
      "adventure"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://winchxyz.github.io/vesper-street/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/winchxyz/vesper-street",
    "projectUrl": "https://winchxyz.github.io/vesper-street/",
    "commit": "fcc2f6eda84311194c0834de6cd7081c2965086f",
    "creator": "winchxyz and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "winchxyz and contributors",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://opensource.org/license/mit"
      ],
      "sourcePage": "https://github.com/winchxyz/vesper-street/blob/fcc2f6eda84311194c0834de6cd7081c2965086f/media/01_vesper_street.jpg",
      "licenseEvidenceUrl": "https://github.com/winchxyz/vesper-street/blob/fcc2f6eda84311194c0834de6cd7081c2965086f/LICENSE",
      "captureDate": null,
      "versionRelation": "Image file pinned in the named repository at the indexed source commit; not a HeadStart playthrough or target-integration attestation.",
      "alt": "Isometric exploration of a flooded, neon-lit street in Vesper Street.",
      "sha256": "c104e95e6989e75da77ff5ced1eecc6cc5927f06f54e06a69b3737721e6e9af6",
      "originalUrl": "https://raw.githubusercontent.com/winchxyz/vesper-street/fcc2f6eda84311194c0834de6cd7081c2965086f/media/01_vesper_street.jpg",
      "allowedUse": "Local HeadStart catalog identification and preview display for this repository-included image under the listed terms; no broader game-asset reuse, endorsement or model-quality claim.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/critical_review",
      "src": "assets/catalog/vesper-street.jpg",
      "localSourcePath": "research/catalog/media/vesper-street.jpg"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/winchxyz/vesper-street/blob/fcc2f6eda84311194c0834de6cd7081c2965086f/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "Code license inspected; selected files, transitive dependencies and assets still require scope review."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/winchxyz/vesper-street/tree/fcc2f6eda84311194c0834de6cd7081c2965086f",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "procedural-generation",
      "npc-ai"
    ],
    "buildingBlocks": [
      {
        "name": "Voxel meshing",
        "category": "procedural-generation",
        "evidence_url": "https://github.com/winchxyz/vesper-street/blob/fcc2f6eda84311194c0834de6cd7081c2965086f/js/voxel.js",
        "source_path": "js/voxel.js",
        "status": "source_inspected",
        "notes": "Dense voxel grids and palette classes feed merged vertex-colored geometry. No extraction or integration test."
      },
      {
        "name": "Light-reactive enemy",
        "category": "npc-ai",
        "evidence_url": "https://github.com/winchxyz/vesper-street/blob/fcc2f6eda84311194c0834de6cd7081c2965086f/js/hollow.js",
        "source_path": "js/hollow.js",
        "status": "source_inspected",
        "notes": "Hollow states stalk/freeze/lunge/burn depend on character rigs, beam context and walkable world. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/winchxyz/vesper-street/tree/fcc2f6eda84311194c0834de6cd7081c2965086f",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/winchxyz/vesper-street/blob/fcc2f6eda84311194c0834de6cd7081c2965086f/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/winchxyz/vesper-street/blob/fcc2f6eda84311194c0834de6cd7081c2965086f/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/winchxyz/vesper-street/blob/fcc2f6eda84311194c0834de6cd7081c2965086f/js/voxel.js",
        "claim": "Voxel meshing entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/winchxyz/vesper-street/blob/fcc2f6eda84311194c0834de6cd7081c2965086f/js/hollow.js",
        "claim": "Light-reactive enemy entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "Fable 5.1"
      ],
      "evidence": [
        {
          "url": "https://www.reddit.com/r/vibecoding/comments/1wayao9/vibecoded_horror_game_with_fable_51/",
          "claim": "Creator-facing repository description, development record or linked author post attributes this represented work to Claude Fable 5.1."
        }
      ],
      "notes": "Reddit poster oxmannnn claims authorship, Fable 5.1 MAX and links this repo; account linkage to winchxyz is not independently established. Timing/one-prompt claims are not our measurements."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "vesper-street",
      "position": 24,
      "rationale": "playable game/demo; 10 GitHub stars observed; interface language unknown; creator-attributed preferred model.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 10,
        "english_interface": false,
        "preferred_model_provenance": true,
        "genre_capability_breadth": 4
      }
    },
    "githubStars": 10,
    "popularity": {
      "repo_url": "https://github.com/winchxyz/vesper-street",
      "stars": 10,
      "status": "available",
      "checked_at": "2026-09-10T19:48:26Z",
      "evidence_url": "https://api.github.com/repos/winchxyz/vesper-street",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "p-doom",
    "title": "P(DOOM): The Alignment Problem",
    "summary": "A grimy Doom-inspired browser FPS parody with close-range combat, distinct enemy archetypes and a final shutdown encounter.",
    "genres": [
      "first-person-shooter",
      "action",
      "parody"
    ],
    "runtime": "Three.js / Next.js",
    "label": "Play demo",
    "demoUrl": "https://p-doom.transitivebullsh.it",
    "demoKind": "browser",
    "repoUrl": "https://github.com/transitive-bullshit/ai-safety-doom",
    "projectUrl": "https://p-doom.transitivebullsh.it",
    "commit": "5b7f433d9df121ba9c9a4d998a668954278f0b76",
    "creator": "Travis Fischer and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "Travis Fischer and contributors",
      "licenseExpression": "MIT AND LicenseRef-PDOOM-Notices",
      "licenseUrls": [
        "https://opensource.org/license/mit"
      ],
      "sourcePage": "https://github.com/transitive-bullshit/ai-safety-doom/blob/5b7f433d9df121ba9c9a4d998a668954278f0b76/docs/images/arrival.jpg",
      "licenseEvidenceUrl": "https://github.com/transitive-bullshit/ai-safety-doom/blob/5b7f433d9df121ba9c9a4d998a668954278f0b76/NOTICES.md",
      "captureDate": null,
      "versionRelation": "Pinned repository image at the indexed source commit.",
      "alt": "First-person P(DOOM) gameplay on the Arrival Platform, with the player weapon, enemies, mission objective, and status HUD visible.",
      "sha256": "25b3ddd858038a5bae291cb14208df396c0df95c063b695a0a342dddb5a8a8a2",
      "originalUrl": "https://raw.githubusercontent.com/transitive-bullshit/ai-safety-doom/5b7f433d9df121ba9c9a4d998a668954278f0b76/docs/images/arrival.jpg",
      "allowedUse": "HeadStart catalog identification and preview display for this exact image with listed credit and terms; no endorsement, model-quality claim or blanket game-asset clearance.",
      "modifications": "Original repository bytes retained unchanged; site CSS may scale and crop.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/p-doom.jpg",
      "localSourcePath": "research/catalog/media/p-doom.jpg"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "retro",
      "pixel-art",
      "science-fiction"
    ],
    "runtimeVersion": "three 0.185.1; Next.js 16.3.4",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer-linked production URL returned HTTP 200 with HTML on 2026-09-11. This is a reachability check, not a complete playtest or source/deployment attestation.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/transitive-bullshit/ai-safety-doom/blob/5b7f433d9df121ba9c9a4d998a668954278f0b76/license",
      "asset_status": "mixed",
      "asset_notes": "Application code is MIT. NOTICES.md identifies generated art, OFL/CC0 media and several copyrighted Doom sound recordings excluded from the MIT grant.",
      "scope_reuse_status": "review_required",
      "notes": "The code license was inspected at the pinned revision. Preserve notices and review selected files, assets, data and dependencies before reuse."
    },
    "sourceInspectedAt": "2026-09-11T01:30:00Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/transitive-bullshit/ai-safety-doom/tree/5b7f433d9df121ba9c9a4d998a668954278f0b76",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "combat",
      "enemy-ai",
      "level-progression"
    ],
    "buildingBlocks": [
      {
        "name": "Shooter runtime",
        "category": "combat",
        "evidence_url": "https://github.com/transitive-bullshit/ai-safety-doom/blob/5b7f433d9df121ba9c9a4d998a668954278f0b76/lib/game/runtime.ts",
        "source_path": "lib/game/runtime.ts",
        "status": "source_inspected",
        "notes": "Owns the real-time simulation and player combat loop. No extraction or target integration test."
      },
      {
        "name": "Enemy and boss model",
        "category": "enemy-ai",
        "evidence_url": "https://github.com/transitive-bullshit/ai-safety-doom/blob/5b7f433d9df121ba9c9a4d998a668954278f0b76/lib/game/model.ts",
        "source_path": "lib/game/model.ts",
        "status": "source_inspected",
        "notes": "Defines encounter state, enemy behavior and boss progression. No extraction or target integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/transitive-bullshit/ai-safety-doom/tree/5b7f433d9df121ba9c9a4d998a668954278f0b76",
        "claim": "Pinned public repository identity and immutable source revision inspected.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/transitive-bullshit/ai-safety-doom/blob/5b7f433d9df121ba9c9a4d998a668954278f0b76/readme.md",
        "claim": "Project description, live-play link, controls and declared implementation context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/transitive-bullshit/ai-safety-doom/blob/5b7f433d9df121ba9c9a4d998a668954278f0b76/license",
        "claim": "Project code license text inspected; assets and dependencies remain separate scopes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/transitive-bullshit/ai-safety-doom/blob/5b7f433d9df121ba9c9a4d998a668954278f0b76/lib/game/runtime.ts",
        "claim": "Shooter runtime implementation entry points statically inspected.",
        "kind": "source"
      },
      {
        "url": "https://github.com/transitive-bullshit/ai-safety-doom/blob/5b7f433d9df121ba9c9a4d998a668954278f0b76/lib/game/model.ts",
        "claim": "Enemy and boss model implementation entry points statically inspected.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 Astra"
      ],
      "evidence": [
        {
          "url": "https://github.com/transitive-bullshit/ai-safety-doom/blob/5b7f433d9df121ba9c9a4d998a668954278f0b76/readme.md",
          "claim": "Creator README credits GPT-6 Astra and Codex alongside the author and technical stack."
        }
      ],
      "notes": "Creator attribution describes the reported development workflow; it is not a quality score, certification or exclusive-authorship claim."
    },
    "interfaceLanguages": [
      "en"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count was found during this audit."
    },
    "editorialRank": {
      "record_id": "p-doom",
      "position": 25,
      "rationale": "playable game/demo; 6 GitHub stars observed; English interface evidenced; creator-attributed preferred model.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 6,
        "english_interface": true,
        "preferred_model_provenance": true,
        "genre_capability_breadth": 6
      }
    },
    "githubStars": 6,
    "popularity": {
      "repo_url": "https://github.com/transitive-bullshit/ai-safety-doom",
      "stars": 6,
      "status": "available",
      "checked_at": "2026-09-11T01:23:00Z",
      "evidence_url": "https://api.github.com/repos/transitive-bullshit/ai-safety-doom",
      "notes": "Observed from the public GitHub repository API on the stated date; stars are repository-level popularity, not player or quality counts."
    }
  },
  {
    "id": "little-flock",
    "title": "Little Flock",
    "summary": "A cooperative 3D sheep-farming game with shared farms, lamb care, gardening and progressive cottage construction.",
    "genres": [
      "multiplayer",
      "cozy",
      "farming",
      "simulation"
    ],
    "runtime": "React Three Fiber / Three.js",
    "label": "Play demo",
    "demoUrl": "https://sharpherd.song.work",
    "demoKind": "browser",
    "repoUrl": "https://github.com/songkeys/little-flock",
    "projectUrl": "https://sharpherd.song.work",
    "commit": "eaaa56184ad8f1b513ae81960075846663803886",
    "creator": "songkeys and Little Flock contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "songkeys and Little Flock contributors",
      "licenseExpression": "CC-BY-4.0",
      "licenseUrls": [
        "https://creativecommons.org/licenses/by/4.0/"
      ],
      "sourcePage": "https://github.com/songkeys/little-flock/blob/eaaa56184ad8f1b513ae81960075846663803886/docs/demo-poster.jpg",
      "licenseEvidenceUrl": "https://github.com/songkeys/little-flock/blob/eaaa56184ad8f1b513ae81960075846663803886/ASSETS.md",
      "captureDate": null,
      "versionRelation": "Pinned repository image at the indexed source commit.",
      "alt": "A shepherd and sheep in Little Flock’s shared pastoral valley.",
      "sha256": "8a2a768ccc8467c5cd5cfe7d90764fa58d30010ef34a286ae2eef0a36b9ba8cf",
      "originalUrl": "https://raw.githubusercontent.com/songkeys/little-flock/eaaa56184ad8f1b513ae81960075846663803886/docs/demo-poster.jpg",
      "allowedUse": "HeadStart catalog identification and preview display for this exact image with listed credit and terms; no endorsement, model-quality claim or blanket game-asset clearance.",
      "modifications": "Original repository bytes retained unchanged; site CSS may scale and crop.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/little-flock.jpg",
      "localSourcePath": "research/catalog/media/little-flock.jpg"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "stylized",
      "pastoral",
      "low-poly"
    ],
    "runtimeVersion": "react-three-fiber 9.3; three 0.180",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer-linked production URL returned HTTP 200 with HTML on 2026-09-11. This is a reachability check, not a complete playtest or source/deployment attestation.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/songkeys/little-flock/blob/eaaa56184ad8f1b513ae81960075846663803886/LICENSE",
      "asset_status": "mixed",
      "asset_notes": "Code/docs are MIT; project artwork, cottage model and demo media are CC-BY-4.0 with ASSETS.md credits.",
      "scope_reuse_status": "review_required",
      "notes": "The code license was inspected at the pinned revision. Preserve notices and review selected files, assets, data and dependencies before reuse."
    },
    "sourceInspectedAt": "2026-09-11T01:30:00Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/songkeys/little-flock/tree/eaaa56184ad8f1b513ae81960075846663803886",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "multiplayer-state",
      "construction-progression",
      "resource-loop"
    ],
    "buildingBlocks": [
      {
        "name": "Shared farm server",
        "category": "multiplayer-state",
        "evidence_url": "https://github.com/songkeys/little-flock/blob/eaaa56184ad8f1b513ae81960075846663803886/server/game.go",
        "source_path": "server/game.go",
        "status": "source_inspected",
        "notes": "Server-owned resource changes and rules persist successful actions before WebSocket broadcasts. No extraction or target integration test."
      },
      {
        "name": "Progressive cottage and journey",
        "category": "construction-progression",
        "evidence_url": "https://github.com/songkeys/little-flock/blob/eaaa56184ad8f1b513ae81960075846663803886/src/game/progression.ts",
        "source_path": "src/game/progression.ts",
        "status": "source_inspected",
        "notes": "Client progression state drives construction and guided milestones. No extraction or target integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/songkeys/little-flock/tree/eaaa56184ad8f1b513ae81960075846663803886",
        "claim": "Pinned public repository identity and immutable source revision inspected.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/songkeys/little-flock/blob/eaaa56184ad8f1b513ae81960075846663803886/README.md",
        "claim": "Project description, live-play link, controls and declared implementation context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/songkeys/little-flock/blob/eaaa56184ad8f1b513ae81960075846663803886/LICENSE",
        "claim": "Project code license text inspected; assets and dependencies remain separate scopes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/songkeys/little-flock/blob/eaaa56184ad8f1b513ae81960075846663803886/server/game.go",
        "claim": "Shared farm server implementation entry points statically inspected.",
        "kind": "source"
      },
      {
        "url": "https://github.com/songkeys/little-flock/blob/eaaa56184ad8f1b513ae81960075846663803886/src/game/progression.ts",
        "claim": "Progressive cottage and journey implementation entry points statically inspected.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 Astra"
      ],
      "evidence": [
        {
          "url": "https://github.com/songkeys/little-flock/blob/eaaa56184ad8f1b513ae81960075846663803886/README.md",
          "claim": "Creator README states the complete game was made one-shot with GPT 6 Astra in Codex using one /goal run."
        }
      ],
      "notes": "Creator attribution describes the reported development workflow; it is not a quality score, certification or exclusive-authorship claim."
    },
    "interfaceLanguages": [
      "zh-CN"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count was found during this audit."
    },
    "editorialRank": {
      "record_id": "little-flock",
      "position": 26,
      "rationale": "playable game/demo; 6 GitHub stars observed; non-English interface labeled; creator-attributed preferred model.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 6,
        "english_interface": false,
        "preferred_model_provenance": true,
        "genre_capability_breadth": 7
      }
    },
    "githubStars": 6,
    "popularity": {
      "repo_url": "https://github.com/songkeys/little-flock",
      "stars": 6,
      "status": "available",
      "checked_at": "2026-09-11T01:23:00Z",
      "evidence_url": "https://api.github.com/repos/songkeys/little-flock",
      "notes": "Observed from the public GitHub repository API on the stated date; stars are repository-level popularity, not player or quality counts."
    }
  },
  {
    "id": "open-city-maker",
    "title": "CityMaker",
    "summary": "A city-themed 2048 puzzle with procedural architectural tiers.",
    "genres": [
      "puzzle",
      "city-building"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://citymaker.0to1app.com/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/derek-wangpch/OpenCityMaker",
    "projectUrl": "https://citymaker.0to1app.com/",
    "commit": "ca45404de679baf5afb6b2504ef3c0af27b64ffc",
    "creator": "derek-wangpch and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "derek-wangpch and contributors",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://opensource.org/license/mit"
      ],
      "sourcePage": "https://github.com/derek-wangpch/OpenCityMaker/blob/ca45404de679baf5afb6b2504ef3c0af27b64ffc/docs/images/citymaker-game.png",
      "licenseEvidenceUrl": "https://github.com/derek-wangpch/OpenCityMaker/blob/ca45404de679baf5afb6b2504ef3c0af27b64ffc/LICENSE",
      "captureDate": null,
      "versionRelation": "Image file pinned in the named repository at the indexed source commit; not a HeadStart playthrough or target-integration attestation.",
      "alt": "CityMaker's 2048 board filled with low-poly Hong Kong buildings.",
      "sha256": "d739b7560f9700730f4679d866fd1cf4c6af28921178444ceb1e8790b060f3bf",
      "originalUrl": "https://raw.githubusercontent.com/derek-wangpch/OpenCityMaker/ca45404de679baf5afb6b2504ef3c0af27b64ffc/docs/images/citymaker-game.png",
      "allowedUse": "Local HeadStart catalog identification and preview display for this repository-included image under the listed terms; no broader game-asset reuse, endorsement or model-quality claim.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/critical_review",
      "src": "assets/catalog/open-city-maker.png",
      "localSourcePath": "research/catalog/media/open-city-maker.png"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "react ^19.1.1; three ^0.180.0",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/derek-wangpch/OpenCityMaker/blob/ca45404de679baf5afb6b2504ef3c0af27b64ffc/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "Code license inspected; selected files, transitive dependencies and assets still require scope review."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/derek-wangpch/OpenCityMaker/tree/ca45404de679baf5afb6b2504ef3c0af27b64ffc",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "puzzle-rules",
      "procedural-generation"
    ],
    "buildingBlocks": [
      {
        "name": "2048 state engine",
        "category": "puzzle-rules",
        "evidence_url": "https://github.com/derek-wangpch/OpenCityMaker/blob/ca45404de679baf5afb6b2504ef3c0af27b64ffc/src/game/engine.ts",
        "source_path": "src/game/engine.ts",
        "status": "source_inspected",
        "notes": "Typed board moves, spawning, continuation and undo share one rule contract. No extraction or integration test."
      },
      {
        "name": "Architectural part builders",
        "category": "procedural-generation",
        "evidence_url": "https://github.com/derek-wangpch/OpenCityMaker/blob/ca45404de679baf5afb6b2504ef3c0af27b64ffc/src/scene/parts.ts",
        "source_path": "src/scene/parts.ts",
        "status": "source_inspected",
        "notes": "Hall and shop helpers use ModelKit geometry and material conventions. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/derek-wangpch/OpenCityMaker/tree/ca45404de679baf5afb6b2504ef3c0af27b64ffc",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/derek-wangpch/OpenCityMaker/blob/ca45404de679baf5afb6b2504ef3c0af27b64ffc/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/derek-wangpch/OpenCityMaker/blob/ca45404de679baf5afb6b2504ef3c0af27b64ffc/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/derek-wangpch/OpenCityMaker/blob/ca45404de679baf5afb6b2504ef3c0af27b64ffc/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/derek-wangpch/OpenCityMaker/blob/ca45404de679baf5afb6b2504ef3c0af27b64ffc/docs/CREATION.md",
        "claim": "Model attribution evidence inspected; exact contribution remains bounded in ai_provenance notes.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/derek-wangpch/OpenCityMaker/blob/ca45404de679baf5afb6b2504ef3c0af27b64ffc/src/game/engine.ts",
        "claim": "2048 state engine entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/derek-wangpch/OpenCityMaker/blob/ca45404de679baf5afb6b2504ef3c0af27b64ffc/src/scene/parts.ts",
        "claim": "Architectural part builders entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 Astra"
      ],
      "evidence": [
        {
          "url": "https://github.com/derek-wangpch/OpenCityMaker/blob/ca45404de679baf5afb6b2504ef3c0af27b64ffc/docs/CREATION.md",
          "claim": "Creator reports Astra generated the procedural building geometry; attribution for the rest of the game code is unknown."
        }
      ],
      "notes": "Creator reports Astra generated the procedural building geometry; attribution for the rest of the game code is unknown."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "open-city-maker",
      "position": 27,
      "rationale": "playable game/demo; 4 GitHub stars observed; interface language unknown; creator-attributed preferred model.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 4,
        "english_interface": false,
        "preferred_model_provenance": true,
        "genre_capability_breadth": 4
      }
    },
    "githubStars": 4,
    "popularity": {
      "repo_url": "https://github.com/derek-wangpch/OpenCityMaker",
      "stars": 4,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/derek-wangpch/OpenCityMaker",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    },
    "playReview": {
      "record_id": "open-city-maker",
      "status": "interactive_checked",
      "checked_at": "2026-09-10T20:10:00Z",
      "reviewer": "/root",
      "environment": "Google Chrome on macOS, desktop window, public production demo",
      "scenario": "Loaded the Beijing board and completed left, up and right moves through the game's accessible controls.",
      "result": "Controls responded, matching buildings merged, score advanced from 0 to 4, the Hutong cluster unlocked and progress persisted locally. The immediate feedback and readable city-building progression support a bounded editorial recommendation.",
      "limitations": "Brief representative session only; no mobile, long-session, performance, every-city, save-recovery or source/deployment parity test.",
      "editorial_pick": true
    }
  },
  {
    "id": "apex-formula",
    "title": "Apex Formula",
    "summary": "A deep browser Formula racing simulation with twenty cars, pit strategy, changing weather, replays and multiple camera systems.",
    "genres": [
      "racing",
      "simulation",
      "sports"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://bridge-mind.github.io/apex-formula/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/bridge-mind/apex-formula",
    "projectUrl": "https://bridge-mind.github.io/apex-formula/",
    "commit": "e5292b85c9a8773fd2a5e2b55df570d5da963488",
    "creator": "BridgeMind",
    "readiness": "review_required",
    "preview": {
      "credit": "BridgeMind; screenshot captured by HeadStart",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://opensource.org/license/mit"
      ],
      "sourcePage": "https://bridge-mind.github.io/apex-formula/",
      "licenseEvidenceUrl": "https://github.com/bridge-mind/apex-formula/blob/e5292b85c9a8773fd2a5e2b55df570d5da963488/LICENSE",
      "captureDate": "2026-09-11",
      "versionRelation": "Live deployment capture; deployed source revision is not attested.",
      "alt": "Apex Formula title screen with a procedural red Formula car.",
      "sha256": "b89f79ad676efa1176f57364f4dcb37c3d44e7554a9a587b3a0aa60ab0b04993",
      "originalUrl": "https://bridge-mind.github.io/apex-formula/",
      "allowedUse": "HeadStart catalog identification and preview display for this exact image with listed credit and terms; no endorsement, model-quality claim or blanket game-asset clearance.",
      "modifications": "Captured at 1280x800; otherwise unchanged.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/apex-formula.png",
      "localSourcePath": "research/catalog/media/apex-formula.png"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "motorsport",
      "realistic"
    ],
    "runtimeVersion": "three 0.185.1",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer-linked production URL returned HTTP 200 with HTML on 2026-09-11. This is a reachability check, not a complete playtest or source/deployment attestation.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/bridge-mind/apex-formula/blob/e5292b85c9a8773fd2a5e2b55df570d5da963488/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository media and depicted assets require selected-scope review.",
      "scope_reuse_status": "review_required",
      "notes": "The code license was inspected at the pinned revision. Preserve notices and review selected files, assets, data and dependencies before reuse."
    },
    "sourceInspectedAt": "2026-09-11T01:30:00Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/bridge-mind/apex-formula/tree/e5292b85c9a8773fd2a5e2b55df570d5da963488",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "vehicle-physics",
      "ai-racing",
      "replay"
    ],
    "buildingBlocks": [
      {
        "name": "120 Hz vehicle simulation",
        "category": "vehicle-physics",
        "evidence_url": "https://github.com/bridge-mind/apex-formula/blob/e5292b85c9a8773fd2a5e2b55df570d5da963488/src/physics/VehiclePhysics.ts",
        "source_path": "src/physics/VehiclePhysics.ts",
        "status": "source_inspected",
        "notes": "Coordinates suspension, tyre, aero, drivetrain and collision state. No extraction or target integration test."
      },
      {
        "name": "Race strategy and weather",
        "category": "ai-racing",
        "evidence_url": "https://github.com/bridge-mind/apex-formula/blob/e5292b85c9a8773fd2a5e2b55df570d5da963488/src/race/Strategy.ts",
        "source_path": "src/race/Strategy.ts",
        "status": "source_inspected",
        "notes": "Models tyre and pit decisions alongside changing race conditions. No extraction or target integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/bridge-mind/apex-formula/tree/e5292b85c9a8773fd2a5e2b55df570d5da963488",
        "claim": "Pinned public repository identity and immutable source revision inspected.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/bridge-mind/apex-formula/blob/e5292b85c9a8773fd2a5e2b55df570d5da963488/README.md",
        "claim": "Project description, live-play link, controls and declared implementation context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/bridge-mind/apex-formula/blob/e5292b85c9a8773fd2a5e2b55df570d5da963488/LICENSE",
        "claim": "Project code license text inspected; assets and dependencies remain separate scopes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/bridge-mind/apex-formula/blob/e5292b85c9a8773fd2a5e2b55df570d5da963488/src/physics/VehiclePhysics.ts",
        "claim": "120 Hz vehicle simulation implementation entry points statically inspected.",
        "kind": "source"
      },
      {
        "url": "https://github.com/bridge-mind/apex-formula/blob/e5292b85c9a8773fd2a5e2b55df570d5da963488/src/race/Strategy.ts",
        "claim": "Race strategy and weather implementation entry points statically inspected.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "Fable 5.1"
      ],
      "evidence": [
        {
          "url": "https://github.com/bridge-mind/apex-formula/blob/e5292b85c9a8773fd2a5e2b55df570d5da963488/README.md",
          "claim": "Maintainer README states Claude Fable 5.1 led ten parallel sub-agents against a shared architecture contract."
        }
      ],
      "notes": "Creator attribution describes the reported development workflow; it is not a quality score, certification or exclusive-authorship claim."
    },
    "interfaceLanguages": [
      "en"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count was found during this audit."
    },
    "editorialRank": {
      "record_id": "apex-formula",
      "position": 28,
      "rationale": "playable game/demo; 2 GitHub stars observed; English interface evidenced; creator-attributed preferred model.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 2,
        "english_interface": true,
        "preferred_model_provenance": true,
        "genre_capability_breadth": 6
      }
    },
    "githubStars": 2,
    "popularity": {
      "repo_url": "https://github.com/bridge-mind/apex-formula",
      "stars": 2,
      "status": "available",
      "checked_at": "2026-09-11T01:23:00Z",
      "evidence_url": "https://api.github.com/repos/bridge-mind/apex-formula",
      "notes": "Observed from the public GitHub repository API on the stated date; stars are repository-level popularity, not player or quality counts."
    }
  },
  {
    "id": "slimcity",
    "title": "SlimCity",
    "summary": "A compact city simulation with separate economic, road-network and rendering modules.",
    "genres": [
      "city-builder",
      "simulation",
      "management"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://slimcity.netlify.app/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/rbenzing/SlimCityGame",
    "projectUrl": "https://slimcity.netlify.app/",
    "commit": "73e065226b8134cf44901a641076aeed3281f9f1",
    "creator": "rbenzing and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "rbenzing and contributors",
      "licenseExpression": "AGPL-3.0-or-later",
      "licenseUrls": [
        "https://www.gnu.org/licenses/agpl-3.0.html"
      ],
      "sourcePage": "https://github.com/rbenzing/SlimCityGame/blob/73e065226b8134cf44901a641076aeed3281f9f1/screenshots/screenshot-01.png",
      "licenseEvidenceUrl": "https://github.com/rbenzing/SlimCityGame/blob/73e065226b8134cf44901a641076aeed3281f9f1/LICENSE",
      "captureDate": null,
      "versionRelation": "Image file pinned in the named repository at the indexed source commit; not a HeadStart playthrough or target-integration attestation.",
      "alt": "A dense isometric city and simulation controls in SlimCity.",
      "sha256": "b39876bd5cead3537ffb97ba72df43521aaf3ae7c8d611abcafb0462ed2222f5",
      "originalUrl": "https://raw.githubusercontent.com/rbenzing/SlimCityGame/73e065226b8134cf44901a641076aeed3281f9f1/screenshots/screenshot-01.png",
      "allowedUse": "Local HeadStart catalog identification and preview display for this repository-included image under the listed terms; no broader game-asset reuse, endorsement or model-quality claim.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/critical_review",
      "src": "assets/catalog/slimcity.png",
      "localSourcePath": "research/catalog/media/slimcity.png"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "stylized",
      "urban"
    ],
    "runtimeVersion": "^0.185.1",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "AGPL-3.0-or-later",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/rbenzing/SlimCityGame/blob/73e065226b8134cf44901a641076aeed3281f9f1/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Root AGPL license and README reviewed; procedural outputs, bundled audio and screenshot scope remain unreviewed.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/rbenzing/SlimCityGame/tree/73e065226b8134cf44901a641076aeed3281f9f1",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "economy",
      "pathfinding"
    ],
    "buildingBlocks": [
      {
        "name": "Economy and progression",
        "category": "economy",
        "evidence_url": "https://github.com/rbenzing/SlimCityGame/blob/73e065226b8134cf44901a641076aeed3281f9f1/src/sim/economy.ts",
        "source_path": "src/sim/economy.ts",
        "status": "source_inspected",
        "notes": "Tax settlement, upkeep, loans and milestones are implemented against shared city/grid contracts."
      },
      {
        "name": "Congestion-aware routing",
        "category": "pathfinding",
        "evidence_url": "https://github.com/rbenzing/SlimCityGame/blob/73e065226b8134cf44901a641076aeed3281f9f1/src/world/pathfind.ts",
        "source_path": "src/world/pathfind.ts",
        "status": "source_inspected",
        "notes": "Road graph routing uses directional capacity and junction delays; shared road profiles must accompany adaptation."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/rbenzing/SlimCityGame/tree/73e065226b8134cf44901a641076aeed3281f9f1",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/rbenzing/SlimCityGame/blob/73e065226b8134cf44901a641076aeed3281f9f1/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/rbenzing/SlimCityGame/blob/73e065226b8134cf44901a641076aeed3281f9f1/LICENSE",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/rbenzing/SlimCityGame/blob/73e065226b8134cf44901a641076aeed3281f9f1/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/rbenzing/SlimCityGame/blob/73e065226b8134cf44901a641076aeed3281f9f1/src/sim/economy.ts",
        "claim": "Economy and progression entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/rbenzing/SlimCityGame/blob/73e065226b8134cf44901a641076aeed3281f9f1/src/world/pathfind.ts",
        "claim": "Congestion-aware routing entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "slimcity",
      "position": 29,
      "rationale": "playable game/demo; 2 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 2,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 5
      }
    },
    "githubStars": 2,
    "popularity": {
      "repo_url": "https://github.com/rbenzing/SlimCityGame",
      "stars": 2,
      "status": "available",
      "checked_at": "2026-09-10T19:48:26Z",
      "evidence_url": "https://api.github.com/repos/rbenzing/SlimCityGame",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "berlin-walk",
    "title": "Berlin Walk",
    "summary": "A walkable and flyable raw-WebGL reconstruction of central Berlin built from OpenStreetMap geometry.",
    "genres": [
      "exploration",
      "walking-simulator",
      "geospatial"
    ],
    "runtime": "WebGL2",
    "label": "Play demo",
    "demoUrl": "https://adilzhany.github.io/berlin-walk/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/adilzhanY/berlin-walk",
    "projectUrl": "https://adilzhany.github.io/berlin-walk/",
    "commit": "8afa9c84d80c6b476de23d8239c2c9b4b1770003",
    "creator": "Adilzhan and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "Adilzhan; OpenStreetMap contributors",
      "licenseExpression": "MIT AND ODbL-1.0",
      "licenseUrls": [
        "https://opensource.org/license/mit",
        "https://www.openstreetmap.org/copyright"
      ],
      "sourcePage": "https://github.com/adilzhanY/berlin-walk/blob/8afa9c84d80c6b476de23d8239c2c9b4b1770003/docs/screenshots/01_spawn_pariser_platz.png",
      "licenseEvidenceUrl": "https://github.com/adilzhanY/berlin-walk/blob/8afa9c84d80c6b476de23d8239c2c9b4b1770003/README.md",
      "captureDate": null,
      "versionRelation": "Pinned repository image at the indexed source commit.",
      "alt": "Berlin Walk view of Pariser Platz and the Brandenburg Gate.",
      "sha256": "bb5fa2179c7552e8e756e73b3067468d56e7817ff3238a6b79017c5b521afbf5",
      "originalUrl": "https://raw.githubusercontent.com/adilzhanY/berlin-walk/8afa9c84d80c6b476de23d8239c2c9b4b1770003/docs/screenshots/01_spawn_pariser_platz.png",
      "allowedUse": "HeadStart catalog identification and preview display for this exact image with listed credit and terms; no endorsement, model-quality claim or blanket game-asset clearance.",
      "modifications": "Original repository bytes retained unchanged; site CSS may scale and crop.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/berlin-walk.png",
      "localSourcePath": "research/catalog/media/berlin-walk.png"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "urban",
      "real-world",
      "stylized"
    ],
    "runtimeVersion": "esbuild 0.28.2",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer-linked production URL returned HTTP 200 with HTML on 2026-09-11. This is a reachability check, not a complete playtest or source/deployment attestation.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/adilzhanY/berlin-walk/blob/8afa9c84d80c6b476de23d8239c2c9b4b1770003/LICENSE",
      "asset_status": "mixed",
      "asset_notes": "Application code is MIT; map data is credited to OpenStreetMap contributors under ODbL and must retain attribution.",
      "scope_reuse_status": "review_required",
      "notes": "The code license was inspected at the pinned revision. Preserve notices and review selected files, assets, data and dependencies before reuse."
    },
    "sourceInspectedAt": "2026-09-11T01:30:00Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/adilzhanY/berlin-walk/tree/8afa9c84d80c6b476de23d8239c2c9b4b1770003",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "world-streaming",
      "first-person-movement",
      "day-night-cycle"
    ],
    "buildingBlocks": [
      {
        "name": "Walk and flight controller",
        "category": "first-person-movement",
        "evidence_url": "https://github.com/adilzhanY/berlin-walk/blob/8afa9c84d80c6b476de23d8239c2c9b4b1770003/src/engine/controller.js",
        "source_path": "src/engine/controller.js",
        "status": "source_inspected",
        "notes": "Owns walking, collision-aware movement and flight controls. No extraction or target integration test."
      },
      {
        "name": "Tiled world renderer",
        "category": "world-streaming",
        "evidence_url": "https://github.com/adilzhanY/berlin-walk/blob/8afa9c84d80c6b476de23d8239c2c9b4b1770003/src/engine/tiles.js",
        "source_path": "src/engine/tiles.js",
        "status": "source_inspected",
        "notes": "Loads and manages built city tiles around the camera. No extraction or target integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/adilzhanY/berlin-walk/tree/8afa9c84d80c6b476de23d8239c2c9b4b1770003",
        "claim": "Pinned public repository identity and immutable source revision inspected.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/adilzhanY/berlin-walk/blob/8afa9c84d80c6b476de23d8239c2c9b4b1770003/README.md",
        "claim": "Project description, live-play link, controls and declared implementation context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/adilzhanY/berlin-walk/blob/8afa9c84d80c6b476de23d8239c2c9b4b1770003/LICENSE",
        "claim": "Project code license text inspected; assets and dependencies remain separate scopes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/adilzhanY/berlin-walk/blob/8afa9c84d80c6b476de23d8239c2c9b4b1770003/src/engine/controller.js",
        "claim": "Walk and flight controller implementation entry points statically inspected.",
        "kind": "source"
      },
      {
        "url": "https://github.com/adilzhanY/berlin-walk/blob/8afa9c84d80c6b476de23d8239c2c9b4b1770003/src/engine/tiles.js",
        "claim": "Tiled world renderer implementation entry points statically inspected.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "Fable 5.1"
      ],
      "evidence": [
        {
          "url": "https://github.com/adilzhanY/berlin-walk/blob/8afa9c84d80c6b476de23d8239c2c9b4b1770003/README.md",
          "claim": "Maintainer README states Claude Fable 5.1 built the project end to end from one prompt in Claude Code."
        }
      ],
      "notes": "Creator attribution describes the reported development workflow; it is not a quality score, certification or exclusive-authorship claim."
    },
    "interfaceLanguages": [
      "en"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count was found during this audit."
    },
    "editorialRank": {
      "record_id": "berlin-walk",
      "position": 30,
      "rationale": "playable game/demo; 1 GitHub stars observed; English interface evidenced; creator-attributed preferred model.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 1,
        "english_interface": true,
        "preferred_model_provenance": true,
        "genre_capability_breadth": 6
      }
    },
    "githubStars": 1,
    "popularity": {
      "repo_url": "https://github.com/adilzhanY/berlin-walk",
      "stars": 1,
      "status": "available",
      "checked_at": "2026-09-11T01:23:00Z",
      "evidence_url": "https://api.github.com/repos/adilzhanY/berlin-walk",
      "notes": "Observed from the public GitHub repository API on the stated date; stars are repository-level popularity, not player or quality counts."
    }
  },
  {
    "id": "protocol-99-entry-001",
    "title": "Protocol 99: Entry 001",
    "summary": "A playable English browser game selected for distinctive interactive systems and genre breadth.",
    "genres": [
      "action",
      "top-down",
      "arcade"
    ],
    "runtime": "Canvas 2D",
    "label": "Play demo",
    "demoUrl": "https://aidong27.github.io/99-ai-games/entries/001-openai-gpt-6-user-declared-codex/runs/run-raw-20260904-194605-codex/game/?seed=99",
    "demoKind": "browser",
    "repoUrl": "https://github.com/aidong27/99-ai-games",
    "projectUrl": "https://aidong27.github.io/99-ai-games/entries/001-openai-gpt-6-user-declared-codex/runs/run-raw-20260904-194605-codex/game/?seed=99",
    "commit": "6db39254d260d8e1627788c5ea6398449d3a4b0b",
    "creator": "aidong27",
    "readiness": "review_required",
    "preview": {
      "credit": "aidong27",
      "licenseExpression": "MIT repository; media rights need scope review",
      "licenseUrls": [
        "https://github.com/aidong27/99-ai-games/blob/6db39254d260d8e1627788c5ea6398449d3a4b0b/LICENSE"
      ],
      "sourcePage": "https://github.com/aidong27/99-ai-games/blob/6db39254d260d8e1627788c5ea6398449d3a4b0b/entries/001-openai-gpt-6-user-declared-codex/runs/run-raw-20260904-194605-codex/evidence/screenshots/gameplay.png",
      "licenseEvidenceUrl": "https://github.com/aidong27/99-ai-games/blob/6db39254d260d8e1627788c5ea6398449d3a4b0b/LICENSE",
      "captureDate": "2026-09-11",
      "versionRelation": "Stored at pinned revision.",
      "alt": "Authentic Protocol 99: Entry 001 gameplay media.",
      "sha256": "7336a2ce2443006bffe42311058568df8173cfa011105ef4f7fb101609002972",
      "originalUrl": "https://raw.githubusercontent.com/aidong27/99-ai-games/6db39254d260d8e1627788c5ea6398449d3a4b0b/entries/001-openai-gpt-6-user-declared-codex/runs/run-raw-20260904-194605-codex/evidence/screenshots/gameplay.png",
      "allowedUse": "Local catalog display with credit and source link.",
      "modifications": "Unmodified upstream bytes.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/protocol-99-entry-001.png",
      "localSourcePath": "research/catalog/media/protocol-99-entry-001.png"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "stylized"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer-linked live build; reachability checked, gameplay compatibility untested.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/aidong27/99-ai-games/blob/6db39254d260d8e1627788c5ea6398449d3a4b0b/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository gameplay image is locally displayed; downstream reuse needs review.",
      "scope_reuse_status": "review_required",
      "notes": "MIT code inspected; asset/dependency rights remain scope-specific."
    },
    "sourceInspectedAt": "2026-09-11T02:30:00Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/aidong27/99-ai-games/tree/6db39254d260d8e1627788c5ea6398449d3a4b0b",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "gameplay-loop",
      "interaction",
      "browser-runtime"
    ],
    "buildingBlocks": [
      {
        "name": "Playable game systems",
        "category": "gameplay-loop",
        "evidence_url": "https://github.com/aidong27/99-ai-games/tree/6db39254d260d8e1627788c5ea6398449d3a4b0b/game/src/main.js",
        "source_path": "game/src/main.js",
        "status": "source_inspected",
        "notes": "Core browser game systems."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/aidong27/99-ai-games/tree/6db39254d260d8e1627788c5ea6398449d3a4b0b",
        "claim": "Pinned public revision contains game source.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/aidong27/99-ai-games/blob/6db39254d260d8e1627788c5ea6398449d3a4b0b/README.md",
        "claim": "README documents gameplay and live build.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/aidong27/99-ai-games/blob/6db39254d260d8e1627788c5ea6398449d3a4b0b/LICENSE",
        "claim": "Pinned MIT license.",
        "kind": "license"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 (user-declared) × Codex"
      ],
      "evidence": [
        {
          "url": "https://github.com/aidong27/99-ai-games/blob/6db39254d260d8e1627788c5ea6398449d3a4b0b/README.md",
          "claim": "Repository labels Entry 001 GPT-6 user-declared with Codex."
        }
      ],
      "notes": "Does not establish GPT-6 Astra."
    },
    "interfaceLanguages": [
      "en"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public player or usage count recorded."
    },
    "editorialRank": {
      "record_id": "protocol-99-entry-001",
      "position": 31,
      "rationale": "playable game/demo; 1 GitHub stars observed; English interface evidenced.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 1,
        "english_interface": true,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 6
      }
    },
    "githubStars": 1,
    "popularity": {
      "repo_url": "https://github.com/aidong27/99-ai-games",
      "stars": 1,
      "status": "available",
      "checked_at": "2026-09-11T02:30:00Z",
      "evidence_url": "https://api.github.com/repos/aidong27/99-ai-games",
      "notes": "Public GitHub API observation; count changes over time."
    }
  },
  {
    "id": "skysprout",
    "title": "SkySprout",
    "summary": "An original three-world pixel platformer with precision jumps, coins, enemies and sun-shard goals.",
    "genres": [
      "platformer",
      "action",
      "arcade"
    ],
    "runtime": "Canvas 2D",
    "label": "Play demo",
    "demoUrl": "https://dubsopenhub.github.io/skysprout/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/DUBSOpenHub/skysprout",
    "projectUrl": "https://dubsopenhub.github.io/skysprout/",
    "commit": "8c0484fc4243cc98507173d4b49a5658ff8b960f",
    "creator": "DUBSOpenHub contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "DUBSOpenHub contributors",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://opensource.org/license/mit"
      ],
      "sourcePage": "https://github.com/DUBSOpenHub/skysprout/blob/8c0484fc4243cc98507173d4b49a5658ff8b960f/docs/images/skysprout-meadow.png",
      "licenseEvidenceUrl": "https://github.com/DUBSOpenHub/skysprout/blob/8c0484fc4243cc98507173d4b49a5658ff8b960f/LICENSE",
      "captureDate": null,
      "versionRelation": "Pinned repository image at the indexed source commit.",
      "alt": "SkySprout hero jumping through Sunlit Meadow among coins and enemies.",
      "sha256": "66680a39cdf7bc0d11de4e24a7820b7acbea70f67734624cab3cae01ee74d49c",
      "originalUrl": "https://raw.githubusercontent.com/DUBSOpenHub/skysprout/8c0484fc4243cc98507173d4b49a5658ff8b960f/docs/images/skysprout-meadow.png",
      "allowedUse": "HeadStart catalog identification and preview display for this exact image with listed credit and terms; no endorsement, model-quality claim or blanket game-asset clearance.",
      "modifications": "Original repository bytes retained unchanged; site CSS may scale and crop.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/skysprout.png",
      "localSourcePath": "research/catalog/media/skysprout.png"
    },
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [
      "pixel-art",
      "colorful",
      "fantasy"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer-linked production URL returned HTTP 200 with HTML on 2026-09-11. This is a reachability check, not a complete playtest or source/deployment attestation.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/DUBSOpenHub/skysprout/blob/8c0484fc4243cc98507173d4b49a5658ff8b960f/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository media and depicted assets require selected-scope review.",
      "scope_reuse_status": "review_required",
      "notes": "The code license was inspected at the pinned revision. Preserve notices and review selected files, assets, data and dependencies before reuse."
    },
    "sourceInspectedAt": "2026-09-11T01:30:00Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/DUBSOpenHub/skysprout/tree/8c0484fc4243cc98507173d4b49a5658ff8b960f",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "platformer-movement",
      "level-progression"
    ],
    "buildingBlocks": [
      {
        "name": "Deterministic platformer engine",
        "category": "platformer-movement",
        "evidence_url": "https://github.com/DUBSOpenHub/skysprout/blob/8c0484fc4243cc98507173d4b49a5658ff8b960f/engine.js",
        "source_path": "engine.js",
        "status": "source_inspected",
        "notes": "Separates physics, input and state transitions from browser rendering. No extraction or target integration test."
      },
      {
        "name": "Three-world game shell",
        "category": "level-progression",
        "evidence_url": "https://github.com/DUBSOpenHub/skysprout/blob/8c0484fc4243cc98507173d4b49a5658ff8b960f/game.js",
        "source_path": "game.js",
        "status": "source_inspected",
        "notes": "Connects world definitions, rendering, input and progression. No extraction or target integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/DUBSOpenHub/skysprout/tree/8c0484fc4243cc98507173d4b49a5658ff8b960f",
        "claim": "Pinned public repository identity and immutable source revision inspected.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/DUBSOpenHub/skysprout/blob/8c0484fc4243cc98507173d4b49a5658ff8b960f/README.md",
        "claim": "Project description, live-play link, controls and declared implementation context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/DUBSOpenHub/skysprout/blob/8c0484fc4243cc98507173d4b49a5658ff8b960f/LICENSE",
        "claim": "Project code license text inspected; assets and dependencies remain separate scopes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/DUBSOpenHub/skysprout/blob/8c0484fc4243cc98507173d4b49a5658ff8b960f/engine.js",
        "claim": "Deterministic platformer engine implementation entry points statically inspected.",
        "kind": "source"
      },
      {
        "url": "https://github.com/DUBSOpenHub/skysprout/blob/8c0484fc4243cc98507173d4b49a5658ff8b960f/game.js",
        "claim": "Three-world game shell implementation entry points statically inspected.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 Astra"
      ],
      "evidence": [
        {
          "url": "https://github.com/DUBSOpenHub/skysprout/blob/8c0484fc4243cc98507173d4b49a5658ff8b960f/README.md",
          "claim": "Creator README records model identifier gpt-6-astra in GitHub Copilot CLI for the one-shot build."
        }
      ],
      "notes": "Creator attribution describes the reported development workflow; it is not a quality score, certification or exclusive-authorship claim."
    },
    "interfaceLanguages": [
      "en"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count was found during this audit."
    },
    "editorialRank": {
      "record_id": "skysprout",
      "position": 32,
      "rationale": "playable game/demo; 1 GitHub stars observed; English interface evidenced; creator-attributed preferred model.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 1,
        "english_interface": true,
        "preferred_model_provenance": true,
        "genre_capability_breadth": 5
      }
    },
    "githubStars": 1,
    "popularity": {
      "repo_url": "https://github.com/DUBSOpenHub/skysprout",
      "stars": 1,
      "status": "available",
      "checked_at": "2026-09-11T01:23:00Z",
      "evidence_url": "https://api.github.com/repos/DUBSOpenHub/skysprout",
      "notes": "Observed from the public GitHub repository API on the stated date; stars are repository-level popularity, not player or quality counts."
    }
  },
  {
    "id": "last-beacon",
    "title": "Last Beacon",
    "summary": "An isometric island tower-defense game built around a connected power grid.",
    "genres": [
      "tower-defense",
      "strategy"
    ],
    "runtime": "Canvas 2D",
    "label": "Play demo",
    "demoUrl": "https://last-beacon.loupengju.cc/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/stackloomdev/last-beacon",
    "projectUrl": "https://last-beacon.loupengju.cc/",
    "commit": "102ca4cfca542f9cca7a6020b12e20db78ac0003",
    "creator": "stackloomdev and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "stackloomdev and contributors",
      "licenseExpression": "MIT AND CC0-1.0",
      "licenseUrls": [
        "https://opensource.org/license/mit",
        "https://creativecommons.org/publicdomain/zero/1.0/"
      ],
      "sourcePage": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/assets/screenshots/last-beacon/gameplay-en.png",
      "licenseEvidenceUrl": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/LICENSE",
      "captureDate": null,
      "versionRelation": "Separate curated gameplay capture; its exact game-build relation to the indexed source commit is unknown. Not a HeadStart playthrough or target-integration attestation.",
      "alt": "Towers defending Last Beacon's coastal island from an enemy wave.",
      "sha256": "a9eb4266e2e521716c9dca5cc317b9f0700f1190fc676eefd2df94ccd8c914ac",
      "originalUrl": "https://raw.githubusercontent.com/MartinDelophy/awesome-gpt-6-astra/139a9287e763e5b592bb53fda97e5101db15db40/assets/screenshots/last-beacon/gameplay-en.png",
      "allowedUse": "Local HeadStart research-preview identification only. MIT covers the named game's repository content and CC0 covers the collection capture; depicted third-party rights, publication and game-asset reuse remain separately unresolved.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/critical_review",
      "src": "assets/catalog/last-beacon.png",
      "localSourcePath": "research/catalog/media/last-beacon.png"
    },
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/stackloomdev/last-beacon/blob/102ca4cfca542f9cca7a6020b12e20db78ac0003/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "Code license inspected; selected files, transitive dependencies and assets still require scope review."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/stackloomdev/last-beacon/tree/102ca4cfca542f9cca7a6020b12e20db78ac0003",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "strategy",
      "world"
    ],
    "buildingBlocks": [
      {
        "name": "Power-grid defense loop",
        "category": "strategy",
        "evidence_url": "https://github.com/stackloomdev/last-beacon/blob/102ca4cfca542f9cca7a6020b12e20db78ac0003/src/game.js",
        "source_path": "src/game.js",
        "status": "source_inspected",
        "notes": "Tower stats, path positions and Game state depend on fixed pads, source and wave definitions. No extraction or integration test."
      },
      {
        "name": "Isometric island renderer",
        "category": "world",
        "evidence_url": "https://github.com/stackloomdev/last-beacon/blob/102ca4cfca542f9cca7a6020b12e20db78ac0003/src/render.js",
        "source_path": "src/render.js",
        "status": "source_inspected",
        "notes": "Canvas Renderer uses game data, resize observation and procedural terrain. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/stackloomdev/last-beacon/tree/102ca4cfca542f9cca7a6020b12e20db78ac0003",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/stackloomdev/last-beacon/blob/102ca4cfca542f9cca7a6020b12e20db78ac0003/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/stackloomdev/last-beacon/blob/102ca4cfca542f9cca7a6020b12e20db78ac0003/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/stackloomdev/last-beacon/blob/102ca4cfca542f9cca7a6020b12e20db78ac0003/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/stackloomdev/last-beacon/blob/102ca4cfca542f9cca7a6020b12e20db78ac0003/docs/CREATION.md",
        "claim": "Model attribution evidence inspected; exact contribution remains bounded in ai_provenance notes.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/stackloomdev/last-beacon/blob/102ca4cfca542f9cca7a6020b12e20db78ac0003/src/game.js",
        "claim": "Power-grid defense loop entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/stackloomdev/last-beacon/blob/102ca4cfca542f9cca7a6020b12e20db78ac0003/src/render.js",
        "claim": "Isometric island renderer entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 Astra"
      ],
      "evidence": [
        {
          "url": "https://github.com/stackloomdev/last-beacon/blob/102ca4cfca542f9cca7a6020b12e20db78ac0003/docs/CREATION.md",
          "claim": "Creator-facing repository description, development record or linked author post attributes this represented work to GPT-6 Astra."
        }
      ],
      "notes": "Creator attribution describes development participation, not model certification, exclusive authorship or measured performance."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "last-beacon",
      "position": 33,
      "rationale": "playable game/demo; 1 GitHub stars observed; interface language unknown; creator-attributed preferred model.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 1,
        "english_interface": false,
        "preferred_model_provenance": true,
        "genre_capability_breadth": 3
      }
    },
    "githubStars": 1,
    "popularity": {
      "repo_url": "https://github.com/stackloomdev/last-beacon",
      "stars": 1,
      "status": "available",
      "checked_at": "2026-09-10T19:48:26Z",
      "evidence_url": "https://api.github.com/repos/stackloomdev/last-beacon",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "threejs",
    "title": "Three.js",
    "summary": "The 3D rendering library underlying the initial integration family, with reusable animation and visual-effect examples.",
    "genres": [
      "rendering",
      "animation"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://threejs.org/examples/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/mrdoob/three.js",
    "projectUrl": "https://threejs.org/",
    "commit": "5c5a575bd8cc0cf440026ce8dcf6a77862067684",
    "creator": "mrdoob and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "mrdoob and contributors",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://github.com/mrdoob/three.js/blob/5c5a575bd8cc0cf440026ce8dcf6a77862067684/LICENSE"
      ],
      "sourcePage": "https://github.com/mrdoob/three.js/blob/5c5a575bd8cc0cf440026ce8dcf6a77862067684/examples/screenshots/games_fps.jpg",
      "licenseEvidenceUrl": "https://github.com/mrdoob/three.js/blob/5c5a575bd8cc0cf440026ce8dcf6a77862067684/LICENSE",
      "captureDate": null,
      "versionRelation": "Pinned repository screenshot of the official FPS game example. This image identifies the named catalog record but is not a HeadStart playthrough, source/deployment parity check or integration attestation.",
      "alt": "Blue-gray first-person arena with ramps and tiled walls from the Three.js FPS example.",
      "sha256": "a2319a4d4874518beea8dedbe9aa7ffe2dbc0673b1a1db1598c01369ad0b6f85",
      "originalUrl": "https://raw.githubusercontent.com/mrdoob/three.js/5c5a575bd8cc0cf440026ce8dcf6a77862067684/examples/screenshots/games_fps.jpg",
      "allowedUse": "Independent narrow local research-display review passed for this exact audited image. The approval is limited to identifying the upstream project in the local HeadStart catalog; it does not authorize public redistribution, source export, promotional reuse, relicensing, game-asset reuse, endorsement, or imply that third-party assets are covered by the code license.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/threejs.jpg",
      "localSourcePath": "research/catalog/media/threejs.jpg"
    },
    "contentKind": "toolkit",
    "dimension": "3d",
    "visualStyle": [
      "configurable"
    ],
    "runtimeVersion": "0.186.0 (dev branch snapshot)",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/mrdoob/three.js/blob/5c5a575bd8cc0cf440026ce8dcf6a77862067684/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Library/addon code license inspected; examples include external models, textures and datasets whose licenses need independent checks.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/mrdoob/three.js/tree/5c5a575bd8cc0cf440026ce8dcf6a77862067684",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "animation",
      "materials"
    ],
    "buildingBlocks": [
      {
        "name": "Animation playback and blending",
        "category": "animation",
        "evidence_url": "https://github.com/mrdoob/three.js/blob/5c5a575bd8cc0cf440026ce8dcf6a77862067684/src/animation/AnimationMixer.js",
        "source_path": "src/animation/AnimationMixer.js",
        "status": "source_inspected",
        "notes": "Mixer binds actions/tracks to objects and maintains caches; blend policy and uncache cleanup remain target responsibilities."
      },
      {
        "name": "Reflective water effect",
        "category": "materials",
        "evidence_url": "https://github.com/mrdoob/three.js/blob/5c5a575bd8cc0cf440026ce8dcf6a77862067684/examples/jsm/objects/Water.js",
        "source_path": "examples/jsm/objects/Water.js",
        "status": "source_inspected",
        "notes": "Planar reflection shader uses a render target and normal map; explicitly WebGL-only, with separate WebGPU WaterMesh recommended by source."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/mrdoob/three.js/tree/5c5a575bd8cc0cf440026ce8dcf6a77862067684",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/mrdoob/three.js/blob/5c5a575bd8cc0cf440026ce8dcf6a77862067684/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/mrdoob/three.js/blob/5c5a575bd8cc0cf440026ce8dcf6a77862067684/LICENSE",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/mrdoob/three.js/blob/5c5a575bd8cc0cf440026ce8dcf6a77862067684/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/mrdoob/three.js/blob/5c5a575bd8cc0cf440026ce8dcf6a77862067684/src/animation/AnimationMixer.js",
        "claim": "Animation playback and blending entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/mrdoob/three.js/blob/5c5a575bd8cc0cf440026ce8dcf6a77862067684/examples/jsm/objects/Water.js",
        "claim": "Reflective water effect entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "threejs",
      "position": 34,
      "rationale": "reusable toolkit/reference; 115380 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 115380,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 3
      }
    },
    "githubStars": 115380,
    "popularity": {
      "repo_url": "https://github.com/mrdoob/three.js",
      "stars": 115380,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/mrdoob/three.js",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "drei",
    "title": "Drei",
    "summary": "Reusable scene helpers for cameras, materials, loading and interaction in React Three Fiber.",
    "genres": [
      "rendering",
      "exploration"
    ],
    "runtime": "React Three Fiber / Three.js",
    "label": "Play demo",
    "demoUrl": "https://drei.pmnd.rs/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/pmndrs/drei",
    "projectUrl": "https://docs.pmnd.rs/drei",
    "commit": "ffa15b956e320391b0e86084cb58c8da0445abe3",
    "creator": "pmndrs and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "pmndrs and contributors",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://github.com/pmndrs/drei/blob/ffa15b956e320391b0e86084cb58c8da0445abe3/LICENSE"
      ],
      "sourcePage": "https://github.com/pmndrs/drei/blob/ffa15b956e320391b0e86084cb58c8da0445abe3/.storybook/public/images/share-screen.jpg",
      "licenseEvidenceUrl": "https://github.com/pmndrs/drei/blob/ffa15b956e320391b0e86084cb58c8da0445abe3/LICENSE",
      "captureDate": null,
      "versionRelation": "Pinned repository documentation/demo overview image. This image identifies the named catalog record but is not a HeadStart playthrough, source/deployment parity check or integration attestation.",
      "alt": "Drei Storybook share-screen demo placeholder reading click here to Share Screen.",
      "sha256": "ba9fbdb0326a92aaca59510808770ff378c2177f66f7f514f38a337538cf8884",
      "originalUrl": "https://raw.githubusercontent.com/pmndrs/drei/ffa15b956e320391b0e86084cb58c8da0445abe3/.storybook/public/images/share-screen.jpg",
      "allowedUse": "Independent narrow local research-display review passed for this exact audited image. The approval is limited to identifying the upstream project in the local HeadStart catalog; it does not authorize public redistribution, source export, promotional reuse, relicensing, game-asset reuse, endorsement, or imply that third-party assets are covered by the code license.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/drei.jpg",
      "localSourcePath": "research/catalog/media/drei.jpg"
    },
    "contentKind": "toolkit",
    "dimension": "3d",
    "visualStyle": [
      "configurable"
    ],
    "runtimeVersion": "R3F ^9.0.0; React ^19; Three.js >=0.159",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/pmndrs/drei/blob/ffa15b956e320391b0e86084cb58c8da0445abe3/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Helper code license inspected; external HDRIs, fonts, demos and models are separate rights scopes.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/pmndrs/drei/tree/ffa15b956e320391b0e86084cb58c8da0445abe3",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "camera",
      "materials"
    ],
    "buildingBlocks": [
      {
        "name": "Camera control binding",
        "category": "camera",
        "evidence_url": "https://github.com/pmndrs/drei/blob/ffa15b956e320391b0e86084cb58c8da0445abe3/src/core/CameraControls.tsx",
        "source_path": "src/core/CameraControls.tsx",
        "status": "source_inspected",
        "notes": "Wraps camera-controls and connects camera/DOM events to R3F; preserve active camera and input ownership."
      },
      {
        "name": "Planar reflective material",
        "category": "materials",
        "evidence_url": "https://github.com/pmndrs/drei/blob/ffa15b956e320391b0e86084cb58c8da0445abe3/src/core/MeshReflectorMaterial.tsx",
        "source_path": "src/core/MeshReflectorMaterial.tsx",
        "status": "source_inspected",
        "notes": "Renders a reflected scene to render targets with optional blur; rendering cost and cleanup require measurement and lifecycle tests."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/pmndrs/drei/tree/ffa15b956e320391b0e86084cb58c8da0445abe3",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/pmndrs/drei/blob/ffa15b956e320391b0e86084cb58c8da0445abe3/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/pmndrs/drei/blob/ffa15b956e320391b0e86084cb58c8da0445abe3/LICENSE",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/pmndrs/drei/blob/ffa15b956e320391b0e86084cb58c8da0445abe3/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/pmndrs/drei/blob/ffa15b956e320391b0e86084cb58c8da0445abe3/src/core/CameraControls.tsx",
        "claim": "Camera control binding entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/pmndrs/drei/blob/ffa15b956e320391b0e86084cb58c8da0445abe3/src/core/MeshReflectorMaterial.tsx",
        "claim": "Planar reflective material entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "drei",
      "position": 35,
      "rationale": "reusable toolkit/reference; 9862 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 9862,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 4
      }
    },
    "githubStars": 9862,
    "popularity": {
      "repo_url": "https://github.com/pmndrs/drei",
      "stars": 9862,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/pmndrs/drei",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "littlejs",
    "title": "LittleJS",
    "summary": "A browser game engine and example collection covering sprite games, effects, synthesized audio and input.",
    "genres": [
      "platformer",
      "arcade",
      "puzzle"
    ],
    "runtime": "LittleJS",
    "label": "Play demo",
    "demoUrl": "https://killedbyapixel.github.io/LittleJS/examples",
    "demoKind": "browser",
    "repoUrl": "https://github.com/KilledByAPixel/LittleJS",
    "projectUrl": "https://killedbyapixel.github.io/LittleJS/examples",
    "commit": "da1b3836552b2373522a56bd39d6fb9f4b530017",
    "creator": "Frank Force and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "Frank Force and contributors",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://github.com/KilledByAPixel/LittleJS/blob/da1b3836552b2373522a56bd39d6fb9f4b530017/LICENSE"
      ],
      "sourcePage": "https://github.com/KilledByAPixel/LittleJS/blob/da1b3836552b2373522a56bd39d6fb9f4b530017/examples/screenshot.jpg",
      "licenseEvidenceUrl": "https://github.com/KilledByAPixel/LittleJS/blob/da1b3836552b2373522a56bd39d6fb9f4b530017/LICENSE",
      "captureDate": null,
      "versionRelation": "Pinned repository example montage. This image identifies the named catalog record but is not a HeadStart playthrough, source/deployment parity check or integration attestation.",
      "alt": "Montage of four colorful LittleJS game and puzzle example screens.",
      "sha256": "7a1ddaa184b36fb75ee9d80bd0b10d47a1471b572779b0ad15c995de897012e5",
      "originalUrl": "https://raw.githubusercontent.com/KilledByAPixel/LittleJS/da1b3836552b2373522a56bd39d6fb9f4b530017/examples/screenshot.jpg",
      "allowedUse": "Independent narrow local research-display review passed for this exact audited image. The approval is limited to identifying the upstream project in the local HeadStart catalog; it does not authorize public redistribution, source export, promotional reuse, relicensing, game-asset reuse, endorsement, or imply that third-party assets are covered by the code license.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/littlejs.jpg",
      "localSourcePath": "research/catalog/media/littlejs.jpg"
    },
    "contentKind": "engine",
    "dimension": "mixed",
    "visualStyle": [
      "pixel-art",
      "configurable"
    ],
    "runtimeVersion": "1.18.30",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/KilledByAPixel/LittleJS/blob/da1b3836552b2373522a56bd39d6fb9f4b530017/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Library code license inspected; individual example textures, fonts and audio still require scope review.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/KilledByAPixel/LittleJS/tree/da1b3836552b2373522a56bd39d6fb9f4b530017",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "audio",
      "particles"
    ],
    "buildingBlocks": [
      {
        "name": "Synthesized and spatial audio",
        "category": "audio",
        "evidence_url": "https://github.com/KilledByAPixel/LittleJS/blob/da1b3836552b2373522a56bd39d6fb9f4b530017/src/engineAudio.js",
        "source_path": "src/engineAudio.js",
        "status": "source_inspected",
        "notes": "Sound and instance classes combine Web Audio, generated sound and positional attenuation; engine globals and audio lifecycle remain dependencies."
      },
      {
        "name": "Particle emitters",
        "category": "particles",
        "evidence_url": "https://github.com/KilledByAPixel/LittleJS/blob/da1b3836552b2373522a56bd39d6fb9f4b530017/src/engineParticles.js",
        "source_path": "src/engineParticles.js",
        "status": "source_inspected",
        "notes": "Emitter/particle classes implement randomized motion, gradients and tile collisions; depends on EngineObject and drawing/math helpers."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/KilledByAPixel/LittleJS/tree/da1b3836552b2373522a56bd39d6fb9f4b530017",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/KilledByAPixel/LittleJS/blob/da1b3836552b2373522a56bd39d6fb9f4b530017/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/KilledByAPixel/LittleJS/blob/da1b3836552b2373522a56bd39d6fb9f4b530017/LICENSE",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/KilledByAPixel/LittleJS/blob/da1b3836552b2373522a56bd39d6fb9f4b530017/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/KilledByAPixel/LittleJS/blob/da1b3836552b2373522a56bd39d6fb9f4b530017/src/engineAudio.js",
        "claim": "Synthesized and spatial audio entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/KilledByAPixel/LittleJS/blob/da1b3836552b2373522a56bd39d6fb9f4b530017/src/engineParticles.js",
        "claim": "Particle emitters entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "littlejs",
      "position": 36,
      "rationale": "reusable toolkit/reference; 4175 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 4175,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 5
      }
    },
    "githubStars": 4175,
    "popularity": {
      "repo_url": "https://github.com/KilledByAPixel/LittleJS",
      "stars": 4175,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/KilledByAPixel/LittleJS",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "three-mesh-bvh",
    "title": "three-mesh-bvh",
    "summary": "Geometry acceleration structures and queries that can support picking, collision and character movement.",
    "genres": [
      "spatial-query",
      "exploration"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://gkjohnson.github.io/three-mesh-bvh/example/bundle/raycast.html",
    "demoKind": "browser",
    "repoUrl": "https://github.com/gkjohnson/three-mesh-bvh",
    "projectUrl": "https://gkjohnson.github.io/three-mesh-bvh/example/bundle/raycast.html",
    "commit": "8747a3c418f1dafa7c3ab1b3c1ffdecc531a2eab",
    "creator": "gkjohnson and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "gkjohnson and contributors",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://github.com/gkjohnson/three-mesh-bvh/blob/8747a3c418f1dafa7c3ab1b3c1ffdecc531a2eab/LICENSE"
      ],
      "sourcePage": "https://github.com/gkjohnson/three-mesh-bvh/blob/8747a3c418f1dafa7c3ab1b3c1ffdecc531a2eab/docs/example-sm.gif",
      "licenseEvidenceUrl": "https://github.com/gkjohnson/three-mesh-bvh/blob/8747a3c418f1dafa7c3ab1b3c1ffdecc531a2eab/LICENSE",
      "captureDate": null,
      "versionRelation": "Pinned repository interactive capability demo animation. This image identifies the named catalog record but is not a HeadStart playthrough, source/deployment parity check or integration attestation.",
      "alt": "Animated red knotted torus surrounded by white ray and particle traces on black.",
      "sha256": "3ff289466734ad424adf17a5fddb2b1bce97ae144e104ab6083083efb496b381",
      "originalUrl": "https://raw.githubusercontent.com/gkjohnson/three-mesh-bvh/8747a3c418f1dafa7c3ab1b3c1ffdecc531a2eab/docs/example-sm.gif",
      "allowedUse": "Independent narrow local research-display review passed for this exact audited image. The approval is limited to identifying the upstream project in the local HeadStart catalog; it does not authorize public redistribution, source export, promotional reuse, relicensing, game-asset reuse, endorsement, or imply that third-party assets are covered by the code license.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/three-mesh-bvh.gif",
      "localSourcePath": "research/catalog/media/three-mesh-bvh.gif"
    },
    "contentKind": "toolkit",
    "dimension": "3d",
    "visualStyle": [
      "configurable"
    ],
    "runtimeVersion": "library 0.9.15; Three.js >=0.159.0",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/gkjohnson/three-mesh-bvh/blob/8747a3c418f1dafa7c3ab1b3c1ffdecc531a2eab/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Library source license inspected; third-party demonstration models/screenshots remain unreviewed. No performance numbers were measured.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/gkjohnson/three-mesh-bvh/tree/8747a3c418f1dafa7c3ab1b3c1ffdecc531a2eab",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "collision-query",
      "background-processing"
    ],
    "buildingBlocks": [
      {
        "name": "Mesh spatial queries",
        "category": "collision-query",
        "evidence_url": "https://github.com/gkjohnson/three-mesh-bvh/blob/8747a3c418f1dafa7c3ab1b3c1ffdecc531a2eab/src/core/MeshBVH.js",
        "source_path": "src/core/MeshBVH.js",
        "status": "source_inspected",
        "notes": "BVH implements geometry queries and serialization; local/world transform handling and geometry mutation need integration tests."
      },
      {
        "name": "Worker BVH construction",
        "category": "background-processing",
        "evidence_url": "https://github.com/gkjohnson/three-mesh-bvh/blob/8747a3c418f1dafa7c3ab1b3c1ffdecc531a2eab/src/workers/GenerateMeshBVHWorker.js",
        "source_path": "src/workers/GenerateMeshBVHWorker.js",
        "status": "source_inspected",
        "notes": "Transfers geometry buffers while building asynchronously; unavailable geometry during transfer and worker disposal must be handled."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/gkjohnson/three-mesh-bvh/tree/8747a3c418f1dafa7c3ab1b3c1ffdecc531a2eab",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/gkjohnson/three-mesh-bvh/blob/8747a3c418f1dafa7c3ab1b3c1ffdecc531a2eab/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/gkjohnson/three-mesh-bvh/blob/8747a3c418f1dafa7c3ab1b3c1ffdecc531a2eab/LICENSE",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/gkjohnson/three-mesh-bvh/blob/8747a3c418f1dafa7c3ab1b3c1ffdecc531a2eab/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/gkjohnson/three-mesh-bvh/blob/8747a3c418f1dafa7c3ab1b3c1ffdecc531a2eab/src/core/MeshBVH.js",
        "claim": "Mesh spatial queries entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/gkjohnson/three-mesh-bvh/blob/8747a3c418f1dafa7c3ab1b3c1ffdecc531a2eab/src/workers/GenerateMeshBVHWorker.js",
        "claim": "Worker BVH construction entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "three-mesh-bvh",
      "position": 37,
      "rationale": "reusable toolkit/reference; 3483 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 3483,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 4
      }
    },
    "githubStars": 3483,
    "popularity": {
      "repo_url": "https://github.com/gkjohnson/three-mesh-bvh",
      "stars": 3483,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/gkjohnson/three-mesh-bvh",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "react-three-rapier",
    "title": "React Three Rapier",
    "summary": "React bindings for Rapier bodies, colliders and joints inside an existing React Three Fiber scene.",
    "genres": [
      "physics",
      "sandbox"
    ],
    "runtime": "React Three Fiber / Rapier",
    "label": "Play demo",
    "demoUrl": "https://react-three-rapier.pmnd.rs",
    "demoKind": "browser",
    "repoUrl": "https://github.com/pmndrs/react-three-rapier",
    "projectUrl": "https://react-three-rapier.pmnd.rs",
    "commit": "ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98",
    "creator": "pmndrs and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "pmndrs and contributors",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://github.com/pmndrs/react-three-rapier/blob/ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98/LICENSE"
      ],
      "sourcePage": "https://github.com/pmndrs/react-three-rapier/blob/ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98/packages/react-three-rapier/misc/example-auto-colliders.jpg",
      "licenseEvidenceUrl": "https://github.com/pmndrs/react-three-rapier/blob/ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98/LICENSE",
      "captureDate": null,
      "versionRelation": "Pinned repository interactive physics example screenshot. This image identifies the named catalog record but is not a HeadStart playthrough, source/deployment parity check or integration attestation.",
      "alt": "White physics-test shapes resting on a bright green surface in React Three Rapier.",
      "sha256": "645a6f73889291ee7974d308c317217b6fd283618e6cea0d975bd50d04f9ee91",
      "originalUrl": "https://raw.githubusercontent.com/pmndrs/react-three-rapier/ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98/packages/react-three-rapier/misc/example-auto-colliders.jpg",
      "allowedUse": "Independent narrow local research-display review passed for this exact audited image. The approval is limited to identifying the upstream project in the local HeadStart catalog; it does not authorize public redistribution, source export, promotional reuse, relicensing, game-asset reuse, endorsement, or imply that third-party assets are covered by the code license.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "/root/critical_review",
      "src": "assets/catalog/react-three-rapier.jpg",
      "localSourcePath": "research/catalog/media/react-three-rapier.jpg"
    },
    "contentKind": "toolkit",
    "dimension": "3d",
    "visualStyle": [
      "configurable"
    ],
    "runtimeVersion": "2.2.0; R3F ^9.0.4; Rapier 0.19.2",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/pmndrs/react-three-rapier/blob/ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Core binding code license inspected; Rapier/WASM transitive license and demo assets remain separate checks.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/pmndrs/react-three-rapier/tree/ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "physics",
      "physics-joints"
    ],
    "buildingBlocks": [
      {
        "name": "Rigid-body lifecycle",
        "category": "physics",
        "evidence_url": "https://github.com/pmndrs/react-three-rapier/blob/ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98/packages/react-three-rapier/src/components/RigidBody.tsx",
        "source_path": "packages/react-three-rapier/src/components/RigidBody.tsx",
        "status": "source_inspected",
        "notes": "Creates a Rapier body and binds it to object state; requires the existing Physics context and lifecycle ownership."
      },
      {
        "name": "Physics joint hooks",
        "category": "physics-joints",
        "evidence_url": "https://github.com/pmndrs/react-three-rapier/blob/ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98/packages/react-three-rapier/src/hooks/joints.ts",
        "source_path": "packages/react-three-rapier/src/hooks/joints.ts",
        "status": "source_inspected",
        "notes": "Hooks create fixed, revolute, rope and spring impulse joints; body refs and simulation lifecycle need target tests."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/pmndrs/react-three-rapier/tree/ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/pmndrs/react-three-rapier/blob/ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98/packages/react-three-rapier/readme.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/pmndrs/react-three-rapier/blob/ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98/LICENSE",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/pmndrs/react-three-rapier/blob/ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98/packages/react-three-rapier/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/pmndrs/react-three-rapier/blob/ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98/packages/react-three-rapier/src/components/RigidBody.tsx",
        "claim": "Rigid-body lifecycle entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/pmndrs/react-three-rapier/blob/ae5c3fede5ca489fd7eaa8271e9d9c5eabc88e98/packages/react-three-rapier/src/hooks/joints.ts",
        "claim": "Physics joint hooks entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "react-three-rapier",
      "position": 38,
      "rationale": "reusable toolkit/reference; 1431 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 1431,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 3
      }
    },
    "githubStars": 1431,
    "popularity": {
      "repo_url": "https://github.com/pmndrs/react-three-rapier",
      "stars": 1431,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/pmndrs/react-three-rapier",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "three-pathfinding",
    "title": "three-pathfinding",
    "summary": "Navigation-mesh utilities for Three.js with zone construction, path search and constrained movement.",
    "genres": [
      "navigation",
      "exploration"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://three-pathfinding.donmccurdy.com/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/donmccurdy/three-pathfinding",
    "projectUrl": "https://three-pathfinding.donmccurdy.com/",
    "commit": "1526c84afed0d596cb13f4b7be36401fd2c6a430",
    "creator": "donmccurdy and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "donmccurdy and contributors",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://opensource.org/license/mit"
      ],
      "sourcePage": "https://user-images.githubusercontent.com/1848368/34424850-d79e5a24-ebf4-11e7-87c4-afc75cdc41bd.png",
      "licenseEvidenceUrl": "https://github.com/donmccurdy/three-pathfinding/blob/1526c84afed0d596cb13f4b7be36401fd2c6a430/LICENSE",
      "captureDate": null,
      "versionRelation": "Image file pinned in the named repository at the indexed source commit; not a HeadStart playthrough or target-integration attestation.",
      "alt": "Agents navigating a Three.js pathfinding demonstration scene.",
      "sha256": "91999166337568f4cf249957b1713334901a897338e7ecb8b2d4ae44fabe6548",
      "originalUrl": "https://user-images.githubusercontent.com/1848368/34424850-d79e5a24-ebf4-11e7-87c4-afc75cdc41bd.png",
      "allowedUse": "Local HeadStart catalog identification and preview display for this repository-included image under the listed terms; no broader game-asset reuse, endorsement or model-quality claim.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/critical_review",
      "src": "assets/catalog/three-pathfinding.png",
      "localSourcePath": "research/catalog/media/three-pathfinding.png"
    },
    "contentKind": "toolkit",
    "dimension": "3d",
    "visualStyle": [
      "configurable"
    ],
    "runtimeVersion": "library 1.3.0; Three.js 0.x.x peer range",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/donmccurdy/three-pathfinding/blob/1526c84afed0d596cb13f4b7be36401fd2c6a430/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Maintainer credits PatrolJS ancestry. Demo mesh/screenshot provenance needs review.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/donmccurdy/three-pathfinding/tree/1526c84afed0d596cb13f4b7be36401fd2c6a430",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "pathfinding"
    ],
    "buildingBlocks": [
      {
        "name": "Navigation mesh route search",
        "category": "pathfinding",
        "evidence_url": "https://github.com/donmccurdy/three-pathfinding/blob/1526c84afed0d596cb13f4b7be36401fd2c6a430/src/Pathfinding.js",
        "source_path": "src/Pathfinding.js",
        "status": "source_inspected",
        "notes": "Zone-based search wraps Builder, AStar and Channel; navmesh validity and geometry coordinates need verification."
      },
      {
        "name": "Funnel path smoothing",
        "category": "pathfinding",
        "evidence_url": "https://github.com/donmccurdy/three-pathfinding/blob/1526c84afed0d596cb13f4b7be36401fd2c6a430/src/Channel.js",
        "source_path": "src/Channel.js",
        "status": "source_inspected",
        "notes": "String-pulling processes portal edges into waypoints; Utils predicates and degenerate portal cases require tests."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/donmccurdy/three-pathfinding/tree/1526c84afed0d596cb13f4b7be36401fd2c6a430",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/donmccurdy/three-pathfinding/blob/1526c84afed0d596cb13f4b7be36401fd2c6a430/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/donmccurdy/three-pathfinding/blob/1526c84afed0d596cb13f4b7be36401fd2c6a430/LICENSE",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/donmccurdy/three-pathfinding/blob/1526c84afed0d596cb13f4b7be36401fd2c6a430/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/donmccurdy/three-pathfinding/blob/1526c84afed0d596cb13f4b7be36401fd2c6a430/src/Pathfinding.js",
        "claim": "Navigation mesh route search entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/donmccurdy/three-pathfinding/blob/1526c84afed0d596cb13f4b7be36401fd2c6a430/src/Channel.js",
        "claim": "Funnel path smoothing entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "three-pathfinding",
      "position": 39,
      "rationale": "reusable toolkit/reference; 1372 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 1372,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 3
      }
    },
    "githubStars": 1372,
    "popularity": {
      "repo_url": "https://github.com/donmccurdy/three-pathfinding",
      "stars": 1372,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/donmccurdy/three-pathfinding",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "three-terrain",
    "title": "THREE.Terrain",
    "summary": "Procedural heightfields and mesh-scattering utilities for configurable Three.js landscapes.",
    "genres": [
      "procedural-generation",
      "exploration"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://icecreamyou.github.io/THREE.Terrain/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/IceCreamYou/THREE.Terrain",
    "projectUrl": "https://icecreamyou.github.io/THREE.Terrain/",
    "commit": "434d977ffdbac604cd5c6fd332c4d005f7f9ec68",
    "creator": "Isaac Sukin and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "Isaac Sukin and contributors",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://opensource.org/license/mit"
      ],
      "sourcePage": "https://github.com/IceCreamYou/THREE.Terrain/blob/434d977ffdbac604cd5c6fd332c4d005f7f9ec68/demo/img/screenshot2.jpg",
      "licenseEvidenceUrl": "https://github.com/IceCreamYou/THREE.Terrain/blob/434d977ffdbac604cd5c6fd332c4d005f7f9ec68/LICENSE.txt",
      "captureDate": null,
      "versionRelation": "Image file pinned in the named repository at the indexed source commit; not a HeadStart playthrough or target-integration attestation.",
      "alt": "A generated Three.js terrain landscape under a blue sky.",
      "sha256": "eec926ed43e62a9fee3bcbca89276235eff4c0fc6ad8f77f93fa0904bf1957ea",
      "originalUrl": "https://raw.githubusercontent.com/IceCreamYou/THREE.Terrain/434d977ffdbac604cd5c6fd332c4d005f7f9ec68/demo/img/screenshot2.jpg",
      "allowedUse": "Local HeadStart catalog identification and preview display for this repository-included image under the listed terms; no broader game-asset reuse, endorsement or model-quality claim.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/critical_review",
      "src": "assets/catalog/three-terrain.jpg",
      "localSourcePath": "research/catalog/media/three-terrain.jpg"
    },
    "contentKind": "toolkit",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "naturalistic"
    ],
    "runtimeVersion": "library 3.1.1; Three.js >=0.160.0",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/IceCreamYou/THREE.Terrain/blob/434d977ffdbac604cd5c6fd332c4d005f7f9ec68/LICENSE.txt",
      "asset_status": "unreviewed",
      "asset_notes": "README distinguishes npm library from demo assets and credits ez-tree; terrain textures and preview rights not cleared.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/IceCreamYou/THREE.Terrain/tree/434d977ffdbac604cd5c6fd332c4d005f7f9ec68",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "terrain",
      "world-building"
    ],
    "buildingBlocks": [
      {
        "name": "Heightfield generation",
        "category": "terrain",
        "evidence_url": "https://github.com/IceCreamYou/THREE.Terrain/blob/434d977ffdbac604cd5c6fd332c4d005f7f9ec68/src/generators.js",
        "source_path": "src/generators.js",
        "status": "source_inspected",
        "notes": "Generator functions compose heightmap methods using TerrainNS and supplied randomness; seeded output needs a target determinism test."
      },
      {
        "name": "Vegetation and object scattering",
        "category": "world-building",
        "evidence_url": "https://github.com/IceCreamYou/THREE.Terrain/blob/434d977ffdbac604cd5c6fd332c4d005f7f9ec68/src/scatter.js",
        "source_path": "src/scatter.js",
        "status": "source_inspected",
        "notes": "Transforms scattered meshes with random placement and minimum-distance helpers; supplied mesh/material rights and instancing strategy need review."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/IceCreamYou/THREE.Terrain/tree/434d977ffdbac604cd5c6fd332c4d005f7f9ec68",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/IceCreamYou/THREE.Terrain/blob/434d977ffdbac604cd5c6fd332c4d005f7f9ec68/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/IceCreamYou/THREE.Terrain/blob/434d977ffdbac604cd5c6fd332c4d005f7f9ec68/LICENSE.txt",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/IceCreamYou/THREE.Terrain/blob/434d977ffdbac604cd5c6fd332c4d005f7f9ec68/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/IceCreamYou/THREE.Terrain/blob/434d977ffdbac604cd5c6fd332c4d005f7f9ec68/src/generators.js",
        "claim": "Heightfield generation entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/IceCreamYou/THREE.Terrain/blob/434d977ffdbac604cd5c6fd332c4d005f7f9ec68/src/scatter.js",
        "claim": "Vegetation and object scattering entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "three-terrain",
      "position": 40,
      "rationale": "reusable toolkit/reference; 899 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 899,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 4
      }
    },
    "githubStars": 899,
    "popularity": {
      "repo_url": "https://github.com/IceCreamYou/THREE.Terrain",
      "stars": 899,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/IceCreamYou/THREE.Terrain",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "ecctrl",
    "title": "Ecctrl",
    "summary": "A modular physics controller toolkit spanning characters, vehicles, custom gravity and touch input.",
    "genres": [
      "action",
      "racing",
      "exploration"
    ],
    "runtime": "React Three Fiber / Rapier",
    "label": "Play demo",
    "demoUrl": "https://ecctrl.app/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/pmndrs/ecctrl",
    "projectUrl": "https://ecctrl.app/",
    "commit": "e2cab804f9f15661a642e76f52d09f0b2db63f35",
    "creator": "Erdong Chen and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "Erdong Chen and contributors",
      "licenseExpression": "MIT",
      "licenseUrls": [
        "https://opensource.org/license/mit"
      ],
      "sourcePage": "https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/docs/images/ecctrl-hero.gif",
      "licenseEvidenceUrl": "https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/LICENSE",
      "captureDate": null,
      "versionRelation": "Image file pinned in the named repository at the indexed source commit; not a HeadStart playthrough or target-integration attestation.",
      "alt": "A third-person character controller running through the Ecctrl demo world.",
      "sha256": "d9f7f6d44c393b0d3e953640ae5ea3d1247445a834578ec29cdbe747f325c10a",
      "originalUrl": "https://raw.githubusercontent.com/pmndrs/ecctrl/e2cab804f9f15661a642e76f52d09f0b2db63f35/docs/images/ecctrl-hero.gif",
      "allowedUse": "Local HeadStart catalog identification and preview display for this repository-included image under the listed terms; no broader game-asset reuse, endorsement or model-quality claim.",
      "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/critical_review",
      "src": "assets/catalog/ecctrl.gif",
      "localSourcePath": "research/catalog/media/ecctrl.gif"
    },
    "contentKind": "toolkit",
    "dimension": "3d",
    "visualStyle": [
      "configurable"
    ],
    "runtimeVersion": "Ecctrl 2.0.2; R3F >=9.4; Three.js >=0.184.0",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Demo montage and bundled model/audio rights not cleared by this inspection.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/pmndrs/ecctrl/tree/e2cab804f9f15661a642e76f52d09f0b2db63f35",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "character-controller",
      "vehicle-controller",
      "input"
    ],
    "buildingBlocks": [
      {
        "name": "ShapeCast character controller",
        "category": "character-controller",
        "evidence_url": "https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/src/character/Ecctrl.tsx",
        "source_path": "src/character/Ecctrl.tsx",
        "status": "source_inspected",
        "notes": "Movement and gravity state feed a Rapier rigid body. Requires compatible R3F/Rapier ownership and controller adaptation."
      },
      {
        "name": "Vehicle controller",
        "category": "vehicle-controller",
        "evidence_url": "https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/src/vehicles/EcctrlVehicle.tsx",
        "source_path": "src/vehicles/EcctrlVehicle.tsx",
        "status": "source_inspected",
        "notes": "Gear ratios, torque curves and wheel state are implemented; wheel/propeller helpers and gravity stores remain dependencies."
      },
      {
        "name": "Virtual joystick",
        "category": "input",
        "evidence_url": "https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/src/input/Joystick.tsx",
        "source_path": "src/input/Joystick.tsx",
        "status": "source_inspected",
        "notes": "Pointer tracking writes normalized joystick state; DOM layout and touch accessibility need target review."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/pmndrs/ecctrl/tree/e2cab804f9f15661a642e76f52d09f0b2db63f35",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/readme.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/LICENSE",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/src/character/Ecctrl.tsx",
        "claim": "ShapeCast character controller entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/src/vehicles/EcctrlVehicle.tsx",
        "claim": "Vehicle controller entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/src/input/Joystick.tsx",
        "claim": "Virtual joystick entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "ecctrl",
      "position": 41,
      "rationale": "reusable toolkit/reference; 794 GitHub stars observed; interface language unknown.",
      "signals": {
        "usage_evidence": false,
        "github_stars": 794,
        "english_interface": false,
        "preferred_model_provenance": false,
        "genre_capability_breadth": 6
      }
    },
    "githubStars": 794,
    "popularity": {
      "repo_url": "https://github.com/pmndrs/ecctrl",
      "stars": 794,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/pmndrs/ecctrl",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "zero-ad",
    "title": "0 A.D.",
    "summary": "Ancient-warfare RTS with component-based gathering and timed production queues.",
    "genres": [
      "rts",
      "strategy",
      "resource-management",
      "builder"
    ],
    "runtime": "Pyrogenesis",
    "label": "Get game",
    "demoUrl": "https://play0ad.com/download/",
    "demoKind": "native-download",
    "repoUrl": "https://gitea.wildfiregames.com/0ad/0ad",
    "projectUrl": "https://play0ad.com/",
    "commit": "58e2c5946621b15f96d8da8f5e0201f278f7ac99",
    "creator": "Wildfire Games contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "0 A.D. Developers",
      "licenseExpression": "CC-BY-SA-3.0",
      "licenseUrls": [
        "https://creativecommons.org/licenses/by-sa/3.0/"
      ],
      "sourcePage": "https://commons.wikimedia.org/wiki/File:0_A.D._Alpha_23.jpg",
      "licenseEvidenceUrl": "https://commons.wikimedia.org/w/index.php?title=File%3A0+A.D.+Alpha+23.jpg&oldid=740095193",
      "captureDate": "2019-01-26",
      "versionRelation": "Historical image; relation to indexed source commit is unknown. Not a current build or play attestation.",
      "alt": "A settlement and strategy interface in 0 A.D. Alpha 23.",
      "sha256": "28ecba4c269eed07e8c848dac198947c6ac30744ec8f5fdb2e1d8563e9b3a842",
      "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/3/35/0_A.D._Alpha_23.jpg",
      "allowedUse": "Catalog display and redistributed original/thumbnail only with the listed attribution, license notices and applicable share-alike/source obligations. No endorsement implied.",
      "modifications": "Original image bytes retained unchanged; contact sheet scales an independent copy to fit, without content edits.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/design_flex_reviewer",
      "src": "assets/catalog/zero-ad.jpg",
      "localSourcePath": "research/catalog/media/zero-ad.jpg"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer distribution page or homepage entry point, not a browser game or proof that a release matches the inspected source commit. Native setup/content requirements apply.",
    "rights": {
      "code_license": "GPL-2.0-or-later",
      "code_status": "inspected",
      "code_evidence_url": "https://gitea.wildfiregames.com/0ad/0ad/src/commit/58e2c5946621b15f96d8da8f5e0201f278f7ac99/LICENSE.md",
      "asset_status": "mixed",
      "asset_notes": "Current art/audio directory licenses declare CC-BY-SA-3.0 and attribution to Wildfire Games. Art license describes special permission for derived CGTextures files; this does not clear original CGTextures materials. Root licensing has path-specific third-party and binary exceptions.",
      "scope_reuse_status": "review_required",
      "notes": "License summary identifies project terms, not blanket reuse clearance or any royalty agreement. Preserve notices; resolve selected files and transitive dependencies. See research/catalog/evidence/native-batch.json for actual batch timing; no individual timing was recorded."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://gitea.wildfiregames.com/0ad/0ad/src/commit/58e2c5946621b15f96d8da8f5e0201f278f7ac99",
    "platforms": [
      "Windows",
      "Linux",
      "macOS"
    ],
    "platformKind": "desktop",
    "capabilities": [
      "resource-loops",
      "production-queues"
    ],
    "buildingBlocks": [
      {
        "name": "Resource gathering",
        "category": "resource-loops",
        "evidence_url": "https://gitea.wildfiregames.com/0ad/0ad/src/commit/58e2c5946621b15f96d8da8f5e0201f278f7ac99/binaries/data/mods/public/simulation/components/ResourceGatherer.js",
        "source_path": "binaries/data/mods/public/simulation/components/ResourceGatherer.js",
        "status": "source_inspected",
        "notes": "PerformGather checks supply/range/capacity and updates carried resources; needs Engine.QueryInterface, resource supply, UnitAI and ownership/statistics services."
      },
      {
        "name": "Unit and research production queue",
        "category": "production-queues",
        "evidence_url": "https://gitea.wildfiregames.com/0ad/0ad/src/commit/58e2c5946621b15f96d8da8f5e0201f278f7ac99/binaries/data/mods/public/simulation/components/ProductionQueue.js",
        "source_path": "binaries/data/mods/public/simulation/components/ProductionQueue.js",
        "status": "source_inspected",
        "notes": "ProgressTimeout consumes queue time with pause checks and entity messages; needs timers, training/research items and animation services."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://gitea.wildfiregames.com/0ad/0ad/src/commit/58e2c5946621b15f96d8da8f5e0201f278f7ac99/README.md",
        "claim": "Inspected maintainer description, distribution links and declared scope; no execution.",
        "kind": "readme"
      },
      {
        "url": "https://gitea.wildfiregames.com/0ad/0ad/src/commit/58e2c5946621b15f96d8da8f5e0201f278f7ac99/LICENSE.md",
        "claim": "Inspected license text and declared project terms; selected scope and exceptions require review.",
        "kind": "license"
      },
      {
        "url": "https://gitea.wildfiregames.com/0ad/0ad/src/commit/58e2c5946621b15f96d8da8f5e0201f278f7ac99/binaries/data/mods/public/simulation/components/ResourceGatherer.js",
        "claim": "Resource gathering: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://gitea.wildfiregames.com/0ad/0ad/src/commit/58e2c5946621b15f96d8da8f5e0201f278f7ac99/binaries/data/mods/public/simulation/components/ProductionQueue.js",
        "claim": "Unit and research production queue: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/0ad/0ad",
        "claim": "Deprecated GitHub mirror redirected research to current canonical Gitea; current source citations use Gitea.",
        "kind": "repository"
      },
      {
        "url": "https://gitea.wildfiregames.com/0ad/0ad/src/commit/58e2c5946621b15f96d8da8f5e0201f278f7ac99/binaries/data/mods/public/art/LICENSE.txt",
        "claim": "Inspected CC-BY-SA-3.0 directory asset notice and attribution requirements.",
        "kind": "license"
      },
      {
        "url": "https://gitea.wildfiregames.com/0ad/0ad/src/commit/58e2c5946621b15f96d8da8f5e0201f278f7ac99/binaries/data/mods/public/audio/LICENSE.txt",
        "claim": "Inspected CC-BY-SA-3.0 directory asset notice and attribution requirements.",
        "kind": "license"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "zero-ad",
      "position": 42,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": null,
    "popularity": {
      "repo_url": "https://gitea.wildfiregames.com/0ad/0ad",
      "stars": null,
      "status": "not_github",
      "checked_at": "2026-09-10T19:48:23Z",
      "evidence_url": "https://gitea.wildfiregames.com/0ad/0ad",
      "notes": "GitHub star metric does not apply to this repository host."
    }
  },
  {
    "id": "3d-city",
    "title": "3d.city",
    "summary": "A browser city builder combining a Three.js city view with a worker-based Micropolis-derived simulation.",
    "genres": [
      "city-builder",
      "simulation",
      "management"
    ],
    "runtime": "Three.js / micropolisJS",
    "label": "Play demo",
    "demoUrl": "https://lo-th.github.io/3d.city/index.html",
    "demoKind": "browser",
    "repoUrl": "https://github.com/lo-th/3d.city",
    "projectUrl": "https://lo-th.github.io/3d.city/index.html",
    "commit": "60fc6de2451ac6cf4df211a7cdae6c55c97e73c7",
    "creator": "lo-th and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "low-poly",
      "urban"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": null,
      "code_status": "unresolved",
      "code_evidence_url": "https://github.com/lo-th/3d.city/blob/60fc6de2451ac6cf4df211a7cdae6c55c97e73c7/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Textures and models need attribution review; code rights conflict must be resolved before extraction.",
      "scope_reuse_status": "review_required",
      "notes": "README claims MIT, while LICENSE/COPYING and inspected simulation/budget headers specify GPLv3 plus additional terms. Conflicting project-level claim; do not classify the whole project as MIT."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/lo-th/3d.city/tree/60fc6de2451ac6cf4df211a7cdae6c55c97e73c7",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "simulation-clock",
      "economy"
    ],
    "buildingBlocks": [
      {
        "name": "City simulation scheduling",
        "category": "simulation-clock",
        "evidence_url": "https://github.com/lo-th/3d.city/blob/60fc6de2451ac6cf4df211a7cdae6c55c97e73c7/src/micro/Simulation.js",
        "source_path": "src/micro/Simulation.js",
        "status": "source_inspected",
        "notes": "Simulation aggregates map scanning, zones and services; depends on the Micropolis model and worker boundary."
      },
      {
        "name": "Municipal budget",
        "category": "economy",
        "evidence_url": "https://github.com/lo-th/3d.city/blob/60fc6de2451ac6cf4df211a7cdae6c55c97e73c7/src/micro/game/Budget.js",
        "source_path": "src/micro/game/Budget.js",
        "status": "source_inspected",
        "notes": "Funds, tax and service spending appear in the budget class; coupled to Micro constants and messages."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/lo-th/3d.city/tree/60fc6de2451ac6cf4df211a7cdae6c55c97e73c7",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/lo-th/3d.city/blob/60fc6de2451ac6cf4df211a7cdae6c55c97e73c7/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/lo-th/3d.city/blob/60fc6de2451ac6cf4df211a7cdae6c55c97e73c7/LICENSE",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/lo-th/3d.city/blob/60fc6de2451ac6cf4df211a7cdae6c55c97e73c7/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/lo-th/3d.city/blob/60fc6de2451ac6cf4df211a7cdae6c55c97e73c7/src/micro/Simulation.js",
        "claim": "City simulation scheduling entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/lo-th/3d.city/blob/60fc6de2451ac6cf4df211a7cdae6c55c97e73c7/src/micro/game/Budget.js",
        "claim": "Municipal budget entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "3d-city",
      "position": 43,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 1744,
    "popularity": {
      "repo_url": "https://github.com/lo-th/3d.city",
      "stars": 1744,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/lo-th/3d.city",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "a-dark-room",
    "title": "A Dark Room",
    "summary": "A text adventure that grows from a small resource loop into village management and exploration.",
    "genres": [
      "incremental",
      "adventure",
      "resource-management"
    ],
    "runtime": "HTML / JavaScript",
    "label": "Play demo",
    "demoUrl": "https://adarkroom.doublespeakgames.com",
    "demoKind": "browser",
    "repoUrl": "https://github.com/doublespeakgames/adarkroom",
    "projectUrl": "https://github.com/doublespeakgames/adarkroom",
    "commit": "1fada4620b6c66bd07bf15a3f1eb8223df8bc1d7",
    "creator": "doublespeakgames and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [
      "text-based",
      "minimal"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "MPL-2.0",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/doublespeakgames/adarkroom/blob/1fada4620b6c66bd07bf15a3f1eb8223df8bc1d7/LICENSE.md",
      "asset_status": "unreviewed",
      "asset_notes": "Text, translations, sounds and external promotional images have not been scoped individually.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/doublespeakgames/adarkroom/tree/1fada4620b6c66bd07bf15a3f1eb8223df8bc1d7",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "economy",
      "game-state"
    ],
    "buildingBlocks": [
      {
        "name": "Worker production chains",
        "category": "economy",
        "evidence_url": "https://github.com/doublespeakgames/adarkroom/blob/1fada4620b6c66bd07bf15a3f1eb8223df8bc1d7/script/outside.js",
        "source_path": "script/outside.js",
        "status": "source_inspected",
        "notes": "Worker income recipes and population actions are explicit; localized UI and global state modules are coupled."
      },
      {
        "name": "Nested reactive game state",
        "category": "game-state",
        "evidence_url": "https://github.com/doublespeakgames/adarkroom/blob/1fada4620b6c66bd07bf15a3f1eb8223df8bc1d7/script/state_manager.js",
        "source_path": "script/state_manager.js",
        "status": "source_inspected",
        "notes": "Nested get/set operations, batch updates and income collection use state update events; save migration and global engine coupling need review."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/doublespeakgames/adarkroom/tree/1fada4620b6c66bd07bf15a3f1eb8223df8bc1d7",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/doublespeakgames/adarkroom/blob/1fada4620b6c66bd07bf15a3f1eb8223df8bc1d7/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/doublespeakgames/adarkroom/blob/1fada4620b6c66bd07bf15a3f1eb8223df8bc1d7/LICENSE.md",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/doublespeakgames/adarkroom/blob/1fada4620b6c66bd07bf15a3f1eb8223df8bc1d7/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/doublespeakgames/adarkroom/blob/1fada4620b6c66bd07bf15a3f1eb8223df8bc1d7/script/outside.js",
        "claim": "Worker production chains entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/doublespeakgames/adarkroom/blob/1fada4620b6c66bd07bf15a3f1eb8223df8bc1d7/script/state_manager.js",
        "claim": "Nested reactive game state entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "a-dark-room",
      "position": 44,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 8276,
    "popularity": {
      "repo_url": "https://github.com/doublespeakgames/adarkroom",
      "stars": 8276,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/doublespeakgames/adarkroom",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "astra-apex-club",
    "title": "Apex Club",
    "summary": "A browser kart racer with procedural course scenery and vehicle handling.",
    "genres": [
      "racing"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://apex-club-racing.vercel.app/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/MartinDelophy/awesome-gpt-6-astra",
    "projectUrl": "https://apex-club-racing.vercel.app/",
    "commit": "139a9287e763e5b592bb53fda97e5101db15db40",
    "creator": "Ryan; submitted by MartinDelophy",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": null,
      "code_status": "unresolved",
      "code_evidence_url": null,
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "Collection CC0 is not assumed to clear contributed game source. No explicit subproject license grant established."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/139a9287e763e5b592bb53fda97e5101db15db40",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "vehicle-controller",
      "race-rules"
    ],
    "buildingBlocks": [
      {
        "name": "Arcade driving model",
        "category": "vehicle-controller",
        "evidence_url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/apex-club/driving-model.js",
        "source_path": "works/apex-club/driving-model.js",
        "status": "source_inspected",
        "notes": "World-space handling, drift and track contacts depend on kart parameters. No extraction or integration test."
      },
      {
        "name": "Race and team rules",
        "category": "race-rules",
        "evidence_url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/apex-club/race-rules.js",
        "source_path": "works/apex-club/race-rules.js",
        "status": "source_inspected",
        "notes": "Standings and team scores depend on finish times, progress and local racer state. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/139a9287e763e5b592bb53fda97e5101db15db40",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/apex-club/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/apex-club/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/apex-club/driving-model.js",
        "claim": "Arcade driving model entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/apex-club/race-rules.js",
        "claim": "Race and team rules entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unverified",
      "models": [],
      "evidence": [
        {
          "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/apex-club/CREATION.md",
          "claim": "Development record does not establish exact model identity; unresolved attribution retained."
        }
      ],
      "notes": "This project appears in an Astra collection, but a creator statement establishing the exact model contribution has not been verified."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "astra-apex-club",
      "position": 45,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 135,
    "popularity": {
      "repo_url": "https://github.com/MartinDelophy/awesome-gpt-6-astra",
      "stars": 135,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/MartinDelophy/awesome-gpt-6-astra",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "toy2game-balance-astronaut",
    "title": "Balance Astronaut",
    "summary": "Place astronauts while keeping a shared platform balanced.",
    "genres": [
      "party",
      "physics"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://games.asmo.top/games/balance-astronaut/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/asmoyou/toy2game",
    "projectUrl": "https://games.asmo.top/games/balance-astronaut/",
    "commit": "39078515a13331a748e63bc75424ed83c773a72a",
    "creator": "asmoyou and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "cannon-es ^0.20.0; three ^0.185.1",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "LicenseRef-Toy2Game-Noncommercial-1.0",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "Custom NONCOMMERCIAL source-available license; not OSI open source. Commercial use requires separate written permission; no such agreement established."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/asmoyou/toy2game/tree/39078515a13331a748e63bc75424ed83c773a72a",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "turn-system",
      "physics"
    ],
    "buildingBlocks": [
      {
        "name": "Balance turn loop",
        "category": "turn-system",
        "evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/balance-astronaut/src/game.ts",
        "source_path": "games/balance-astronaut/src/game.ts",
        "status": "source_inspected",
        "notes": "BalanceGame cycles roll/place/settle phases with physics and board settings. No extraction or integration test."
      },
      {
        "name": "Pivoted platform physics",
        "category": "physics",
        "evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/balance-astronaut/src/physics.ts",
        "source_path": "games/balance-astronaut/src/physics.ts",
        "status": "source_inspected",
        "notes": "Cannon world owns platform/crew bodies and fixed-step scale conventions. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/asmoyou/toy2game/tree/39078515a13331a748e63bc75424ed83c773a72a",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/balance-astronaut/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/balance-astronaut/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/balance-astronaut/src/game.ts",
        "claim": "Balance turn loop entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/balance-astronaut/src/physics.ts",
        "claim": "Pivoted platform physics entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unverified",
      "models": [],
      "evidence": [],
      "notes": "This project appears in an Astra collection, but a creator statement establishing the exact model contribution has not been verified."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "toy2game-balance-astronaut",
      "position": 46,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 4,
    "popularity": {
      "repo_url": "https://github.com/asmoyou/toy2game",
      "stars": 4,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/asmoyou/toy2game",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "browserquest",
    "title": "BrowserQuest",
    "summary": "An archived multiplayer RPG experiment useful for studying client navigation and server world replication.",
    "genres": [
      "action-rpg",
      "multiplayer"
    ],
    "runtime": "HTML5 Canvas / Node.js",
    "label": "No demo",
    "demoUrl": null,
    "demoKind": "none",
    "repoUrl": "https://github.com/mozilla/BrowserQuest",
    "projectUrl": "https://github.com/mozilla/BrowserQuest",
    "commit": "af32d247cac3495ca430d0effbb88dd5f3250b2c",
    "creator": "Little Workshop (Franck and Guillaume Lecollinet), Mozilla and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [
      "pixel-art",
      "fantasy"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "unknown",
    "demoNotes": "Maintainer repository homepage historically linked http://browserquest.mozilla.org/. HTTPS equivalent failed DNS resolution on 2026-09-10 at 17:34Z; no current playable destination verified.",
    "rights": {
      "code_license": "MPL-2.0",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/mozilla/BrowserQuest/blob/af32d247cac3495ca430d0effbb88dd5f3250b2c/LICENSE",
      "asset_status": "mixed",
      "asset_notes": "LICENSE separates MPL-2.0 code from CC-BY-SA-3.0 content; individual bundled third-party libraries still need review.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/mozilla/BrowserQuest/tree/af32d247cac3495ca430d0effbb88dd5f3250b2c",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "pathfinding",
      "networking"
    ],
    "buildingBlocks": [
      {
        "name": "Grid pathfinding adapter",
        "category": "pathfinding",
        "evidence_url": "https://github.com/mozilla/BrowserQuest/blob/af32d247cac3495ca430d0effbb88dd5f3250b2c/client/js/pathfinder.js",
        "source_path": "client/js/pathfinder.js",
        "status": "source_inspected",
        "notes": "Wraps AStar and collision-grid/entity handling; AMD and Class dependencies are legacy integration work."
      },
      {
        "name": "World replication and entity groups",
        "category": "networking",
        "evidence_url": "https://github.com/mozilla/BrowserQuest/blob/af32d247cac3495ca430d0effbb88dd5f3250b2c/server/js/worldserver.js",
        "source_path": "server/js/worldserver.js",
        "status": "source_inspected",
        "notes": "Entity groups, player queues and spawn/broadcast routing are present; server, shared protocol and map code form a substantial dependency scope."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/mozilla/BrowserQuest/tree/af32d247cac3495ca430d0effbb88dd5f3250b2c",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/mozilla/BrowserQuest/blob/af32d247cac3495ca430d0effbb88dd5f3250b2c/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/mozilla/BrowserQuest/blob/af32d247cac3495ca430d0effbb88dd5f3250b2c/LICENSE",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/mozilla/BrowserQuest/blob/af32d247cac3495ca430d0effbb88dd5f3250b2c/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/mozilla/BrowserQuest/blob/af32d247cac3495ca430d0effbb88dd5f3250b2c/client/js/pathfinder.js",
        "claim": "Grid pathfinding adapter entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/mozilla/BrowserQuest/blob/af32d247cac3495ca430d0effbb88dd5f3250b2c/server/js/worldserver.js",
        "claim": "World replication and entity groups entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "browserquest",
      "position": 47,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 9372,
    "popularity": {
      "repo_url": "https://github.com/mozilla/BrowserQuest",
      "stars": 9372,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/mozilla/BrowserQuest",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "cataclysm-dda",
    "title": "Cataclysm: Dark Days Ahead",
    "summary": "Turn-based survival sandbox with constrained crafting and data-driven world generation.",
    "genres": [
      "survival",
      "roguelike",
      "rpg",
      "crafting"
    ],
    "runtime": "Cataclysm native engine",
    "label": "Get game",
    "demoUrl": "https://cataclysmdda.org/releases/",
    "demoKind": "native-download",
    "repoUrl": "https://github.com/CleverRaven/Cataclysm-DDA",
    "projectUrl": "https://cataclysmdda.org/",
    "commit": "7b123884d93a9a8432d690d528698f6a907d5cce",
    "creator": "Cataclysm: Dark Days Ahead contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "tivasyk",
      "licenseExpression": "CC-BY-SA-3.0",
      "licenseUrls": [
        "https://creativecommons.org/licenses/by-sa/3.0/"
      ],
      "sourcePage": "https://commons.wikimedia.org/wiki/File:CDDA_0.A_screenshot_humvee.png",
      "licenseEvidenceUrl": "https://commons.wikimedia.org/w/index.php?title=File%3ACDDA+0.A+screenshot+humvee.png&oldid=1105531411",
      "captureDate": "2014-11-05",
      "versionRelation": "Historical image; relation to indexed source commit is unknown. Not a current build or play attestation.",
      "alt": "Cataclysm: Dark Days Ahead 0.A character beside a modified Humvee.",
      "sha256": "08891402a111738a0dc43f410b5ef784e37b7fed7faf6143a91c6fdb1f30f677",
      "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/0/00/CDDA_0.A_screenshot_humvee.png",
      "allowedUse": "Catalog display and redistributed original/thumbnail only with the listed attribution, license notices and applicable share-alike/source obligations. No endorsement implied.",
      "modifications": "Original image bytes retained unchanged; contact sheet scales an independent copy to fit, without content edits.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/design_flex_reviewer",
      "src": "assets/catalog/cataclysm-dda.png",
      "localSourcePath": "research/catalog/media/cataclysm-dda.png"
    },
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer distribution page or homepage entry point, not a browser game or proof that a release matches the inspected source commit. Native setup/content requirements apply.",
    "rights": {
      "code_license": "CC-BY-SA-3.0",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/CleverRaven/Cataclysm-DDA/blob/7b123884d93a9a8432d690d528698f6a907d5cce/LICENSE.txt",
      "asset_status": "mixed",
      "asset_notes": "The project applies CC-BY-SA-3.0 to code and content, not a conventional software license. LICENSE.txt names font and third-party code exceptions. Review selected tileset, sounds, dependencies and compatibility before reuse.",
      "scope_reuse_status": "review_required",
      "notes": "License summary identifies project terms, not blanket reuse clearance or any royalty agreement. Preserve notices; resolve selected files and transitive dependencies. See research/catalog/evidence/native-batch.json for actual batch timing; no individual timing was recorded."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/CleverRaven/Cataclysm-DDA/tree/7b123884d93a9a8432d690d528698f6a907d5cce",
    "platforms": [
      "Windows",
      "Linux",
      "macOS"
    ],
    "platformKind": "desktop",
    "capabilities": [
      "crafting",
      "procedural-generation"
    ],
    "buildingBlocks": [
      {
        "name": "Crafting constraints",
        "category": "crafting",
        "evidence_url": "https://github.com/CleverRaven/Cataclysm-DDA/blob/7b123884d93a9a8432d690d528698f6a907d5cce/src/crafting.cpp",
        "source_path": "src/crafting.cpp",
        "status": "source_inspected",
        "notes": "Crafting checks morale, lighting and character context against recipes; depends on inventory, skills and game messaging."
      },
      {
        "name": "Procedural map assembly",
        "category": "procedural-generation",
        "evidence_url": "https://github.com/CleverRaven/Cataclysm-DDA/blob/7b123884d93a9a8432d690d528698f6a907d5cce/src/mapgen.cpp",
        "source_path": "src/mapgen.cpp",
        "status": "source_inspected",
        "notes": "Map generation builds submaps and JSON-driven mapgen functions; coupled to coordinates, map buffers and world data."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/CleverRaven/Cataclysm-DDA/blob/7b123884d93a9a8432d690d528698f6a907d5cce/README.md",
        "claim": "Inspected maintainer description, distribution links and declared scope; no execution.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/CleverRaven/Cataclysm-DDA/blob/7b123884d93a9a8432d690d528698f6a907d5cce/LICENSE.txt",
        "claim": "Inspected license text and declared project terms; selected scope and exceptions require review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/CleverRaven/Cataclysm-DDA/blob/7b123884d93a9a8432d690d528698f6a907d5cce/src/crafting.cpp",
        "claim": "Crafting constraints: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/CleverRaven/Cataclysm-DDA/blob/7b123884d93a9a8432d690d528698f6a907d5cce/src/mapgen.cpp",
        "claim": "Procedural map assembly: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "cataclysm-dda",
      "position": 48,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 13113,
    "popularity": {
      "repo_url": "https://github.com/CleverRaven/Cataclysm-DDA",
      "stars": 13113,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/CleverRaven/Cataclysm-DDA",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "clumsy-bird",
    "title": "Clumsy Bird",
    "summary": "A melonJS bird-and-obstacle arcade example with explicit play-screen setup and entity collision behavior.",
    "genres": [
      "arcade",
      "endless-runner"
    ],
    "runtime": "melonJS",
    "label": "Play demo",
    "demoUrl": "https://ellisonleao.github.io/clumsy-bird/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/ellisonleao/clumsy-bird",
    "projectUrl": "https://ellisonleao.github.io/clumsy-bird/",
    "commit": "fae3d487d5102af29fb3f78431cbd45e9b83aed3",
    "creator": "ellisonleao and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [
      "pixel-art"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": null,
      "code_status": "unresolved",
      "code_evidence_url": "https://github.com/ellisonleao/clumsy-bird/blob/fae3d487d5102af29fb3f78431cbd45e9b83aed3/LICENSE.md",
      "asset_status": "unreviewed",
      "asset_notes": "Bird imagery and audio require separate origin/permission checks; do not infer original-game art permission from this repository license.",
      "scope_reuse_status": "review_required",
      "notes": "Inspected package.json declares MIT and links LICENSE, but the actual root LICENSE.md is GPL-3.0. These declarations conflict; resolve selected-file rights before extraction or labeling the whole project GPL/MIT."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/ellisonleao/clumsy-bird/tree/fae3d487d5102af29fb3f78431cbd45e9b83aed3",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "character-controller",
      "game-state"
    ],
    "buildingBlocks": [
      {
        "name": "Flap movement and obstacle entities",
        "category": "character-controller",
        "evidence_url": "https://github.com/ellisonleao/clumsy-bird/blob/fae3d487d5102af29fb3f78431cbd45e9b83aed3/js/entities/entities.js",
        "source_path": "js/entities/entities.js",
        "status": "source_inspected",
        "notes": "Bird animation, gravity and collision callbacks are present; art and melonJS lifecycle are coupled."
      },
      {
        "name": "Play-screen lifecycle",
        "category": "game-state",
        "evidence_url": "https://github.com/ellisonleao/clumsy-bird/blob/fae3d487d5102af29fb3f78431cbd45e9b83aed3/js/screens/play.js",
        "source_path": "js/screens/play.js",
        "status": "source_inspected",
        "notes": "Resets score, binds the flap action and creates scene objects; source uses legacy melonJS APIs."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/ellisonleao/clumsy-bird/tree/fae3d487d5102af29fb3f78431cbd45e9b83aed3",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/ellisonleao/clumsy-bird/blob/fae3d487d5102af29fb3f78431cbd45e9b83aed3/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/ellisonleao/clumsy-bird/blob/fae3d487d5102af29fb3f78431cbd45e9b83aed3/LICENSE.md",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/ellisonleao/clumsy-bird/blob/fae3d487d5102af29fb3f78431cbd45e9b83aed3/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/ellisonleao/clumsy-bird/blob/fae3d487d5102af29fb3f78431cbd45e9b83aed3/js/entities/entities.js",
        "claim": "Flap movement and obstacle entities entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/ellisonleao/clumsy-bird/blob/fae3d487d5102af29fb3f78431cbd45e9b83aed3/js/screens/play.js",
        "claim": "Play-screen lifecycle entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/ellisonleao/clumsy-bird/blob/fae3d487d5102af29fb3f78431cbd45e9b83aed3/package.json",
        "claim": "Package licenses array says MIT while root LICENSE.md says GPL-3.0; contradictory declarations block resolved code classification.",
        "kind": "license"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "clumsy-bird",
      "position": 49,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 1622,
    "popularity": {
      "repo_url": "https://github.com/ellisonleao/clumsy-bird",
      "stars": 1622,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/ellisonleao/clumsy-bird",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "dwellcraft",
    "title": "Dwellcraft",
    "summary": "A browser home-layout sandbox with furniture placement and local design saves.",
    "genres": [
      "sandbox",
      "building"
    ],
    "runtime": "Babylon.js",
    "label": "Play demo",
    "demoUrl": "https://dwellcraft.vercel.app/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/Ryan-fm/Dwellcraft",
    "projectUrl": "https://dwellcraft.vercel.app/",
    "commit": "5055fefac14f0fe7214c6cbb66853e62a2154a88",
    "creator": "Ryan-fm and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "@babylonjs/core ^9.0.0; react ^19.2.8",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": null,
      "code_status": "unresolved",
      "code_evidence_url": null,
      "asset_status": "unreviewed",
      "asset_notes": "ASSETS.md describes Poly Haven assets and separate font/UI licenses; no project-code license found. Concept art is not gameplay evidence.",
      "scope_reuse_status": "review_required",
      "notes": "No project-code license established; public source is not reuse permission."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/Ryan-fm/Dwellcraft/tree/5055fefac14f0fe7214c6cbb66853e62a2154a88",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "construction",
      "camera"
    ],
    "buildingBlocks": [
      {
        "name": "Furniture placement",
        "category": "construction",
        "evidence_url": "https://github.com/Ryan-fm/Dwellcraft/blob/5055fefac14f0fe7214c6cbb66853e62a2154a88/lib/placement.ts",
        "source_path": "lib/placement.ts",
        "status": "source_inspected",
        "notes": "Separating-axis overlap and placement validation depend on world assets/floors. No extraction or integration test."
      },
      {
        "name": "Planar walk camera",
        "category": "camera",
        "evidence_url": "https://github.com/Ryan-fm/Dwellcraft/blob/5055fefac14f0fe7214c6cbb66853e62a2154a88/lib/navigation.ts",
        "source_path": "lib/navigation.ts",
        "status": "source_inspected",
        "notes": "Babylon UniversalCamera subclass removes vertical motion and configures collision ellipsoid. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/Ryan-fm/Dwellcraft/tree/5055fefac14f0fe7214c6cbb66853e62a2154a88",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/Ryan-fm/Dwellcraft/blob/5055fefac14f0fe7214c6cbb66853e62a2154a88/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/Ryan-fm/Dwellcraft/blob/5055fefac14f0fe7214c6cbb66853e62a2154a88/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/Ryan-fm/Dwellcraft/blob/5055fefac14f0fe7214c6cbb66853e62a2154a88/lib/placement.ts",
        "claim": "Furniture placement entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/Ryan-fm/Dwellcraft/blob/5055fefac14f0fe7214c6cbb66853e62a2154a88/lib/navigation.ts",
        "claim": "Planar walk camera entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unverified",
      "models": [],
      "evidence": [],
      "notes": "This project appears in an Astra collection, but a creator statement establishing the exact model contribution has not been verified."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "dwellcraft",
      "position": 50,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 1,
    "popularity": {
      "repo_url": "https://github.com/Ryan-fm/Dwellcraft",
      "stars": 1,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/Ryan-fm/Dwellcraft",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "endless-sky",
    "title": "Endless Sky",
    "summary": "Space sandbox where trading, ship upgrades and autonomous fleets support open-ended play.",
    "genres": [
      "space",
      "exploration",
      "trading",
      "sandbox"
    ],
    "runtime": "Endless Sky / SDL / OpenGL",
    "label": "Get game",
    "demoUrl": "https://github.com/endless-sky/endless-sky/releases/latest",
    "demoKind": "native-download",
    "repoUrl": "https://github.com/endless-sky/endless-sky",
    "projectUrl": "https://endless-sky.github.io/",
    "commit": "88ec756f5d1868b3d8a024c9211011f6928bb9c0",
    "creator": "Michael Zahniser and Endless Sky contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "Endless Sky developers",
      "licenseExpression": "GPL-3.0-or-later",
      "licenseUrls": [
        "https://www.gnu.org/licenses/gpl-3.0.html"
      ],
      "sourcePage": "https://commons.wikimedia.org/wiki/File:Endless_Sky_0.9.12_title_screen.png",
      "licenseEvidenceUrl": "https://commons.wikimedia.org/w/index.php?title=File%3AEndless+Sky+0.9.12+title+screen.png&oldid=950568784",
      "captureDate": "2020-09-12",
      "versionRelation": "Historical image; relation to indexed source commit is unknown. Not a current build or play attestation.",
      "alt": "Endless Sky 0.9.12 title screen with a spacecraft and menu.",
      "sha256": "714296ffa5e172f621be9297376b3280a670fb709d20ffeebbd628fae6a82724",
      "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Endless_Sky_0.9.12_title_screen.png",
      "allowedUse": "Catalog display and redistributed original/thumbnail only with the listed attribution, license notices and applicable share-alike/source obligations. No endorsement implied.",
      "modifications": "Original image bytes retained unchanged; contact sheet scales an independent copy to fit, without content edits.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/design_flex_reviewer",
      "src": "assets/catalog/endless-sky.png",
      "localSourcePath": "research/catalog/media/endless-sky.png"
    },
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer distribution page or homepage entry point, not a browser game or proof that a release matches the inspected source commit. Native setup/content requirements apply.",
    "rights": {
      "code_license": "GPL-3.0-or-later",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/endless-sky/endless-sky/blob/88ec756f5d1868b3d8a024c9211011f6928bb9c0/license.txt",
      "asset_status": "mixed",
      "asset_notes": "copyright provides per-file art attribution and licenses including CC-BY-SA-4.0 and public-domain exceptions. Match selected image paths to the most specific entry; root GPL source licensing does not replace this audit.",
      "scope_reuse_status": "review_required",
      "notes": "License summary identifies project terms, not blanket reuse clearance or any royalty agreement. Preserve notices; resolve selected files and transitive dependencies. See research/catalog/evidence/native-batch.json for actual batch timing; no individual timing was recorded."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/endless-sky/endless-sky/tree/88ec756f5d1868b3d8a024c9211011f6928bb9c0",
    "platforms": [
      "Windows",
      "Linux",
      "macOS"
    ],
    "platformKind": "desktop",
    "capabilities": [
      "economy",
      "autonomous-agents"
    ],
    "buildingBlocks": [
      {
        "name": "Commodity trading interface and transactions",
        "category": "economy",
        "evidence_url": "https://github.com/endless-sky/endless-sky/blob/88ec756f5d1868b3d8a024c9211011f6928bb9c0/source/TradingPanel.cpp",
        "source_path": "source/TradingPanel.cpp",
        "status": "source_inspected",
        "notes": "TradingPanel buy/sell and display logic uses PlayerInfo cargo, credits and GameData interfaces; extract transaction rules separately from rendering."
      },
      {
        "name": "Fleet and ship orders",
        "category": "autonomous-agents",
        "evidence_url": "https://github.com/endless-sky/endless-sky/blob/88ec756f5d1868b3d8a024c9211011f6928bb9c0/source/AI.cpp",
        "source_path": "source/AI.cpp",
        "status": "source_inspected",
        "notes": "AI issues attack, follow and mining orders for ships and asteroids; tied to government relations, ship state and fleet order queues."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/endless-sky/endless-sky/blob/88ec756f5d1868b3d8a024c9211011f6928bb9c0/README.md",
        "claim": "Inspected maintainer description, distribution links and declared scope; no execution.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/endless-sky/endless-sky/blob/88ec756f5d1868b3d8a024c9211011f6928bb9c0/license.txt",
        "claim": "Inspected license text and declared project terms; selected scope and exceptions require review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/endless-sky/endless-sky/blob/88ec756f5d1868b3d8a024c9211011f6928bb9c0/source/TradingPanel.cpp",
        "claim": "Commodity trading interface and transactions: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/endless-sky/endless-sky/blob/88ec756f5d1868b3d8a024c9211011f6928bb9c0/source/AI.cpp",
        "claim": "Fleet and ship orders: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/endless-sky/endless-sky/blob/88ec756f5d1868b3d8a024c9211011f6928bb9c0/copyright",
        "claim": "Inspected artwork path/license map and named creator entries.",
        "kind": "license"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "endless-sky",
      "position": 51,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 7550,
    "popularity": {
      "repo_url": "https://github.com/endless-sky/endless-sky",
      "stars": 7550,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/endless-sky/endless-sky",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "toy2game-flip-match",
    "title": "Flip Match",
    "summary": "A turn-based memory matching game with animal and fruit pieces.",
    "genres": [
      "puzzle",
      "party"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://games.asmo.top/games/flip-match/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/asmoyou/toy2game",
    "projectUrl": "https://games.asmo.top/games/flip-match/",
    "commit": "39078515a13331a748e63bc75424ed83c773a72a",
    "creator": "asmoyou and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "boardgame.io ^0.50.2; three ^0.185.1",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "LicenseRef-Toy2Game-Noncommercial-1.0",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "Custom NONCOMMERCIAL source-available license; not OSI open source. Commercial use requires separate written permission; no such agreement established."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/asmoyou/toy2game/tree/39078515a13331a748e63bc75424ed83c773a72a",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "puzzle-rules",
      "save-system"
    ],
    "buildingBlocks": [
      {
        "name": "Memory-match rules",
        "category": "puzzle-rules",
        "evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/flip-match/src/rules.ts",
        "source_path": "games/flip-match/src/rules.ts",
        "status": "source_inspected",
        "notes": "Seeded deck, turn phases and limited-memory bot observations share MatchState. No extraction or integration test."
      },
      {
        "name": "Replay save storage",
        "category": "save-system",
        "evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/flip-match/src/storage.ts",
        "source_path": "games/flip-match/src/storage.ts",
        "status": "source_inspected",
        "notes": "localStorage adapter serializes versioned action replay; failures allow play without storage. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/asmoyou/toy2game/tree/39078515a13331a748e63bc75424ed83c773a72a",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/flip-match/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/flip-match/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/flip-match/src/rules.ts",
        "claim": "Memory-match rules entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/flip-match/src/storage.ts",
        "claim": "Replay save storage entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unverified",
      "models": [],
      "evidence": [],
      "notes": "This project appears in an Astra collection, but a creator statement establishing the exact model contribution has not been verified."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "toy2game-flip-match",
      "position": 52,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 4,
    "popularity": {
      "repo_url": "https://github.com/asmoyou/toy2game",
      "stars": 4,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/asmoyou/toy2game",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "fable5-fpv-drone",
    "title": "FPV AcroSim",
    "summary": "A browser drone-flight simulation with configurable controller and motor models.",
    "genres": [
      "simulation",
      "flight"
    ],
    "runtime": "Three.js",
    "label": "No demo",
    "demoUrl": null,
    "demoKind": "none",
    "repoUrl": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5",
    "projectUrl": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/tree/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/fpv-drone",
    "commit": "2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8",
    "creator": "hamzabellouch and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "demo",
    "dimension": "3d",
    "visualStyle": [
      "procedural"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "unknown",
    "demoNotes": "Runnable browser source is present; no hosted browser demo established and no upstream build executed.",
    "rights": {
      "code_license": null,
      "code_status": "unresolved",
      "code_evidence_url": null,
      "asset_status": "unreviewed",
      "asset_notes": "Vendored libraries and procedural/reference assets need separate scope review.",
      "scope_reuse_status": "review_required",
      "notes": "No project-code license established. README educational/research description is not a reuse grant."
    },
    "sourceInspectedAt": "2026-09-10T19:36:55Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/tree/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "flight-control",
      "physics"
    ],
    "buildingBlocks": [
      {
        "name": "Rate flight controller",
        "category": "flight-control",
        "evidence_url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/fpv-drone/src/sim/fc.js",
        "source_path": "fpv-drone/src/sim/fc.js",
        "status": "source_inspected",
        "notes": "PID, feedforward and mixing depend on body-axis and rate-unit conventions. No extraction or integration test."
      },
      {
        "name": "Motor and battery dynamics",
        "category": "physics",
        "evidence_url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/fpv-drone/src/sim/motor.js",
        "source_path": "fpv-drone/src/sim/motor.js",
        "status": "source_inspected",
        "notes": "Motor model couples voltage, prop coefficients and airflow; realism claims remain unvalidated. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/tree/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8",
        "claim": "Repository identity and immutable source tree retrieved; no execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/README.md",
        "kind": "readme",
        "claim": "Creator description/model attribution inspected."
      },
      {
        "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/fpv-drone/README.md",
        "kind": "readme",
        "claim": "Declared subproject behavior and static implementation entry points inspected."
      },
      {
        "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/fpv-drone/src/sim/fc.js",
        "kind": "source",
        "claim": "Declared subproject behavior and static implementation entry points inspected."
      },
      {
        "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/fpv-drone/src/sim/motor.js",
        "kind": "source",
        "claim": "Declared subproject behavior and static implementation entry points inspected."
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "Fable 5"
      ],
      "evidence": [
        {
          "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/README.md",
          "claim": "Maintainer states repository prototypes were generated using Fable 5 and explicitly maps this subproject in the directory table."
        }
      ],
      "notes": "Repository-wide creator statement covers this listed prototype. No independent model certification, exclusive authorship, flight realism or performance validation."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "fable5-fpv-drone",
      "position": 53,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 4,
    "popularity": {
      "repo_url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5",
      "stars": 4,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/hamzabellouch/Build-with-anthropic-fable-5",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "freeciv",
    "title": "Freeciv",
    "summary": "Empire-building strategy with turn-based city production and movement planning.",
    "genres": [
      "4x",
      "turn-based-strategy",
      "builder",
      "economy"
    ],
    "runtime": "Freeciv native engine",
    "label": "Get game",
    "demoUrl": "https://www.freeciv.org/",
    "demoKind": "native-download",
    "repoUrl": "https://github.com/freeciv/freeciv",
    "projectUrl": "https://www.freeciv.org/",
    "commit": "61db53503f9243aca417848a72864be69635235e",
    "creator": "Freeciv Project contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer distribution page or homepage entry point, not a browser game or proof that a release matches the inspected source commit. Native setup/content requirements apply.",
    "rights": {
      "code_license": "GPL-2.0-or-later",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/freeciv/freeciv/blob/61db53503f9243aca417848a72864be69635235e/COPYING",
      "asset_status": "unreviewed",
      "asset_notes": "Root COPYING and selected source headers inspected; tileset, flag, sound and ruleset licenses were not independently scoped in this batch. Do not transfer the code license to all visual content.",
      "scope_reuse_status": "review_required",
      "notes": "License summary identifies project terms, not blanket reuse clearance or any royalty agreement. Preserve notices; resolve selected files and transitive dependencies. See research/catalog/evidence/native-batch.json for actual batch timing; no individual timing was recorded."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/freeciv/freeciv/tree/61db53503f9243aca417848a72864be69635235e",
    "platforms": [],
    "platformKind": "desktop",
    "capabilities": [
      "economy",
      "pathfinding"
    ],
    "buildingBlocks": [
      {
        "name": "City turn and production processing",
        "category": "economy",
        "evidence_url": "https://github.com/freeciv/freeciv/blob/61db53503f9243aca417848a72864be69635235e/server/cityturn.c",
        "source_path": "server/cityturn.c",
        "status": "source_inspected",
        "notes": "City turn code manages food/population and building/unit production using server and ruleset state; not a frontend-ready simulation library."
      },
      {
        "name": "Movement-cost route planning",
        "category": "pathfinding",
        "evidence_url": "https://github.com/freeciv/freeciv/blob/61db53503f9243aca417848a72864be69635235e/common/aicore/path_finding.c",
        "source_path": "common/aicore/path_finding.c",
        "status": "source_inspected",
        "notes": "Pathfinder differentiates ordinary, danger and fuel routes with movement and zone-of-control costs; requires Freeciv map/unit callbacks."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/freeciv/freeciv/blob/61db53503f9243aca417848a72864be69635235e/README.md",
        "claim": "Inspected maintainer description, distribution links and declared scope; no execution.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/freeciv/freeciv/blob/61db53503f9243aca417848a72864be69635235e/COPYING",
        "claim": "Inspected license text and declared project terms; selected scope and exceptions require review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/freeciv/freeciv/blob/61db53503f9243aca417848a72864be69635235e/server/cityturn.c",
        "claim": "City turn and production processing: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/freeciv/freeciv/blob/61db53503f9243aca417848a72864be69635235e/common/aicore/path_finding.c",
        "claim": "Movement-cost route planning: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "freeciv",
      "position": 54,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 1591,
    "popularity": {
      "repo_url": "https://github.com/freeciv/freeciv",
      "stars": 1591,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/freeciv/freeciv",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "freecol",
    "title": "FreeCol",
    "summary": "Colonization strategy with worker allocation, production chains and unit movement costs.",
    "genres": [
      "turn-based-strategy",
      "colony-management",
      "economy",
      "builder"
    ],
    "runtime": "JVM / FreeCol",
    "label": "Get game",
    "demoUrl": "https://github.com/FreeCol/freecol/releases",
    "demoKind": "native-download",
    "repoUrl": "https://github.com/FreeCol/freecol",
    "projectUrl": "https://www.freecol.org/",
    "commit": "e45ac6fd9592c8f032b2686658f63447c115d9d7",
    "creator": "FreeCol Team",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer distribution page or homepage entry point, not a browser game or proof that a release matches the inspected source commit. Native setup/content requirements apply.",
    "rights": {
      "code_license": "GPL-2.0-or-later",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/FreeCol/freecol/blob/e45ac6fd9592c8f032b2686658f63447c115d9d7/LICENSE",
      "asset_status": "mixed",
      "asset_notes": "Selected source headers allow GPL-2.0-or-later. README says most media GPLv2 and some CC-BY-4.0; directory README files must establish exact selected art, music and sound terms.",
      "scope_reuse_status": "review_required",
      "notes": "License summary identifies project terms, not blanket reuse clearance or any royalty agreement. Preserve notices; resolve selected files and transitive dependencies. See research/catalog/evidence/native-batch.json for actual batch timing; no individual timing was recorded."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/FreeCol/freecol/tree/e45ac6fd9592c8f032b2686658f63447c115d9d7",
    "platforms": [
      "Windows",
      "Linux",
      "macOS"
    ],
    "platformKind": "desktop",
    "capabilities": [
      "economy",
      "pathfinding"
    ],
    "buildingBlocks": [
      {
        "name": "Colony goods and worker production",
        "category": "economy",
        "evidence_url": "https://github.com/FreeCol/freecol/blob/e45ac6fd9592c8f032b2686658f63447c115d9d7/src/net/sf/freecol/common/model/Colony.java",
        "source_path": "src/net/sf/freecol/common/model/Colony.java",
        "status": "source_inspected",
        "notes": "Colony chooses work types against required goods and cached production; coupled to goods definitions, workers, buildings and game specification."
      },
      {
        "name": "Unit movement costs and routing context",
        "category": "pathfinding",
        "evidence_url": "https://github.com/FreeCol/freecol/blob/e45ac6fd9592c8f032b2686658f63447c115d9d7/src/net/sf/freecol/common/model/Unit.java",
        "source_path": "src/net/sf/freecol/common/model/Unit.java",
        "status": "source_inspected",
        "notes": "Unit movement costs consider terrain, roads, naval state and turn allowance; requires map and settlement models."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/FreeCol/freecol/blob/e45ac6fd9592c8f032b2686658f63447c115d9d7/README.md",
        "claim": "Inspected maintainer description, distribution links and declared scope; no execution.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/FreeCol/freecol/blob/e45ac6fd9592c8f032b2686658f63447c115d9d7/LICENSE",
        "claim": "Inspected license text and declared project terms; selected scope and exceptions require review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/FreeCol/freecol/blob/e45ac6fd9592c8f032b2686658f63447c115d9d7/src/net/sf/freecol/common/model/Colony.java",
        "claim": "Colony goods and worker production: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/FreeCol/freecol/blob/e45ac6fd9592c8f032b2686658f63447c115d9d7/src/net/sf/freecol/common/model/Unit.java",
        "claim": "Unit movement costs and routing context: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "freecol",
      "position": 55,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 711,
    "popularity": {
      "repo_url": "https://github.com/FreeCol/freecol",
      "stars": 711,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/FreeCol/freecol",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "toy2game-frog-feast",
    "title": "Frog Feast",
    "summary": "A simultaneous tabletop race to collect beans with frogs.",
    "genres": [
      "party",
      "arcade"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://games.asmo.top/games/frog-feast/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/asmoyou/toy2game",
    "projectUrl": "https://games.asmo.top/games/frog-feast/",
    "commit": "39078515a13331a748e63bc75424ed83c773a72a",
    "creator": "asmoyou and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "cannon-es ^0.20.0; three ^0.185.1",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "LicenseRef-Toy2Game-Noncommercial-1.0",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "Custom NONCOMMERCIAL source-available license; not OSI open source. Commercial use requires separate written permission; no such agreement established."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/asmoyou/toy2game/tree/39078515a13331a748e63bc75424ed83c773a72a",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "game-loop",
      "physics"
    ],
    "buildingBlocks": [
      {
        "name": "Simultaneous frog round",
        "category": "game-loop",
        "evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/frog-feast/src/game.ts",
        "source_path": "games/frog-feast/src/game.ts",
        "status": "source_inspected",
        "notes": "FrogGame controls countdown, held inputs, bots and score with fixed-step physics. No extraction or integration test."
      },
      {
        "name": "Bean collection physics",
        "category": "physics",
        "evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/frog-feast/src/physics.ts",
        "source_path": "games/frog-feast/src/physics.ts",
        "status": "source_inspected",
        "notes": "Cannon bodies use a planar bowl approximation and configured mouth poses. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/asmoyou/toy2game/tree/39078515a13331a748e63bc75424ed83c773a72a",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/frog-feast/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/frog-feast/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/frog-feast/src/game.ts",
        "claim": "Simultaneous frog round entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/frog-feast/src/physics.ts",
        "claim": "Bean collection physics entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unverified",
      "models": [],
      "evidence": [],
      "notes": "This project appears in an Astra collection, but a creator statement establishing the exact model contribution has not been verified."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "toy2game-frog-feast",
      "position": 56,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 4,
    "popularity": {
      "repo_url": "https://github.com/asmoyou/toy2game",
      "stars": 4,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/asmoyou/toy2game",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "gather-it",
    "title": "Gather It",
    "summary": "A small Unity resource-collection game organized around autonomous workers and purchasable upgrades.",
    "genres": [
      "resource-management",
      "automation",
      "simulation"
    ],
    "runtime": "Unity",
    "label": "Play demo",
    "demoUrl": "https://tweeres04.github.io/gather-it/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/tweeres04/gather-it",
    "projectUrl": "https://github.com/tweeres04/gather-it",
    "commit": "8c74a133c9a2cb98a4bfb53eacafe751a0453286",
    "creator": "tweeres04 and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "minimal",
      "stylized"
    ],
    "runtimeVersion": "2020.2.3f1",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": null,
      "code_status": "unresolved",
      "code_evidence_url": null,
      "asset_status": "unreviewed",
      "asset_notes": "No root code license was found in the pinned repository tree; source visibility does not grant extraction permission.",
      "scope_reuse_status": "review_required",
      "notes": "Pinned tree has no discovered root LICENSE/COPYING. Do not extract source without resolved permission."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/tweeres04/gather-it/tree/8c74a133c9a2cb98a4bfb53eacafe751a0453286",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "autonomous-workers",
      "economy"
    ],
    "buildingBlocks": [
      {
        "name": "Worker resource loop",
        "category": "autonomous-workers",
        "evidence_url": "https://github.com/tweeres04/gather-it/blob/8c74a133c9a2cb98a4bfb53eacafe751a0453286/Assets/Worker.cs",
        "source_path": "Assets/Worker.cs",
        "status": "source_inspected",
        "notes": "Idle, travel, gather and deliver states are explicit; depends on Unity scene tags, transforms and resource objects."
      },
      {
        "name": "Shop and base placement",
        "category": "economy",
        "evidence_url": "https://github.com/tweeres04/gather-it/blob/8c74a133c9a2cb98a4bfb53eacafe751a0453286/Assets/Shop.cs",
        "source_path": "Assets/Shop.cs",
        "status": "source_inspected",
        "notes": "Worker/base prices, prefabs and placement state are present; scene and input coupling preclude direct Three.js reuse."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/tweeres04/gather-it/tree/8c74a133c9a2cb98a4bfb53eacafe751a0453286",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/tweeres04/gather-it/blob/8c74a133c9a2cb98a4bfb53eacafe751a0453286/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/tweeres04/gather-it/blob/8c74a133c9a2cb98a4bfb53eacafe751a0453286/Assets/Worker.cs",
        "claim": "Worker resource loop entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/tweeres04/gather-it/blob/8c74a133c9a2cb98a4bfb53eacafe751a0453286/Assets/Shop.cs",
        "claim": "Shop and base placement entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/tweeres04/gather-it/blob/8c74a133c9a2cb98a4bfb53eacafe751a0453286/ProjectSettings/ProjectVersion.txt",
        "claim": "Unity editor version inspected.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "gather-it",
      "position": 57,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 1,
    "popularity": {
      "repo_url": "https://github.com/tweeres04/gather-it",
      "stars": 1,
      "status": "available",
      "checked_at": "2026-09-10T19:48:26Z",
      "evidence_url": "https://api.github.com/repos/tweeres04/gather-it",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "hextris",
    "title": "Hextris",
    "summary": "A rotating-hexagon puzzle game with adjacent-color matching and escalating block waves.",
    "genres": [
      "puzzle",
      "arcade"
    ],
    "runtime": "HTML5 Canvas",
    "label": "Play demo",
    "demoUrl": "https://hextris.github.io/hextris",
    "demoKind": "browser",
    "repoUrl": "https://github.com/Hextris/hextris",
    "projectUrl": "https://hextris.io",
    "commit": "3f4847dc8fd7dab3d1c87e6324b9159d92fbd396",
    "creator": "Logan Engstrom, Garrett Finucane, Noah Moroze, Michael Yang and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [
      "geometric",
      "flat-color"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "GPL-3.0-or-later",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/Hextris/hextris/blob/3f4847dc8fd7dab3d1c87e6324b9159d92fbd396/LICENSE.md",
      "asset_status": "unreviewed",
      "asset_notes": "Fonts, sounds and image rights not independently cleared; GPL README and license inspected.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/Hextris/hextris/tree/3f4847dc8fd7dab3d1c87e6324b9159d92fbd396",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "puzzle-rules",
      "spawn-system"
    ],
    "buildingBlocks": [
      {
        "name": "Adjacent-color matching",
        "category": "puzzle-rules",
        "evidence_url": "https://github.com/Hextris/hextris/blob/3f4847dc8fd7dab3d1c87e6324b9159d92fbd396/js/checking.js",
        "source_path": "js/checking.js",
        "status": "source_inspected",
        "notes": "Flood-fill and consolidation inspect neighbor blocks around hexagonal sides; depends on Hex block layout and global settings."
      },
      {
        "name": "Wave difficulty progression",
        "category": "spawn-system",
        "evidence_url": "https://github.com/Hextris/hextris/blob/3f4847dc8fd7dab3d1c87e6324b9159d92fbd396/js/wavegen.js",
        "source_path": "js/wavegen.js",
        "status": "source_inspected",
        "notes": "Spawn intervals and difficulty change after block destruction; global game clock/settings require an adapter."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/Hextris/hextris/tree/3f4847dc8fd7dab3d1c87e6324b9159d92fbd396",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/Hextris/hextris/blob/3f4847dc8fd7dab3d1c87e6324b9159d92fbd396/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/Hextris/hextris/blob/3f4847dc8fd7dab3d1c87e6324b9159d92fbd396/LICENSE.md",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/Hextris/hextris/blob/3f4847dc8fd7dab3d1c87e6324b9159d92fbd396/js/checking.js",
        "claim": "Adjacent-color matching entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/Hextris/hextris/blob/3f4847dc8fd7dab3d1c87e6324b9159d92fbd396/js/wavegen.js",
        "claim": "Wave difficulty progression entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "hextris",
      "position": 58,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 2435,
    "popularity": {
      "repo_url": "https://github.com/Hextris/hextris",
      "stars": 2435,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/Hextris/hextris",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "openai-sites-hollowflux",
    "title": "Hollowflux",
    "summary": "A small browser action RPG with code-drawn 2D art and water-driven navigation and combat.",
    "genres": [
      "action-rpg",
      "adventure"
    ],
    "runtime": "Browser",
    "label": "Play demo",
    "demoUrl": "https://tideglass-drowned-vein.openai.chatgpt.site/",
    "demoKind": "browser",
    "repoUrl": "https://developers.openai.com/showcase/hollowflux",
    "projectUrl": "https://developers.openai.com/showcase/hollowflux",
    "commit": null,
    "creator": "Thomas Ricouard / OpenAI",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [
      "pixel-art",
      "procedural",
      "fantasy"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "declared",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Official OpenAI showcase links this live Sites deployment. HeadStart has not yet completed an independent gameplay session or compatibility test.",
    "rights": {
      "code_license": null,
      "code_status": "unresolved",
      "code_evidence_url": null,
      "asset_status": "unreviewed",
      "asset_notes": "The official gameplay image has a narrow user-directed local catalog-display record; OpenAI does not provide an image reuse license or clear the depicted game assets on the inspected pages.",
      "scope_reuse_status": "review_required",
      "notes": "No public source repository, source revision or code license is linked from the inspected official pages. Treat as a playable reference only: no source export, code reuse or asset reuse is authorized."
    },
    "sourceInspectedAt": "2026-09-10T21:30:00Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "no_public_source",
    "pinnedSourceUrl": null,
    "platforms": [
      "browser",
      "Sites"
    ],
    "platformKind": "browser",
    "capabilities": [
      "sites-hosted",
      "water",
      "combat",
      "movement"
    ],
    "buildingBlocks": [
      {
        "name": "Reactive water simulation",
        "category": "world-simulation",
        "evidence_url": "https://developers.openai.com/blog/how-to-build-games-with-astra",
        "source_path": null,
        "status": "maintainer_described",
        "notes": "The author describes flowing water that pushes the player and enemies and reacts to electricity. This is an editorial discovery lead from official descriptions, not inspected or reusable source."
      },
      {
        "name": "Action RPG encounter loop",
        "category": "combat",
        "evidence_url": "https://developers.openai.com/showcase/hollowflux",
        "source_path": null,
        "status": "maintainer_described",
        "notes": "The official showcase describes melee combat, water interactions and progression through a drowned world. This is an editorial discovery lead from official descriptions, not inspected or reusable source."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://developers.openai.com/showcase/hollowflux",
        "claim": "Official showcase establishes the project title, creator, GPT-6 Astra attribution and live deployment; it does not link a public source repository.",
        "kind": "official-docs"
      },
      {
        "url": "https://developers.openai.com/blog/how-to-build-games-with-astra",
        "claim": "Author article describes the game and its implementation at a high level and links the official gameplay image. No public source tree or immutable revision is provided.",
        "kind": "official-docs"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 Astra"
      ],
      "evidence": [
        {
          "url": "https://developers.openai.com/showcase/hollowflux",
          "claim": "Official OpenAI showcase labels the project GPT-6 Astra and credits Thomas Ricouard, OpenAI."
        },
        {
          "url": "https://developers.openai.com/blog/how-to-build-games-with-astra",
          "claim": "Thomas Ricouard states that he used Astra in Codex to build Void Explorer and presents Sunwake and Hollowflux as the two subsequent complete-game prototypes in the same Astra game-building article."
        }
      ],
      "notes": "Official creator/publisher attribution. It does not establish exclusive model authorship, source availability, reuse permission, integration readiness or game quality."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "openai-sites-hollowflux",
      "position": 59,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": null,
    "popularity": {
      "repo_url": "https://developers.openai.com/showcase/hollowflux",
      "stars": null,
      "status": "not_github",
      "checked_at": "2026-09-10T21:30:00Z",
      "evidence_url": "https://developers.openai.com/showcase/hollowflux",
      "notes": "This is an official OpenAI showcase page, not a public GitHub repository; GitHub stars and source availability do not apply."
    }
  },
  {
    "id": "fable5-plane-game",
    "title": "Horizons Flight Simulator",
    "summary": "A browser aircraft simulation with multiple airframes and camera modes.",
    "genres": [
      "simulation",
      "flight"
    ],
    "runtime": "Three.js",
    "label": "No demo",
    "demoUrl": null,
    "demoKind": "none",
    "repoUrl": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5",
    "projectUrl": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/tree/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/plane-game",
    "commit": "2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8",
    "creator": "hamzabellouch and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "demo",
    "dimension": "3d",
    "visualStyle": [
      "procedural"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "unknown",
    "demoNotes": "Runnable browser source is present; no hosted browser demo established and no upstream build executed.",
    "rights": {
      "code_license": null,
      "code_status": "unresolved",
      "code_evidence_url": null,
      "asset_status": "unreviewed",
      "asset_notes": "Vendored libraries and procedural/reference assets need separate scope review.",
      "scope_reuse_status": "review_required",
      "notes": "No project-code license established. README educational/research description is not a reuse grant."
    },
    "sourceInspectedAt": "2026-09-10T19:36:55Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/tree/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "physics",
      "camera"
    ],
    "buildingBlocks": [
      {
        "name": "Airframe dynamics",
        "category": "physics",
        "evidence_url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/plane-game/src/physics.js",
        "source_path": "plane-game/src/physics.js",
        "status": "source_inspected",
        "notes": "ISA atmosphere and force calculations share aircraft parameters and body/world axis conventions. No extraction or integration test."
      },
      {
        "name": "Flight camera rig",
        "category": "camera",
        "evidence_url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/plane-game/src/cameras.js",
        "source_path": "plane-game/src/cameras.js",
        "status": "source_inspected",
        "notes": "Chase, cockpit, orbit and flyby depend on terrain height and aircraft state; event-listener cleanup needs review. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/tree/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8",
        "claim": "Repository identity and immutable source tree retrieved; no execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/README.md",
        "kind": "readme",
        "claim": "Creator description/model attribution inspected."
      },
      {
        "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/plane-game/README.md",
        "kind": "readme",
        "claim": "Declared subproject behavior and static implementation entry points inspected."
      },
      {
        "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/plane-game/src/physics.js",
        "kind": "source",
        "claim": "Declared subproject behavior and static implementation entry points inspected."
      },
      {
        "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/plane-game/src/cameras.js",
        "kind": "source",
        "claim": "Declared subproject behavior and static implementation entry points inspected."
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "Fable 5"
      ],
      "evidence": [
        {
          "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/README.md",
          "claim": "Maintainer states repository prototypes were generated using Fable 5 and explicitly maps this subproject in the directory table."
        }
      ],
      "notes": "Repository-wide creator statement covers this listed prototype. No independent model certification, exclusive authorship, flight realism or performance validation."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "fable5-plane-game",
      "position": 60,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 4,
    "popularity": {
      "repo_url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5",
      "stars": 4,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/hamzabellouch/Build-with-anthropic-fable-5",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "philolabs-kyoto-higashiyama-gpt-astra",
    "title": "Kyoto Higashiyama — Astra",
    "summary": "A procedural Three.js walkable urban scene with authored place-specific geometry.",
    "genres": [
      "simulation",
      "exploration"
    ],
    "runtime": "Three.js",
    "label": "Watch video",
    "demoUrl": "https://raw.githubusercontent.com/PhiloLabs/fable51-worlds/d24028466530a15d58d3d94537e6317b84101589/kyoto-higashiyama-gpt-astra/media/fable51-vs-gpt6-astra-kyoto.mp4",
    "demoKind": "video",
    "repoUrl": "https://github.com/PhiloLabs/fable51-worlds",
    "projectUrl": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589/kyoto-higashiyama-gpt-astra",
    "commit": "d24028466530a15d58d3d94537e6317b84101589",
    "creator": "PhiloLabs and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "demo",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "three 0.180.0",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository declares MIT code/generated assets, with OSM ODbL and other geodata/reference obligations. Brands and recognizable fictional spacecraft/scenes need separate scope review; no blanket asset clearance.",
      "scope_reuse_status": "review_required",
      "notes": "Code license inspected; selected files, transitive dependencies and assets still require scope review."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "movement",
      "procedural-generation"
    ],
    "buildingBlocks": [
      {
        "name": "Planar Kyoto walker",
        "category": "movement",
        "evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/kyoto-higashiyama-gpt-astra/src/core/player.js",
        "source_path": "kyoto-higashiyama-gpt-astra/src/core/player.js",
        "status": "source_inspected",
        "notes": "Player relies on world heightAt and collider bounds; step and eye-height conventions matter. No extraction or integration test."
      },
      {
        "name": "Batched townhouse geometry",
        "category": "procedural-generation",
        "evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/kyoto-higashiyama-gpt-astra/src/world/machiya.js",
        "source_path": "kyoto-higashiyama-gpt-astra/src/world/machiya.js",
        "status": "source_inspected",
        "notes": "Cached geometry/materials combine roofs, signs and local prop builders. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/kyoto-higashiyama-gpt-astra/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/kyoto-higashiyama-gpt-astra/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/README.md",
        "claim": "Model attribution evidence inspected; exact contribution remains bounded in ai_provenance notes.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/kyoto-higashiyama-gpt-astra/src/core/player.js",
        "claim": "Planar Kyoto walker entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/kyoto-higashiyama-gpt-astra/src/world/machiya.js",
        "claim": "Batched townhouse geometry entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 Astra"
      ],
      "evidence": [
        {
          "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/README.md",
          "claim": "Creator-facing repository description, development record or linked author post attributes this represented work to GPT-6 Astra."
        }
      ],
      "notes": "Creator attribution describes development participation, not model certification, exclusive authorship or measured performance. Compared scenes are separate subprojects; one-shot is a creator workflow claim. Kyoto Astra documents source influence from Sakura Crossing and camera-comparison mismatches."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "philolabs-kyoto-higashiyama-gpt-astra",
      "position": 61,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 477,
    "popularity": {
      "repo_url": "https://github.com/PhiloLabs/fable51-worlds",
      "stars": 477,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/PhiloLabs/fable51-worlds",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "philolabs-kyoto-higashiyama",
    "title": "Kyoto Higashiyama — Fable 5.1",
    "summary": "A procedural Three.js walkable urban scene with authored place-specific geometry.",
    "genres": [
      "simulation",
      "exploration"
    ],
    "runtime": "Three.js",
    "label": "Watch video",
    "demoUrl": "https://raw.githubusercontent.com/PhiloLabs/fable51-worlds/d24028466530a15d58d3d94537e6317b84101589/kyoto-higashiyama/media/kyoto-higashiyama-walkthrough.mp4",
    "demoKind": "video",
    "repoUrl": "https://github.com/PhiloLabs/fable51-worlds",
    "projectUrl": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589/kyoto-higashiyama",
    "commit": "d24028466530a15d58d3d94537e6317b84101589",
    "creator": "PhiloLabs and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "demo",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "three ^0.180.0",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository declares MIT code/generated assets, with OSM ODbL and other geodata/reference obligations. Brands and recognizable fictional spacecraft/scenes need separate scope review; no blanket asset clearance.",
      "scope_reuse_status": "review_required",
      "notes": "Code license inspected; selected files, transitive dependencies and assets still require scope review."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "movement",
      "procedural-generation"
    ],
    "buildingBlocks": [
      {
        "name": "Terrain walker",
        "category": "movement",
        "evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/kyoto-higashiyama/src/core/player.js",
        "source_path": "kyoto-higashiyama/src/core/player.js",
        "status": "source_inspected",
        "notes": "Axis-separated collisions and height queries require matching world collider dimensions. No extraction or integration test."
      },
      {
        "name": "Machiya generator",
        "category": "procedural-generation",
        "evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/kyoto-higashiyama/src/kit/machiya.js",
        "source_path": "kyoto-higashiyama/src/kit/machiya.js",
        "status": "source_inspected",
        "notes": "Traditional building kit imports roof, texture, palette and baked-geometry helpers. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/kyoto-higashiyama/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/kyoto-higashiyama/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/README.md",
        "claim": "Model attribution evidence inspected; exact contribution remains bounded in ai_provenance notes.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/kyoto-higashiyama/src/core/player.js",
        "claim": "Terrain walker entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/kyoto-higashiyama/src/kit/machiya.js",
        "claim": "Machiya generator entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "Fable 5.1"
      ],
      "evidence": [
        {
          "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/README.md",
          "claim": "Creator-facing repository description, development record or linked author post attributes this represented work to Claude Fable 5.1."
        }
      ],
      "notes": "Creator attribution describes development participation, not model certification, exclusive authorship or measured performance. Compared scenes are separate subprojects; one-shot is a creator workflow claim. Kyoto Astra documents source influence from Sakura Crossing and camera-comparison mismatches."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "philolabs-kyoto-higashiyama",
      "position": 62,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 477,
    "popularity": {
      "repo_url": "https://github.com/PhiloLabs/fable51-worlds",
      "stars": 477,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/PhiloLabs/fable51-worlds",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "luanti",
    "title": "Luanti (formerly Minetest)",
    "summary": "Voxel engine and modding platform, useful for terrain and grid-navigation references rather than a self-contained curated game.",
    "genres": [
      "sandbox",
      "builder",
      "exploration"
    ],
    "runtime": "Luanti",
    "label": "Get game",
    "demoUrl": "https://www.luanti.org/",
    "demoKind": "native-download",
    "repoUrl": "https://github.com/luanti-org/luanti",
    "projectUrl": "https://www.luanti.org/",
    "commit": "c5ba5f754af552a3451f1ded86955d393de82c29",
    "creator": "Perttu Ahola and Luanti contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "Perttu \"celeron55\" Ahola, Vanessa Ezekowitz, et.al",
      "licenseExpression": "CC-BY-SA-3.0",
      "licenseUrls": [
        "https://creativecommons.org/licenses/by-sa/3.0/"
      ],
      "sourcePage": "https://commons.wikimedia.org/wiki/File:Minetest_screenshot.png",
      "licenseEvidenceUrl": "https://commons.wikimedia.org/w/index.php?title=File%3AMinetest+screenshot.png&oldid=1177730923",
      "captureDate": "2012-09-08 16:39:08",
      "versionRelation": "Historical image; relation to indexed source commit is unknown. Not a current build or play attestation.",
      "alt": "Historical Minetest terrain with block-built mountains, vegetation and water.",
      "sha256": "4219503502360f80c8e75186aa7e250894a99a87487f87d5edec4a48b722ecb3",
      "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/6/62/Minetest_screenshot.png",
      "allowedUse": "Catalog display and redistributed original/thumbnail only with the listed attribution, license notices and applicable share-alike/source obligations. No endorsement implied.",
      "modifications": "Original image bytes retained unchanged; contact sheet scales an independent copy to fit, without content edits.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/design_flex_reviewer",
      "src": "assets/catalog/luanti.png",
      "localSourcePath": "research/catalog/media/luanti.png"
    },
    "contentKind": "engine",
    "dimension": "3d",
    "visualStyle": [
      "voxel"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer distribution page or homepage entry point, not a browser game or proof that a release matches the inspected source commit. Native setup/content requirements apply.",
    "rights": {
      "code_license": "LGPL-2.1-or-later",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/luanti-org/luanti/blob/c5ba5f754af552a3451f1ded86955d393de82c29/LICENSE.txt",
      "asset_status": "mixed",
      "asset_notes": "LICENSE.txt separates core texture/sound CC-BY-SA-3.0 from named CC-BY-SA-4.0, CC-BY-4.0 and Apache exceptions; fonts have other terms. Games and mods are separate content, not covered automatically by engine licensing.",
      "scope_reuse_status": "review_required",
      "notes": "License summary identifies project terms, not blanket reuse clearance or any royalty agreement. Preserve notices; resolve selected files and transitive dependencies. See research/catalog/evidence/native-batch.json for actual batch timing; no individual timing was recorded."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/luanti-org/luanti/tree/c5ba5f754af552a3451f1ded86955d393de82c29",
    "platforms": [
      "Windows",
      "Linux",
      "macOS"
    ],
    "platformKind": "desktop",
    "capabilities": [
      "procedural-generation",
      "pathfinding"
    ],
    "buildingBlocks": [
      {
        "name": "Noise-based voxel terrain",
        "category": "procedural-generation",
        "evidence_url": "https://github.com/luanti-org/luanti/blob/c5ba5f754af552a3451f1ded86955d393de82c29/src/mapgen/mapgen_v7.cpp",
        "source_path": "src/mapgen/mapgen_v7.cpp",
        "status": "source_inspected",
        "notes": "MapgenV7 configures cave, mountain and floatland noise plus voxel emergence dependencies; seed behavior has not been tested."
      },
      {
        "name": "Voxel pathfinding",
        "category": "pathfinding",
        "evidence_url": "https://github.com/luanti-org/luanti/blob/c5ba5f754af552a3451f1ded86955d393de82c29/src/pathfinder.cpp",
        "source_path": "src/pathfinder.cpp",
        "status": "source_inspected",
        "notes": "Pathfinder uses map nodes, walkability and A* cost state; requires Luanti node definitions and map access."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/luanti-org/luanti/blob/c5ba5f754af552a3451f1ded86955d393de82c29/README.md",
        "claim": "Inspected maintainer description, distribution links and declared scope; no execution.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/luanti-org/luanti/blob/c5ba5f754af552a3451f1ded86955d393de82c29/LICENSE.txt",
        "claim": "Inspected license text and declared project terms; selected scope and exceptions require review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/luanti-org/luanti/blob/c5ba5f754af552a3451f1ded86955d393de82c29/src/mapgen/mapgen_v7.cpp",
        "claim": "Noise-based voxel terrain: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/luanti-org/luanti/blob/c5ba5f754af552a3451f1ded86955d393de82c29/src/pathfinder.cpp",
        "claim": "Voxel pathfinding: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "luanti",
      "position": 63,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 13586,
    "popularity": {
      "repo_url": "https://github.com/luanti-org/luanti",
      "stars": 13586,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/luanti-org/luanti",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "magic-carpet-wizard",
    "title": "Magic Carpet Wizard",
    "summary": "An arcade carpet-flight game with combat, pickups and procedural scenery.",
    "genres": [
      "flight",
      "action"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://threapchills.github.io/MagicCarpetWizard/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/threapchills/MagicCarpetWizard",
    "projectUrl": "https://threapchills.github.io/MagicCarpetWizard/",
    "commit": "6f949ee5d5f0915dae2c837da7308bcde63fa7f3",
    "creator": "threapchills and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "three 0.185.1",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": null,
      "code_status": "unresolved",
      "code_evidence_url": null,
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "No project-code license established; public source is not reuse permission."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/threapchills/MagicCarpetWizard/tree/6f949ee5d5f0915dae2c837da7308bcde63fa7f3",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "physics",
      "vfx"
    ],
    "buildingBlocks": [
      {
        "name": "Swept carpet collision",
        "category": "physics",
        "evidence_url": "https://github.com/threapchills/MagicCarpetWizard/blob/6f949ee5d5f0915dae2c837da7308bcde63fa7f3/src/collision.js",
        "source_path": "src/collision.js",
        "status": "source_inspected",
        "notes": "Sweeps a carpet hull against chunk solids in curved terrain coordinates. No extraction or integration test."
      },
      {
        "name": "Spell particle field",
        "category": "vfx",
        "evidence_url": "https://github.com/threapchills/MagicCarpetWizard/blob/6f949ee5d5f0915dae2c837da7308bcde63fa7f3/src/magic.js",
        "source_path": "src/magic.js",
        "status": "source_inspected",
        "notes": "Dynamic GPU attributes and pooled spell visuals depend on world placement and material helpers. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/threapchills/MagicCarpetWizard/tree/6f949ee5d5f0915dae2c837da7308bcde63fa7f3",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/threapchills/MagicCarpetWizard/blob/6f949ee5d5f0915dae2c837da7308bcde63fa7f3/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/threapchills/MagicCarpetWizard/blob/6f949ee5d5f0915dae2c837da7308bcde63fa7f3/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/threapchills/MagicCarpetWizard/blob/6f949ee5d5f0915dae2c837da7308bcde63fa7f3/src/collision.js",
        "claim": "Swept carpet collision entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/threapchills/MagicCarpetWizard/blob/6f949ee5d5f0915dae2c837da7308bcde63fa7f3/src/magic.js",
        "claim": "Spell particle field entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 Astra"
      ],
      "evidence": [
        {
          "url": "https://github.com/threapchills/MagicCarpetWizard",
          "claim": "Creator-facing repository description, development record or linked author post attributes this represented work to GPT-6 Astra."
        }
      ],
      "notes": "Creator attribution describes development participation, not model certification, exclusive authorship or measured performance."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "magic-carpet-wizard",
      "position": 64,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 0,
    "popularity": {
      "repo_url": "https://github.com/threapchills/MagicCarpetWizard",
      "stars": 0,
      "status": "available",
      "checked_at": "2026-09-10T19:48:26Z",
      "evidence_url": "https://api.github.com/repos/threapchills/MagicCarpetWizard",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "matter-js",
    "title": "Matter.js",
    "summary": "A two-dimensional rigid-body simulation library with interactive examples and a separate simulation loop.",
    "genres": [
      "physics-puzzle",
      "sandbox"
    ],
    "runtime": "Matter.js",
    "label": "Play demo",
    "demoUrl": "https://brm.io/matter-js/demo/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/liabru/matter-js",
    "projectUrl": "https://github.com/liabru/matter-js",
    "commit": "acb99b6f8784c809b940f1d2cf745427e088e088",
    "creator": "liabru and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "engine",
    "dimension": "2d",
    "visualStyle": [
      "geometric",
      "configurable"
    ],
    "runtimeVersion": "0.20.0",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/liabru/matter-js/blob/acb99b6f8784c809b940f1d2cf745427e088e088/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Core library scope inspected; demo images, SVG inputs and external gallery projects are separate scopes.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/liabru/matter-js/tree/acb99b6f8784c809b940f1d2cf745427e088e088",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "physics",
      "physics-joints"
    ],
    "buildingBlocks": [
      {
        "name": "Rigid-body simulation step",
        "category": "physics",
        "evidence_url": "https://github.com/liabru/matter-js/blob/acb99b6f8784c809b940f1d2cf745427e088e088/src/core/Engine.js",
        "source_path": "src/core/Engine.js",
        "status": "source_inspected",
        "notes": "Engine.update coordinates sleeping, collision detection and resolution; preserve one physics-world owner."
      },
      {
        "name": "Distance and spring constraints",
        "category": "physics-joints",
        "evidence_url": "https://github.com/liabru/matter-js/blob/acb99b6f8784c809b940f1d2cf745427e088e088/src/constraint/Constraint.js",
        "source_path": "src/constraint/Constraint.js",
        "status": "source_inspected",
        "notes": "Constraint module maintains body/world-space distances with stiffness; units and solver timing need target tests."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/liabru/matter-js/tree/acb99b6f8784c809b940f1d2cf745427e088e088",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/liabru/matter-js/blob/acb99b6f8784c809b940f1d2cf745427e088e088/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/liabru/matter-js/blob/acb99b6f8784c809b940f1d2cf745427e088e088/LICENSE",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/liabru/matter-js/blob/acb99b6f8784c809b940f1d2cf745427e088e088/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/liabru/matter-js/blob/acb99b6f8784c809b940f1d2cf745427e088e088/src/core/Engine.js",
        "claim": "Rigid-body simulation step entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/liabru/matter-js/blob/acb99b6f8784c809b940f1d2cf745427e088e088/src/constraint/Constraint.js",
        "claim": "Distance and spring constraints entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "matter-js",
      "position": 65,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 18399,
    "popularity": {
      "repo_url": "https://github.com/liabru/matter-js",
      "stars": 18399,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/liabru/matter-js",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "astra-melon-lab",
    "title": "Melon Lab",
    "summary": "A fruit-merging puzzle with deformable bodies and container collisions.",
    "genres": [
      "puzzle",
      "physics"
    ],
    "runtime": "Canvas 2D",
    "label": "Play demo",
    "demoUrl": "https://melon-game.jack-514.chatgpt.site/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/Ayi1337/gpt6-astra-one-shot-games",
    "projectUrl": "https://melon-game.jack-514.chatgpt.site/",
    "commit": "4178b08d569372a1492878d73c6018a90f564e5b",
    "creator": "Ayi1337 and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": null,
      "code_status": "unresolved",
      "code_evidence_url": null,
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "No project-code license established; public source is not reuse permission."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/tree/4178b08d569372a1492878d73c6018a90f564e5b",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "economy",
      "physics"
    ],
    "buildingBlocks": [
      {
        "name": "Merge score loop",
        "category": "economy",
        "evidence_url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/blob/4178b08d569372a1492878d73c6018a90f564e5b/melon-lab/src/public/game.js",
        "source_path": "melon-lab/src/public/game.js",
        "status": "source_inspected",
        "notes": "World merge events award combos and update persistent best score; DOM and storage coupled. No extraction or integration test."
      },
      {
        "name": "Deformable fruit solver",
        "category": "physics",
        "evidence_url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/blob/4178b08d569372a1492878d73c6018a90f564e5b/melon-lab/src/public/physics.js",
        "source_path": "melon-lab/src/public/physics.js",
        "status": "source_inspected",
        "notes": "Particle distance and pressure constraints use fixed fruit geometry and bounds. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/tree/4178b08d569372a1492878d73c6018a90f564e5b",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/blob/4178b08d569372a1492878d73c6018a90f564e5b/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/blob/4178b08d569372a1492878d73c6018a90f564e5b/README.md",
        "claim": "Model attribution evidence inspected; exact contribution remains bounded in ai_provenance notes.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/blob/4178b08d569372a1492878d73c6018a90f564e5b/melon-lab/src/public/game.js",
        "claim": "Merge score loop entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/blob/4178b08d569372a1492878d73c6018a90f564e5b/melon-lab/src/public/physics.js",
        "claim": "Deformable fruit solver entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 Astra"
      ],
      "evidence": [
        {
          "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/blob/4178b08d569372a1492878d73c6018a90f564e5b/README.md",
          "claim": "Creator-facing repository description, development record or linked author post attributes this represented work to GPT-6 Astra."
        }
      ],
      "notes": "Creator attribution describes development participation, not model certification, exclusive authorship or measured performance."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "astra-melon-lab",
      "position": 66,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 32,
    "popularity": {
      "repo_url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games",
      "stars": 32,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/Ayi1337/gpt6-astra-one-shot-games",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "mindustry",
    "title": "Mindustry",
    "summary": "Factory and tower-defense RTS with conveyor logistics and configurable crafting blocks.",
    "genres": [
      "automation",
      "tower-defense",
      "rts",
      "resource-management"
    ],
    "runtime": "Arc / JVM",
    "label": "Get game",
    "demoUrl": "https://anuke.itch.io/mindustry",
    "demoKind": "native-download",
    "repoUrl": "https://github.com/Anuken/Mindustry",
    "projectUrl": "https://mindustrygame.github.io/",
    "commit": "7c5f29e6fb1ac49bc7b4e1806f42685cbcc8b499",
    "creator": "Anuken and Mindustry contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "TheVanillChaos",
      "licenseExpression": "GPL-3.0-only",
      "licenseUrls": [
        "https://www.gnu.org/licenses/gpl-3.0.html"
      ],
      "sourcePage": "https://commons.wikimedia.org/wiki/File:Mindustry_multiplayer.jpg",
      "licenseEvidenceUrl": "https://commons.wikimedia.org/w/index.php?title=File%3AMindustry+multiplayer.jpg&oldid=1221300694",
      "captureDate": "2024-08-22",
      "versionRelation": "Historical image; relation to indexed source commit is unknown. Not a current build or play attestation.",
      "alt": "Mindustry multiplayer attack-mode factory and defense map.",
      "sha256": "ccd61327d310a6ee30db6e2f5998d643a3ef40d69ec1e2396354d615e0a6bf37",
      "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cf/Mindustry_multiplayer.jpg",
      "allowedUse": "Catalog display and redistributed original/thumbnail only with the listed attribution, license notices and applicable share-alike/source obligations. No endorsement implied.",
      "modifications": "Original image bytes retained unchanged; contact sheet scales an independent copy to fit, without content edits.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/design_flex_reviewer",
      "src": "assets/catalog/mindustry.jpg",
      "localSourcePath": "research/catalog/media/mindustry.jpg"
    },
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer distribution page or homepage entry point, not a browser game or proof that a release matches the inspected source commit. Native setup/content requirements apply.",
    "rights": {
      "code_license": "GPL-3.0-only",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/Anuken/Mindustry/blob/7c5f29e6fb1ac49bc7b4e1806f42685cbcc8b499/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Root GPLv3 text inspected. No separately scoped art/audio rights map was found in this batch; assets, generated atlases, fonts and dependencies remain unreviewed rather than assumed covered for reuse or screenshots.",
      "scope_reuse_status": "review_required",
      "notes": "License summary identifies project terms, not blanket reuse clearance or any royalty agreement. Preserve notices; resolve selected files and transitive dependencies. See research/catalog/evidence/native-batch.json for actual batch timing; no individual timing was recorded."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/Anuken/Mindustry/tree/7c5f29e6fb1ac49bc7b4e1806f42685cbcc8b499",
    "platforms": [
      "Windows",
      "Linux",
      "macOS",
      "Android"
    ],
    "platformKind": "desktop",
    "capabilities": [
      "resource-loops",
      "production-queues"
    ],
    "buildingBlocks": [
      {
        "name": "Conveyor item logistics",
        "category": "resource-loops",
        "evidence_url": "https://github.com/Anuken/Mindustry/blob/7c5f29e6fb1ac49bc7b4e1806f42685cbcc8b499/core/src/mindustry/world/blocks/distribution/Conveyor.java",
        "source_path": "core/src/mindustry/world/blocks/distribution/Conveyor.java",
        "status": "source_inspected",
        "notes": "Conveyor updateTile spaces and advances items with time scale and downstream capacity; depends on Arc, tile neighbors and item serialization."
      },
      {
        "name": "Factory crafting outputs",
        "category": "production-queues",
        "evidence_url": "https://github.com/Anuken/Mindustry/blob/7c5f29e6fb1ac49bc7b4e1806f42685cbcc8b499/core/src/mindustry/world/blocks/production/GenericCrafter.java",
        "source_path": "core/src/mindustry/world/blocks/production/GenericCrafter.java",
        "status": "source_inspected",
        "notes": "GenericCrafter consumes inputs and offloads accumulated outputs; needs Mindustry consumption, item/liquid definitions and block simulation."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/Anuken/Mindustry/blob/7c5f29e6fb1ac49bc7b4e1806f42685cbcc8b499/README.md",
        "claim": "Inspected maintainer description, distribution links and declared scope; no execution.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/Anuken/Mindustry/blob/7c5f29e6fb1ac49bc7b4e1806f42685cbcc8b499/LICENSE",
        "claim": "Inspected license text and declared project terms; selected scope and exceptions require review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/Anuken/Mindustry/blob/7c5f29e6fb1ac49bc7b4e1806f42685cbcc8b499/core/src/mindustry/world/blocks/distribution/Conveyor.java",
        "claim": "Conveyor item logistics: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/Anuken/Mindustry/blob/7c5f29e6fb1ac49bc7b4e1806f42685cbcc8b499/core/src/mindustry/world/blocks/production/GenericCrafter.java",
        "claim": "Factory crafting outputs: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "mindustry",
      "position": 67,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 28946,
    "popularity": {
      "repo_url": "https://github.com/Anuken/Mindustry",
      "stars": 28946,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/Anuken/Mindustry",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "astra-mosswing",
    "title": "Mosswing",
    "summary": "A small tap-to-flap flight game through stone gaps.",
    "genres": [
      "arcade",
      "flight"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://mosswing-quiet-flight.jack-514.chatgpt.site/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/Ayi1337/gpt6-astra-one-shot-games",
    "projectUrl": "https://mosswing-quiet-flight.jack-514.chatgpt.site/",
    "commit": "4178b08d569372a1492878d73c6018a90f564e5b",
    "creator": "Ayi1337 and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": null,
      "code_status": "unresolved",
      "code_evidence_url": null,
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "No project-code license established; public source is not reuse permission."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/tree/4178b08d569372a1492878d73c6018a90f564e5b",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "world",
      "movement"
    ],
    "buildingBlocks": [
      {
        "name": "Flight scene",
        "category": "world",
        "evidence_url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/blob/4178b08d569372a1492878d73c6018a90f564e5b/mosswing/src/game.js",
        "source_path": "mosswing/src/game.js",
        "status": "source_inspected",
        "notes": "Procedural vegetation and obstacle visuals share the game loop and globals. No extraction or integration test."
      },
      {
        "name": "Flap-and-gate model",
        "category": "movement",
        "evidence_url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/blob/4178b08d569372a1492878d73c6018a90f564e5b/mosswing/src/physics.cjs",
        "source_path": "mosswing/src/physics.cjs",
        "status": "source_inspected",
        "notes": "FlightModel steps gravity, gates and score; duplicated in browser source, so select one authority. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/tree/4178b08d569372a1492878d73c6018a90f564e5b",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/blob/4178b08d569372a1492878d73c6018a90f564e5b/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/blob/4178b08d569372a1492878d73c6018a90f564e5b/README.md",
        "claim": "Model attribution evidence inspected; exact contribution remains bounded in ai_provenance notes.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/blob/4178b08d569372a1492878d73c6018a90f564e5b/mosswing/src/game.js",
        "claim": "Flight scene entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/blob/4178b08d569372a1492878d73c6018a90f564e5b/mosswing/src/physics.cjs",
        "claim": "Flap-and-gate model entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 Astra"
      ],
      "evidence": [
        {
          "url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games/blob/4178b08d569372a1492878d73c6018a90f564e5b/README.md",
          "claim": "Creator-facing repository description, development record or linked author post attributes this represented work to GPT-6 Astra."
        }
      ],
      "notes": "Creator attribution describes development participation, not model certification, exclusive authorship or measured performance."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "astra-mosswing",
      "position": 68,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 32,
    "popularity": {
      "repo_url": "https://github.com/Ayi1337/gpt6-astra-one-shot-games",
      "stars": 32,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/Ayi1337/gpt6-astra-one-shot-games",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "openra",
    "title": "OpenRA",
    "summary": "RTS engine with classic-game mods, resource harvesters and configurable production queues.",
    "genres": [
      "rts",
      "strategy",
      "resource-management"
    ],
    "runtime": "OpenRA / .NET",
    "label": "Get game",
    "demoUrl": "https://www.openra.net/",
    "demoKind": "native-download",
    "repoUrl": "https://github.com/OpenRA/OpenRA",
    "projectUrl": "https://www.openra.net/",
    "commit": "f3ec7f8e1593b482f85fd101652deb740c33dee6",
    "creator": "OpenRA developers and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "engine",
    "dimension": "2d",
    "visualStyle": [],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer distribution page or homepage entry point, not a browser game or proof that a release matches the inspected source commit. Native setup/content requirements apply.",
    "rights": {
      "code_license": "GPL-3.0-or-later",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/OpenRA/OpenRA/blob/f3ec7f8e1593b482f85fd101652deb740c33dee6/COPYING",
      "asset_status": "mixed",
      "asset_notes": "Official FAQ says default mods use original Westwood game assets downloaded separately or extracted from installed media. Those files are not covered by OpenRA GPL; availability as freeware is not reuse permission. Inspect mod assets separately.",
      "scope_reuse_status": "review_required",
      "notes": "License summary identifies project terms, not blanket reuse clearance or any royalty agreement. Preserve notices; resolve selected files and transitive dependencies. See research/catalog/evidence/native-batch.json for actual batch timing; no individual timing was recorded."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/OpenRA/OpenRA/tree/f3ec7f8e1593b482f85fd101652deb740c33dee6",
    "platforms": [
      "Windows",
      "Linux",
      "macOS"
    ],
    "platformKind": "desktop",
    "capabilities": [
      "production-queues",
      "resource-loops"
    ],
    "buildingBlocks": [
      {
        "name": "Actor production queue",
        "category": "production-queues",
        "evidence_url": "https://github.com/OpenRA/OpenRA/blob/f3ec7f8e1593b482f85fd101652deb740c33dee6/OpenRA.Mods.Common/Traits/Player/ProductionQueue.cs",
        "source_path": "OpenRA.Mods.Common/Traits/Player/ProductionQueue.cs",
        "status": "source_inspected",
        "notes": "Queue configuration and production traits depend on OpenRA actors, resource accounting, rulesets and tick interfaces."
      },
      {
        "name": "Resource harvesting and docking",
        "category": "resource-loops",
        "evidence_url": "https://github.com/OpenRA/OpenRA/blob/f3ec7f8e1593b482f85fd101652deb740c33dee6/OpenRA.Mods.Common/Traits/Harvester.cs",
        "source_path": "OpenRA.Mods.Common/Traits/Harvester.cs",
        "status": "source_inspected",
        "notes": "Harvester stores resource types, harvest orders and docking transfers; coupled to resource layers, mobile traits and actor conditions."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/OpenRA/OpenRA/blob/f3ec7f8e1593b482f85fd101652deb740c33dee6/README.md",
        "claim": "Inspected maintainer description, distribution links and declared scope; no execution.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/OpenRA/OpenRA/blob/f3ec7f8e1593b482f85fd101652deb740c33dee6/COPYING",
        "claim": "Inspected license text and declared project terms; selected scope and exceptions require review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/OpenRA/OpenRA/blob/f3ec7f8e1593b482f85fd101652deb740c33dee6/OpenRA.Mods.Common/Traits/Player/ProductionQueue.cs",
        "claim": "Actor production queue: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/OpenRA/OpenRA/blob/f3ec7f8e1593b482f85fd101652deb740c33dee6/OpenRA.Mods.Common/Traits/Harvester.cs",
        "claim": "Resource harvesting and docking: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/OpenRA/OpenRA/wiki/FAQ",
        "claim": "FAQ distinguishes GPL engine from original-game assets downloaded/extracted separately.",
        "kind": "official-docs"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "openra",
      "position": 69,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 17357,
    "popularity": {
      "repo_url": "https://github.com/OpenRA/OpenRA",
      "stars": 17357,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/OpenRA/OpenRA",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "openrct2",
    "title": "OpenRCT2",
    "summary": "Amusement-park construction and management with guest movement and finance systems.",
    "genres": [
      "simulation",
      "management",
      "tycoon",
      "builder"
    ],
    "runtime": "OpenRCT2 native engine",
    "label": "Get game",
    "demoUrl": "https://openrct2.io/download/release/latest",
    "demoKind": "native-download",
    "repoUrl": "https://github.com/OpenRCT2/OpenRCT2",
    "projectUrl": "https://openrct2.io",
    "commit": "bb118516646347d73e7eb0d30de9eef2f5b16043",
    "creator": "OpenRCT2 developers",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer distribution page or homepage entry point, not a browser game or proof that a release matches the inspected source commit. Native setup/content requirements apply.",
    "rights": {
      "code_license": "GPL-3.0-or-later",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/OpenRCT2/OpenRCT2/blob/bb118516646347d73e7eb0d30de9eef2f5b16043/licence.txt",
      "asset_status": "mixed",
      "asset_notes": "Original RollerCoaster Tycoon 2 files are required by the inspected README. Engine GPL does not clear those proprietary graphics, audio or scenarios. OpenGraphics replacement is a separate project requiring its own scope audit.",
      "scope_reuse_status": "review_required",
      "notes": "License summary identifies project terms, not blanket reuse clearance or any royalty agreement. Preserve notices; resolve selected files and transitive dependencies. See research/catalog/evidence/native-batch.json for actual batch timing; no individual timing was recorded."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/OpenRCT2/OpenRCT2/tree/bb118516646347d73e7eb0d30de9eef2f5b16043",
    "platforms": [
      "Windows",
      "Linux",
      "macOS"
    ],
    "platformKind": "desktop",
    "capabilities": [
      "economy",
      "pathfinding"
    ],
    "buildingBlocks": [
      {
        "name": "Park operating finances",
        "category": "economy",
        "evidence_url": "https://github.com/OpenRCT2/OpenRCT2/blob/bb118516646347d73e7eb0d30de9eef2f5b16043/src/openrct2/management/Finance.cpp",
        "source_path": "src/openrct2/management/Finance.cpp",
        "status": "source_inspected",
        "notes": "FinancePayment and wage/interest/upkeep routines use shared GameState, park flags, rides and UI invalidation; extraction is not standalone."
      },
      {
        "name": "Guest pathfinding",
        "category": "pathfinding",
        "evidence_url": "https://github.com/OpenRCT2/OpenRCT2/blob/bb118516646347d73e7eb0d30de9eef2f5b16043/src/openrct2/peep/GuestPathfinding.cpp",
        "source_path": "src/openrct2/peep/GuestPathfinding.cpp",
        "status": "source_inspected",
        "notes": "Guest/staff path search operates on park footpaths, queues, ride IDs and junction history; requires map and peep-state adapters."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/OpenRCT2/OpenRCT2/blob/bb118516646347d73e7eb0d30de9eef2f5b16043/readme.md",
        "claim": "Inspected maintainer description, distribution links and declared scope; no execution.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/OpenRCT2/OpenRCT2/blob/bb118516646347d73e7eb0d30de9eef2f5b16043/licence.txt",
        "claim": "Inspected license text and declared project terms; selected scope and exceptions require review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/OpenRCT2/OpenRCT2/blob/bb118516646347d73e7eb0d30de9eef2f5b16043/src/openrct2/management/Finance.cpp",
        "claim": "Park operating finances: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/OpenRCT2/OpenRCT2/blob/bb118516646347d73e7eb0d30de9eef2f5b16043/src/openrct2/peep/GuestPathfinding.cpp",
        "claim": "Guest pathfinding: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "openrct2",
      "position": 70,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 16201,
    "popularity": {
      "repo_url": "https://github.com/OpenRCT2/OpenRCT2",
      "stars": 16201,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/OpenRCT2/OpenRCT2",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "openttd",
    "title": "OpenTTD",
    "summary": "Transport-company simulation with cargo income and road-network routing.",
    "genres": [
      "simulation",
      "management",
      "tycoon",
      "transport"
    ],
    "runtime": "OpenTTD native engine",
    "label": "Get game",
    "demoUrl": "https://www.openttd.org/",
    "demoKind": "native-download",
    "repoUrl": "https://github.com/OpenTTD/OpenTTD",
    "projectUrl": "https://www.openttd.org/",
    "commit": "d1af18d1b66da003551fcc2139080ae28fd0630c",
    "creator": "OpenTTD contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "OpenTTD developers; OpenGFX contributors; screenshot uploaded by WoelfiVW. https://github.com/OpenTTD/OpenGFX/blob/master/README.md#60-credits  \n  https://www.openttd.org/about.html",
      "licenseExpression": "GPL-2.0-only",
      "licenseUrls": [
        "https://www.gnu.org/licenses/old-licenses/gpl-2.0.html"
      ],
      "sourcePage": "https://commons.wikimedia.org/wiki/File:OpenTTD-1.11.0-nl.png",
      "licenseEvidenceUrl": "https://commons.wikimedia.org/w/index.php?title=File%3AOpenTTD-1.11.0-nl.png&oldid=879978866",
      "captureDate": "2021-04-02",
      "versionRelation": "Historical image; relation to indexed source commit is unknown. Not a current build or play attestation.",
      "alt": "OpenTTD 1.11.0 transport landscape and interface using the OpenGFX graphics set.",
      "sha256": "bb32576edc6aa854d7cbb33b00623048b92b439b10ec3c3f17d3f03c471c0d89",
      "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0d/OpenTTD-1.11.0-nl.png",
      "allowedUse": "Catalog display and redistributed original/thumbnail only with the listed attribution, license notices and applicable share-alike/source obligations. No endorsement implied.",
      "modifications": "Original image bytes retained unchanged; contact sheet scales an independent copy to fit, without content edits.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/design_flex_reviewer",
      "src": "assets/catalog/openttd.png",
      "localSourcePath": "research/catalog/media/openttd.png"
    },
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer distribution page or homepage entry point, not a browser game or proof that a release matches the inspected source commit. Native setup/content requirements apply.",
    "rights": {
      "code_license": "GPL-2.0-only",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/OpenTTD/OpenTTD/blob/d1af18d1b66da003551fcc2139080ae28fd0630c/COPYING.md",
      "asset_status": "mixed",
      "asset_notes": "Separate base graphics, sound and music are required. README describes free OpenGFX/OpenSFX/OpenMSX and optional original Transport Tycoon Deluxe files; inspect the chosen base set and NewGRFs separately. Root code includes explicitly listed third-party exceptions.",
      "scope_reuse_status": "review_required",
      "notes": "License summary identifies project terms, not blanket reuse clearance or any royalty agreement. Preserve notices; resolve selected files and transitive dependencies. See research/catalog/evidence/native-batch.json for actual batch timing; no individual timing was recorded."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/OpenTTD/OpenTTD/tree/d1af18d1b66da003551fcc2139080ae28fd0630c",
    "platforms": [
      "Windows",
      "Linux",
      "macOS"
    ],
    "platformKind": "desktop",
    "capabilities": [
      "economy",
      "pathfinding"
    ],
    "buildingBlocks": [
      {
        "name": "Cargo economy",
        "category": "economy",
        "evidence_url": "https://github.com/OpenTTD/OpenTTD/blob/d1af18d1b66da003551fcc2139080ae28fd0630c/src/economy.cpp",
        "source_path": "src/economy.cpp",
        "status": "source_inspected",
        "notes": "Economy code handles cargo payments, company state and industry production; coupled to vehicle, station and company models."
      },
      {
        "name": "Road-vehicle routing",
        "category": "pathfinding",
        "evidence_url": "https://github.com/OpenTTD/OpenTTD/blob/d1af18d1b66da003551fcc2139080ae28fd0630c/src/pathfinder/yapf/yapf_road.cpp",
        "source_path": "src/pathfinder/yapf/yapf_road.cpp",
        "status": "source_inspected",
        "notes": "YAPF road costs account for tile edges, destination detection and depot limits; depends on OpenTTD track/tile types and path caches."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/OpenTTD/OpenTTD/blob/d1af18d1b66da003551fcc2139080ae28fd0630c/README.md",
        "claim": "Inspected maintainer description, distribution links and declared scope; no execution.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/OpenTTD/OpenTTD/blob/d1af18d1b66da003551fcc2139080ae28fd0630c/COPYING.md",
        "claim": "Inspected license text and declared project terms; selected scope and exceptions require review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/OpenTTD/OpenTTD/blob/d1af18d1b66da003551fcc2139080ae28fd0630c/src/economy.cpp",
        "claim": "Cargo economy: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/OpenTTD/OpenTTD/blob/d1af18d1b66da003551fcc2139080ae28fd0630c/src/pathfinder/yapf/yapf_road.cpp",
        "claim": "Road-vehicle routing: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "openttd",
      "position": 71,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 8248,
    "popularity": {
      "repo_url": "https://github.com/OpenTTD/OpenTTD",
      "stars": 8248,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/OpenTTD/OpenTTD",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "toy2game-parking-escape",
    "title": "Parking Escape",
    "summary": "Slide vehicles along their lanes to free the police car.",
    "genres": [
      "puzzle"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://games.asmo.top/games/parking-escape/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/asmoyou/toy2game",
    "projectUrl": "https://games.asmo.top/games/parking-escape/",
    "commit": "39078515a13331a748e63bc75424ed83c773a72a",
    "creator": "asmoyou and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "boardgame.io ^0.50.2; three ^0.185.1",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "LicenseRef-Toy2Game-Noncommercial-1.0",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "Custom NONCOMMERCIAL source-available license; not OSI open source. Commercial use requires separate written permission; no such agreement established."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/asmoyou/toy2game/tree/39078515a13331a748e63bc75424ed83c773a72a",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "puzzle-rules",
      "pathfinding"
    ],
    "buildingBlocks": [
      {
        "name": "Sliding-vehicle rules",
        "category": "puzzle-rules",
        "evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/parking-escape/src/rules.ts",
        "source_path": "games/parking-escape/src/rules.ts",
        "status": "source_inspected",
        "notes": "Occupancy and legal moves assume a six-cell board and axis-aligned vehicle lanes. No extraction or integration test."
      },
      {
        "name": "Bounded hint solver",
        "category": "pathfinding",
        "evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/parking-escape/src/solver.ts",
        "source_path": "games/parking-escape/src/solver.ts",
        "status": "source_inspected",
        "notes": "Breadth-first encoded state search returns solved, impossible or search-limit outcomes. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/asmoyou/toy2game/tree/39078515a13331a748e63bc75424ed83c773a72a",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/parking-escape/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/parking-escape/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/parking-escape/src/rules.ts",
        "claim": "Sliding-vehicle rules entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/parking-escape/src/solver.ts",
        "claim": "Bounded hint solver entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unverified",
      "models": [],
      "evidence": [],
      "notes": "This project appears in an Astra collection, but a creator statement establishing the exact model contribution has not been verified."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "toy2game-parking-escape",
      "position": 72,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 4,
    "popularity": {
      "repo_url": "https://github.com/asmoyou/toy2game",
      "stars": 4,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/asmoyou/toy2game",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "toy2game-penguin-ice",
    "title": "Penguin Ice",
    "summary": "Remove supporting ice pieces without dropping the penguin.",
    "genres": [
      "party",
      "physics"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://games.asmo.top/games/penguin-ice/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/asmoyou/toy2game",
    "projectUrl": "https://games.asmo.top/games/penguin-ice/",
    "commit": "39078515a13331a748e63bc75424ed83c773a72a",
    "creator": "asmoyou and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "cannon-es ^0.20.0; three ^0.185.1",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "LicenseRef-Toy2Game-Noncommercial-1.0",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "Custom NONCOMMERCIAL source-available license; not OSI open source. Commercial use requires separate written permission; no such agreement established."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/asmoyou/toy2game/tree/39078515a13331a748e63bc75424ed83c773a72a",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "procedural-generation",
      "physics"
    ],
    "buildingBlocks": [
      {
        "name": "Hex ice board",
        "category": "procedural-generation",
        "evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/penguin-ice/src/board.ts",
        "source_path": "games/penguin-ice/src/board.ts",
        "status": "source_inspected",
        "notes": "Axial coordinates generate rim-marked hex cells for a configured radius. No extraction or integration test."
      },
      {
        "name": "Ice support physics",
        "category": "physics",
        "evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/penguin-ice/src/physics.ts",
        "source_path": "games/penguin-ice/src/physics.ts",
        "status": "source_inspected",
        "notes": "Cannon ice bodies and bonds share terrain height, compression and penguin definitions. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/asmoyou/toy2game/tree/39078515a13331a748e63bc75424ed83c773a72a",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/penguin-ice/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/penguin-ice/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/penguin-ice/src/board.ts",
        "claim": "Hex ice board entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/penguin-ice/src/physics.ts",
        "claim": "Ice support physics entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unverified",
      "models": [],
      "evidence": [],
      "notes": "This project appears in an Astra collection, but a creator statement establishing the exact model contribution has not been verified."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "toy2game-penguin-ice",
      "position": 73,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 4,
    "popularity": {
      "repo_url": "https://github.com/asmoyou/toy2game",
      "stars": 4,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/asmoyou/toy2game",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "phaser-dungeon-crawler",
    "title": "Phaser Dungeon Crawler Starter",
    "summary": "A Phaser starter demonstrating animated top-down combat, damage state, treasure and simple enemies.",
    "genres": [
      "dungeon-crawler",
      "action-rpg"
    ],
    "runtime": "Phaser",
    "label": "Play demo",
    "demoUrl": "https://ourcade.co/templates/dungeon-crawler-starter",
    "demoKind": "browser",
    "repoUrl": "https://github.com/ourcade/phaser3-dungeon-crawler-starter",
    "projectUrl": "https://ourcade.co/templates/dungeon-crawler-starter",
    "commit": "186705eb557af3d7042590fc61485a7cbed7b7f0",
    "creator": "ourcade and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [
      "pixel-art",
      "fantasy"
    ],
    "runtimeVersion": "^3.22.0",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/ourcade/phaser3-dungeon-crawler-starter/blob/186705eb557af3d7042590fc61485a7cbed7b7f0/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "README credits Dungeon Tileset II and Legend of Faune; assets are Git LFS objects, and their separate licenses have not been fetched.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/ourcade/phaser3-dungeon-crawler-starter/tree/186705eb557af3d7042590fc61485a7cbed7b7f0",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "combat",
      "enemy-ai"
    ],
    "buildingBlocks": [
      {
        "name": "Player combat and damage state",
        "category": "combat",
        "evidence_url": "https://github.com/ourcade/phaser3-dungeon-crawler-starter/blob/186705eb557af3d7042590fc61485a7cbed7b7f0/src/characters/Faune.ts",
        "source_path": "src/characters/Faune.ts",
        "status": "source_inspected",
        "notes": "Arcade sprite tracks health, knives and chest interaction; animation keys and scene events are coupled."
      },
      {
        "name": "Timed enemy wandering",
        "category": "enemy-ai",
        "evidence_url": "https://github.com/ourcade/phaser3-dungeon-crawler-starter/blob/186705eb557af3d7042590fc61485a7cbed7b7f0/src/enemies/Lizard.ts",
        "source_path": "src/enemies/Lizard.ts",
        "status": "source_inspected",
        "notes": "Lizard sprite changes cardinal direction through a timer; adapt collision and timer cleanup to target lifecycle."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/ourcade/phaser3-dungeon-crawler-starter/tree/186705eb557af3d7042590fc61485a7cbed7b7f0",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/ourcade/phaser3-dungeon-crawler-starter/blob/186705eb557af3d7042590fc61485a7cbed7b7f0/readme.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/ourcade/phaser3-dungeon-crawler-starter/blob/186705eb557af3d7042590fc61485a7cbed7b7f0/LICENSE",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/ourcade/phaser3-dungeon-crawler-starter/blob/186705eb557af3d7042590fc61485a7cbed7b7f0/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/ourcade/phaser3-dungeon-crawler-starter/blob/186705eb557af3d7042590fc61485a7cbed7b7f0/src/characters/Faune.ts",
        "claim": "Player combat and damage state entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/ourcade/phaser3-dungeon-crawler-starter/blob/186705eb557af3d7042590fc61485a7cbed7b7f0/src/enemies/Lizard.ts",
        "claim": "Timed enemy wandering entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "phaser-dungeon-crawler",
      "position": 74,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 120,
    "popularity": {
      "repo_url": "https://github.com/ourcade/phaser3-dungeon-crawler-starter",
      "stars": 120,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/ourcade/phaser3-dungeon-crawler-starter",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "toy2game-rabbit-trap",
    "title": "Rabbit Trap",
    "summary": "A shared board-game race with traps, cards and changing weather.",
    "genres": [
      "board-game",
      "party"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://games.asmo.top/games/rabbit-trap/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/asmoyou/toy2game",
    "projectUrl": "https://games.asmo.top/games/rabbit-trap/",
    "commit": "39078515a13331a748e63bc75424ed83c773a72a",
    "creator": "asmoyou and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "boardgame.io ^0.50.2; react ^19.0.0; three ^0.180.0",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "LicenseRef-Toy2Game-Noncommercial-1.0",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "Custom NONCOMMERCIAL source-available license; not OSI open source. Commercial use requires separate written permission; no such agreement established."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/asmoyou/toy2game/tree/39078515a13331a748e63bc75424ed83c773a72a",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "turn-system",
      "simulation"
    ],
    "buildingBlocks": [
      {
        "name": "Rabbit board-game turns",
        "category": "turn-system",
        "evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/rabbit-trap/src/game.ts",
        "source_path": "games/rabbit-trap/src/game.ts",
        "status": "source_inspected",
        "notes": "boardgame.io state contains cards, landing effects, officer-free token turns and migrations. No extraction or integration test."
      },
      {
        "name": "Cloud hazard state",
        "category": "simulation",
        "evidence_url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/rabbit-trap/src/weather.ts",
        "source_path": "games/rabbit-trap/src/weather.ts",
        "status": "source_inspected",
        "notes": "Weather waypoints and elapsed cloud motion depend on the authored board path. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/asmoyou/toy2game/tree/39078515a13331a748e63bc75424ed83c773a72a",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/rabbit-trap/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/rabbit-trap/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/rabbit-trap/src/game.ts",
        "claim": "Rabbit board-game turns entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/games/rabbit-trap/src/weather.ts",
        "claim": "Cloud hazard state entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unverified",
      "models": [],
      "evidence": [],
      "notes": "This project appears in an Astra collection, but a creator statement establishing the exact model contribution has not been verified."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No defensible public player or usage count is recorded."
    },
    "editorialRank": {
      "record_id": "toy2game-rabbit-trap",
      "position": 75,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 4,
    "popularity": {
      "repo_url": "https://github.com/asmoyou/toy2game",
      "stars": 4,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/asmoyou/toy2game",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "silent-meridian",
    "title": "Silent Meridian",
    "summary": "A chapter-based mystery game with linked puzzles, evidence and time-state changes.",
    "genres": [
      "adventure",
      "puzzle"
    ],
    "runtime": "JavaScript / WebGL",
    "label": "Play demo",
    "demoUrl": "https://silent-meridian.stackloom.org/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/stackloomdev/silent-meridian",
    "projectUrl": "https://silent-meridian.stackloom.org/",
    "commit": "5a3b800ff67913c6a310348cfd49cea34274f344",
    "creator": "stackloomdev and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "mixed",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/stackloomdev/silent-meridian/blob/5a3b800ff67913c6a310348cfd49cea34274f344/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "Code license inspected; selected files, transitive dependencies and assets still require scope review."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/stackloomdev/silent-meridian/tree/5a3b800ff67913c6a310348cfd49cea34274f344",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "puzzle-rules",
      "vfx"
    ],
    "buildingBlocks": [
      {
        "name": "Puzzle and save state",
        "category": "puzzle-rules",
        "evidence_url": "https://github.com/stackloomdev/silent-meridian/blob/5a3b800ff67913c6a310348cfd49cea34274f344/src/game.js",
        "source_path": "src/game.js",
        "status": "source_inspected",
        "notes": "Puzzle transitions, hints, hydration and saves couple chapter IDs to campaign state. No extraction or integration test."
      },
      {
        "name": "WebGL scene depth",
        "category": "vfx",
        "evidence_url": "https://github.com/stackloomdev/silent-meridian/blob/5a3b800ff67913c6a310348cfd49cea34274f344/src/scene-depth.js",
        "source_path": "src/scene-depth.js",
        "status": "source_inspected",
        "notes": "One decorative WebGL layer leaves puzzle hit targets in the DOM; profiles are room-specific. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/stackloomdev/silent-meridian/tree/5a3b800ff67913c6a310348cfd49cea34274f344",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/stackloomdev/silent-meridian/blob/5a3b800ff67913c6a310348cfd49cea34274f344/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/stackloomdev/silent-meridian/blob/5a3b800ff67913c6a310348cfd49cea34274f344/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/stackloomdev/silent-meridian/blob/5a3b800ff67913c6a310348cfd49cea34274f344/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/stackloomdev/silent-meridian/blob/5a3b800ff67913c6a310348cfd49cea34274f344/docs/CREATION.md",
        "claim": "Model attribution evidence inspected; exact contribution remains bounded in ai_provenance notes.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/stackloomdev/silent-meridian/blob/5a3b800ff67913c6a310348cfd49cea34274f344/src/game.js",
        "claim": "Puzzle and save state entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/stackloomdev/silent-meridian/blob/5a3b800ff67913c6a310348cfd49cea34274f344/src/scene-depth.js",
        "claim": "WebGL scene depth entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 Astra"
      ],
      "evidence": [
        {
          "url": "https://github.com/stackloomdev/silent-meridian/blob/5a3b800ff67913c6a310348cfd49cea34274f344/docs/CREATION.md",
          "claim": "Creator-facing repository description, development record or linked author post attributes this represented work to GPT-6 Astra."
        }
      ],
      "notes": "Creator attribution describes development participation, not model certification, exclusive authorship or measured performance."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "silent-meridian",
      "position": 76,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 0,
    "popularity": {
      "repo_url": "https://github.com/stackloomdev/silent-meridian",
      "stars": 0,
      "status": "available",
      "checked_at": "2026-09-10T19:48:26Z",
      "evidence_url": "https://api.github.com/repos/stackloomdev/silent-meridian",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "astra-sunjing-puzzles",
    "title": "Sunjing Puzzles",
    "summary": "An interlocking wooden puzzle and sliding-block puzzle workshop.",
    "genres": [
      "puzzle"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://sunjing-puzzles.vercel.app/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/MartinDelophy/awesome-gpt-6-astra",
    "projectUrl": "https://sunjing-puzzles.vercel.app/",
    "commit": "139a9287e763e5b592bb53fda97e5101db15db40",
    "creator": "MartinDelophy and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "react 19.2.8; three ^0.185.1",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": null,
      "code_status": "unresolved",
      "code_evidence_url": null,
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "Collection CC0 is not assumed to clear contributed game source. No explicit subproject license grant established."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/139a9287e763e5b592bb53fda97e5101db15db40",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "camera",
      "puzzle-rules"
    ],
    "buildingBlocks": [
      {
        "name": "Puzzle scene interaction",
        "category": "camera",
        "evidence_url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/sunjing-puzzles/components/PuzzleScene.tsx",
        "source_path": "works/sunjing-puzzles/components/PuzzleScene.tsx",
        "status": "source_inspected",
        "notes": "React effect owns Three renderer/orbit controls and puzzle picking callbacks. No extraction or integration test."
      },
      {
        "name": "Lock and board rules",
        "category": "puzzle-rules",
        "evidence_url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/sunjing-puzzles/lib/game.ts",
        "source_path": "works/sunjing-puzzles/lib/game.ts",
        "status": "source_inspected",
        "notes": "Voxel lock removals and sliding-board legality use distinct piece representations. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/139a9287e763e5b592bb53fda97e5101db15db40",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/sunjing-puzzles/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/sunjing-puzzles/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/sunjing-puzzles/components/PuzzleScene.tsx",
        "claim": "Puzzle scene interaction entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/sunjing-puzzles/lib/game.ts",
        "claim": "Lock and board rules entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unverified",
      "models": [],
      "evidence": [
        {
          "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/sunjing-puzzles/CREATION.md",
          "claim": "Development record does not establish exact model identity; unresolved attribution retained."
        }
      ],
      "notes": "This project appears in an Astra collection, but a creator statement establishing the exact model contribution has not been verified."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "astra-sunjing-puzzles",
      "position": 77,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 135,
    "popularity": {
      "repo_url": "https://github.com/MartinDelophy/awesome-gpt-6-astra",
      "stars": 135,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/MartinDelophy/awesome-gpt-6-astra",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "openai-sites-sunwake",
    "title": "Sunwake",
    "summary": "A browser boating game built around procedural ocean traversal, waves, buoyancy, wakes and spray.",
    "genres": [
      "exploration",
      "simulation",
      "boating"
    ],
    "runtime": "Three.js",
    "label": "Play demo",
    "demoUrl": "https://sunwake-the-last-light.openai.chatgpt.site/",
    "demoKind": "browser",
    "repoUrl": "https://developers.openai.com/showcase/sunwake",
    "projectUrl": "https://developers.openai.com/showcase/sunwake",
    "commit": null,
    "creator": "Thomas Ricouard / OpenAI",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "low-poly",
      "procedural",
      "stylized"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "declared",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Official OpenAI showcase links this live Sites deployment. HeadStart has not yet completed an independent gameplay session or compatibility test.",
    "rights": {
      "code_license": null,
      "code_status": "unresolved",
      "code_evidence_url": null,
      "asset_status": "unreviewed",
      "asset_notes": "The official gameplay image has a narrow user-directed local catalog-display record; OpenAI does not provide an image reuse license or clear the depicted game assets on the inspected pages.",
      "scope_reuse_status": "review_required",
      "notes": "No public source repository, source revision or code license is linked from the inspected official pages. Treat as a playable reference only: no source export, code reuse or asset reuse is authorized."
    },
    "sourceInspectedAt": "2026-09-10T21:30:00Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "no_public_source",
    "pinnedSourceUrl": null,
    "platforms": [
      "browser",
      "Sites"
    ],
    "platformKind": "browser",
    "capabilities": [
      "sites-hosted",
      "water",
      "physics",
      "movement",
      "procedural-generation"
    ],
    "buildingBlocks": [
      {
        "name": "Procedural ocean and buoyancy",
        "category": "physics",
        "evidence_url": "https://developers.openai.com/blog/how-to-build-games-with-astra",
        "source_path": null,
        "status": "maintainer_described",
        "notes": "The author describes a custom Three.js water renderer with waves, buoyancy, wakes and spray. This is an editorial discovery lead from official descriptions, not inspected or reusable source."
      },
      {
        "name": "Boat traversal loop",
        "category": "movement",
        "evidence_url": "https://developers.openai.com/showcase/sunwake",
        "source_path": null,
        "status": "maintainer_described",
        "notes": "The official showcase describes navigating a stylized world by boat while managing fuel and locating lighthouses. This is an editorial discovery lead from official descriptions, not inspected or reusable source."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://developers.openai.com/showcase/sunwake",
        "claim": "Official showcase establishes the project title, creator, GPT-6 Astra attribution and live deployment; it does not link a public source repository.",
        "kind": "official-docs"
      },
      {
        "url": "https://developers.openai.com/blog/how-to-build-games-with-astra",
        "claim": "Author article describes the game and its implementation at a high level and links the official gameplay image. No public source tree or immutable revision is provided.",
        "kind": "official-docs"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 Astra"
      ],
      "evidence": [
        {
          "url": "https://developers.openai.com/showcase/sunwake",
          "claim": "Official OpenAI showcase labels the project GPT-6 Astra and credits Thomas Ricouard, OpenAI."
        },
        {
          "url": "https://developers.openai.com/blog/how-to-build-games-with-astra",
          "claim": "Thomas Ricouard states that he used Astra in Codex to build Void Explorer and presents Sunwake and Hollowflux as the two subsequent complete-game prototypes in the same Astra game-building article."
        }
      ],
      "notes": "Official creator/publisher attribution. It does not establish exclusive model authorship, source availability, reuse permission, integration readiness or game quality."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "openai-sites-sunwake",
      "position": 78,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": null,
    "popularity": {
      "repo_url": "https://developers.openai.com/showcase/sunwake",
      "stars": null,
      "status": "not_github",
      "checked_at": "2026-09-10T21:30:00Z",
      "evidence_url": "https://developers.openai.com/showcase/sunwake",
      "notes": "This is an official OpenAI showcase page, not a public GitHub repository; GitHub stars and source availability do not apply."
    }
  },
  {
    "id": "supertux",
    "title": "SuperTux",
    "summary": "Side-scrolling platform game with substantial player-state and camera implementations.",
    "genres": [
      "platformer",
      "action"
    ],
    "runtime": "SuperTux native engine",
    "label": "Get game",
    "demoUrl": "https://www.supertux.org/download.html",
    "demoKind": "native-download",
    "repoUrl": "https://github.com/SuperTux/supertux",
    "projectUrl": "https://www.supertux.org/",
    "commit": "d7bde40da60e295ac801cd7ef928427920a254d2",
    "creator": "SuperTux contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "SuperTux Development Team; screenshot by Brmbrmcar (original upload log).",
      "licenseExpression": "GPL-2.0-or-later",
      "licenseUrls": [
        "https://www.gnu.org/licenses/old-licenses/gpl-2.0.html"
      ],
      "sourcePage": "https://commons.wikimedia.org/wiki/File:SuperTux_0.4.0_1st_level.png",
      "licenseEvidenceUrl": "https://commons.wikimedia.org/w/index.php?title=File%3ASuperTux+0.4.0+1st+level.png&oldid=1104799162",
      "captureDate": "2016-06-05",
      "versionRelation": "Historical image; relation to indexed source commit is unknown. Not a current build or play attestation.",
      "alt": "Snowy first level with Tux, platforms, enemies and the status display.",
      "sha256": "fec9ee287725f1252dea83d1d432188e8be2354973f97b00bbfd473300113835",
      "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cf/SuperTux_0.4.0_1st_level.png",
      "allowedUse": "Catalog display and redistributed original/thumbnail only with the listed attribution, license notices and applicable share-alike/source obligations. No endorsement implied.",
      "modifications": "Original image bytes retained unchanged; contact sheet scales an independent copy to fit, without content edits.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/design_flex_reviewer",
      "src": "assets/catalog/supertux.png",
      "localSourcePath": "research/catalog/media/supertux.png"
    },
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer distribution page or homepage entry point, not a browser game or proof that a release matches the inspected source commit. Native setup/content requirements apply.",
    "rights": {
      "code_license": "GPL-3.0-or-later",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/SuperTux/supertux/blob/d7bde40da60e295ac801cd7ef928427920a254d2/LICENSE.txt",
      "asset_status": "mixed",
      "asset_notes": "Root LICENSE is GPLv3; inspected player file retains GPL-2.0-or-later and camera GPL-3.0-or-later notices. README says most data also uses CC-BY-SA. Resolve exact selected asset/license and third-party font terms.",
      "scope_reuse_status": "review_required",
      "notes": "License summary identifies project terms, not blanket reuse clearance or any royalty agreement. Preserve notices; resolve selected files and transitive dependencies. See research/catalog/evidence/native-batch.json for actual batch timing; no individual timing was recorded."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/SuperTux/supertux/tree/d7bde40da60e295ac801cd7ef928427920a254d2",
    "platforms": [
      "Windows",
      "Linux",
      "macOS"
    ],
    "platformKind": "desktop",
    "capabilities": [
      "movement",
      "camera"
    ],
    "buildingBlocks": [
      {
        "name": "Platformer movement controller",
        "category": "movement",
        "evidence_url": "https://github.com/SuperTux/supertux/blob/d7bde40da60e295ac801cd7ef928427920a254d2/src/object/player.cpp",
        "source_path": "src/object/player.cpp",
        "status": "source_inspected",
        "notes": "Horizontal input changes acceleration, direction, duck/crawl and airborne behavior; many power-up, collision and sector dependencies."
      },
      {
        "name": "Scrolling and multiplayer camera",
        "category": "camera",
        "evidence_url": "https://github.com/SuperTux/supertux/blob/d7bde40da60e295ac801cd7ef928427920a254d2/src/object/camera.cpp",
        "source_path": "src/object/camera.cpp",
        "status": "source_inspected",
        "notes": "Camera update branches on player count and mode with prediction/scroll state; tied to viewport, sector and player models."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/SuperTux/supertux/blob/d7bde40da60e295ac801cd7ef928427920a254d2/README.md",
        "claim": "Inspected maintainer description, distribution links and declared scope; no execution.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/SuperTux/supertux/blob/d7bde40da60e295ac801cd7ef928427920a254d2/LICENSE.txt",
        "claim": "Inspected license text and declared project terms; selected scope and exceptions require review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/SuperTux/supertux/blob/d7bde40da60e295ac801cd7ef928427920a254d2/src/object/player.cpp",
        "claim": "Platformer movement controller: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/SuperTux/supertux/blob/d7bde40da60e295ac801cd7ef928427920a254d2/src/object/camera.cpp",
        "claim": "Scrolling and multiplayer camera: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "supertux",
      "position": 79,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 3138,
    "popularity": {
      "repo_url": "https://github.com/SuperTux/supertux",
      "stars": 3138,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/SuperTux/supertux",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "supertuxkart",
    "title": "SuperTuxKart",
    "summary": "Arcade kart racing with vehicle behavior and configurable follow cameras.",
    "genres": [
      "racing",
      "arcade"
    ],
    "runtime": "SuperTuxKart native engine",
    "label": "Get game",
    "demoUrl": "https://github.com/supertuxkart/stk-code/releases/latest",
    "demoKind": "native-download",
    "repoUrl": "https://github.com/supertuxkart/stk-code",
    "projectUrl": "https://supertuxkart.net/",
    "commit": "dbf200ccba14025bac7dc8d0318dcf5e55b6da18",
    "creator": "SuperTuxKart Team and contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "SuperTuxKart development team",
      "licenseExpression": "GPL-3.0-or-later AND CC-BY-SA-3.0",
      "licenseUrls": [
        "https://www.gnu.org/licenses/gpl-3.0.html",
        "https://creativecommons.org/licenses/by-sa/3.0/"
      ],
      "sourcePage": "https://commons.wikimedia.org/wiki/File:SuperTuxKart_0.8_screenshot.jpg",
      "licenseEvidenceUrl": "https://commons.wikimedia.org/w/index.php?title=File%3ASuperTuxKart+0.8+screenshot.jpg&oldid=1210223221",
      "captureDate": null,
      "versionRelation": "Historical image; relation to indexed source commit is unknown. Not a current build or play attestation.",
      "alt": "Kart driving along an island race track in SuperTuxKart 0.8.",
      "sha256": "2ee7f00a82c0770e0f12427022676f9bd9c00fd841583bd30389c9a50fdfe2a5",
      "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4d/SuperTuxKart_0.8_screenshot.jpg",
      "allowedUse": "Catalog display and redistributed original/thumbnail only with the listed attribution, license notices and applicable share-alike/source obligations. No endorsement implied.",
      "modifications": "Original image bytes retained unchanged; contact sheet scales an independent copy to fit, without content edits.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/design_flex_reviewer",
      "src": "assets/catalog/supertuxkart.jpg",
      "localSourcePath": "research/catalog/media/supertuxkart.jpg"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer distribution page or homepage entry point, not a browser game or proof that a release matches the inspected source commit. Native setup/content requirements apply.",
    "rights": {
      "code_license": "GPL-3.0-or-later",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/supertuxkart/stk-code/blob/dbf200ccba14025bac7dc8d0318dcf5e55b6da18/COPYING",
      "asset_status": "mixed",
      "asset_notes": "COPYING explicitly separates data under GPL, CC-BY, CC-BY-SA and public-domain terms. Per-directory licenses.txt files and the separately supplied asset collection need exact file/creator review.",
      "scope_reuse_status": "review_required",
      "notes": "License summary identifies project terms, not blanket reuse clearance or any royalty agreement. Preserve notices; resolve selected files and transitive dependencies. See research/catalog/evidence/native-batch.json for actual batch timing; no individual timing was recorded."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/supertuxkart/stk-code/tree/dbf200ccba14025bac7dc8d0318dcf5e55b6da18",
    "platforms": [
      "Windows",
      "Linux",
      "macOS",
      "Android"
    ],
    "platformKind": "desktop",
    "capabilities": [
      "vehicle-physics",
      "camera"
    ],
    "buildingBlocks": [
      {
        "name": "Kart vehicle behavior",
        "category": "vehicle-physics",
        "evidence_url": "https://github.com/supertuxkart/stk-code/blob/dbf200ccba14025bac7dc8d0318dcf5e55b6da18/src/karts/kart.cpp",
        "source_path": "src/karts/kart.cpp",
        "status": "source_inspected",
        "notes": "Kart lifecycle, speed and handling operate on Bullet transforms and race/controller state; importing the whole kart class would carry substantial coupling."
      },
      {
        "name": "Kart follow camera",
        "category": "camera",
        "evidence_url": "https://github.com/supertuxkart/stk-code/blob/dbf200ccba14025bac7dc8d0318dcf5e55b6da18/src/graphics/camera/camera_normal.cpp",
        "source_path": "src/graphics/camera/camera_normal.cpp",
        "status": "source_inspected",
        "notes": "CameraNormal smooths kart transforms and configurable follow distance/angle; tied to Bullet, Irrlicht-style vectors and shared user settings."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/supertuxkart/stk-code/blob/dbf200ccba14025bac7dc8d0318dcf5e55b6da18/README.md",
        "claim": "Inspected maintainer description, distribution links and declared scope; no execution.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/supertuxkart/stk-code/blob/dbf200ccba14025bac7dc8d0318dcf5e55b6da18/COPYING",
        "claim": "Inspected license text and declared project terms; selected scope and exceptions require review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/supertuxkart/stk-code/blob/dbf200ccba14025bac7dc8d0318dcf5e55b6da18/src/karts/kart.cpp",
        "claim": "Kart vehicle behavior: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/supertuxkart/stk-code/blob/dbf200ccba14025bac7dc8d0318dcf5e55b6da18/src/graphics/camera/camera_normal.cpp",
        "claim": "Kart follow camera: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "supertuxkart",
      "position": 80,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 5346,
    "popularity": {
      "repo_url": "https://github.com/supertuxkart/stk-code",
      "stars": 5346,
      "status": "available",
      "checked_at": "2026-09-10T19:48:26Z",
      "evidence_url": "https://api.github.com/repos/supertuxkart/stk-code",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "battle-for-wesnoth",
    "title": "The Battle for Wesnoth",
    "summary": "Fantasy tactical strategy with terrain-aware movement and combat evaluation.",
    "genres": [
      "turn-based-strategy",
      "tactics",
      "fantasy"
    ],
    "runtime": "Wesnoth native engine",
    "label": "Get game",
    "demoUrl": "https://wesnoth.itch.io/battle-for-wesnoth",
    "demoKind": "native-download",
    "repoUrl": "https://github.com/wesnoth/wesnoth",
    "projectUrl": "https://www.wesnoth.org/",
    "commit": "12b8f63f5b7a163c9a159705d288919bc53cc54b",
    "creator": "David White and Battle for Wesnoth contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "Mirgov",
      "licenseExpression": "GPL-2.0-or-later",
      "licenseUrls": [
        "https://www.gnu.org/licenses/old-licenses/gpl-2.0.html"
      ],
      "sourcePage": "https://commons.wikimedia.org/wiki/File:The_Battle_for_Wesnoth_Map_Screenshot_000.jpg",
      "licenseEvidenceUrl": "https://commons.wikimedia.org/w/index.php?title=File%3AThe+Battle+for+Wesnoth+Map+Screenshot+000.jpg&oldid=1243649444",
      "captureDate": "2013-06-07",
      "versionRelation": "Historical image; relation to indexed source commit is unknown. Not a current build or play attestation.",
      "alt": "Battle for Wesnoth terrain map with strategy-game interface.",
      "sha256": "5aa1dd62278fb808a32dbe1068eb2c26394f36949f3b1f4d61b507f9648bb004",
      "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/1/18/The_Battle_for_Wesnoth_Map_Screenshot_000.jpg",
      "allowedUse": "Catalog display and redistributed original/thumbnail only with the listed attribution, license notices and applicable share-alike/source obligations. No endorsement implied.",
      "modifications": "Original image bytes retained unchanged; contact sheet scales an independent copy to fit, without content edits.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/design_flex_reviewer",
      "src": "assets/catalog/wesnoth.jpg",
      "localSourcePath": "research/catalog/media/wesnoth.jpg"
    },
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer distribution page or homepage entry point, not a browser game or proof that a release matches the inspected source commit. Native setup/content requirements apply.",
    "rights": {
      "code_license": "GPL-2.0-or-later",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/wesnoth/wesnoth/blob/12b8f63f5b7a163c9a159705d288919bc53cc54b/COPYING",
      "asset_status": "mixed",
      "asset_notes": "README declares most legacy art/music GPL-2.0-or-later and new contributions CC-BY-SA-4.0. data/COPYING.txt and per-asset attribution must be resolved for selected sprites, portraits, music and campaigns.",
      "scope_reuse_status": "review_required",
      "notes": "License summary identifies project terms, not blanket reuse clearance or any royalty agreement. Preserve notices; resolve selected files and transitive dependencies. See research/catalog/evidence/native-batch.json for actual batch timing; no individual timing was recorded."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/wesnoth/wesnoth/tree/12b8f63f5b7a163c9a159705d288919bc53cc54b",
    "platforms": [
      "Windows",
      "Linux",
      "macOS"
    ],
    "platformKind": "desktop",
    "capabilities": [
      "pathfinding",
      "combat"
    ],
    "buildingBlocks": [
      {
        "name": "Terrain-aware movement costs",
        "category": "pathfinding",
        "evidence_url": "https://github.com/wesnoth/wesnoth/blob/12b8f63f5b7a163c9a159705d288919bc53cc54b/src/pathfind/pathfind.cpp",
        "source_path": "src/pathfind/pathfind.cpp",
        "status": "source_inspected",
        "notes": "Path costs depend on terrain, shroud, movement type and remaining turn allowance; adaptation requires hex map and team visibility rules."
      },
      {
        "name": "Combat simulation and comparison",
        "category": "combat",
        "evidence_url": "https://github.com/wesnoth/wesnoth/blob/12b8f63f5b7a163c9a159705d288919bc53cc54b/src/actions/attack.cpp",
        "source_path": "src/actions/attack.cpp",
        "status": "source_inspected",
        "notes": "Battle context lazily simulates combat and compares attack/defense outcomes; needs units, weapons, combatants and rules."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/wesnoth/wesnoth/blob/12b8f63f5b7a163c9a159705d288919bc53cc54b/README.md",
        "claim": "Inspected maintainer description, distribution links and declared scope; no execution.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/wesnoth/wesnoth/blob/12b8f63f5b7a163c9a159705d288919bc53cc54b/COPYING",
        "claim": "Inspected license text and declared project terms; selected scope and exceptions require review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/wesnoth/wesnoth/blob/12b8f63f5b7a163c9a159705d288919bc53cc54b/src/pathfind/pathfind.cpp",
        "claim": "Terrain-aware movement costs: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/wesnoth/wesnoth/blob/12b8f63f5b7a163c9a159705d288919bc53cc54b/src/actions/attack.cpp",
        "claim": "Combat simulation and comparison: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/wesnoth/wesnoth/blob/12b8f63f5b7a163c9a159705d288919bc53cc54b/data/COPYING.txt",
        "claim": "Inspected data license notice; individual media scope remains unresolved.",
        "kind": "license"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "battle-for-wesnoth",
      "position": 81,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 6870,
    "popularity": {
      "repo_url": "https://github.com/wesnoth/wesnoth",
      "stars": 6870,
      "status": "available",
      "checked_at": "2026-09-10T19:48:26Z",
      "evidence_url": "https://api.github.com/repos/wesnoth/wesnoth",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "astra-three-kingdoms",
    "title": "Three Kingdoms",
    "summary": "A historical territory-strategy game with officers and a campaign map.",
    "genres": [
      "strategy",
      "management"
    ],
    "runtime": "React",
    "label": "Play demo",
    "demoUrl": "https://sanguo-jiangshan.vercel.app/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/MartinDelophy/awesome-gpt-6-astra",
    "projectUrl": "https://sanguo-jiangshan.vercel.app/",
    "commit": "139a9287e763e5b592bb53fda97e5101db15db40",
    "creator": "MartinDelophy and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "react 19.2.8",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": null,
      "code_status": "unresolved",
      "code_evidence_url": null,
      "asset_status": "unreviewed",
      "asset_notes": "Selected artwork, audio, fonts, models and transitive dependencies are not fully reviewed. Upstream preview references are not cleared for redistribution.",
      "scope_reuse_status": "review_required",
      "notes": "Collection CC0 is not assumed to clear contributed game source. No explicit subproject license grant established."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/139a9287e763e5b592bb53fda97e5101db15db40",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "strategy",
      "character-data"
    ],
    "buildingBlocks": [
      {
        "name": "Territory economy and combat",
        "category": "strategy",
        "evidence_url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/three-kingdoms/game/engine.ts",
        "source_path": "works/three-kingdoms/game/engine.ts",
        "status": "source_inspected",
        "notes": "Engine couples city ownership, actions, troop costs and combat to roster data. No extraction or integration test."
      },
      {
        "name": "Officer roster data",
        "category": "character-data",
        "evidence_url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/three-kingdoms/game/officers.ts",
        "source_path": "works/three-kingdoms/game/officers.ts",
        "status": "source_inspected",
        "notes": "Typed officer stats and portrait indices form game content; portraits are separate assets. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/tree/139a9287e763e5b592bb53fda97e5101db15db40",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/three-kingdoms/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/three-kingdoms/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/three-kingdoms/CREATION.md",
        "claim": "Model attribution evidence inspected; exact contribution remains bounded in ai_provenance notes.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/three-kingdoms/game/engine.ts",
        "claim": "Territory economy and combat entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/three-kingdoms/game/officers.ts",
        "claim": "Officer roster data entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 Astra"
      ],
      "evidence": [
        {
          "url": "https://github.com/MartinDelophy/awesome-gpt-6-astra/blob/139a9287e763e5b592bb53fda97e5101db15db40/works/three-kingdoms/CREATION.md",
          "claim": "Creator-facing repository description, development record or linked author post attributes this represented work to GPT-6 Astra."
        }
      ],
      "notes": "Creator attributes iterative code/design to Astra; bitmap portraits and terrain used a separate image-generation tool."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "astra-three-kingdoms",
      "position": 82,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 135,
    "popularity": {
      "repo_url": "https://github.com/MartinDelophy/awesome-gpt-6-astra",
      "stars": 135,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/MartinDelophy/awesome-gpt-6-astra",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "philolabs-death-star-trench-run-gpt-astra",
    "title": "Trench Run — Astra",
    "summary": "A procedural Three.js cinematic space-flight scene.",
    "genres": [
      "simulation",
      "exploration"
    ],
    "runtime": "Three.js",
    "label": "Watch video",
    "demoUrl": "https://raw.githubusercontent.com/PhiloLabs/fable51-worlds/d24028466530a15d58d3d94537e6317b84101589/death-star-trench-run-gpt-astra/media/fable51-vs-gpt6-astra-trench-run.mp4",
    "demoKind": "video",
    "repoUrl": "https://github.com/PhiloLabs/fable51-worlds",
    "projectUrl": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589/death-star-trench-run-gpt-astra",
    "commit": "d24028466530a15d58d3d94537e6317b84101589",
    "creator": "PhiloLabs and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "demo",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "react 19.2.6; three ^0.185.1",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository declares MIT code/generated assets, with OSM ODbL and other geodata/reference obligations. Brands and recognizable fictional spacecraft/scenes need separate scope review; no blanket asset clearance.",
      "scope_reuse_status": "review_required",
      "notes": "Code license inspected; selected files, transitive dependencies and assets still require scope review."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "game-loop",
      "procedural-generation"
    ],
    "buildingBlocks": [
      {
        "name": "Mission timeline engine",
        "category": "game-loop",
        "evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/death-star-trench-run-gpt-astra/app/experience/engine.ts",
        "source_path": "death-star-trench-run-gpt-astra/app/experience/engine.ts",
        "status": "source_inspected",
        "notes": "MissionEngine coordinates chapter timing, flight state, audio, effects and environment. No extraction or integration test."
      },
      {
        "name": "Procedural spacecraft",
        "category": "procedural-generation",
        "evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/death-star-trench-run-gpt-astra/app/experience/vehicles.ts",
        "source_path": "death-star-trench-run-gpt-astra/app/experience/vehicles.ts",
        "status": "source_inspected",
        "notes": "Material-batched craft use minus-Z forward; recognizable fictional designs need separate review. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/death-star-trench-run-gpt-astra/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/death-star-trench-run-gpt-astra/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/README.md",
        "claim": "Model attribution evidence inspected; exact contribution remains bounded in ai_provenance notes.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/death-star-trench-run-gpt-astra/app/experience/engine.ts",
        "claim": "Mission timeline engine entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/death-star-trench-run-gpt-astra/app/experience/vehicles.ts",
        "claim": "Procedural spacecraft entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 Astra"
      ],
      "evidence": [
        {
          "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/README.md",
          "claim": "Creator-facing repository description, development record or linked author post attributes this represented work to GPT-6 Astra."
        }
      ],
      "notes": "Creator attribution describes development participation, not model certification, exclusive authorship or measured performance. Compared scenes are separate subprojects; one-shot is a creator workflow claim. Kyoto Astra documents source influence from Sakura Crossing and camera-comparison mismatches."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "philolabs-death-star-trench-run-gpt-astra",
      "position": 83,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 477,
    "popularity": {
      "repo_url": "https://github.com/PhiloLabs/fable51-worlds",
      "stars": 477,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/PhiloLabs/fable51-worlds",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "philolabs-death-star-trench-run",
    "title": "Trench Run — Fable 5.1",
    "summary": "A procedural Three.js cinematic space-flight scene.",
    "genres": [
      "simulation",
      "exploration"
    ],
    "runtime": "Three.js",
    "label": "Watch video",
    "demoUrl": "https://raw.githubusercontent.com/PhiloLabs/fable51-worlds/d24028466530a15d58d3d94537e6317b84101589/death-star-trench-run/media/trench-run.mp4",
    "demoKind": "video",
    "repoUrl": "https://github.com/PhiloLabs/fable51-worlds",
    "projectUrl": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589/death-star-trench-run",
    "commit": "d24028466530a15d58d3d94537e6317b84101589",
    "creator": "PhiloLabs and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "demo",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository declares MIT code/generated assets, with OSM ODbL and other geodata/reference obligations. Brands and recognizable fictional spacecraft/scenes need separate scope review; no blanket asset clearance.",
      "scope_reuse_status": "review_required",
      "notes": "Code license inspected; selected files, transitive dependencies and assets still require scope review."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "camera",
      "input"
    ],
    "buildingBlocks": [
      {
        "name": "Cinematic camera director",
        "category": "camera",
        "evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/death-star-trench-run/src/camera/director.ts",
        "source_path": "death-star-trench-run/src/camera/director.ts",
        "status": "source_inspected",
        "notes": "Shot contexts compose chase, spline, orbit and shake around the world sequence. No extraction or integration test."
      },
      {
        "name": "Flight input state",
        "category": "input",
        "evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/death-star-trench-run/src/core/input.ts",
        "source_path": "death-star-trench-run/src/core/input.ts",
        "status": "source_inspected",
        "notes": "Global key/pointer listeners record held/pressed states; lifecycle cleanup needs review. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/death-star-trench-run/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/death-star-trench-run/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/README.md",
        "claim": "Model attribution evidence inspected; exact contribution remains bounded in ai_provenance notes.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/death-star-trench-run/src/camera/director.ts",
        "claim": "Cinematic camera director entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/death-star-trench-run/src/core/input.ts",
        "claim": "Flight input state entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "Fable 5.1"
      ],
      "evidence": [
        {
          "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/README.md",
          "claim": "Creator-facing repository description, development record or linked author post attributes this represented work to Claude Fable 5.1."
        }
      ],
      "notes": "Creator attribution describes development participation, not model certification, exclusive authorship or measured performance. Compared scenes are separate subprojects; one-shot is a creator workflow claim. Kyoto Astra documents source influence from Sakura Crossing and camera-comparison mismatches."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "philolabs-death-star-trench-run",
      "position": 84,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 477,
    "popularity": {
      "repo_url": "https://github.com/PhiloLabs/fable51-worlds",
      "stars": 477,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/PhiloLabs/fable51-worlds",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "unciv",
    "title": "Unciv",
    "summary": "Moddable civilization strategy with city construction and turn-limited unit movement.",
    "genres": [
      "4x",
      "turn-based-strategy",
      "builder",
      "economy"
    ],
    "runtime": "libGDX",
    "label": "Get game",
    "demoUrl": "https://yairm210.itch.io/unciv",
    "demoKind": "native-download",
    "repoUrl": "https://github.com/yairm210/Unciv",
    "projectUrl": "https://yairm210.github.io/Unciv/",
    "commit": "0d7d1e43cd4776e04cd3f9eaf752527885123e62",
    "creator": "Yair Morgenstern and Unciv contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer distribution page or homepage entry point, not a browser game or proof that a release matches the inspected source commit. Native setup/content requirements apply.",
    "rights": {
      "code_license": "MPL-2.0",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/yairm210/Unciv/blob/0d7d1e43cd4776e04cd3f9eaf752527885123e62/LICENSE",
      "asset_status": "mixed",
      "asset_notes": "README explicitly lists mixed CC-BY-SA-4.0, CC-BY-3.0/4.0, CC0 and public-domain media; docs/Credits.md is the next per-file audit source. Original Civilization assets are not included as reusable rights.",
      "scope_reuse_status": "review_required",
      "notes": "License summary identifies project terms, not blanket reuse clearance or any royalty agreement. Preserve notices; resolve selected files and transitive dependencies. See research/catalog/evidence/native-batch.json for actual batch timing; no individual timing was recorded."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/yairm210/Unciv/tree/0d7d1e43cd4776e04cd3f9eaf752527885123e62",
    "platforms": [
      "Windows",
      "Linux",
      "macOS",
      "Android"
    ],
    "platformKind": "desktop",
    "capabilities": [
      "production-queues",
      "pathfinding"
    ],
    "buildingBlocks": [
      {
        "name": "City construction queue",
        "category": "production-queues",
        "evidence_url": "https://github.com/yairm210/Unciv/blob/0d7d1e43cd4776e04cd3f9eaf752527885123e62/core/src/com/unciv/logic/city/CityConstructions.kt",
        "source_path": "core/src/com/unciv/logic/city/CityConstructions.kt",
        "status": "source_inspected",
        "notes": "CityConstructions owns queued/in-progress buildings, units and overflow; tied to ruleset, city statistics and serialization."
      },
      {
        "name": "Unit movement and zone-of-control routing",
        "category": "pathfinding",
        "evidence_url": "https://github.com/yairm210/Unciv/blob/0d7d1e43cd4776e04cd3f9eaf752527885123e62/core/src/com/unciv/logic/map/mapunit/movement/UnitMovement.kt",
        "source_path": "core/src/com/unciv/logic/map/mapunit/movement/UnitMovement.kt",
        "status": "source_inspected",
        "notes": "UnitMovement selects pathing maps based on zone-of-control and escort settings; needs unit, tile map, movement budget and rules."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/yairm210/Unciv/blob/0d7d1e43cd4776e04cd3f9eaf752527885123e62/README.md",
        "claim": "Inspected maintainer description, distribution links and declared scope; no execution.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/yairm210/Unciv/blob/0d7d1e43cd4776e04cd3f9eaf752527885123e62/LICENSE",
        "claim": "Inspected license text and declared project terms; selected scope and exceptions require review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/yairm210/Unciv/blob/0d7d1e43cd4776e04cd3f9eaf752527885123e62/core/src/com/unciv/logic/city/CityConstructions.kt",
        "claim": "City construction queue: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/yairm210/Unciv/blob/0d7d1e43cd4776e04cd3f9eaf752527885123e62/core/src/com/unciv/logic/map/mapunit/movement/UnitMovement.kt",
        "claim": "Unit movement and zone-of-control routing: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "unciv",
      "position": 85,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 11257,
    "popularity": {
      "repo_url": "https://github.com/yairm210/Unciv",
      "stars": 11257,
      "status": "available",
      "checked_at": "2026-09-10T19:48:26Z",
      "evidence_url": "https://api.github.com/repos/yairm210/Unciv",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "philolabs-union-square-sf-gpt-astra",
    "title": "Union Square — Astra",
    "summary": "A procedural Three.js walkable urban scene with authored place-specific geometry.",
    "genres": [
      "simulation",
      "exploration"
    ],
    "runtime": "Three.js",
    "label": "Watch video",
    "demoUrl": "https://raw.githubusercontent.com/PhiloLabs/fable51-worlds/d24028466530a15d58d3d94537e6317b84101589/union-square-sf-gpt-astra/media/fable51-vs-gpt6-astra-union-square.mp4",
    "demoKind": "video",
    "repoUrl": "https://github.com/PhiloLabs/fable51-worlds",
    "projectUrl": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589/union-square-sf-gpt-astra",
    "commit": "d24028466530a15d58d3d94537e6317b84101589",
    "creator": "PhiloLabs and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "demo",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "three 0.185.0",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository declares MIT code/generated assets, with OSM ODbL and other geodata/reference obligations. Brands and recognizable fictional spacecraft/scenes need separate scope review; no blanket asset clearance.",
      "scope_reuse_status": "review_required",
      "notes": "Code license inspected; selected files, transitive dependencies and assets still require scope review."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "npc-ai",
      "camera"
    ],
    "buildingBlocks": [
      {
        "name": "Street activity",
        "category": "npc-ai",
        "evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/union-square-sf-gpt-astra/src/activity.ts",
        "source_path": "union-square-sf-gpt-astra/src/activity.ts",
        "status": "source_inspected",
        "notes": "Route animation loads local pedestrian/cable-car GLBs; resolve their separate asset scope. No extraction or integration test."
      },
      {
        "name": "World viewer runtime",
        "category": "camera",
        "evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/union-square-sf-gpt-astra/src/runtime.ts",
        "source_path": "union-square-sf-gpt-astra/src/runtime.ts",
        "status": "source_inspected",
        "notes": "Walk/free/orbit/tour modes share renderer, postprocessing, world targets and lighting. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/union-square-sf-gpt-astra/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/union-square-sf-gpt-astra/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/README.md",
        "claim": "Model attribution evidence inspected; exact contribution remains bounded in ai_provenance notes.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/union-square-sf-gpt-astra/src/activity.ts",
        "claim": "Street activity entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/union-square-sf-gpt-astra/src/runtime.ts",
        "claim": "World viewer runtime entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 Astra"
      ],
      "evidence": [
        {
          "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/README.md",
          "claim": "Creator-facing repository description, development record or linked author post attributes this represented work to GPT-6 Astra."
        }
      ],
      "notes": "Creator attribution describes development participation, not model certification, exclusive authorship or measured performance. Compared scenes are separate subprojects; one-shot is a creator workflow claim. Kyoto Astra documents source influence from Sakura Crossing and camera-comparison mismatches."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "philolabs-union-square-sf-gpt-astra",
      "position": 86,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 477,
    "popularity": {
      "repo_url": "https://github.com/PhiloLabs/fable51-worlds",
      "stars": 477,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/PhiloLabs/fable51-worlds",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "philolabs-union-square-sf",
    "title": "Union Square — Fable 5.1",
    "summary": "A procedural Three.js walkable urban scene with authored place-specific geometry.",
    "genres": [
      "simulation",
      "exploration"
    ],
    "runtime": "Three.js",
    "label": "Watch video",
    "demoUrl": "https://raw.githubusercontent.com/PhiloLabs/fable51-worlds/d24028466530a15d58d3d94537e6317b84101589/union-square-sf/media/union-square-walkthrough.mp4",
    "demoKind": "video",
    "repoUrl": "https://github.com/PhiloLabs/fable51-worlds",
    "projectUrl": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589/union-square-sf",
    "commit": "d24028466530a15d58d3d94537e6317b84101589",
    "creator": "PhiloLabs and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "demo",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "stylized"
    ],
    "runtimeVersion": "three ^0.185.1",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer link/source media only; no current browser play test or source/deployment match. Video references are not playable demos.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Repository declares MIT code/generated assets, with OSM ODbL and other geodata/reference obligations. Brands and recognizable fictional spacecraft/scenes need separate scope review; no blanket asset clearance.",
      "scope_reuse_status": "review_required",
      "notes": "Code license inspected; selected files, transitive dependencies and assets still require scope review."
    },
    "sourceInspectedAt": "2026-09-10T19:35:18Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "npc-ai",
      "movement"
    ],
    "buildingBlocks": [
      {
        "name": "Pedestrian behaviors",
        "category": "npc-ai",
        "evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/union-square-sf/src/life/Pedestrians.ts",
        "source_path": "union-square-sf/src/life/Pedestrians.ts",
        "status": "source_inspected",
        "notes": "Role-based state and route following depend on NavGraph, shared seed and place-specific seating. No extraction or integration test."
      },
      {
        "name": "Walk controls",
        "category": "movement",
        "evidence_url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/union-square-sf/src/player/WalkControls.ts",
        "source_path": "union-square-sf/src/player/WalkControls.ts",
        "status": "source_inspected",
        "notes": "Pointer-lock yaw/pitch and keyboard motion require the app collision world. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/tree/d24028466530a15d58d3d94537e6317b84101589",
        "claim": "GitHub identity and immutable source tree retrieved; no upstream execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/union-square-sf/README.md",
        "claim": "Project description, links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/LICENSE",
        "claim": "License text inspected; scope limitations retained.",
        "kind": "license"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/union-square-sf/package.json",
        "claim": "Runtime dependency declarations inspected; ranges do not establish compatibility.",
        "kind": "source"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/README.md",
        "claim": "Model attribution evidence inspected; exact contribution remains bounded in ai_provenance notes.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/union-square-sf/src/life/Pedestrians.ts",
        "claim": "Pedestrian behaviors entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      },
      {
        "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/union-square-sf/src/player/WalkControls.ts",
        "claim": "Walk controls entry points statically inspected; dependencies and coupling noted.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "Fable 5.1"
      ],
      "evidence": [
        {
          "url": "https://github.com/PhiloLabs/fable51-worlds/blob/d24028466530a15d58d3d94537e6317b84101589/README.md",
          "claim": "Creator-facing repository description, development record or linked author post attributes this represented work to Claude Fable 5.1."
        }
      ],
      "notes": "Creator attribution describes development participation, not model certification, exclusive authorship or measured performance. Compared scenes are separate subprojects; one-shot is a creator workflow claim. Kyoto Astra documents source influence from Sakura Crossing and camera-comparison mismatches."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "philolabs-union-square-sf",
      "position": 87,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 477,
    "popularity": {
      "repo_url": "https://github.com/PhiloLabs/fable51-worlds",
      "stars": 477,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/PhiloLabs/fable51-worlds",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "veloren",
    "title": "Veloren",
    "summary": "Voxel action RPG with terrain-aware agent traversal and ECS combat state.",
    "genres": [
      "rpg",
      "action",
      "exploration"
    ],
    "runtime": "Veloren native engine",
    "label": "Get game",
    "demoUrl": "https://veloren.net/download",
    "demoKind": "native-download",
    "repoUrl": "https://gitlab.com/veloren/veloren",
    "projectUrl": "https://veloren.net/",
    "commit": "5a8d6dc9d1bc543a59bed976007abecc248d9195",
    "creator": "Veloren contributors",
    "readiness": "review_required",
    "preview": {
      "credit": "Veloren Project",
      "licenseExpression": "GPL-3.0-or-later",
      "licenseUrls": [
        "https://www.gnu.org/licenses/gpl-3.0.html"
      ],
      "sourcePage": "https://commons.wikimedia.org/wiki/File:Veloren_Savannah_Screenshot.jpg",
      "licenseEvidenceUrl": "https://commons.wikimedia.org/w/index.php?title=File%3AVeloren+Savannah+Screenshot.jpg&oldid=1206827967",
      "captureDate": "2023-01-18",
      "versionRelation": "Historical image; relation to indexed source commit is unknown. Not a current build or play attestation.",
      "alt": "A third-person view across the savannah landscape in Veloren.",
      "sha256": "7fe1da94be67834d6a1e5cd1be3a0937e9a261587d1dd5ee2644896e8bd44bee",
      "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Veloren_Savannah_Screenshot.jpg",
      "allowedUse": "Catalog display and redistributed original/thumbnail only with the listed attribution, license notices and applicable share-alike/source obligations. No endorsement implied.",
      "modifications": "Original image bytes retained unchanged; contact sheet scales an independent copy to fit, without content edits.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/design_flex_reviewer",
      "src": "assets/catalog/veloren.jpg",
      "localSourcePath": "research/catalog/media/veloren.jpg"
    },
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "voxel"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer distribution page or homepage entry point, not a browser game or proof that a release matches the inspected source commit. Native setup/content requirements apply.",
    "rights": {
      "code_license": "GPL-3.0-only",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/veloren/veloren/blob/5a8d6dc9d1bc543a59bed976007abecc248d9195/LICENSE",
      "asset_status": "mixed",
      "asset_notes": "Repository README declares GPLv3; asset-level licenses need separate review. README screenshot banner has an explicit CC-BY-SA-4.0 snippet credited to Hrom; this clears neither all game assets nor other captures.",
      "scope_reuse_status": "review_required",
      "notes": "License summary identifies project terms, not blanket reuse clearance or any royalty agreement. Preserve notices; resolve selected files and transitive dependencies. See research/catalog/evidence/native-batch.json for actual batch timing; no individual timing was recorded."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://gitlab.com/veloren/veloren/-/tree/5a8d6dc9d1bc543a59bed976007abecc248d9195",
    "platforms": [
      "Windows",
      "Linux",
      "macOS"
    ],
    "platformKind": "desktop",
    "capabilities": [
      "pathfinding",
      "combat"
    ],
    "buildingBlocks": [
      {
        "name": "Agent route traversal",
        "category": "pathfinding",
        "evidence_url": "https://github.com/veloren/veloren/blob/5a8d6dc9d1bc543a59bed976007abecc248d9195/common/src/path.rs",
        "source_path": "common/src/path.rs",
        "status": "source_inspected",
        "notes": "Route/TraversalConfig and Chaser rely on voxel reads, A* and body/world state; not an isolated browser navigation package."
      },
      {
        "name": "ECS attack evaluation",
        "category": "combat",
        "evidence_url": "https://github.com/veloren/veloren/blob/5a8d6dc9d1bc543a59bed976007abecc248d9195/common/src/combat.rs",
        "source_path": "common/src/combat.rs",
        "status": "source_inspected",
        "notes": "Attack structures reference health, inventory, buffs, skills and ECS identities; extraction requires substantial rule and entity adapters."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/veloren/veloren/blob/5a8d6dc9d1bc543a59bed976007abecc248d9195/README.md",
        "claim": "Inspected maintainer description, distribution links and declared scope; no execution.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/veloren/veloren/blob/5a8d6dc9d1bc543a59bed976007abecc248d9195/LICENSE",
        "claim": "Inspected license text and declared project terms; selected scope and exceptions require review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/veloren/veloren/blob/5a8d6dc9d1bc543a59bed976007abecc248d9195/common/src/path.rs",
        "claim": "Agent route traversal: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/veloren/veloren/blob/5a8d6dc9d1bc543a59bed976007abecc248d9195/common/src/combat.rs",
        "claim": "ECS attack evaluation: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://veloren.net/joinus/",
        "claim": "Official community page identifies GitLab source and GitHub backup mirror; pinned files inspected through that mirror.",
        "kind": "official-docs"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "veloren",
      "position": 88,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": null,
    "popularity": {
      "repo_url": "https://gitlab.com/veloren/veloren",
      "stars": null,
      "status": "not_github",
      "checked_at": "2026-09-10T19:48:26Z",
      "evidence_url": "https://gitlab.com/veloren/veloren",
      "notes": "GitHub star metric does not apply to this repository host."
    }
  },
  {
    "id": "fable5-real-physics-engine",
    "title": "Veritas Physics Sandbox",
    "summary": "A browser rigid-body simulation toolkit with interactive scenes.",
    "genres": [
      "simulation",
      "physics"
    ],
    "runtime": "Canvas 2D",
    "label": "No demo",
    "demoUrl": null,
    "demoKind": "none",
    "repoUrl": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5",
    "projectUrl": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/tree/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/real-physics-engine",
    "commit": "2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8",
    "creator": "hamzabellouch and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "toolkit",
    "dimension": "2d",
    "visualStyle": [
      "procedural"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "unknown",
    "demoNotes": "Runnable browser source is present; no hosted browser demo established and no upstream build executed.",
    "rights": {
      "code_license": null,
      "code_status": "unresolved",
      "code_evidence_url": null,
      "asset_status": "unreviewed",
      "asset_notes": "Vendored libraries and procedural/reference assets need separate scope review.",
      "scope_reuse_status": "review_required",
      "notes": "No project-code license established. README educational/research description is not a reuse grant."
    },
    "sourceInspectedAt": "2026-09-10T19:36:55Z",
    "integrationFamily": "other-web-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "candidate_only",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/tree/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "physics"
    ],
    "buildingBlocks": [
      {
        "name": "Contact manifold generation",
        "category": "physics",
        "evidence_url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/real-physics-engine/src/collision.js",
        "source_path": "real-physics-engine/src/collision.js",
        "status": "source_inspected",
        "notes": "Sweep-and-prune and polygon/circle tests depend on shared body shape and vector contracts. No extraction or integration test."
      },
      {
        "name": "Sequential impulse solver",
        "category": "physics",
        "evidence_url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/real-physics-engine/src/solver.js",
        "source_path": "real-physics-engine/src/solver.js",
        "status": "source_inspected",
        "notes": "Warm-start contacts, friction and restitution require consistent manifold/body units and timestep. No extraction or integration test."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/tree/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8",
        "claim": "Repository identity and immutable source tree retrieved; no execution.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/README.md",
        "kind": "readme",
        "claim": "Creator description/model attribution inspected."
      },
      {
        "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/real-physics-engine/README.md",
        "kind": "readme",
        "claim": "Declared subproject behavior and static implementation entry points inspected."
      },
      {
        "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/real-physics-engine/src/collision.js",
        "kind": "source",
        "claim": "Declared subproject behavior and static implementation entry points inspected."
      },
      {
        "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/real-physics-engine/src/solver.js",
        "kind": "source",
        "claim": "Declared subproject behavior and static implementation entry points inspected."
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "Fable 5"
      ],
      "evidence": [
        {
          "url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5/blob/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/README.md",
          "claim": "Maintainer states repository prototypes were generated using Fable 5 and explicitly maps this subproject in the directory table."
        }
      ],
      "notes": "Repository-wide creator statement covers this listed prototype. No independent model certification, exclusive authorship, flight realism or performance validation."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "fable5-real-physics-engine",
      "position": 89,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 4,
    "popularity": {
      "repo_url": "https://github.com/hamzabellouch/Build-with-anthropic-fable-5",
      "stars": 4,
      "status": "available",
      "checked_at": "2026-09-10T19:48:25Z",
      "evidence_url": "https://api.github.com/repos/hamzabellouch/Build-with-anthropic-fable-5",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "openai-sites-void-explorer",
    "title": "Void Explorer",
    "summary": "A browser space-exploration game spanning procedural star systems, seamless planetary landings and on-foot exploration.",
    "genres": [
      "exploration",
      "space",
      "simulation"
    ],
    "runtime": "Three.js WebGPU / WebGL",
    "label": "Play demo",
    "demoUrl": "https://void-explorer.openai.chatgpt.site/",
    "demoKind": "browser",
    "repoUrl": "https://developers.openai.com/showcase/void-explorer",
    "projectUrl": "https://developers.openai.com/showcase/void-explorer",
    "commit": null,
    "creator": "Thomas Ricouard / OpenAI",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "game",
    "dimension": "3d",
    "visualStyle": [
      "procedural",
      "science-fiction",
      "cinematic"
    ],
    "runtimeVersion": null,
    "runtimeVersionStatus": "declared",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Official OpenAI showcase links this live Sites deployment. HeadStart has not yet completed an independent gameplay session or compatibility test.",
    "rights": {
      "code_license": null,
      "code_status": "unresolved",
      "code_evidence_url": null,
      "asset_status": "unreviewed",
      "asset_notes": "The official gameplay image has a narrow user-directed local catalog-display record; OpenAI does not provide an image reuse license or clear the depicted game assets on the inspected pages.",
      "scope_reuse_status": "review_required",
      "notes": "No public source repository, source revision or code license is linked from the inspected official pages. Treat as a playable reference only: no source export, code reuse or asset reuse is authorized."
    },
    "sourceInspectedAt": "2026-09-10T21:30:00Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "review_pending",
    "sourceAvailability": "no_public_source",
    "pinnedSourceUrl": null,
    "platforms": [
      "browser",
      "Sites"
    ],
    "platformKind": "browser",
    "capabilities": [
      "sites-hosted",
      "procedural-generation",
      "world",
      "flight",
      "movement"
    ],
    "buildingBlocks": [
      {
        "name": "Procedural streamed universe",
        "category": "world-generation",
        "evidence_url": "https://developers.openai.com/blog/how-to-build-games-with-astra",
        "source_path": null,
        "status": "maintainer_described",
        "notes": "The author describes 2,048 star systems, more than 10,000 generated planets and worker-based streaming. This is an editorial discovery lead from official descriptions, not inspected or reusable source."
      },
      {
        "name": "Seamless flight and landing loop",
        "category": "movement",
        "evidence_url": "https://developers.openai.com/showcase/void-explorer",
        "source_path": null,
        "status": "maintainer_described",
        "notes": "The author describes continuous flight, atmospheric entry, landing, walking and takeoff without loading screens. This is an editorial discovery lead from official descriptions, not inspected or reusable source."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://developers.openai.com/showcase/void-explorer",
        "claim": "Official showcase establishes the project title, creator, GPT-6 Astra attribution and live deployment; it does not link a public source repository.",
        "kind": "official-docs"
      },
      {
        "url": "https://developers.openai.com/blog/how-to-build-games-with-astra",
        "claim": "Author article describes the game and its implementation at a high level and links the official gameplay image. No public source tree or immutable revision is provided.",
        "kind": "official-docs"
      }
    ],
    "aiProvenance": {
      "status": "creator_attributed",
      "models": [
        "GPT-6 Astra"
      ],
      "evidence": [
        {
          "url": "https://developers.openai.com/showcase/void-explorer",
          "claim": "Official OpenAI showcase labels the project GPT-6 Astra and credits Thomas Ricouard, OpenAI."
        },
        {
          "url": "https://developers.openai.com/blog/how-to-build-games-with-astra",
          "claim": "Thomas Ricouard states that he used Astra in Codex to build Void Explorer and presents Sunwake and Hollowflux as the two subsequent complete-game prototypes in the same Astra game-building article."
        }
      ],
      "notes": "Official creator/publisher attribution. It does not establish exclusive model authorship, source availability, reuse permission, integration readiness or game quality."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "openai-sites-void-explorer",
      "position": 90,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": null,
    "popularity": {
      "repo_url": "https://developers.openai.com/showcase/void-explorer",
      "stars": null,
      "status": "not_github",
      "checked_at": "2026-09-10T21:30:00Z",
      "evidence_url": "https://developers.openai.com/showcase/void-explorer",
      "notes": "This is an official OpenAI showcase page, not a public GitHub repository; GitHub stars and source availability do not apply."
    }
  },
  {
    "id": "widelands",
    "title": "Widelands",
    "summary": "Settlement RTS centered on connected economies and staffed production buildings.",
    "genres": [
      "rts",
      "builder",
      "economy",
      "resource-management"
    ],
    "runtime": "Widelands / SDL",
    "label": "Get game",
    "demoUrl": "https://www.widelands.org/wiki/Download/",
    "demoKind": "native-download",
    "repoUrl": "https://github.com/widelands/widelands",
    "projectUrl": "https://www.widelands.org/",
    "commit": "187e4e257c2e127ec2c607f8c7765f774e2474ec",
    "creator": "Widelands Development Team",
    "readiness": "review_required",
    "preview": {
      "credit": "Widelands Development Team",
      "licenseExpression": "GPL-2.0-or-later",
      "licenseUrls": [
        "https://www.gnu.org/licenses/old-licenses/gpl-2.0.html"
      ],
      "sourcePage": "https://commons.wikimedia.org/wiki/File:Four_tribes_in_Widelands_Build_20.jpg",
      "licenseEvidenceUrl": "https://commons.wikimedia.org/w/index.php?title=File%3AFour+tribes+in+Widelands+Build+20.jpg&oldid=1166155186",
      "captureDate": "2019-01-03",
      "versionRelation": "Historical image; relation to indexed source commit is unknown. Not a current build or play attestation.",
      "alt": "Four tribes represented in a Widelands Build 20 settlement scene.",
      "sha256": "93d2af2a0de094a264f341787fadff46af61f5369b67ad3d380de5669ccbe10f",
      "originalUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Four_tribes_in_Widelands_Build_20.jpg",
      "allowedUse": "Catalog display and redistributed original/thumbnail only with the listed attribution, license notices and applicable share-alike/source obligations. No endorsement implied.",
      "modifications": "Original image bytes retained unchanged; contact sheet scales an independent copy to fit, without content edits.",
      "rightsStatus": "reviewed_for_catalog_display",
      "reviewer": "root media author; independently reviewed by /root/design_flex_reviewer",
      "src": "assets/catalog/widelands.jpg",
      "localSourcePath": "research/catalog/media/widelands.jpg"
    },
    "contentKind": "game",
    "dimension": "2d",
    "visualStyle": [],
    "runtimeVersion": null,
    "runtimeVersionStatus": "unknown",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "Maintainer distribution page or homepage entry point, not a browser game or proof that a release matches the inspected source commit. Native setup/content requirements apply.",
    "rights": {
      "code_license": "GPL-2.0-or-later",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/widelands/widelands/blob/187e4e257c2e127ec2c607f8c7765f774e2474ec/COPYING",
      "asset_status": "mixed",
      "asset_notes": "README declares GPL-2.0-or-later with some assets under Creative Commons; Debian copyright lists per-path exceptions. Resolve selected tribe art, music and fonts before extraction or display.",
      "scope_reuse_status": "review_required",
      "notes": "License summary identifies project terms, not blanket reuse clearance or any royalty agreement. Preserve notices; resolve selected files and transitive dependencies. See research/catalog/evidence/native-batch.json for actual batch timing; no individual timing was recorded."
    },
    "sourceInspectedAt": "2026-09-10T17:34:56.320282+00:00",
    "integrationFamily": "reference-only",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/widelands/widelands/tree/187e4e257c2e127ec2c607f8c7765f774e2474ec",
    "platforms": [
      "Windows",
      "Linux",
      "macOS"
    ],
    "platformKind": "desktop",
    "capabilities": [
      "economy",
      "production-queues"
    ],
    "buildingBlocks": [
      {
        "name": "Connected production economy",
        "category": "economy",
        "evidence_url": "https://github.com/widelands/widelands/blob/187e4e257c2e127ec2c607f8c7765f774e2474ec/src/economy/economy.cc",
        "source_path": "src/economy/economy.cc",
        "status": "source_inspected",
        "notes": "Economy checks occupied sites and input queues within road networks; needs tribe definitions, owner state, flags and warehouses."
      },
      {
        "name": "Production-site programs",
        "category": "production-queues",
        "evidence_url": "https://github.com/widelands/widelands/blob/187e4e257c2e127ec2c607f8c7765f774e2474ec/src/logic/map_objects/tribes/productionsite.cc",
        "source_path": "src/logic/map_objects/tribes/productionsite.cc",
        "status": "source_inspected",
        "notes": "Production-site definitions load Lua input/output programs and workers; adaptation needs building descriptors, worker lifecycles and economy routing."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/widelands/widelands/blob/187e4e257c2e127ec2c607f8c7765f774e2474ec/README.md",
        "claim": "Inspected maintainer description, distribution links and declared scope; no execution.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/widelands/widelands/blob/187e4e257c2e127ec2c607f8c7765f774e2474ec/COPYING",
        "claim": "Inspected license text and declared project terms; selected scope and exceptions require review.",
        "kind": "license"
      },
      {
        "url": "https://github.com/widelands/widelands/blob/187e4e257c2e127ec2c607f8c7765f774e2474ec/src/economy/economy.cc",
        "claim": "Connected production economy: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/widelands/widelands/blob/187e4e257c2e127ec2c607f8c7765f774e2474ec/src/logic/map_objects/tribes/productionsite.cc",
        "claim": "Production-site programs: inspected declarations and relevant behavior; not isolated or tested.",
        "kind": "source"
      },
      {
        "url": "https://github.com/widelands/widelands/blob/187e4e257c2e127ec2c607f8c7765f774e2474ec/debian/copyright",
        "claim": "Inspected packaging copyright map for code/data exceptions.",
        "kind": "license"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "widelands",
      "position": 91,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 3053,
    "popularity": {
      "repo_url": "https://github.com/widelands/widelands",
      "stars": 3053,
      "status": "available",
      "checked_at": "2026-09-10T19:48:26Z",
      "evidence_url": "https://api.github.com/repos/widelands/widelands",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  },
  {
    "id": "yuka",
    "title": "Yuka",
    "summary": "Game-AI modules for steering, stateful agents, navigation and perception, independent of the renderer.",
    "genres": [
      "strategy",
      "simulation",
      "action"
    ],
    "runtime": "Engine-independent JavaScript",
    "label": "Play demo",
    "demoUrl": "https://mugen87.github.io/yuka/examples/",
    "demoKind": "browser",
    "repoUrl": "https://github.com/Mugen87/yuka",
    "projectUrl": "https://mugen87.github.io/yuka/",
    "commit": "10591304811222d6856020d5de129b39ef43b58d",
    "creator": "Mugen87 and contributors",
    "readiness": "review_required",
    "preview": null,
    "contentKind": "toolkit",
    "dimension": "3d",
    "visualStyle": [
      "configurable"
    ],
    "runtimeVersion": "0.7.8",
    "runtimeVersionStatus": "inspected",
    "interactiveStatus": "not_tested",
    "demoSourceRelation": "maintainer_linked",
    "demoNotes": "URL from maintainer README or repository homepage; no source/deployment revision match established.",
    "rights": {
      "code_license": "MIT",
      "code_status": "inspected",
      "code_evidence_url": "https://github.com/Mugen87/yuka/blob/10591304811222d6856020d5de129b39ef43b58d/LICENSE",
      "asset_status": "unreviewed",
      "asset_notes": "Core code license inspected; example models and textures have separate unreviewed scope.",
      "scope_reuse_status": "review_required",
      "notes": "License file inspected for repository code; selected files, dependencies and assets need a complete scope review before reuse."
    },
    "sourceInspectedAt": "2026-09-10T17:33:07Z",
    "integrationFamily": "threejs-r3f-candidate",
    "catalogStatus": "local_research_preview",
    "discoveryDecision": "internal_reference_ready",
    "sourceAvailability": "pinned_public_source",
    "pinnedSourceUrl": "https://github.com/Mugen87/yuka/tree/10591304811222d6856020d5de129b39ef43b58d",
    "platforms": [
      "browser"
    ],
    "platformKind": "browser",
    "capabilities": [
      "enemy-ai",
      "steering"
    ],
    "buildingBlocks": [
      {
        "name": "Finite-state agents",
        "category": "enemy-ai",
        "evidence_url": "https://github.com/Mugen87/yuka/blob/10591304811222d6856020d5de129b39ef43b58d/src/fsm/StateMachine.js",
        "source_path": "src/fsm/StateMachine.js",
        "status": "source_inspected",
        "notes": "StateMachine manages current/previous/global state and serialization; depends on State and owner entity contracts."
      },
      {
        "name": "Seek steering force",
        "category": "steering",
        "evidence_url": "https://github.com/Mugen87/yuka/blob/10591304811222d6856020d5de129b39ef43b58d/src/steering/behaviors/SeekBehavior.js",
        "source_path": "src/steering/behaviors/SeekBehavior.js",
        "status": "source_inspected",
        "notes": "Computes steering toward a target using its own Vector3 type; bridge simulation units and update timing to the host."
      }
    ],
    "sourceEvidence": [
      {
        "url": "https://github.com/Mugen87/yuka/tree/10591304811222d6856020d5de129b39ef43b58d",
        "claim": "Repository identity and pinned source tree retrieved through GitHub API.",
        "kind": "repository"
      },
      {
        "url": "https://github.com/Mugen87/yuka/blob/10591304811222d6856020d5de129b39ef43b58d/README.md",
        "claim": "Project purpose, maintainer links and declared feature context inspected.",
        "kind": "readme"
      },
      {
        "url": "https://github.com/Mugen87/yuka/blob/10591304811222d6856020d5de129b39ef43b58d/LICENSE",
        "claim": "License text inspected; scope and exceptions retained in rights notes.",
        "kind": "license"
      },
      {
        "url": "https://github.com/Mugen87/yuka/blob/10591304811222d6856020d5de129b39ef43b58d/package.json",
        "claim": "Dependency/runtime declarations inspected; ranges are not tested compatibility guarantees.",
        "kind": "source"
      },
      {
        "url": "https://github.com/Mugen87/yuka/blob/10591304811222d6856020d5de129b39ef43b58d/src/fsm/StateMachine.js",
        "claim": "Finite-state agents entry points statically inspected; not executed.",
        "kind": "source"
      },
      {
        "url": "https://github.com/Mugen87/yuka/blob/10591304811222d6856020d5de129b39ef43b58d/src/steering/behaviors/SeekBehavior.js",
        "claim": "Seek steering force entry points statically inspected; not executed.",
        "kind": "source"
      }
    ],
    "aiProvenance": {
      "status": "unknown",
      "models": [],
      "evidence": [],
      "notes": "No creator model attribution has been established."
    },
    "interfaceLanguages": [
      "unknown"
    ],
    "notoriety": {
      "status": "unknown",
      "metrics": [],
      "notes": "No public usage count recorded."
    },
    "editorialRank": {
      "record_id": "yuka",
      "position": 92,
      "rationale": "Restored research reference, listed after the previously visible 41 at user request. Alphabetical within this group; original source, demo, rights and media limitations remain.",
      "signals": {}
    },
    "githubStars": 1366,
    "popularity": {
      "repo_url": "https://github.com/Mugen87/yuka",
      "stars": 1366,
      "status": "available",
      "checked_at": "2026-09-10T19:48:24Z",
      "evidence_url": "https://api.github.com/repos/Mugen87/yuka",
      "notes": "Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence."
    }
  }
];
