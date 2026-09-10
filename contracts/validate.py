"""Strict structural and claim-gate validation; no network or source execution.

Evidence truth and curator authority must additionally be checked at ingestion.
Passing this validator establishes a well-formed record, never verified reuse.
"""
import hashlib
import json
from pathlib import Path
from jsonschema import Draft202012Validator, FormatChecker

SCHEMA_VERSION = '0.2'
ONTOLOGY_VERSION = '0.2'
ROOT = Path(__file__).resolve().parent
SCHEMA = json.loads((ROOT / 'entity.schema.json').read_text())
VALIDATOR = Draft202012Validator(SCHEMA, format_checker=FormatChecker())


def _fail(message):
    raise ValueError(message)


def _walk(value):
    if isinstance(value, dict):
        yield value
        for child in value.values():
            yield from _walk(child)
    elif isinstance(value, list):
        for child in value:
            yield from _walk(child)


def validate_record(record):
    """Validate one canonical entity; raise ValueError with a bounded explanation."""
    errors = sorted(VALIDATOR.iter_errors(record), key=lambda e: str(e.path))
    if errors:
        error = errors[0]
        _fail(f"Invalid contract at {'.'.join(map(str, error.path))}: {error.validator}")
    data = record['data']
    kind = record['entity_type']
    for node in _walk(data):
        if 'claim_type' in node and 'source_commit' in data and node['source_commit'] != data['source_commit']:
            _fail('Nested rights or claim evidence has stale source commit')
        if 'claim_type' in node:
            required_origin = {'measured': 'executed_test', 'editorial': 'curator'}
            if node['claim_type'] in required_origin and node['origin'] != required_origin[node['claim_type']]:
                _fail('Measured/editorial claim origin does not support its type')
        if node.get('status') == 'scope_cleared':
            if not node.get('evidence') or not node.get('code_spdx') or node.get('asset_status') == 'unreviewed':
                _fail('Cleared rights require scoped license/asset evidence')
        if 'evidence' in node and 'source_commit' in node:
            for evidence in node['evidence']:
                if evidence['source_commit'] != node['source_commit']:
                    _fail('Stale source evidence')
    if kind == 'project_version' and data['publication_state'] == 'published':
        if data['rights']['status'] != 'scope_cleared' or not data['evidence']:
            _fail('Published versions require cleared rights and source evidence')
    if kind == 'demo':
        if data['source_relation'] == 'proven' and (data['project_version'] is None or not data['evidence']):
            _fail('Proven demo relation requires pinned version and evidence')
        if data['health'] != 'unverified' and not data['evidence']:
            _fail('Demo health requires observation evidence')
    if kind == 'demo_check' and data['interactive'] is True:
        if data['reachable'] is not True or not any(e['claim_type'] == 'measured' for e in data['evidence']):
            _fail('Interactive success requires executed observation')
    if kind == 'component_version':
        if data['readiness'] != 'suggested':
            if not data['evidence'] or data['rights']['status'] != 'scope_cleared':
                _fail('Reviewed scope requires evidence and cleared rights')
            if not set(data['scope']['required_files'] + data['scope']['optional_files']).issubset(data['rights']['scope']):
                _fail('Rights must cover every required source file explicitly')
            if not any(e['claim_type'] in ('inspected', 'measured') and e['origin'] != 'ai_proposal' for e in data['evidence']):
                _fail('Reviewed scope cannot be supported only by declarations or AI proposals')
        if any(c['support'] == 'tested' for c in data['compatibility']) and data['readiness'] != 'integration_tested':
            _fail('Compatibility tested requires integration-tested evidence')
        if data['readiness'] in ('isolated', 'integration_tested'):
            _verification(data)
    if kind == 'recipe' and data['status'] == 'tested':
        if data['rights']['status'] != 'scope_cleared':
            _fail('Tested recipe requires cleared assembled scope')
        _verification(data)
    if kind == 'dependency' and data['to_version'] is None and not data['external_package']:
        _fail('Dependency must identify a version or external package')
    if kind == 'benchmark_run' and data['raw_results']['claim_type'] != 'measured':
        _fail('Benchmark raw results must be measured evidence')
    if kind == 'component':
        ontology = json.loads((ROOT / 'ontology.json').read_text())
        concepts = {c['id'] for c in ontology['concepts'] if c['facet'] == 'capability'}
        if not set(data['concept_ids']).issubset(concepts):
            _fail('Unknown capability concept')
    return record


def _verification(data):
    verification = data['verification']
    if not verification or verification['result'] != 'passed':
        _fail('Tested/isolated status requires its own passing verification')
    if verification['source_commit'] != data['source_commit']:
        _fail('Verification source does not match')
    if 'digest' in data and verification['recipe_digest'] != data['digest']:
        _fail('Recipe verification does not match assembled recipe digest')
    if 'target_commit' in data and verification['target_commit'] != data['target_commit']:
        _fail('Recipe target does not match')
    if 'scope' in data and verification['scope_digest'] != scope_digest(data['scope']):
        _fail('Verification scope does not match')
    if not all(e['origin'] == 'executed_test' and e['claim_type'] == 'measured' for e in verification['evidence']):
        _fail('Verification needs measured execution evidence')


def scope_digest(scope):
    return hashlib.sha256(json.dumps(scope,sort_keys=True,separators=(',', ':')).encode()).hexdigest()


def validate_bundle(records):
    """Check same-bundle immutable links in addition to local record gates."""
    index = {}
    for record in records:
        validate_record(record)
        key = (record['id'], record['version'])
        if key in index:
            _fail('Duplicate immutable identity/version')
        index[key] = record
    for record in records:
        for node in _walk(record['data']):
            if set(node) == {'id', 'version'} and (node['id'], node['version']) not in index:
                _fail('Unresolved immutable version reference')
        relations = {
            'demo': {'project_version': {'project_version'}},
            'demo_check': {'demo': {'demo'}},
            'component_version': {'project_version': {'project_version'}, 'dependencies': {'dependency'}},
            'asset': {'source_version': {'project_version', 'component_version'}},
            'recipe': {'components': {'component_version'}, 'assets': {'asset'}, 'brief': {'game_brief'}},
            'recommendation': {'brief': {'game_brief'}, 'chosen': {'component_version', 'recipe'},
                               'alternatives': {'component_version', 'recipe'}, 'findings': {'review_finding'}},
        }.get(record['entity_type'], {})
        for field, kinds in relations.items():
            references = record['data'][field]
            if references is None:
                continue
            if isinstance(references, dict):
                references = [references]
            for reference in references:
                target = index[(reference['id'], reference['version'])]
                if target['entity_type'] not in kinds:
                    _fail('Version reference points to the wrong entity kind')
        if record['entity_type'] == 'component_version':
            data = record['data']
            parent_ref = data['project_version']
            parent = index[(parent_ref['id'], parent_ref['version'])]
            if parent['entity_type'] != 'project_version' or parent['data']['source_commit'] != data['source_commit']:
                _fail('Component source must match its pinned project version')
            identities = [r for r in records if r['entity_type']=='component' and r['id']==data['component_id']]
            if not identities or any(r['data']['project_id'] != parent['data']['project_id'] for r in identities):
                _fail('Component identity must belong to source parent project')
        data = record['data']
        verification = data.get('verification')
        if verification is not None:
            recipe = index[(verification['recipe']['id'], verification['recipe']['version'])]
            target = index[(verification['target']['id'], verification['target']['version'])]
            if recipe['entity_type'] != 'recipe' or target['entity_type'] != 'project_version':
                _fail('Verification requires recipe and target source versions')
            if recipe['data']['digest'] != verification['recipe_digest'] or target['data']['source_commit'] != verification['target_commit']:
                _fail('Verification target or recipe digest mismatch')
            if recipe['data']['source_commit'] != verification['source_commit'] or recipe['data']['target_commit'] != verification['target_commit']:
                _fail('Recipe source/target mismatch')
            if record['entity_type'] == 'component_version':
                if {'id':record['id'],'version':record['version']} not in recipe['data']['components']:
                    _fail('Recipe must include exact tested component version')
            elif record['entity_type'] == 'recipe':
                if recipe != record or verification['scope_digest'] != scope_digest({'components':data['components'],'assets':data['assets']}):
                    _fail('Recipe verification must attest its own assembled scope')
        if record['entity_type'] == 'dependency':
            for field in ('from_version','to_version'):
                ref=data[field]
                if ref is not None and index[(ref['id'],ref['version'])]['entity_type'] != 'component_version':
                    _fail('Dependency endpoint must be component version')
        if record['entity_type'] == 'component_version':
            for ref in data['dependencies']:
                dep=index[(ref['id'],ref['version'])]
                if dep['data']['from_version'] != {'id':record['id'],'version':record['version']}:
                    _fail('Dependency belongs to another component version')
    return records
