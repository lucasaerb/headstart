import importlib.util
import json
from pathlib import Path
import shutil
import tempfile
import unittest
from unittest.mock import patch
import build_distribution as builder
spec = importlib.util.spec_from_file_location('configure_connection', builder.SOURCE / 'scripts/configure_connection.py')
config = importlib.util.module_from_spec(spec); spec.loader.exec_module(config)


class ConnectionSetupTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(); self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)/'plugin'; self.root.mkdir()
        for name in ['mcp.json', 'plugin.json', '.codex-plugin/plugin.json']:
            p=self.root/name; p.parent.mkdir(exist_ok=True); shutil.copyfile(builder.SOURCE/name,p)
        self.credential=Path(self.temp.name)/'private.json';self.credential.write_text('SECRET-CONTENTS-ARE-NOT-READ');self.credential.chmod(0o600)

    def test_explicit_configuration_and_offline_rollback(self):
        value=config.configure(self.root,'http://127.0.0.1:8767',str(self.credential))
        self.assertEqual(value['mode'],'localhost')
        server=json.loads((self.root/'mcp.json').read_text())['mcpServers']['headstart']
        self.assertEqual(server['env']['HEADSTART_CREDENTIAL_FILE'],str(self.credential))
        self.assertNotIn('SECRET-CONTENTS', ''.join(p.read_text() for p in self.root.rglob('*.json')))
        self.assertEqual(json.loads((self.root/'plugin.json').read_text())['version'],json.loads((self.root/'.codex-plugin/plugin.json').read_text())['version'])
        self.assertEqual(value,config.configure(self.root,'http://127.0.0.1:8767',str(self.credential)))
        reverted=config.configure(self.root)
        self.assertNotEqual(value['version'],reverted['version'])
        self.assertEqual(json.loads((self.root/'mcp.json').read_text())['mcpServers']['headstart']['env'],{})

    def test_invalid_origin_or_credential_never_changes_package(self):
        before={str(p):p.read_bytes() for p in self.root.rglob('*.json')}
        for origin in ['https://example.com','http://localhost:8767','http://127.0.0.1:8767/path','http://secret@127.0.0.1:8767','http://127.0.0.1:99999']:
            with self.assertRaises(ValueError):config.configure(self.root,origin,str(self.credential))
        self.credential.chmod(0o644)
        with self.assertRaises(ValueError):config.configure(self.root,'http://127.0.0.1:8767',str(self.credential))
        self.assertEqual(before,{str(p):p.read_bytes() for p in self.root.rglob('*.json')})
        self.credential.chmod(0o600);link=Path(self.temp.name)/'link';link.symlink_to(self.credential)
        with self.assertRaises(ValueError):config.configure(self.root,'http://127.0.0.1:8767',str(link))

    def test_failed_replace_restores_original_configuration(self):
        before={str(p):p.read_bytes() for p in self.root.rglob('*.json')}
        replace=config.os.replace; count=0
        def failing(source,target):
            nonlocal count
            count+=1
            if count==2:raise OSError('test disk error')
            replace(source,target)
        with patch.object(config.os,'replace',failing):
            with self.assertRaises(OSError):config.configure(self.root,'http://127.0.0.1:8767')
        self.assertEqual(before,{str(p):p.read_bytes() for p in self.root.rglob('*.json')})
        self.assertFalse(list(self.root.rglob('.headstart-config-*')))
