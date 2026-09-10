"""Behavior tests for research validation, safe querying and rebuilds."""
import copy
from contextlib import closing
import hashlib
import json
import sqlite3
import tempfile
import unittest
from pathlib import Path

from catalog import build, load, search, validate


def fixture():
    return {
        "id": "test-camera", "title": "Camera Example", "repo_url": "https://github.com/example/game",
        "project_url": "https://example.com/game", "creator": "Fixture author", "summary": "A chase camera fixture.",
        "subproject_path": "", "content_kind": "demo", "genres": ["racing"], "capability_tags": ["chase-camera"],
        "visual_style": ["stylized"], "dimension": "3d", "camera": ["third-person"],
        "runtime": {"name": "Three.js", "language": "TypeScript", "version": None, "version_status": "unknown"},
        "physics": [], "platforms": ["web"], "controls": [], "authoring_tools": [],
        "demo": {"url": "https://example.com/game", "kind": "browser", "source_relation": "maintainer_linked",
                 "interactive_status": "not_tested", "notes": "Synthetic test fixture, not a real play result."},
        "source": {"commit": "a" * 40, "provider_id": 1, "inspected_at": "2026-09-10T12:00:00Z",
                   "evidence": [{"url": "https://github.com/example/game/blob/" + "a" * 40 + "/camera.ts", "claim": "Fixture only", "kind": "source"}]},
        "rights": {"code_license": None, "code_status": "unresolved", "code_evidence_url": None,
                   "asset_status": "unreviewed", "asset_notes": "Not checked", "scope_reuse_status": "review_required", "notes": "Fixture only"},
        "building_blocks": [{"name": "Chase camera", "category": "camera", "evidence_url": "https://example.com/camera",
                             "source_path": "src/camera.ts", "status": "source_inspected", "notes": "Target binding needs adaptation"}],
        "preview": {"status": "missing", "source_url": None, "notes": "No fixture image"},
        "research": {"author": "Fixture", "started_at": "2026-09-10T12:00:00Z", "completed_at": "2026-09-10T12:01:00Z",
                     "elapsed_minutes": None, "selection_reason": "Test only", "known_unknowns": ["Not a real project"], "integration_family": "threejs-r3f-candidate"},
    }


class CatalogTests(unittest.TestCase):
    def test_valid_research_is_not_promoted(self):
        row = fixture()
        self.assertEqual(validate([row], []), [])
        row["rights"]["scope_reuse_status"] = "integration_tested"
        self.assertTrue(validate([row], []))

    def test_nested_shapes_fail_as_validation_errors(self):
        for key, value in [("runtime", {}), ("preview", {}), ("research", {}), ("source", None),
                           ("repo_url", None), ("repo_url", "https://[broken"), ("id", []), ("building_blocks", [None])]:
            with self.subTest(key=key, value=value):
                row = fixture()
                row[key] = value
                self.assertTrue(validate([row], []))

    def test_missing_source_fields_and_paths(self):
        mutations = [lambda r: r["source"].update(commit="main"),
                     lambda r: r["source"].update(inspected_at="yesterday"),
                     lambda r: r["demo"].update(url=None),
                     lambda r: r["building_blocks"][0].pop("notes"),
                     lambda r: r["building_blocks"][0].update(source_path="../../secret"),
                     lambda r: r["rights"].update(code_status="inspected")]
        for mutate in mutations:
            row = fixture()
            mutate(row)
            self.assertTrue(validate([row], []))

    def test_repository_alias_and_provider_dedup(self):
        first = fixture()
        second = copy.deepcopy(first)
        second["id"] = "different-id"
        second["repo_url"] += ".git/"
        self.assertTrue(validate([first, second], []))
        second["repo_url"] = "https://github.com/renamed/game"
        self.assertTrue(validate([first, second], []))
        second["subproject_path"] = "different-demo"
        self.assertEqual(validate([first, second], []), [])

    def test_media_missing_evidence_is_rejected(self):
        self.assertTrue(validate([fixture()], [{"id": "missing-proof"}]))

    def test_path_aliases_and_nonfinite_metrics_are_rejected(self):
        for path in [".", "./demo", "demo/", "a//b", "a/./b", "demo/."]:
            row = fixture()
            row["subproject_path"] = path
            self.assertTrue(validate([row], []))
        for value in [float("nan"), float("inf"), -1]:
            row = fixture()
            row["research"]["elapsed_minutes"] = value
            self.assertTrue(validate([row], []))

    def test_real_index_query_filters_and_atomic_invalid_rebuild(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            (root / "records").mkdir()
            row = fixture()
            data = root / "records/test.json"
            data.write_text(json.dumps([row]))
            first = build(root)
            self.assertEqual(first["building_blocks"], 1)
            self.assertEqual(search("chase camera", root)[0]["id"], row["id"])
            self.assertEqual(search("chase", root, runtime="Godot"), [])
            self.assertEqual(search("chase", root, kind="game"), [])
            self.assertEqual(search('"; DROP TABLE projects; --', root), [])
            with closing(sqlite3.connect(root / "catalog.sqlite")) as db:
                self.assertEqual(db.execute("SELECT count(*) FROM projects").fetchone()[0], 1)
            before = hashlib.sha256((root / "catalog.sqlite").read_bytes()).hexdigest()
            self.assertEqual(first, build(root))
            row["source"]["commit"] = "not-a-sha"
            data.write_text(json.dumps([row]))
            with self.assertRaises(ValueError):
                build(root)
            self.assertEqual(before, hashlib.sha256((root / "catalog.sqlite").read_bytes()).hexdigest())

    def test_formula_like_title_csv_is_escaped(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            (root / "records").mkdir()
            row = fixture()
            row["title"] = "=HYPERLINK(unsafe)"
            (root / "records/test.json").write_text(json.dumps([row]))
            build(root)
            self.assertIn("'=HYPERLINK(unsafe)", (root / "catalog.csv").read_text())

    def test_invalid_rows_checked_before_sorting(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            (root / "records").mkdir()
            (root / "records/test.json").write_text('[null, {"id": []}]')
            with self.assertRaises(ValueError):
                load(root)


if __name__ == "__main__":
    unittest.main()
