window.HEADSTART_CATALOG = [
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
  }
];
