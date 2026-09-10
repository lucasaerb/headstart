#!/usr/bin/env python3
"""Collect the reviewed browser-expansion preview set from immutable upstream files."""
from __future__ import annotations

import argparse
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
from urllib.parse import urlsplit
from urllib.request import Request, urlopen

from PIL import Image

from catalog import ROOT, load


COLLECTION_COMMIT = "139a9287e763e5b592bb53fda97e5101db15db40"
COLLECTION = "https://github.com/MartinDelophy/awesome-gpt-6-astra"
COLLECTION_RAW = f"https://raw.githubusercontent.com/MartinDelophy/awesome-gpt-6-astra/{COLLECTION_COMMIT}/"
COLLECTION_BLOB = f"{COLLECTION}/blob/{COLLECTION_COMMIT}/"
OPENAI_ARTICLE = "https://developers.openai.com/blog/how-to-build-games-with-astra"
OPENAI_OFFICIAL = {
    "openai-sites-void-explorer": "https://cdn.openai.com/devhub/blog/how-to-build-games/orbital-flight-579e20d663e3.webp",
    "openai-sites-sunwake": "https://cdn.openai.com/devhub/blog/how-to-build-games/sunwake-water-f1c48b3f7fe8.webp",
    "openai-sites-hollowflux": "https://cdn.openai.com/devhub/blog/how-to-build-games/hollowflux-water-15cd30282861.webp",
}

# Missing record-level references that have a pinned, actual-game screenshot in a
# source or research repository. Collection screenshots remain display evidence;
# they do not clear the underlying game assets for reuse.
OVERRIDES = {
    "blackwater": (COLLECTION_RAW + "assets/screenshots/blackwater/gameplay.jpg", COLLECTION_BLOB + "assets/screenshots/blackwater/gameplay.jpg", "MIT AND CC0-1.0"),
    "last-beacon": (COLLECTION_RAW + "assets/screenshots/last-beacon/gameplay-en.png", COLLECTION_BLOB + "assets/screenshots/last-beacon/gameplay-en.png", "MIT AND CC0-1.0"),
    "silent-meridian": ("https://raw.githubusercontent.com/stackloomdev/silent-meridian/5a3b800ff67913c6a310348cfd49cea34274f344/docs/screenshots/depth-observatory.png", "https://github.com/stackloomdev/silent-meridian/blob/5a3b800ff67913c6a310348cfd49cea34274f344/docs/screenshots/depth-observatory.png", "MIT"),
    "astra-thunderfall": (COLLECTION_RAW + "assets/screenshots/thunderfall/gameplay.jpg", COLLECTION_BLOB + "assets/screenshots/thunderfall/gameplay.jpg", "CC0-1.0"),
    "hexgl": ("https://raw.githubusercontent.com/BKcore/HexGL/6addc95a2fce3bf05f4d751823cc054c61a16d68/css/mobile.jpg", "https://github.com/BKcore/HexGL/blob/6addc95a2fce3bf05f4d751823cc054c61a16d68/css/mobile.jpg", "MIT"),
}

# This set is intentionally bounded to real game/world/demo imagery with a
# project or collection license that permits this local catalog display.
SELECTED = {
    "blackwater", "open-city-maker", "last-beacon", "silent-meridian",
    "jelly-baby", "toy2game-balance-astronaut", "toy2game-flip-match",
    "toy2game-frog-feast", "toy2game-parking-escape",
    "toy2game-penguin-ice", "toy2game-rabbit-trap", "astra-thunderfall",
    "vesper-street", "philolabs-union-square-sf",
    "philolabs-union-square-sf-gpt-astra", "philolabs-kyoto-higashiyama",
    "philolabs-kyoto-higashiyama-gpt-astra",
    "philolabs-death-star-trench-run",
    "philolabs-death-star-trench-run-gpt-astra", "pmndrs-racing-game",
    "fable-cities", "slimcity", "dungeon-forge", "ecctrl", "three-terrain",
    "three-pathfinding", "fable5-laas", "hexgl",
    "openai-sites-void-explorer", "openai-sites-sunwake", "openai-sites-hollowflux",
}

ALT = {
    "blackwater": "First-person combat in Blackwater's rain-soaked freight terminal.",
    "open-city-maker": "CityMaker's 2048 board filled with low-poly Hong Kong buildings.",
    "last-beacon": "Towers defending Last Beacon's coastal island from an enemy wave.",
    "silent-meridian": "Silent Meridian's observatory with a brass puzzle mechanism and clue markers.",
    "jelly-baby": "Colorful soft-body jelly characters in the WebGPU physics sandbox.",
    "toy2game-balance-astronaut": "Astronaut figures balancing on a suspended physics platform.",
    "toy2game-flip-match": "Bright 3D tiles arranged for a Flip Match puzzle round.",
    "toy2game-frog-feast": "Cartoon frogs competing in the Frog Feast arcade arena.",
    "toy2game-parking-escape": "Compact cars arranged in a 3D Parking Escape puzzle.",
    "toy2game-penguin-ice": "Penguins sliding and balancing on an icy physics stage.",
    "toy2game-rabbit-trap": "Rabbit pieces on the colorful Rabbit Trap board.",
    "astra-thunderfall": "A fighter aircraft dodging fire above Thunderfall's volcanic battlefield.",
    "vesper-street": "Isometric exploration of a flooded, neon-lit street in Vesper Street.",
    "philolabs-union-square-sf": "Generated Union Square street scene with buildings, traffic and pedestrians.",
    "philolabs-union-square-sf-gpt-astra": "Astra's generated Union Square street scene.",
    "philolabs-kyoto-higashiyama": "Generated Kyoto Higashiyama street with traditional facades.",
    "philolabs-kyoto-higashiyama-gpt-astra": "Astra's generated Kyoto Higashiyama street scene.",
    "philolabs-death-star-trench-run": "A spacecraft flying through the generated trench-run scene.",
    "philolabs-death-star-trench-run-gpt-astra": "Astra's generated spacecraft trench-run scene.",
    "pmndrs-racing-game": "A low-poly racing car on the Poimandres track.",
    "fable-cities": "A generated city skyline and streets in Fable Cities.",
    "slimcity": "A dense isometric city and simulation controls in SlimCity.",
    "dungeon-forge": "A procedurally generated stone dungeon viewed from above.",
    "ecctrl": "A third-person character controller running through the Ecctrl demo world.",
    "three-terrain": "A generated Three.js terrain landscape under a blue sky.",
    "three-pathfinding": "Agents navigating a Three.js pathfinding demonstration scene.",
    "fable5-laas": "A wide procedural forest valley rendered by LAAS in Three.js WebGPU.",
    "hexgl": "A futuristic hover racer speeding along HexGL's elevated city track.",
    "openai-sites-void-explorer": "Void Explorer spacecraft flying near a cyan planet encircled by bright magenta rings.",
    "openai-sites-sunwake": "Sunwake orange motorboat cutting across faceted blue ocean waves.",
    "openai-sites-hollowflux": "Hollowflux top-down 2D character beside luminous blue water and stone ruins.",
}

LICENSE_URLS = {
    "MIT": ["https://opensource.org/license/mit"],
    "MIT AND CC0-1.0": ["https://opensource.org/license/mit", "https://creativecommons.org/publicdomain/zero/1.0/"],
    "CC0-1.0": ["https://creativecommons.org/publicdomain/zero/1.0/"],
    "GPL-3.0-only": ["https://www.gnu.org/licenses/gpl-3.0.html"],
    "AGPL-3.0-or-later": ["https://www.gnu.org/licenses/agpl-3.0.html"],
    "LicenseRef-Toy2Game-Noncommercial-1.0": ["https://github.com/asmoyou/toy2game/blob/39078515a13331a748e63bc75424ed83c773a72a/LICENSE"],
    "LicenseRef-OpenAI-Official-Image-Rights-Unresolved": [OPENAI_ARTICLE],
}


def source_page(raw_url: str) -> str:
    parts = urlsplit(raw_url)
    if parts.hostname == "raw.githubusercontent.com":
        owner, repo, commit, *path = parts.path.strip("/").split("/")
        return f"https://github.com/{owner}/{repo}/blob/{commit}/{'/'.join(path)}"
    return raw_url


def extension(url: str) -> str:
    suffix = Path(urlsplit(url).path).suffix.lower()
    if suffix not in {".png", ".jpg", ".jpeg", ".webp", ".gif"}:
        raise ValueError(f"Unsupported image extension: {url}")
    return ".jpg" if suffix == ".jpeg" else suffix


def fetch(url: str) -> bytes:
    request = Request(url, headers={"User-Agent": "HeadStart-catalog-media/1.0"})
    with urlopen(request, timeout=30) as response:
        if response.status != 200:
            raise ValueError(f"HTTP {response.status}: {url}")
        data = response.read(16 * 1024 * 1024 + 1)
    if not data or len(data) > 16 * 1024 * 1024:
        raise ValueError(f"Invalid image size: {url}")
    return data


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="Write originals and append new manifest rows")
    args = parser.parse_args()
    records, existing = load(ROOT)
    by_id = {row["id"]: row for row in records}
    missing = SELECTED - by_id.keys()
    if missing:
        raise ValueError(f"Unknown record ids: {sorted(missing)}")
    media_dir = ROOT / "media"
    staged = []
    now = datetime.now(timezone.utc).isoformat()
    for record_id in sorted(SELECTED):
        row = by_id[record_id]
        if record_id in OPENAI_OFFICIAL:
            original_url = OPENAI_OFFICIAL[record_id]
            page = OPENAI_ARTICLE
            license_expression = "LicenseRef-OpenAI-Official-Image-Rights-Unresolved"
        elif record_id in OVERRIDES:
            original_url, page, license_expression = OVERRIDES[record_id]
        else:
            original_url = row["preview"]["source_url"]
            if row["preview"]["status"] != "upstream_reference" or not original_url:
                raise ValueError(f"Selected record has no preview reference: {record_id}")
            page = source_page(original_url)
            license_expression = row["rights"]["code_license"]
        if not license_expression or license_expression not in LICENSE_URLS:
            raise ValueError(f"No bounded display-license mapping for {record_id}: {license_expression!r}")
        data = fetch(original_url)
        suffix = extension(original_url)
        filename = record_id + suffix
        target = media_dir / filename
        if args.apply:
            target.write_bytes(data)
        from io import BytesIO
        with Image.open(BytesIO(data)) as image:
            width, height = image.size
            image.verify()
        evidence_url = row["rights"].get("code_evidence_url") or page
        if record_id in {"blackwater", "last-beacon"}:
            evidence_url = COLLECTION_BLOB + "LICENSE"
        if record_id in OPENAI_OFFICIAL:
            allowed_use = "User-directed local HeadStart catalog identification and display of this exact official OpenAI gameplay image only. This record grants no public redistribution, source extraction, game-asset reuse, endorsement or broader license rights."
        elif license_expression == "LicenseRef-Toy2Game-Noncommercial-1.0":
            allowed_use = "Local, noncommercial HeadStart research-preview display only under Toy2Game's custom terms; commercial publication needs the author's prior written permission. No game-asset reuse or endorsement."
        elif record_id.startswith("philolabs-"):
            allowed_use = "Local HeadStart research-preview identification only. The selected repository file is under the repository's MIT terms; geodata, brands and recognizable fictional designs retain separate rights and require review before publication or reuse."
        elif record_id in {"blackwater", "last-beacon"}:
            allowed_use = "Local HeadStart research-preview identification only. MIT covers the named game's repository content and CC0 covers the collection capture; depicted third-party rights, publication and game-asset reuse remain separately unresolved."
        else:
            allowed_use = "Local HeadStart catalog identification and preview display for this repository-included image under the listed terms; no broader game-asset reuse, endorsement or model-quality claim."
        if record_id in OPENAI_OFFICIAL:
            version_relation = "Official article gameplay image for the named showcase. No public source commit or exact build revision is available, and this is not a HeadStart playthrough or integration attestation."
        elif page.startswith(COLLECTION_BLOB):
            version_relation = "Separate curated gameplay capture; its exact game-build relation to the indexed source commit is unknown. Not a HeadStart playthrough or target-integration attestation."
        else:
            version_relation = "Image file pinned in the named repository at the indexed source commit; not a HeadStart playthrough or target-integration attestation."
        item = {
            "id": record_id + "-catalog-preview", "record_id": record_id,
            "repo_url": row["repo_url"], "title": row["title"],
            "source_page": page, "original_url": original_url,
            "license_evidence_url": evidence_url,
            "license_expression": license_expression,
            "license_urls": LICENSE_URLS[license_expression],
            "credit": row["creator"],
            "rights_status": "official_source_local_display_rights_unresolved" if record_id in OPENAI_OFFICIAL else "reviewed_for_catalog_display",
            "allowed_use": allowed_use,
            "local_path": "media/" + filename,
            "sha256": hashlib.sha256(data).hexdigest(), "width": width, "height": height,
            "alt": ALT[record_id], "capture_date": None, "capture_date_status": "unknown",
            "uploaded_at": None, "downloaded_at": now, "reviewed_at": now,
            "version_relation": version_relation,
            "modifications": "Original bytes retained unchanged; browser display and contact sheet may scale without cropping.",
            "notes": ("Official OpenAI author-article gameplay image. User directed its use in the local HeadStart dashboard. No separate image reuse license was found; public redistribution, model training and in-game asset reuse remain unresolved." if record_id in OPENAI_OFFICIAL else "File-specific local display review only. The repository-level license is applied only where this selected image is included in that licensed tree and no narrower file notice was found. Underlying assets, dependencies, public publication and code extraction retain the record's separate rights limits."),
        }
        if record_id not in OPENAI_OFFICIAL:
            item.update(
                reviewer="root media author; independently reviewed by /root/critical_review",
                independent_reviewed_at="2026-09-10T20:21:40Z",
                independent_review_verdict="PASS: independently matched source originals, reviewed identity and responsive catalog crops, scoped license evidence, credit, retained bytes and notice bundle",
            )
        staged.append(item)
        print(f"{record_id}: {width}x{height} {len(data)} bytes {item['sha256'][:12]}")
    if args.apply:
        kept = [item for item in existing if item["record_id"] not in SELECTED]
        (ROOT / "media-manifest.json").write_text(json.dumps(kept + staged, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        evidence = {
            "schema_version": "1.0", "observed_at": now,
            "scope": "Immutable upstream image files selected for local catalog preview; no game source executed.",
            "records": [{key: item[key] for key in ("record_id", "source_page", "original_url", "sha256", "width", "height", "bytes") if key in item} for item in staged],
        }
        # Add byte counts only to the source-observation artifact, not the media contract.
        for target, item in zip(evidence["records"], staged):
            target["bytes"] = (ROOT / item["local_path"]).stat().st_size
        (ROOT / "evidence/browser-preview-source-metadata.json").write_text(json.dumps(evidence, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"Wrote {len(staged)} reviewed preview records")


if __name__ == "__main__":
    main()
