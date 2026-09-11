import json
import os
from pathlib import Path
import sqlite3
import subprocess
import sys
import tempfile
import unittest
from tools.integration.fixture import target, packet
from tools.integration.workflow import write_json

ROOT = Path(__file__).resolve().parents[3]


class InstrumentedTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.consent = self.root / 'consent.json'
        self.db = self.root / 'outcomes.sqlite3'
        self.consent.write_text(json.dumps({'version': 1, 'consent': True, 'deletionToken': 'd' * 64}))
        self.consent.chmod(0o600)
        self.env = {k: v for k, v in os.environ.items() if not k.startswith('HEADSTART_')}
        self.env.update(HEADSTART_TELEMETRY='1', HEADSTART_TELEMETRY_CONSENT_FILE=str(self.consent),
                        HEADSTART_TELEMETRY_DATABASE=str(self.db))

    def tearDown(self):
        self.temp.cleanup()

    def run_wrapper(self, args, text=None):
        entry = [str(ROOT / 'services/operations/instrumented.py')] if args[0] == 'mcp' else ['-m', 'services.operations.instrumented']
        return subprocess.run([sys.executable, *entry, *args],
                              cwd=ROOT, env=self.env, input=text, text=True, capture_output=True, timeout=30)

    def counts(self):
        if not self.db.exists():
            return {}
        with sqlite3.connect(self.db) as db:
            return dict(db.execute('SELECT kind,COUNT(*) FROM interaction_events GROUP BY kind'))

    def lookup(self):
        frames = [
            {'jsonrpc': '2.0', 'id': 1, 'method': 'initialize', 'params': {'protocolVersion': '2025-03-26', 'capabilities': {}, 'clientInfo': {'name': 'outcome-test', 'version': '1'}}},
            {'jsonrpc': '2.0', 'method': 'notifications/initialized'},
            {'jsonrpc': '2.0', 'id': 2, 'method': 'tools/call', 'params': {'name': 'search_components', 'arguments': {'query': 'camera'}}},
            {'jsonrpc': '2.0', 'id': 3, 'method': 'tools/call', 'params': {'name': 'get_component', 'arguments': {'id': 'missing-reference'}}},
        ]
        result = self.run_wrapper(['mcp'], ''.join(json.dumps(frame) + '\n' for frame in frames))
        self.assertEqual(result.returncode, 0, result.stderr)
        responses = [json.loads(line) for line in result.stdout.splitlines()]
        self.assertFalse(responses[1]['result']['isError'])
        self.assertTrue(responses[2]['result']['isError'])
        self.assertNotIn('d' * 64, result.stdout + result.stderr)

    def test_real_mcp_success_only_and_private_deletion(self):
        self.lookup()
        self.assertEqual(self.counts(), {'plugin_lookup': 1})
        self.assertEqual(self.db.stat().st_mode & 0o777, 0o600)
        deleted = self.run_wrapper(['forget'])
        self.assertEqual(deleted.returncode, 0, deleted.stderr)
        self.assertEqual(json.loads(deleted.stdout)['deleted'], 1)
        self.assertFalse(json.loads(self.consent.read_text())['consent'])
        self.lookup()
        self.assertEqual(self.counts(), {})

    def test_real_plan_success_after_write_and_failed_plan_not_counted(self):
        base = target(self.root / 'target')
        source = self.root / 'packet.json'
        write_json(source, packet())
        output = self.root / 'plan.json'
        args = ['plan', str(base), str(source), str(output)]
        self.env['HEADSTART_TELEMETRY'] = '0'
        self.assertEqual(self.run_wrapper(args).returncode, 0)
        self.assertFalse(self.db.exists())
        self.env['HEADSTART_TELEMETRY'] = '1'
        broken = packet()
        broken['recipe'] = {'id': 'unsupported-composition'}
        write_json(source, broken)
        self.assertNotEqual(self.run_wrapper(args).returncode, 0)
        self.assertEqual(self.counts(), {})
        write_json(source, packet())
        self.assertNotEqual(self.run_wrapper(['plan', str(base), str(source), str(self.root)]).returncode, 0)
        self.assertEqual(self.counts(), {})
        result = self.run_wrapper(args)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(json.loads(output.read_text())['stage'], 'planned')
        self.assertEqual(self.counts(), {'first_plan': 1})
        self.assertEqual(self.run_wrapper(args).returncode, 0)
        self.assertEqual(self.counts(), {'first_plan': 1})
        (base / 'AGENTS.md').write_text('Unrelated user edit must block a clean plan')
        self.assertNotEqual(self.run_wrapper(args).returncode, 0)
        self.assertEqual(self.counts(), {'first_plan': 1})
        with sqlite3.connect(self.db) as db:
            stored = json.dumps(list(db.execute('SELECT * FROM interaction_events')))
        self.assertNotIn(str(base), stored)
        self.assertNotIn('d' * 64, stored)

    def test_no_opt_in_and_unsafe_consent_never_collect(self):
        self.env['HEADSTART_TELEMETRY'] = '0'
        self.lookup()
        self.assertFalse(self.db.exists())
        self.env['HEADSTART_TELEMETRY'] = '1'
        self.consent.chmod(0o644)
        self.lookup()
        self.assertFalse(self.db.exists())


if __name__ == '__main__':
    unittest.main()
