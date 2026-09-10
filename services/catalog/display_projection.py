"""Preserve missing-image research references without promoting their claims."""
from urllib.parse import urlparse, quote


def include_missing_references(projection, research):
    result = list(projection)
    known = {record['id'] for record in result}
    for record in research:
        if record['id'] in known:
            continue
        demo = record['demo']
        source = record['source']
        repo = record['repo_url']
        pinned = None
        if repo and source.get('commit') and urlparse(repo).hostname == 'github.com':
            pinned = repo.rstrip('/') + '/tree/' + quote(source['commit'])
            if record.get('subproject_path'):
                pinned += '/' + '/'.join(quote(part, safe='') for part in record['subproject_path'].split('/'))
        result.append({
            'id': record['id'], 'title': record['title'], 'summary': record['summary'],
            'genres': record['genres'], 'runtime': record['runtime']['name'],
            'label': 'Play demo' if demo['kind'] == 'browser' else 'View project',
            'demoUrl': demo['url'] or record['project_url'] or repo,
            'demoKind': demo['kind'], 'repoUrl': repo, 'projectUrl': record['project_url'],
            'commit': source.get('commit'), 'creator': record['creator'],
            'readiness': 'review_required', 'preview': None,
            'contentKind': record['content_kind'], 'dimension': record['dimension'],
            'visualStyle': record['visual_style'], 'runtimeVersion': record['runtime']['version'],
            'runtimeVersionStatus': record['runtime']['version_status'],
            'interactiveStatus': demo['interactive_status'], 'demoSourceRelation': demo['source_relation'],
            'demoNotes': demo['notes'], 'rights': record['rights'],
            'sourceInspectedAt': source['inspected_at'],
            'integrationFamily': record['research']['integration_family'],
            'catalogStatus': 'research_only', 'discoveryDecision': 'metadata_reference_only',
            'sourceAvailability': 'pinned_public_source' if pinned else 'source_review_required',
            'pinnedSourceUrl': pinned, 'platforms': record['platforms'],
            'platformKind': 'browser' if 'browser' in record['platforms'] else 'desktop' if demo['kind']=='native-download' else 'unknown',
            'capabilities': record['capability_tags'], 'buildingBlocks': record['building_blocks'],
            'sourceEvidence': source['evidence'],
            'aiProvenance': record.get('ai_provenance', {'status':'unknown','models':[], 'evidence':[], 'notes':'Model attribution not established.'}),
            # Absence is unknown, never an invented observed zero.
            'githubStars': None, 'popularity': None,
        })
        known.add(record['id'])
    return result
