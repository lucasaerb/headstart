#!/usr/bin/env python3
"""Build and query the provisional research index; never executes upstream code.

Python 3.10+ standard library only. Source JSON is authoritative; SQLite/CSV/Markdown
are disposable derived exports. This is not the production publication pipeline.
"""
from __future__ import annotations

import argparse
import collections
from contextlib import closing
import csv
from datetime import datetime
import hashlib
import json
import math
import re
import sqlite3
import sys
import tempfile
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = {
    "id", "title", "repo_url", "project_url", "creator", "summary",
    "subproject_path", "content_kind", "genres", "capability_tags", "visual_style",
    "dimension", "camera", "runtime", "physics", "platforms", "controls",
    "authoring_tools", "demo", "source", "rights", "building_blocks", "preview", "research",
}
LIST_FIELDS = ("genres", "capability_tags", "visual_style", "camera", "physics",
               "platforms", "controls", "authoring_tools")


def read_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2, allow_nan=False) + "\n", encoding="utf-8")


def https_url(value, nullable=False):
    if value is None and nullable:
        return True
    if not isinstance(value, str):
        return False
    try:
        u = urlsplit(value)
        return u.scheme == "https" and bool(u.hostname) and not u.username and not u.password
    except ValueError:
        return False


def safe_path(value):
    return (isinstance(value, str) and not Path(value).is_absolute()
            and ".." not in Path(value).parts and "\\" not in value
            and value != "." and not value.startswith("./")
            and not value.endswith("/") and "//" not in value
            and "/./" not in value and (value == "" or Path(value).as_posix() == value))


def ai_provenance(row):
    """Absent optional attribution means unknown, never inferred from code style."""
    return row.get("ai_provenance", {"status": "unknown", "models": [], "evidence": [],
                                      "notes": "No creator model attribution has been established."})


def validate(records, media, root=ROOT):
    errors = []
    def fail(label, message):
        errors.append(f"{label}: {message}")
    def obj(value, keys, label):
        if not isinstance(value, dict):
            fail(label, "must be an object")
            return False
        missing = set(keys) - value.keys()
        if missing:
            fail(label, f"missing fields: {sorted(missing)}")
            return False
        return True
    def string(value, label, nullable=False, empty=False):
        if value is None and nullable:
            return
        if not isinstance(value, str) or (not empty and not value.strip()):
            fail(label, "must be a nonempty string" if not empty else "must be a string")
    def enum(value, choices, label):
        if not isinstance(value, str) or value not in choices:
            fail(label, f"expected one of {sorted(choices)}")
    def url(value, label, nullable=False):
        if not https_url(value, nullable):
            fail(label, "must be an HTTPS URL without credentials" + (" or null" if nullable else ""))
    def timestamp(value, label):
        try:
            dt = datetime.fromisoformat(value.replace("Z", "+00:00"))
            if dt.tzinfo is None:
                raise ValueError()
        except (ValueError, AttributeError, TypeError):
            fail(label, "must be an ISO timestamp with timezone")
    def strings(value, label):
        if not isinstance(value, list) or any(not isinstance(v, str) or not v.strip() for v in value):
            fail(label, "must be an array of nonempty strings")
    def sourcepath(value, label, nullable=False):
        if value is None and nullable:
            return
        if not safe_path(value):
            fail(label, "invalid or escaping source path")
    if not isinstance(records, list) or not isinstance(media, list):
        return ["Records and media must be arrays"]
    ids, identities, provider_ids = set(), set(), set()
    for index, row in enumerate(records):
        label = f"record[{index}]"
        if not obj(row, REQUIRED, label):
            continue
        rid = row["id"]
        if not isinstance(rid, str) or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", rid):
            fail(label, "invalid stable id")
        elif rid in ids:
            fail(label, "duplicate id")
        else:
            ids.add(rid)
        for key in ("repo_url", "project_url"):
            url(row[key], f"{label}.{key}")
        sourcepath(row["subproject_path"], label + ".subproject_path")
        if https_url(row["repo_url"]) and isinstance(row["subproject_path"], str):
            u = urlsplit(row["repo_url"])
            path = u.path.rstrip("/").removesuffix(".git").lower()
            identity = (u.hostname.lower(), path, row["subproject_path"])
            if identity in identities:
                fail(label, "duplicate repository/subproject")
            identities.add(identity)
        for key in ("title", "creator", "summary"):
            string(row[key], f"{label}.{key}")
        for key in LIST_FIELDS:
            strings(row[key], f"{label}.{key}")
        enum(row["content_kind"], {"game", "toolkit", "demo", "engine", "asset-library"}, label + ".content_kind")
        enum(row["dimension"], {"2d", "3d", "mixed", "unknown"}, label + ".dimension")
        runtime = row["runtime"]
        if obj(runtime, {"name", "language", "version", "version_status"}, label + ".runtime"):
            string(runtime["name"], label + ".runtime.name")
            string(runtime["language"], label + ".runtime.language")
            string(runtime["version"], label + ".runtime.version", nullable=True)
            enum(runtime["version_status"], {"inspected", "declared", "unknown"}, label + ".runtime.version_status")
        source = row["source"]
        if obj(source, {"commit", "provider_id", "inspected_at", "evidence"}, label + ".source"):
            commit = source["commit"]
            if commit is not None and (not isinstance(commit, str) or not re.fullmatch(r"[a-f0-9]{40}", commit)):
                fail(label, "commit must be full SHA or null")
            pid = source["provider_id"]
            if pid is not None and (isinstance(pid, bool) or not isinstance(pid, (str, int))):
                fail(label, "provider ID must be string, integer or null")
            elif pid is not None and https_url(row["repo_url"]) and isinstance(row["subproject_path"], str):
                identity = (urlsplit(row["repo_url"]).hostname.lower(), str(pid), row["subproject_path"])
                if identity in provider_ids:
                    fail(label, "duplicate provider ID/subproject")
                provider_ids.add(identity)
            timestamp(source["inspected_at"], label + ".source.inspected_at")
            if not isinstance(source["evidence"], list) or not source["evidence"]:
                fail(label, "source evidence must be a nonempty array")
            else:
                for ev in source["evidence"]:
                    if obj(ev, {"url", "claim", "kind"}, label + ".evidence"):
                        url(ev["url"], label + ".evidence.url")
                        string(ev["claim"], label + ".evidence.claim")
                        enum(ev["kind"], {"repository", "readme", "source", "license", "official-docs"}, label + ".evidence.kind")
        rights = row["rights"]
        if obj(rights, {"code_license", "code_status", "code_evidence_url", "asset_status", "asset_notes", "scope_reuse_status", "notes"}, label + ".rights"):
            string(rights["code_license"], label + ".rights.code_license", nullable=True)
            enum(rights["code_status"], {"inspected", "declared", "unresolved"}, label + ".rights.code_status")
            enum(rights["asset_status"], {"scoped", "mixed", "unreviewed", "not_applicable"}, label + ".rights.asset_status")
            enum(rights["scope_reuse_status"], {"review_required"}, label + ".rights.scope_reuse_status")
            url(rights["code_evidence_url"], label + ".rights.code_evidence_url", nullable=rights["code_status"] != "inspected")
            if rights["code_status"] == "inspected" and not rights["code_license"]:
                fail(label, "inspected code license needs a license value")
            string(rights["asset_notes"], label + ".rights.asset_notes")
            string(rights["notes"], label + ".rights.notes")
        demo = row["demo"]
        if obj(demo, {"url", "kind", "source_relation", "interactive_status", "notes"}, label + ".demo"):
            enum(demo["kind"], {"browser", "native-download", "video", "none"}, label + ".demo.kind")
            url(demo["url"], label + ".demo.url", nullable=demo["kind"] == "none")
            if demo["kind"] == "none" and demo["url"] is not None:
                fail(label, "none demo kind needs null URL")
            enum(demo["source_relation"], {"maintainer_linked", "unknown"}, label + ".demo.source_relation")
            enum(demo["interactive_status"], {"not_tested"}, label + ".demo.interactive_status")
            string(demo["notes"], label + ".demo.notes")
        blocks = row["building_blocks"]
        if not isinstance(blocks, list) or not blocks:
            fail(label, "building_blocks must be a nonempty array")
        else:
            for block in blocks:
                if not obj(block, {"name", "category", "evidence_url", "source_path", "status", "notes"}, label + ".block"):
                    continue
                for key in ("name", "category", "notes"):
                    string(block[key], label + ".block." + key)
                enum(block["status"], {"source_inspected", "maintainer_described", "proposed"}, label + ".block.status")
                url(block["evidence_url"], label + ".block.evidence_url")
                sourcepath(block["source_path"], label + ".block.source_path", nullable=block["status"] != "source_inspected")
                if block["status"] == "source_inspected" and not block["source_path"]:
                    fail(label, "source-inspected block needs actual source path")
        preview = row["preview"]
        if obj(preview, {"status", "source_url", "notes"}, label + ".preview"):
            enum(preview["status"], {"missing", "upstream_reference"}, label + ".preview.status")
            url(preview["source_url"], label + ".preview.source_url", nullable=preview["status"] == "missing")
            string(preview["notes"], label + ".preview.notes")
        research = row["research"]
        if obj(research, {"author", "started_at", "completed_at", "elapsed_minutes", "selection_reason", "known_unknowns", "integration_family"}, label + ".research"):
            for key in ("author", "selection_reason"):
                string(research[key], label + ".research." + key)
            for key in ("started_at", "completed_at"):
                timestamp(research[key], label + ".research." + key)
            elapsed = research["elapsed_minutes"]
            if elapsed is not None and (isinstance(elapsed, bool) or not isinstance(elapsed, (int, float)) or not math.isfinite(elapsed) or elapsed < 0):
                fail(label, "elapsed minutes must be nonnegative number or null")
            strings(research["known_unknowns"], label + ".research.known_unknowns")
            enum(research["integration_family"], {"threejs-r3f-candidate", "reference-only", "other-web-candidate"}, label + ".research.integration_family")
        if "ai_provenance" in row:
            provenance = row["ai_provenance"]
            ai_label = label + ".ai_provenance"
            if obj(provenance, {"status", "models", "evidence", "notes"}, ai_label):
                enum(provenance["status"], {"creator_attributed", "unverified", "unknown"}, ai_label + ".status")
                strings(provenance["models"], ai_label + ".models")
                string(provenance["notes"], ai_label + ".notes")
                models = provenance["models"]
                if isinstance(models, list) and all(isinstance(m, str) for m in models):
                    if len(models) != len(set(models)) or any(m != " ".join(m.split()) for m in models):
                        fail(ai_label, "model names must be unique with normalized whitespace")
                evidence = provenance["evidence"]
                if not isinstance(evidence, list):
                    fail(ai_label, "evidence must be an array")
                else:
                    for item in evidence:
                        if obj(item, {"url", "claim"}, ai_label + ".evidence"):
                            url(item["url"], ai_label + ".evidence.url")
                            string(item["claim"], ai_label + ".evidence.claim")
                if provenance["status"] == "creator_attributed" and (not models or not evidence):
                    fail(ai_label, "creator attribution needs named models and creator evidence")
                if provenance["status"] == "unknown" and models:
                    fail(ai_label, "unknown attribution cannot name models")
    media_ids = set()
    media_record_ids = set()
    media_keys = {"id", "record_id", "title", "notes", "uploaded_at", "repo_url", "source_page", "original_url", "license_evidence_url", "license_expression", "license_urls", "credit", "rights_status", "allowed_use", "local_path", "sha256", "width", "height", "alt", "capture_date", "capture_date_status", "downloaded_at", "reviewed_at", "version_relation", "modifications"}
    for item in media:
        if not obj(item, media_keys, "media"):
            continue
        mid = item["id"]
        string(mid, "media.id")
        if isinstance(mid, str):
            if mid in media_ids:
                fail(mid, "duplicate media id")
            media_ids.add(mid)
        record_id = item["record_id"]
        string(record_id, "media.record_id")
        if isinstance(record_id, str):
            if record_id in media_record_ids:
                fail(mid, "duplicate media record_id")
            media_record_ids.add(record_id)
        for key in ("repo_url", "source_page", "original_url", "license_evidence_url"):
            url(item[key], f"media.{key}")
        for key in ("title", "notes", "license_expression", "credit", "allowed_use", "alt", "version_relation", "modifications"):
            string(item[key], f"media.{key}")
        if not isinstance(item["license_urls"], list) or not item["license_urls"]:
            fail("media", "license URLs required")
        else:
            for link in item["license_urls"]:
                url(link, "media.license_urls")
        for key in ("width", "height"):
            if type(item[key]) is not int or item[key] <= 0:
                fail("media", f"{key} must be positive integer")
        enum(item["capture_date_status"], {"source_declared", "unknown"}, "media.capture_date_status")
        string(item["capture_date"], "media.capture_date", nullable=item["capture_date_status"] == "unknown")
        if item["uploaded_at"] is not None:
            timestamp(item["uploaded_at"], "media.uploaded_at")
        for key in ("downloaded_at", "reviewed_at"):
            timestamp(item[key], "media." + key)
        enum(item["rights_status"], {
            "reviewed_for_catalog_display",
            "official_source_local_display_rights_unresolved",
        }, "media.rights_status")
        rel = item["local_path"]
        if not safe_path(rel) or not (root / rel).resolve().is_relative_to(root.resolve()):
            fail("media", "media path escapes catalog")
            continue
        path = root / rel
        if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != item["sha256"]:
            fail("media", "missing/tampered image")
        matching_record = next((r for r in records if isinstance(r, dict) and r.get("id") == record_id), None)
        if matching_record is None:
            fail("media", "no matching research record")
        elif matching_record.get("repo_url") != item["repo_url"]:
            fail("media", "record_id and repository do not identify the same research record")
    return errors


def load(root=ROOT):
    records = []
    for path in sorted((root / "records").glob("*.json")):
        rows = read_json(path)
        if not isinstance(rows, list):
            raise ValueError(f"{path}: expected a JSON array")
        records.extend(rows)
    media = read_json(root / "media-manifest.json") if (root / "media-manifest.json").exists() else []
    errors = validate(records, media, root)
    if errors:
        raise ValueError("\n".join(errors))
    if not records:
        raise ValueError("No research records found")
    records = [dict(row, ai_provenance=ai_provenance(row)) for row in records]
    records.sort(key=lambda row: row["id"])
    return records, media


def text_index(row):
    return " ".join([row["title"], row["summary"], row["runtime"]["name"], row["content_kind"],
                     *[tag for key in LIST_FIELDS for tag in row[key]],
                     *[f"{b['name']} {b['category']} {b['notes']}" for b in row["building_blocks"]]])


def sql_build(path, records, media):
    with closing(sqlite3.connect(path)) as db, db:
        db.execute("PRAGMA foreign_keys=ON")
        db.executescript("""
            CREATE TABLE projects(id TEXT PRIMARY KEY, title TEXT NOT NULL,
                repo_url TEXT NOT NULL, subproject_path TEXT NOT NULL,
                kind TEXT NOT NULL, runtime TEXT NOT NULL, dimension TEXT NOT NULL,
                demo_kind TEXT NOT NULL, code_license TEXT,
                record_json TEXT NOT NULL, UNIQUE(repo_url, subproject_path));
            CREATE TABLE building_blocks(id TEXT PRIMARY KEY, project_id TEXT NOT NULL REFERENCES projects(id),
                name TEXT NOT NULL, category TEXT NOT NULL, evidence_status TEXT NOT NULL,
                source_path TEXT, evidence_url TEXT NOT NULL, notes TEXT NOT NULL);
            CREATE TABLE attributed_models(project_id TEXT NOT NULL REFERENCES projects(id), model TEXT NOT NULL, PRIMARY KEY(project_id, model));
            CREATE TABLE media(id TEXT PRIMARY KEY, record_id TEXT NOT NULL UNIQUE REFERENCES projects(id), repo_url TEXT NOT NULL, media_json TEXT NOT NULL);
            CREATE VIRTUAL TABLE search USING fts5(project_id UNINDEXED, title, text, tokenize='unicode61');
        """)
        for row in records:
            db.execute("INSERT INTO projects VALUES (?,?,?,?,?,?,?,?,?,?)", (
                row["id"], row["title"], row["repo_url"], row["subproject_path"], row["content_kind"],
                row["runtime"]["name"], row["dimension"], row["demo"]["kind"], row["rights"]["code_license"],
                json.dumps(row, ensure_ascii=False, sort_keys=True)))
            if ai_provenance(row)["status"] == "creator_attributed":
                db.executemany("INSERT INTO attributed_models VALUES (?,?)", [(row["id"], model) for model in ai_provenance(row)["models"]])
            db.execute("INSERT INTO search VALUES (?,?,?)", (row["id"], row["title"], text_index(row)))
            for i, block in enumerate(row["building_blocks"]):
                db.execute("INSERT INTO building_blocks VALUES (?,?,?,?,?,?,?,?)", (
                    f"{row['id']}:{i+1}", row["id"], block["name"], block["category"],
                    block["status"], block["source_path"], block["evidence_url"], block["notes"]))
        for item in media:
            db.execute("INSERT INTO media VALUES (?,?,?,?)", (item["id"], item["record_id"], item["repo_url"], json.dumps(item, ensure_ascii=False, sort_keys=True)))
        if db.execute("PRAGMA integrity_check").fetchone()[0] != "ok":
            raise ValueError("SQLite integrity check failed")


def md(value):
    return str(value).replace("|", "\\|").replace("\n", " ")


def completeness(records):
    """Count unknown/empty contract values; lists count as fields, not fake rows."""
    observed = collections.defaultdict(list)
    def visit(value, prefix=""):
        for key, item in value.items():
            path = f"{prefix}.{key}" if prefix else key
            if isinstance(item, dict):
                visit(item, path)
            else:
                observed[path].append(item)
    for record in records:
        visit(record)
    result = {}
    for path, values in sorted(observed.items()):
        empty = sum(v is None or v == [] or (v == "" and path != "subproject_path") for v in values)
        result[path] = {"records": len(records), "populated": len(values) - empty,
                        "null_empty_or_missing": len(records) - len(values) + empty}
    return result


def build(root=ROOT):
    records, media = load(root)
    # A failed build leaves the previous working database intact.
    with tempfile.TemporaryDirectory(dir=root, prefix=".catalog-build-") as temp:
        db = Path(temp) / "catalog.sqlite"
        sql_build(db, records, media)
        db.replace(root / "catalog.sqlite")
    sources = [{"path": str(p.relative_to(root)), "sha256": hashlib.sha256(p.read_bytes()).hexdigest()}
               for p in sorted((root / "records").glob("*.json"))]
    write_json(root / "catalog.json", {"schema_version": "research-0.1", "status": "research_only",
               "record_count": len(records), "record_sources": sources, "records": records})
    with (root / "catalog.csv").open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        writer.writerow(["id", "title", "kind", "genres", "capabilities", "runtime", "dimension",
                         "repo_url", "source_commit", "demo_url", "demo_kind", "code_license",
                         "asset_status", "reuse_status", "source_checked_at", "ai_status", "ai_models", "ai_evidence"])
        for row in records:
            fields = [row["id"], row["title"], row["content_kind"], "; ".join(row["genres"]),
                "; ".join(row["capability_tags"]), row["runtime"]["name"], row["dimension"],
                row["repo_url"], row["source"]["commit"] or "", row["demo"]["url"] or "",
                row["demo"]["kind"], row["rights"]["code_license"] or "unknown",
                row["rights"]["asset_status"], row["rights"]["scope_reuse_status"], row["source"]["inspected_at"], ai_provenance(row)["status"], "; ".join(ai_provenance(row)["models"]), "; ".join(e["url"] for e in ai_provenance(row)["evidence"])]
            # Do not allow spreadsheet formula execution when opening a CSV export.
            writer.writerow(["'" + f if str(f).startswith(("=", "+", "-", "@")) else f for f in fields])
    lines = ["# Researched games and building blocks", "", "Provisional research index. Source and asset scope still require review before reuse. Browser links have not necessarily been played; historical previews do not prove a current source/demo match.", "",
             "| Project | Kind / runtime | Genres | Useful systems | Source / demo | AI provenance |",
             "| --- | --- | --- | --- | --- | --- |"]
    for row in records:
        demo = f" · [destination]({row['demo']['url']}) ({row['demo']['kind']})" if row["demo"]["url"] else " · no demo established"
        lines.append(f"| {md(row['title'])} | {row['content_kind']} / {md(row['runtime']['name'])} | {md(', '.join(row['genres']))} | {md(', '.join(b['name'] for b in row['building_blocks']))} | [repo]({row['repo_url']}){demo} | {md(ai_provenance(row)['status'])}: {md(', '.join(ai_provenance(row)['models']) or 'unknown')} |")
    (root / "INDEX.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    coverage = {"records": len(records), "building_blocks": sum(len(r["building_blocks"]) for r in records),
                "media": len(media), "pinned_source_records": sum(bool(r["source"]["commit"]) for r in records)}
    for key in ("genres", "content_kind", "dimension"):
        coverage[key] = dict(sorted(collections.Counter(v for r in records for v in (r[key] if isinstance(r[key], list) else [r[key]])).items()))
    coverage["runtimes"] = dict(sorted(collections.Counter(r["runtime"]["name"] for r in records).items()))
    coverage["field_completeness"] = {
        "source_commit": sum(bool(r["source"]["commit"]) for r in records),
        "provider_id": sum(r["source"]["provider_id"] is not None for r in records),
        "code_license_inspected": sum(r["rights"]["code_status"] == "inspected" for r in records),
        "demo_destination": sum(bool(r["demo"]["url"]) for r in records),
        "browser_demo_destination": sum(r["demo"]["kind"] == "browser" for r in records),
        "source_inspected_blocks": sum(b["status"] == "source_inspected" for r in records for b in r["building_blocks"]),
        "preview_reference": sum(bool(r["preview"]["source_url"]) for r in records),
    }
    coverage["ai_provenance_status"] = dict(sorted(collections.Counter(ai_provenance(r)["status"] for r in records).items()))
    coverage["creator_attributed_models"] = dict(sorted(collections.Counter(model for r in records if ai_provenance(r)["status"] == "creator_attributed" for model in ai_provenance(r)["models"]).items()))
    coverage["all_contract_field_completeness"] = completeness(records)
    write_json(root / "coverage.json", coverage)
    return coverage


def search(query, root=ROOT, runtime=None, kind=None, limit=20, model=None):
    path = root / "catalog.sqlite"
    if not path.exists():
        raise ValueError("Build the index first")
    terms = re.findall(r"\w+", query, flags=re.UNICODE)
    if not terms:
        raise ValueError("Search needs at least one word")
    # Treat user input as terms, never raw FTS query syntax or SQL.
    match = " AND ".join('"' + term.replace('"', '""') + '"' for term in terms)
    sql = "SELECT p.record_json FROM search s JOIN projects p ON p.id=s.project_id WHERE search MATCH ?"
    values = [match]
    if runtime:
        sql += " AND lower(p.runtime)=lower(?)"
        values.append(runtime)
    if kind:
        sql += " AND p.kind=?"
        values.append(kind)
    if model:
        sql += " AND EXISTS (SELECT 1 FROM attributed_models a WHERE a.project_id=p.id AND a.model=?)"
        values.append(model)
    sql += " ORDER BY bm25(search,0,4,1),p.id LIMIT ?"
    values.append(max(1, min(limit, 100)))
    with closing(sqlite3.connect(path.resolve().as_uri() + "?mode=ro", uri=True)) as db:
        return [json.loads(row[0]) for row in db.execute(sql, values)]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=ROOT)
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("build")
    sub.add_parser("validate")
    query = sub.add_parser("search")
    query.add_argument("query")
    query.add_argument("--runtime")
    query.add_argument("--kind")
    query.add_argument("--model", help="Exact creator-attributed model; never matches unverified claims")
    query.add_argument("--limit", type=int, default=20)
    query.add_argument("--json", action="store_true")
    args = parser.parse_args()
    try:
        if args.command == "build":
            print(json.dumps(build(args.root), indent=2))
        elif args.command == "validate":
            records, media = load(args.root)
            print(f"PASS: {len(records)} research records; {len(media)} checked image files")
        else:
            rows = search(args.query, args.root, args.runtime, args.kind, args.limit, args.model)
            if args.json:
                print(json.dumps(rows, ensure_ascii=False, indent=2))
            else:
                for row in rows:
                    print(f"{row['title']} [{row['runtime']['name']}; {row['demo']['kind']}]\n  {row['repo_url']}\n  {row['summary']}")
                print(f"{len(rows)} result(s). Research candidates; integration not tested.")
    except (ValueError, KeyError, TypeError, OSError, sqlite3.Error) as exc:
        parser.exit(1, f"Catalog error: {exc}\n")


if __name__ == "__main__":
    main()
