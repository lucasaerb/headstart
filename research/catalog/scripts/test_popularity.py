import json
from pathlib import Path
import tempfile
import unittest

from build_site_catalog import load_popularity, project
from test_catalog import fixture


def observation(stars=0, status='available'):
    return {'repo_url': 'https://github.com/example/game', 'stars': stars, 'status': status,
            'checked_at': '2026-09-10T12:00:00Z', 'evidence_url': 'https://api.github.com/repos/example/game',
            'notes': 'Synthetic repository-scoped observation.'}


class PopularityTests(unittest.TestCase):
    def validate(self, records):
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / 'github-popularity.json'
            path.write_text(json.dumps({'schema_version': '1.0', 'checked_at': '2026-09-10T12:00:00Z', 'repositories': records}))
            return load_popularity(path)

    def test_unknown_and_observed_zero_are_distinct(self):
        self.assertIsNone(project([fixture()], [])[0]['githubStars'])
        observed = self.validate([observation()])
        self.assertEqual(project([fixture()], [], popularity=observed)[0]['githubStars'], 0)
        missing = self.validate([observation(None, 'unavailable')])
        self.assertIsNone(project([fixture()], [], popularity=missing)[0]['githubStars'])

    def test_same_repository_subprojects_share_count(self):
        first, second = fixture(), fixture()
        second.update(id='other-demo', subproject_path='another-demo')
        rows = project([first, second], [], popularity=self.validate([observation(123)]))
        self.assertEqual([r['githubStars'] for r in rows], [123, 123])
        self.assertTrue(all(r['popularity']['checked_at'] == '2026-09-10T12:00:00Z' for r in rows))

    def test_rejects_unfounded_or_invalid_observations(self):
        for item in [observation(True), observation(-1), observation(0, 'unavailable'),
                     dict(observation(), evidence_url='https://api.github.com/repos/other/repo'),
                     dict(observation(), checked_at='yesterday'), dict(observation(), status='not_github')]:
            with self.subTest(item=item), self.assertRaises(ValueError):
                self.validate([item])
        with self.assertRaises(ValueError):
            self.validate([observation(), observation()])


if __name__ == '__main__':
    unittest.main()
