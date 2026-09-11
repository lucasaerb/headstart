import json
import sqlite3
import unittest
from services.operations.events import EventStore, EVENTS, RETENTION_SECONDS


class EventTests(unittest.TestCase):
    def setUp(self):
        self.db = sqlite3.connect(':memory:')
        self.now = 2000000000
        self.store = EventStore(self.db, enabled=True, catalog_ids={'known-component'}, clock=lambda: self.now)
        self.event = {'eventId': 'a' * 64, 'deletionToken': 'b' * 64, 'type': 'search'}

    def tearDown(self):
        self.db.close()

    def test_disabled_or_missing_consent_saves_nothing(self):
        for consent in (False, None, 1, 'yes'):
            self.assertEqual(self.store.collect(self.event, consent=consent)['status'], 'disabled')
        self.store.enabled = False
        self.assertEqual(self.store.collect(self.event, consent=True)['status'], 'disabled')
        self.assertEqual(self.db.execute('SELECT COUNT(*) FROM interaction_events').fetchone()[0], 0)

    def test_classification_and_deduplication(self):
        for i, kind in enumerate(sorted(EVENTS)):
            event = dict(self.event, eventId=f'{i:064x}', type=kind)
            if kind in ('plugin_lookup', 'first_plan'):
                with self.assertRaises(ValueError):
                    self.store.collect(event, consent=True)
            self.assertEqual(self.store.collect(event, consent=True, completed_action=True)['status'], 'recorded')
            self.assertEqual(self.store.collect(event, consent=True, completed_action=True)['status'], 'duplicate')
        counts = self.store.counts()
        self.assertTrue(all(value == 1 for value in counts['events'].values()))
        self.assertIsNone(counts['verifiedReuse'])
        with self.assertRaises(ValueError):
            self.store.collect(dict(self.event, type='reuse_verified'), consent=True)

    def test_private_fields_and_raw_identifiers_rejected_without_storage(self):
        for field in ('email', 'query', 'targetPath', 'sourceCode', 'capture', 'userAgent', 'ip', 'token'):
            with self.assertRaises(ValueError):
                self.store.collect(dict(self.event, **{field: 'private@example.com'}), consent=True)
        with self.assertRaises(ValueError):
            self.store.collect(dict(self.event, catalogId='/private/target'), consent=True)
        self.store.collect(self.event, consent=True)
        rows = list(self.db.execute('SELECT * FROM interaction_events'))
        self.assertNotIn(self.event['deletionToken'], json.dumps(rows))
        self.assertNotIn('private@example.com', json.dumps(rows))

    def test_deletion_and_retention(self):
        self.store.collect(self.event, consent=True)
        self.assertEqual(self.store.forget('c' * 64), 0)
        self.assertEqual(self.store.forget(self.event['deletionToken']), 1)
        self.store.collect(self.event, consent=True)
        self.now += RETENTION_SECONDS
        self.assertEqual(self.store.counts()['events']['search'], 0)

    def test_conflicting_duplicate_does_not_change_existing_event(self):
        self.store.collect(self.event, consent=True)
        with self.assertRaises(ValueError):
            self.store.collect(dict(self.event, type='handoff'), consent=True)
        self.assertEqual(self.store.counts()['events']['search'], 1)
        self.assertEqual(self.store.counts()['events']['handoff'], 0)
