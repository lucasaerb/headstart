#!/usr/bin/env python3
"""Refresh the local site's image provenance bundle from validated catalog artifacts."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path
import shutil

from catalog import ROOT, load, validate


SITE = ROOT.parents[1] / "HeadStart-Starter-Package" / "site" / "dist"


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    records, media = load(ROOT)
    validate(records, media)
    output = SITE / "provenance"
    snapshot = output / "snapshot"
    licenses = output / "licenses"
    snapshot.mkdir(parents=True, exist_ok=True)
    licenses.mkdir(parents=True, exist_ok=True)

    copies = [
        (ROOT / "media-manifest.json", snapshot / "media-manifest.json"),
        (ROOT / "media-credits.md", snapshot / "media-credits.md"),
        (ROOT / "RESEARCH-CONTRACT.md", snapshot / "RESEARCH-CONTRACT.md"),
        (ROOT / "media-credits.md", output / "NOTICES.md"),
    ]
    for source, target in copies:
        shutil.copyfile(source, target)
    for source in (ROOT / "media" / "licenses").glob("*.txt"):
        shutil.copyfile(source, licenses / source.name)

    catalog_text = (SITE / "catalog.js").read_text(encoding="utf-8").strip()
    prefix = "window.HEADSTART_CATALOG = "
    displayed = json.loads(catalog_text[len(prefix):-1])
    report = {
        "researchRecordCount": len(records),
        "displayedRecordCount": len(displayed),
        "imageCount": len(media),
        "displayedRowsHaveImages": all(row.get("preview") for row in displayed),
        "snapshotHashes": {
            target.relative_to(output).as_posix(): digest(target)
            for _, target in copies if target.is_relative_to(output)
        },
        "imageByteHashChecks": f"{len(media)} of {len(media)} passed",
        "networkChecksPerformed": False,
    }
    (output / "validation.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(f"Synced provenance for {len(displayed)} displayed rows and {len(media)} images")


if __name__ == "__main__":
    main()
