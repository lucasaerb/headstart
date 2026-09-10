#!/usr/bin/env python3
"""Project validated research into frontend metadata; no downloads or site writes by default."""
from __future__ import annotations
import argparse
from datetime import datetime
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import sys
from urllib.parse import urlsplit

from catalog import ROOT, ai_provenance, https_url, load, safe_path

PREFERRED_MODELS = {'GPT-6 Astra', 'Fable 5', 'Fable 5.1', 'Claude Fable 5', 'Claude Fable 5.1'}
PREFIX = 'window.HEADSTART_CATALOG = '


def read_existing(path):
    text = path.read_text(encoding='utf-8').strip()
    if not text.startswith(PREFIX) or not text.endswith(';'):
        raise ValueError('Existing catalog is not the expected static JSON assignment')
    rows = json.loads(text[len(PREFIX):-1])
    if not isinstance(rows, list):
        raise ValueError('Existing catalog must be an array')
    return rows


def pinned_source_url(row):
    commit = row['source']['commit']
    if not commit:
        return None
    # Prefer an inspected exact-version tree URL when the source supplies one.
    for evidence in row['source']['evidence']:
        if evidence['kind'] == 'repository' and commit in urlsplit(evidence['url']).path.split('/'):
            return evidence['url']
    repo = row['repo_url'].rstrip('/').removesuffix('.git')
    host = urlsplit(repo).hostname
    if host == 'github.com':
        return repo + '/tree/' + commit
    if host == 'gitlab.com':
        return repo + '/-/tree/' + commit
    if host == 'gitea.wildfiregames.com':
        return repo + '/src/commit/' + commit
    # An unfamiliar provider must not receive an invented tree route.
    return next((e['url'] for e in row['source']['evidence'] if commit in urlsplit(e['url']).path.split('/')), None)


def repository_key(url):
    return url.rstrip('/').removesuffix('.git').casefold()


def load_popularity(path):
    """Repository-scoped observed counts; unknown is never a zero-star observation."""
    data = json.loads(path.read_text(encoding='utf-8'))
    if not isinstance(data, dict) or data.get('schema_version') != '1.0' or not isinstance(data.get('repositories'), list):
        raise ValueError('Invalid popularity contract')
    def timestamp(value):
        if not isinstance(value, str) or datetime.fromisoformat(value.replace('Z', '+00:00')).tzinfo is None:
            raise ValueError('Popularity check time must include timezone')
    timestamp(data.get('checked_at'))
    seen = set()
    for item in data['repositories']:
        if not isinstance(item, dict) or not {'repo_url', 'stars', 'status', 'checked_at', 'evidence_url', 'notes'} <= item.keys():
            raise ValueError('Invalid popularity record')
        if not https_url(item['repo_url']) or not isinstance(item['notes'], str) or not item['notes'].strip():
            raise ValueError('Popularity repository and notes required')
        key = repository_key(item['repo_url'])
        if key in seen:
            raise ValueError('Duplicate popularity repository')
        seen.add(key)
        timestamp(item['checked_at'])
        status = item['status']
        if status not in ('available', 'unavailable', 'not_github'):
            raise ValueError('Invalid popularity status')
        if not https_url(item['evidence_url'], nullable=status != 'available'):
            raise ValueError('Popularity evidence must be an HTTPS URL')
        if status == 'available':
            if type(item['stars']) is not int or item['stars'] < 0:
                raise ValueError('Observed stars must be a nonnegative integer')
            repo, evidence = urlsplit(item['repo_url']), urlsplit(item['evidence_url'])
            if repo.hostname != 'github.com' or evidence.hostname != 'api.github.com' or repository_key(evidence.path) != '/repos' + repository_key(repo.path):
                raise ValueError('Observed stars need matching GitHub API repository evidence')
        elif item['stars'] is not None:
            raise ValueError('Unavailable stars must remain null')
        if status == 'not_github' and urlsplit(item['repo_url']).hostname == 'github.com':
            raise ValueError('GitHub repository cannot have not_github status')
    return data['repositories']


def load_play_observations(path):
    """Small, dated browser checks; these are editorial observations, not compatibility tests."""
    data = json.loads(path.read_text(encoding='utf-8'))
    if not isinstance(data, dict) or data.get('schema_version') != '1.0' or not isinstance(data.get('records'), list):
        raise ValueError('Invalid play-observation contract')
    seen = set()
    for item in data['records']:
        required = {'record_id', 'status', 'checked_at', 'reviewer', 'environment', 'scenario', 'result', 'limitations', 'editorial_pick'}
        if not isinstance(item, dict) or set(item) != required or item['record_id'] in seen:
            raise ValueError('Invalid or duplicate play observation')
        seen.add(item['record_id'])
        if item['status'] not in {'interactive_checked', 'load_incomplete'} or type(item['editorial_pick']) is not bool:
            raise ValueError('Invalid play status')
        if item['editorial_pick'] and item['status'] != 'interactive_checked':
            raise ValueError('Editorial picks require a completed interactive check')
        if not all(isinstance(item[k], str) and item[k].strip() for k in required - {'editorial_pick'}):
            raise ValueError('Play observation text fields are required')
        if datetime.fromisoformat(item['checked_at'].replace('Z', '+00:00')).tzinfo is None:
            raise ValueError('Play observation time must include timezone')
    return data['records']


def catalog_asset_src(canonical):
    """Derive a site asset URL only from an explicitly display-scoped flat media path."""
    local_path = canonical.get('local_path')
    status = canonical.get('rights_status')
    reviewed = status == 'reviewed_for_catalog_display'
    official_approved = (
        status == 'official_source_local_display_rights_unresolved'
        and isinstance(canonical.get('reviewer'), str) and bool(canonical['reviewer'].strip())
        and isinstance(canonical.get('independent_reviewed_at'), str) and bool(canonical['independent_reviewed_at'].strip())
        and isinstance(canonical.get('independent_review_verdict'), str)
        and canonical['independent_review_verdict'].startswith('PASS')
    )
    if (not reviewed and not official_approved) or not safe_path(local_path):
        return None
    parts = PurePosixPath(local_path).parts
    if len(parts) != 2 or parts[0] != 'media':
        return None
    return 'assets/catalog/' + parts[1]


def project(records, media, existing=(), reviews=(), popularity=(), play_observations=(), require_previews=False):
    """Pure projection. Only record-specific, reviewed local previews survive."""
    media_by_record = {m['record_id']: m for m in media}
    previews = {r['id']: r.get('preview') for r in existing}
    decisions = {r['record_id']: r['decision'] for r in reviews}
    popularity_by_repo = {repository_key(p['repo_url']): p for p in popularity}
    play_by_record = {p['record_id']: p for p in play_observations}
    result = []
    for row in records:
        ai = ai_provenance(row)
        observed_popularity = popularity_by_repo.get(repository_key(row['repo_url']), {'repo_url': row['repo_url'], 'stars': None, 'status': 'unknown', 'checked_at': None, 'evidence_url': None, 'notes': 'GitHub popularity has not been checked.'})
        preview = None
        previous = previews.get(row['id'])
        canonical = media_by_record.get(row['id'])
        if canonical:
            derived_src = catalog_asset_src(canonical)
            previous_src = previous.get('src') if previous else None
            if (isinstance(previous_src, str) and previous_src.startswith('assets/catalog/') and safe_path(previous_src)
                    and previous.get('sha256') == canonical['sha256']):
                src = previous_src
            else:
                src = derived_src
            if src and derived_src and src == derived_src:
                mapping = {'credit': 'credit', 'licenseExpression': 'license_expression', 'licenseUrls': 'license_urls',
                           'sourcePage': 'source_page', 'licenseEvidenceUrl': 'license_evidence_url', 'captureDate': 'capture_date', 'versionRelation': 'version_relation',
                           'alt': 'alt', 'sha256': 'sha256', 'originalUrl': 'original_url', 'allowedUse': 'allowed_use',
                           'modifications': 'modifications', 'rightsStatus': 'rights_status'}
                preview = {target: canonical[source] for target, source in mapping.items()}
                if canonical.get('reviewer'):
                    preview['reviewer'] = canonical['reviewer']
                preview.update(src=src, localSourcePath='research/catalog/' + canonical['local_path'])
        kind = row['demo']['kind']
        browser_platform = kind == 'browser' or any(p.casefold().startswith('browser') or p.casefold() in {'web', 'webgl', 'html5'} for p in row['platforms'])
        desktop_platform = kind == 'native-download' or any(p.casefold().startswith(('windows', 'linux', 'macos', 'desktop')) for p in row['platforms'])
        platform_kind = 'browser' if browser_platform else 'desktop' if desktop_platform else 'other'
        labels = {'browser': 'Play demo', 'native-download': 'Get game', 'video': 'Watch video', 'none': 'No demo'}
        record = {'id': row['id'], 'title': row['title'], 'summary': row['summary'], 'genres': row['genres'],
                  'runtime': row['runtime']['name'], 'label': labels[kind], 'demoUrl': row['demo']['url'],
                  'demoKind': kind, 'repoUrl': row['repo_url'], 'projectUrl': row['project_url'],
                  'commit': row['source']['commit'], 'creator': row['creator'],
                  'readiness': row['rights']['scope_reuse_status'], 'preview': preview, 'contentKind': row['content_kind'],
                  'dimension': row['dimension'], 'visualStyle': row['visual_style'], 'runtimeVersion': row['runtime']['version'],
                  'runtimeVersionStatus': row['runtime']['version_status'], 'interactiveStatus': row['demo']['interactive_status'],
                  'demoSourceRelation': row['demo']['source_relation'], 'demoNotes': row['demo']['notes'],
                  'rights': row['rights'], 'sourceInspectedAt': row['source']['inspected_at'],
                  'integrationFamily': row['research']['integration_family'], 'catalogStatus': 'local_research_preview',
                  'discoveryDecision': decisions.get(row['id'], 'review_pending'),
                  'sourceAvailability': 'pinned_public_source' if row['source']['commit'] else 'no_public_source',
                  'pinnedSourceUrl': pinned_source_url(row),
                  'platforms': row['platforms'], 'platformKind': platform_kind, 'capabilities': row['capability_tags'], 'buildingBlocks': row['building_blocks'],
                  'sourceEvidence': row['source']['evidence'], 'aiProvenance': ai,
                  'githubStars': observed_popularity['stars'] if observed_popularity['status'] == 'available' else None,
                  'popularity': observed_popularity}
        if row['id'] in play_by_record:
            record['playReview'] = play_by_record[row['id']]
        if not require_previews or preview is not None:
            result.append(record)
    def priority(r):
        browser = r['platformKind'] == 'browser'
        preferred = r['aiProvenance']['status'] == 'creator_attributed' and bool(PREFERRED_MODELS & set(r['aiProvenance']['models']))
        three = r['integrationFamily'] == 'threejs-r3f-candidate'
        return (0 if browser and preferred else 1 if browser and three else 2 if browser else 3, r['title'].casefold(), r['id'])
    return sorted(result, key=priority)


def serialize(rows):
    return PREFIX + json.dumps(rows, ensure_ascii=False, indent=2, allow_nan=False).replace('</', '<\\/').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029') + ';\n'


def update_site_index(path, rows, research_total=None):
    """Publish an exact displayed total and cache-busting catalog URL together."""
    research_total = len(rows) if research_total is None else research_total
    source = path.read_text(encoding='utf-8')
    version = hashlib.sha256(serialize(rows).encode('utf-8')).hexdigest()[:12]
    source, script_count = re.subn(r'<script src="catalog\.js(?:\?v=[^"]*)?" defer></script>',
                                   f'<script src="catalog.js?v={version}" defer></script>', source)
    source, total_count = re.subn(r'(id="games"[^>]*data-catalog-total=")[^"]*(")',
                                  rf'\g<1>{len(rows)}\2', source)
    source, research_count = re.subn(r'(id="games"[^>]*data-research-total=")[^"]*(")',
                                     rf'\g<1>{research_total}\2', source)
    source, visible_count = re.subn(r'(<p id="result-count"[^>]*>)[^<]*(</p>)',
                                    rf'\g<1>{len(rows)} projects\2', source)
    source, pictured_count = re.subn(r'(<span id="pictured-count">)[^<]*(</span>)',
                                     rf'\g<1>{len(rows)} pictured of {research_total} research records\2', source)
    if script_count != 1 or total_count != 1 or research_count != 1 or visible_count != 1 or pictured_count != 1:
        raise ValueError('Site index needs one catalog script, catalog/research total markers, pictured count and visible result count')
    path.write_text(source, encoding='utf-8')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=ROOT)
    parser.add_argument('--existing-catalog', type=Path, help='Existing catalog.js to preserve validated local image mappings')
    parser.add_argument('--output', type=Path, help='Explicit output file; otherwise stdout. Does not copy assets.')
    parser.add_argument('--require-previews', action='store_true', help='Emit only records with record-specific, hash-matched local media explicitly scoped for catalog display')
    parser.add_argument('--site-index', type=Path, help='Update the site index displayed total and cache-busting catalog URL after writing output')
    args = parser.parse_args()
    try:
        records, media = load(args.root)
        existing = read_existing(args.existing_catalog) if args.existing_catalog else []
        review_path = args.root / 'internal-discovery-review.json'
        reviews = json.loads(review_path.read_text())['records'] if review_path.exists() else []
        popularity_path = args.root / 'github-popularity.json'
        popularity = load_popularity(popularity_path) if popularity_path.exists() else []
        play_path = args.root / 'play-observations.json'
        play_observations = load_play_observations(play_path) if play_path.exists() else []
        output = serialize(project(records, media, existing, reviews, popularity, play_observations, require_previews=args.require_previews))
        if args.output:
            args.output.write_text(output, encoding='utf-8')
        else:
            sys.stdout.write(output)
        if args.site_index:
            if not args.output:
                raise ValueError('--site-index requires --output')
            update_site_index(args.site_index, json.loads(output[len(PREFIX):-2]), research_total=len(records))
    except (OSError, ValueError, KeyError, TypeError) as exc:
        parser.exit(1, f'Projection error: {exc}\n')


if __name__ == '__main__':
    main()
