#!/usr/bin/env python3
"""Maintainer-only: derive the metadata snapshot from independently reviewed research."""
import argparse
import hashlib
import json
from pathlib import Path


def bundle(research_root, plugin_root):
    catalog_raw = (research_root / 'catalog.json').read_bytes()
    review_raw = (research_root / 'internal-discovery-review.json').read_bytes()
    catalog, review = json.loads(catalog_raw), json.loads(review_raw)
    decisions = {r['record_id']: r for r in review['records']}
    records = []
    for r in catalog['records']:
        decision = decisions[r['id']]
        if decision['decision'] != 'internal_reference_ready':
            continue
        if decision['source_commit'] != r['source']['commit'] or not decision['review_verdict'].startswith('PASS'):
            raise ValueError('Unreviewed source version')
        # Preview files and unreviewed image references are not part of this metadata package.
        selected = {key: r[key] for key in ('id', 'title', 'repo_url', 'creator', 'summary', 'genres', 'capability_tags', 'visual_style', 'runtime', 'platforms', 'demo', 'source', 'rights', 'building_blocks', 'research')}
        selected['discovery_review'] = decision
        records.append(selected)
    raw = (json.dumps({'schema_version': 'headstart-discovery-0.1', 'records': records}, indent=2, ensure_ascii=False, allow_nan=False) + '\n').encode()
    target = plugin_root / 'references'
    (target / 'discovery-catalog.json').write_bytes(raw)
    manifest = {'snapshot_sha256': hashlib.sha256(raw).hexdigest(), 'source_catalog_sha256': hashlib.sha256(catalog_raw).hexdigest(), 'source_review_sha256': hashlib.sha256(review_raw).hexdigest(), 'source_schema_version': catalog['schema_version'], 'scope': review['definition'], 'record_count': len(records)}
    (target / 'discovery-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
    print(f'Bundled {len(records)} link-only research references.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('research_root', type=Path)
    args = parser.parse_args()
    bundle(args.research_root.resolve(), Path(__file__).resolve().parents[1])
