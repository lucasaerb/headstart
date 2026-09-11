import copy
import json
from pathlib import Path
import tempfile
import unittest

from catalog import ai_provenance, build, load, search, validate
from build_site_catalog import catalog_asset_src, load_play_observations, pinned_source_url, project, read_existing, serialize, update_site_index
from collect_browser_previews import ALT, audit_display_language, load_audit_approvals, require_alt_coverage
from test_catalog import fixture


def attribution(status='creator_attributed', models=None):
    return {'status': status, 'models': ['GPT-6 Astra'] if models is None else models,
            'evidence': [{'url': 'https://example.com/creator-statement', 'claim': 'Synthetic creator statement fixture, not actual evidence.'}],
            'notes': 'Creator attribution only; does not establish exclusively generated code.'}


class AIProvenanceTests(unittest.TestCase):
    def test_optional_unknown_and_claim_validation(self):
        row = fixture()
        self.assertEqual(ai_provenance(row)['status'], 'unknown')
        row['ai_provenance'] = attribution()
        self.assertEqual(validate([row], []), [])
        for bad in [None, {}, attribution('unknown'), attribution(models=[]), attribution(models=[' Fable 5']),
                    dict(attribution(), evidence=[]), dict(attribution(), evidence=[{'url': 'file:///tmp/a', 'claim': 'bad'}])]:
            row['ai_provenance'] = bad
            self.assertTrue(validate([row], []), bad)

    def test_exports_and_model_filter_never_match_unverified(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root / 'records').mkdir()
            first, second = fixture(), fixture()
            first['ai_provenance'] = attribution()
            second.update(id='unverified-camera', repo_url='https://github.com/example/other')
            second['source']['provider_id'] = 2
            second['ai_provenance'] = attribution('unverified')
            (root / 'records/test.json').write_text(json.dumps([first, second]))
            coverage = build(root)
            self.assertEqual([r['id'] for r in search('camera', root, model='GPT-6 Astra')], [first['id']])
            self.assertEqual(search('camera', root, model='Fable 5'), [])
            self.assertEqual(search('camera', root, model='GPT-6 Astra', runtime='Godot'), [])
            self.assertEqual(coverage['creator_attributed_models'], {'GPT-6 Astra': 1})
            self.assertIn('ai_models', (root / 'catalog.csv').read_text())
            self.assertIn('AI provenance', (root / 'INDEX.md').read_text())

    def test_projection_priorities_unknowns_and_serialization(self):
        browser, native, preferred = fixture(), fixture(), fixture()
        browser.update(id='browser', title='Browser')
        native.update(id='native', title='Native')
        native['demo']['kind'] = 'native-download'
        native['platforms'] = ['Windows']
        preferred.update(id='preferred', title='Preferred', ai_provenance=attribution())
        rows = project([native, browser, preferred], [])
        self.assertEqual([r['id'] for r in rows], ['preferred', 'browser', 'native'])
        self.assertEqual(rows[1]['aiProvenance']['status'], 'unknown')
        self.assertTrue(all(r['preview'] is None for r in rows))
        self.assertTrue(all(r['interactiveStatus'] == 'not_tested' for r in rows))
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / 'catalog.js'
            path.write_text(serialize(rows))
            self.assertEqual(read_existing(path), rows)

    def test_browser_platform_independent_of_demo_and_canonical_models(self):
        row = fixture()
        row['demo']['kind'] = 'video'
        row['ai_provenance'] = attribution(models=['Claude Fable 5.1'])
        projected = project([row], [])[0]
        self.assertEqual(projected['platformKind'], 'browser')
        self.assertEqual(projected['demoKind'], 'video')
        self.assertEqual(projected['label'], 'Watch video')
        self.assertEqual(projected['aiProvenance']['models'], ['Claude Fable 5.1'])
        other = fixture()
        other.update(id='a-first', title='A First')
        for model in ['Fable 5', 'Fable 5.1', 'Claude Fable 5', 'Claude Fable 5.1']:
            row['ai_provenance']['models'] = [model]
            self.assertEqual(project([other, row], [])[0]['aiProvenance']['models'], [model])
        row['platforms'] = ['browser export', 'Windows']
        row['demo']['kind'] = 'none'
        self.assertEqual(project([row], [])[0]['platformKind'], 'browser')
        self.assertEqual(project([row], [])[0]['demoKind'], 'none')
        row['platforms'] = ['Windows 11']
        self.assertEqual(project([row], [])[0]['platformKind'], 'desktop')

    def test_provider_specific_pinned_links(self):
        row = fixture()
        for repo, route in [('https://github.com/example/game', '/tree/'),
                            ('https://gitlab.com/example/game', '/-/tree/'),
                            ('https://gitea.wildfiregames.com/example/game', '/src/commit/')]:
            row['repo_url'] = repo
            self.assertEqual(pinned_source_url(row), repo + route + row['source']['commit'])
        row['repo_url'] = 'https://unknown-provider.example/game'
        self.assertEqual(pinned_source_url(row), row['source']['evidence'][0]['url'])
        row['source']['evidence'] = [{'url': 'https://example.com/main', 'kind': 'repository'}]
        self.assertIsNone(pinned_source_url(row))

    def test_preview_rejects_stale_mapping_and_falls_back_to_canonical_media_path(self):
        row = fixture()
        item = {key: 'fixture' for key in ['credit', 'license_expression', 'source_page', 'license_evidence_url', 'version_relation', 'alt', 'original_url', 'allowed_use', 'modifications', 'reviewer']}
        item.update(record_id=row['id'], repo_url=row['repo_url'], rights_status='reviewed_for_catalog_display', independent_reviewed_at='2026-09-10T22:00:00Z', independent_review_verdict='PASS: fixture', sha256='a'*64, local_path='media/test.png', license_urls=[], capture_date=None)
        old = [{'id': row['id'], 'preview': {'src': 'assets/catalog/test.png', 'sha256': 'a'*64}}]
        self.assertEqual(project([row], [item], old)[0]['preview']['src'], 'assets/catalog/test.png')
        for src, digest in [('https://example.com/test.png', 'a'*64), ('assets/catalog/../../secret', 'a'*64), ('assets/catalog/test.png', 'b'*64)]:
            old[0]['preview'].update(src=src, sha256=digest)
            self.assertEqual(project([row], [item], old)[0]['preview']['src'], 'assets/catalog/test.png')

    def test_preview_cannot_cross_same_repository_subprojects(self):
        first = fixture()
        first.update(id='shared-first', subproject_path='games/first')
        second = copy.deepcopy(first)
        second.update(id='shared-second', title='Second', subproject_path='games/second')
        item = {key: 'fixture' for key in ['credit', 'license_expression', 'source_page', 'license_evidence_url', 'version_relation', 'alt', 'original_url', 'allowed_use', 'modifications', 'reviewer']}
        item.update(record_id=first['id'], repo_url=first['repo_url'], rights_status='reviewed_for_catalog_display', independent_reviewed_at='2026-09-10T22:00:00Z', independent_review_verdict='PASS: fixture', sha256='a'*64, local_path='media/first.png', license_urls=[], capture_date=None)
        existing = [
            {'id': first['id'], 'preview': {'src': 'assets/catalog/first.png', 'sha256': 'a'*64}},
            {'id': second['id'], 'preview': {'src': 'assets/catalog/second.png', 'sha256': 'a'*64}},
        ]
        rows = {row['id']: row for row in project([first, second], [item], existing)}
        self.assertEqual(rows[first['id']]['preview']['src'], 'assets/catalog/first.png')
        self.assertIsNone(rows[second['id']]['preview'])

    def test_required_preview_projection_omits_missing_and_unreviewed_rows(self):
        cleared = fixture()
        cleared.update(id='cleared', title='Cleared')
        missing = copy.deepcopy(cleared)
        missing.update(id='missing', title='Missing')
        unreviewed = copy.deepcopy(cleared)
        unreviewed.update(id='unreviewed', title='Unreviewed')
        item = {key: 'fixture' for key in ['credit', 'license_expression', 'source_page', 'license_evidence_url', 'version_relation', 'alt', 'original_url', 'allowed_use', 'modifications', 'reviewer']}
        item.update(record_id=cleared['id'], repo_url=cleared['repo_url'], rights_status='reviewed_for_catalog_display', independent_reviewed_at='2026-09-10T22:00:00Z', independent_review_verdict='PASS: fixture', sha256='a'*64, local_path='media/cleared.png', license_urls=[], capture_date=None)
        wrong_status = dict(item, record_id=unreviewed['id'], rights_status='review_pending', sha256='b'*64)
        official = copy.deepcopy(cleared)
        official.update(id='official', title='Official image')
        official_item = dict(item, record_id=official['id'], rights_status='official_source_local_display_rights_unresolved', sha256='c'*64, local_path='media/official.webp')
        for field in ('reviewer', 'independent_reviewed_at', 'independent_review_verdict'):
            official_item.pop(field, None)
        pending = copy.deepcopy(cleared)
        pending.update(id='pending', title='Pending independent media review')
        pending_item = dict(item, record_id=pending['id'], rights_status='candidate_local_display_pending_independent_review', sha256='d'*64, local_path='media/pending.webp')
        existing = [
            {'id': cleared['id'], 'preview': {'src': 'assets/catalog/cleared.png', 'sha256': 'a'*64}},
            {'id': unreviewed['id'], 'preview': {'src': 'assets/catalog/unreviewed.png', 'sha256': 'b'*64}},
        ]
        rows = project([cleared, missing, unreviewed, official, pending], [item, wrong_status, official_item, pending_item], existing, require_previews=True)
        self.assertEqual([row['id'] for row in rows], ['cleared'])
        official_item.update(reviewer='independent reviewer', independent_reviewed_at='2026-09-10T22:00:00Z', independent_review_verdict='PASS: exact official image approved for narrow local display')
        rows = project([cleared, official, pending], [item, official_item, pending_item], existing, require_previews=True)
        self.assertEqual({row['id'] for row in rows}, {'cleared', 'official'})
        official_preview = next(row['preview'] for row in rows if row['id'] == 'official')
        self.assertEqual(official_preview['rightsStatus'], 'official_source_local_display_rights_unresolved')

    def test_new_reviewed_media_derives_safe_dashboard_asset_mapping(self):
        row = fixture()
        item = {key: 'fixture' for key in ['credit', 'license_expression', 'source_page', 'license_evidence_url', 'version_relation', 'alt', 'original_url', 'allowed_use', 'modifications', 'reviewer']}
        item.update(record_id=row['id'], repo_url=row['repo_url'], source_page='https://example.com/image-page', license_evidence_url='https://example.com/license-proof', rights_status='reviewed_for_catalog_display', independent_reviewed_at='2026-09-10T22:00:00Z', independent_review_verdict='PASS: fixture', sha256='a'*64, local_path='media/new-game.png', license_urls=[], capture_date=None)
        projected = project([row], [item], require_previews=True)
        self.assertEqual(projected[0]['preview']['src'], 'assets/catalog/new-game.png')
        self.assertEqual(projected[0]['preview']['sha256'], 'a'*64)
        self.assertEqual(projected[0]['preview']['sourcePage'], 'https://example.com/image-page')
        self.assertEqual(projected[0]['preview']['licenseEvidenceUrl'], 'https://example.com/license-proof')
        for path in ['other/new-game.png', 'media/nested/new-game.png', '../media/new-game.png']:
            with self.subTest(path=path):
                item['local_path'] = path
                self.assertIsNone(catalog_asset_src(item))
                self.assertEqual(project([row], [item], require_previews=True), [])

    def test_site_index_total_and_catalog_version_follow_projection(self):
        rows = project([fixture()], [])
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / 'index.html'
            path.write_text('<section id="games" data-catalog-total="99" data-research-total="99"><p id="result-count">99 projects</p><span id="pictured-count">99 pictured of 99 research records</span></section><script src="catalog.js" defer></script>')
            update_site_index(path, rows, research_total=76)
            updated = path.read_text()
            self.assertIn('data-catalog-total="1"', updated)
            self.assertIn('data-research-total="76"', updated)
            self.assertIn('<p id="result-count">1 projects</p>', updated)
            self.assertIn('<span id="pictured-count">1 pictured of 76 research records</span>', updated)
            self.assertRegex(updated, r'catalog\.js\?v=[a-f0-9]{12}')
            versioned = updated
            update_site_index(path, rows, research_total=76)
            self.assertEqual(path.read_text(), versioned)

    def test_play_observations_require_a_successful_session_for_editorial_pick(self):
        checked = {
            'record_id': fixture()['id'], 'status': 'interactive_checked',
            'checked_at': '2026-09-10T20:10:00Z', 'reviewer': '/root',
            'environment': 'Chrome fixture', 'scenario': 'Used controls.',
            'result': 'Controls responded.', 'limitations': 'Short session.',
            'editorial_pick': True,
        }
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / 'play.json'
            path.write_text(json.dumps({'schema_version': '1.0', 'records': [checked]}))
            observations = load_play_observations(path)
            self.assertEqual(project([fixture()], [], play_observations=observations)[0]['playReview']['status'], 'interactive_checked')
            checked['status'] = 'load_incomplete'
            path.write_text(json.dumps({'schema_version': '1.0', 'records': [checked]}))
            with self.assertRaises(ValueError):
                load_play_observations(path)

    def test_audit_media_promotion_requires_exact_independent_pass_set(self):
        expected = {'one', 'two'}
        record = lambda rid: {'record_id': rid, 'decision': 'approved_for_local_catalog_display',
                              'reviewer': 'independent reviewer', 'reviewed_at': '2026-09-10T22:00:00Z',
                              'verdict': 'PASS: exact image and narrow display scope approved'}
        self.assertEqual(load_audit_approvals(None, expected), {})
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / 'approval.json'
            path.write_text(json.dumps({'schema_version': '1.0', 'records': [record('one')]}))
            with self.assertRaises(ValueError):
                load_audit_approvals(path, expected)
            path.write_text(json.dumps({'schema_version': '1.0', 'records': [record('one'), record('two')]}))
            self.assertEqual(set(load_audit_approvals(path, expected)), expected)
            failed = record('two'); failed['verdict'] = 'BLOCKED: rights unresolved'
            path.write_text(json.dumps({'schema_version': '1.0', 'records': [record('one'), failed]}))
            with self.assertRaises(ValueError):
                load_audit_approvals(path, expected)
        template = Path(__file__).resolve().parents[1] / 'media-approval.template.json'
        template_ids = {item['record_id'] for item in json.loads(template.read_text())['records']}
        self.assertEqual(len(template_ids), 29)
        with self.assertRaises(ValueError):
            load_audit_approvals(template, template_ids)

    def test_approved_audit_media_language_drops_pending_state_without_widening_rights(self):
        candidate = {
            'rights': {'note': 'Image rights remain unresolved outside catalog identification.'},
            'blockers': ['Resolve the upstream asset license before broader reuse.'],
        }
        pending_policy = 'candidate_local_display_pending_independent_review means local evidence only.'
        pending_use, pending_notes = audit_display_language(candidate, False, pending_policy)
        self.assertEqual(pending_use, pending_policy)
        self.assertIn('candidate pending independent review', pending_notes)

        approved_use, approved_notes = audit_display_language(candidate, True, pending_policy)
        approved_text = f'{approved_use} {approved_notes}'.casefold()
        for stale_phrase in ('pending independent review',
                             'candidate_local_display_pending_independent_review',
                             'media-audit candidate'):
            self.assertNotIn(stale_phrase, approved_text)
        self.assertIn('independent narrow local research-display review passed', approved_text)
        self.assertIn(candidate['rights']['note'].casefold(), approved_text)
        self.assertIn(candidate['blockers'][0].casefold(), approved_text)
        self.assertIn('does not authorize public redistribution', approved_text)

    def test_approved_audit_manifest_uses_final_language_and_exact_review_stamp(self):
        root = Path(__file__).resolve().parents[1]
        audit = json.loads((root.parents[1] / 'docs/reviews/full-catalog-media-audit/media-audit.json').read_text())
        audit_ids = {item['record_id'] for item in audit['records']
                     if item['assessment'] == 'candidate_local_display_pending_independent_review'}
        approval_path = root.parents[1] / 'docs/reviews/full-catalog-media-audit/media-approval.json'
        approvals = {item['record_id']: item for item in json.loads(approval_path.read_text())['records']}
        _, media = load()
        media_by_record = {item['record_id']: item for item in media}
        # The strict live catalog keeps only the subset that also passes source,
        # license, stars and live-play gates. Historical approvals remain audit
        # evidence without forcing excluded records back into discovery.
        active_audit_ids = audit_ids & media_by_record.keys()
        for record_id in active_audit_ids:
            with self.subTest(record_id=record_id):
                item = media_by_record[record_id]
                approval = approvals[record_id]
                text = f"{item['allowed_use']} {item['notes']}".casefold()
                self.assertEqual(item['rights_status'], 'reviewed_for_catalog_display')
                self.assertNotIn('pending independent review', text)
                self.assertNotIn('candidate_local_display_pending_independent_review', text)
                self.assertNotIn('media-audit candidate', text)
                self.assertEqual(item['reviewer'], approval['reviewer'])
                self.assertEqual(item['independent_reviewed_at'], approval['reviewed_at'])
                self.assertEqual(item['independent_review_verdict'], approval['verdict'])

    def test_all_selected_media_has_record_specific_alt_text_before_download(self):
        _, media = load()
        record_ids = {item['record_id'] for item in media}
        self.assertEqual(len(record_ids), 41)
        self.assertTrue(all(item['alt'].strip() for item in media))
        # Collector-owned historical rows still use its fixed pre-download map;
        # newly pinned media carries its reviewed alt directly in the manifest.
        require_alt_coverage(record_ids & ALT.keys())
        with self.assertRaises(ValueError):
            require_alt_coverage(record_ids | {'missing-alt-fixture'})

    def test_source_less_official_sites_games_are_excluded_from_publication(self):
        records, media = load()
        expected = {'openai-sites-void-explorer','openai-sites-sunwake','openai-sites-hollowflux'}
        self.assertTrue(expected.isdisjoint({row['id'] for row in records}))
        self.assertTrue(expected.isdisjoint({item['record_id'] for item in media}))
        root = Path(__file__).resolve().parents[1]
        audit = {item['record_id']: item for item in json.loads((root/'exclusions/strict-gate-audit.json').read_text())['records']}
        archived = {item['id']: item for item in json.loads((root/'exclusions/excluded-records.json').read_text())['records']}
        for record_id in expected:
            self.assertFalse(audit[record_id]['listed'])
            self.assertIn('pinned_public_source', audit[record_id]['reasons'])
            self.assertIn('inspected_open_source_license', audit[record_id]['reasons'])
            self.assertIn(record_id, archived)


if __name__ == '__main__':
    unittest.main()
