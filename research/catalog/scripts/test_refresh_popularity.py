import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import Mock, patch
from urllib.error import HTTPError
from urllib.request import Request
import refresh_popularity as module

REPO = 'https://github.com/example/game'


def response(stars=0, url=REPO):
    return 200, json.dumps({'id': 123, 'html_url': url, 'stargazers_count': stars}).encode()


class PopularityCollectionTests(unittest.TestCase):
    def test_observed_zero_is_distinct_from_unknown(self):
        zero, _ = module.observe(REPO, lambda _: response(0))
        unknown, _ = module.observe(REPO, lambda _: response(None))
        self.assertEqual((zero['status'], zero['stars']), ('available', 0))
        self.assertEqual((unknown['status'], unknown['stars']), ('unavailable', None))

    def test_boolean_negative_and_identity_mismatch_fail_closed(self):
        for reply in [response(True), response(-1), response(100, 'https://github.com/someone/else')]:
            with self.subTest(reply=reply):
                row, _ = module.observe(REPO, lambda _: reply)
                self.assertIsNone(row['stars'])
                self.assertEqual(row['status'], 'unavailable')

    def test_404_and_network_failure_retained_as_null(self):
        for exc in [HTTPError('https://api.github.com/repos/example/game', 404, 'Not found', {}, None), OSError('offline')]:
            if isinstance(exc, HTTPError):
                self.addCleanup(exc.close)
            with self.subTest(exc=exc):
                row, audit = module.observe(REPO, Mock(side_effect=exc))
                self.assertIsNone(row['stars'])
                self.assertEqual(row['status'], 'unavailable')
                self.assertEqual(audit['status'], 'unavailable')

    def test_repository_dedup_and_non_github_never_requested(self):
        fetch = Mock(return_value=response(12))
        snapshot, audit = module.collect([{'repo_url': REPO}, {'repo_url': REPO},
                                         {'repo_url': 'https://gitlab.com/veloren/veloren'}], fetch)
        fetch.assert_called_once_with('https://api.github.com/repos/example/game')
        self.assertEqual(len(snapshot['repositories']), 2)
        non = next(r for r in snapshot['repositories'] if r['status'] == 'not_github')
        self.assertIsNone(non['stars'])
        self.assertEqual(len(audit['fetches']), 2)

    def test_invalid_github_paths_do_not_reach_network(self):
        for url in ['https://github.com/a/../secret', 'https://github.com/a%2fb/c',
                    'https://github.com/a/b?token=x', 'https://user@github.com/a/b',
                    'http://github.com/a/b', 'https://github.com/a/b#x']:
            fetch = Mock()
            with self.subTest(url=url), self.assertRaises(ValueError):
                module.observe(url, fetch)
            fetch.assert_not_called()

    def test_oversized_response_and_redirect_rejected(self):
        row, _ = module.observe(REPO, lambda _: (200, b' ' * (module.MAX_BYTES + 1)))
        self.assertEqual(row['status'], 'unavailable')
        handler = module.NoRedirect()
        self.assertIsNone(handler.redirect_request(Request('https://api.github.com/repos/a/b'),
                                                   None, 302, 'found', {}, 'http://127.0.0.1/'))

    def test_failed_publication_preserves_previous_snapshot(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'github-popularity.json'
            path.write_text('previous')
            with patch.object(module.os, 'replace', side_effect=OSError('disk failure')):
                with self.assertRaises(OSError):
                    module.atomic_json(path, {'new': 'data'})
            self.assertEqual(path.read_text(), 'previous')
            self.assertEqual(list(path.parent.iterdir()), [path])


if __name__ == '__main__':
    unittest.main()
