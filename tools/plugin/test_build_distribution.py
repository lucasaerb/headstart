import hashlib
import json
from pathlib import Path
import tempfile
import unittest
import zipfile
from unittest.mock import patch
import build_distribution as builder


class DistributionTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.source = self.root / 'source'
        for relative in builder.REQUIRED:
            path = self.source / relative
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text('{}' if path.suffix == '.json' else '# Test\n')
        (self.source / '.codex-plugin/plugin.json').write_text(json.dumps({'name': 'headstart-plugin', 'version': '0.2.0'}))
        (self.source / 'plugin.json').write_bytes((self.source / '.codex-plugin/plugin.json').read_bytes())
        self.output = self.root / 'output/package.zip'

    def test_reproducible_relocated_payload_and_hashes(self):
        first = builder.build(self.source, self.output)
        second = builder.build(self.source, self.root / 'another.zip')
        self.assertEqual(first['sha256'], second['sha256'])
        with zipfile.ZipFile(self.output) as archive:
            report = json.loads(archive.read('distribution-manifest.json'))
            for name, evidence in report['files'].items():
                data = archive.read(name)
                self.assertEqual(evidence['sha256'], hashlib.sha256(data).hexdigest())
                self.assertEqual(evidence['bytes'], len(data))
            archive.extractall(self.root / 'relocated')
            market = json.loads((self.root / 'relocated/.agents/plugins/marketplace.json').read_text())
            plugin = self.root / 'relocated' / market['plugins'][0]['source']['path']
            self.assertTrue((plugin / 'scripts/catalog_mcp.py').is_file())
            self.assertTrue((plugin / 'references/discovery-catalog.json').is_file())

    def test_secrets_build_helpers_and_cache_excluded(self):
        for name in ['.env', '.env.production', 'scripts/bundle_catalog.py',
                     'scripts/passwords.py', 'references/.credentials.json',
                     'tests/test.py', '__pycache__/secret.pyc', 'game-source/main.js']:
            path = self.source / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text('DO-NOT-SHIP')
        builder.build(self.source, self.output)
        with zipfile.ZipFile(self.output) as archive:
            self.assertFalse(any(b'DO-NOT-SHIP' in archive.read(n) for n in archive.namelist()))

    def test_symlink_directory_or_file_rejected(self):
        secret = self.root / 'secret'
        secret.write_text('secret')
        link = self.source / 'references/leak.json'
        link.symlink_to(secret)
        with self.assertRaisesRegex(ValueError, 'Symlinks'):
            builder.build(self.source, self.output)
        link.unlink()
        (self.source / 'extra').symlink_to(self.root, target_is_directory=True)
        with self.assertRaisesRegex(ValueError, 'Symlinks'):
            builder.build(self.source, self.output)

    def test_invalid_source_preserves_existing_archive(self):
        builder.build(self.source, self.output)
        before = self.output.read_bytes()
        (self.source / 'references/discovery-catalog.json').unlink()
        with self.assertRaisesRegex(ValueError, 'Missing required'):
            builder.build(self.source, self.output)
        self.assertEqual(before, self.output.read_bytes())

    def test_write_failure_preserves_existing_and_cleans_temporary(self):
        builder.build(self.source, self.output)
        before = self.output.read_bytes()
        with patch.object(builder.os, 'replace', side_effect=OSError('injected failure')):
            with self.assertRaises(OSError):
                builder.build(self.source, self.output)
        self.assertEqual(before, self.output.read_bytes())
        self.assertEqual(list(self.output.parent.iterdir()), [self.output])

    def test_output_cannot_replace_source_or_symlink_target(self):
        with self.assertRaisesRegex(ValueError, 'outside plugin'):
            builder.build(self.source, self.source / 'archive.zip')
        target = self.root / 'sensitive'
        target.write_text('keep')
        self.output.parent.mkdir()
        self.output.symlink_to(target)
        with self.assertRaisesRegex(ValueError, 'non-symlink'):
            builder.build(self.source, self.output)
        self.assertEqual(target.read_text(), 'keep')

    def test_size_budget(self):
        with patch.object(builder, 'MAX_FILE', 1):
            with self.assertRaisesRegex(ValueError, 'size budget'):
                builder.build(self.source, self.output)


if __name__ == '__main__':
    unittest.main()
