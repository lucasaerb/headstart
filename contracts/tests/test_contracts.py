import copy
import json
from pathlib import Path
import unittest
from jsonschema import Draft202012Validator, FormatChecker
from contracts.validate import validate_record, validate_bundle, scope_digest, SCHEMA

ROOT = Path(__file__).resolve().parents[2]
COMMIT = 'a' * 40
DIGEST = 'b' * 64


def evidence():
    return {'path':'evidence/check.json','digest':DIGEST,'source_commit':COMMIT,
            'origin':'executed_test','claim_type':'measured','reviewer':'fixture-reviewer',
            'observed_at':'2026-09-10T12:00:00Z','claim':'Synthetic contract-test evidence only'}


def rights(cleared=False):
    return {'status':'scope_cleared' if cleared else 'review_required','scope':['src/main.js'],
            'code_spdx':'MIT' if cleared else None,'asset_status':'not_applicable' if cleared else 'unreviewed',
            'notices':[],'evidence':[evidence()] if cleared else []}


def envelope(kind, data):
    return {'schema_version':'0.2','entity_type':kind,'id':'fixture-'+kind,'version':'1','data':data}


def project():
    return envelope('project_version',{'project_id':'fixture-project','source_commit':COMMIT,
                    'publication_state':'candidate','rights':rights(),'evidence':[]})


def component():
    return envelope('component_version',{'component_id':'fixture-component',
            'project_version':{'id':'fixture-project_version','version':'1'},'source_commit':COMMIT,
            'readiness':'suggested','scope':{'required_files':['src/main.js'],'optional_files':[],
            'excluded_systems':[],'coupling_notes':[]},'dependencies':[],'compatibility':[],
            'rights':rights(),'evidence':[],'verification':None})


def verification():
    return {'source_commit':COMMIT,'target_commit':'c'*40,'recipe_digest':DIGEST,'result':'passed',
            'checks':['behavior and disposal fixture'],'evidence':[evidence()],
            'recipe':{'id':'fixture-recipe','version':'1'},'target':{'id':'fixture-target','version':'1'},'scope_digest':scope_digest(component()['data']['scope'])}


class ContractsTest(unittest.TestCase):
    def reject(self, record):
        with self.assertRaises(ValueError): validate_record(record)

    def test_schema_self_valid(self):
        Draft202012Validator.check_schema(SCHEMA)

    def test_candidate_does_not_gain_publication(self):
        record = project(); validate_record(record)
        record['data']['publication_state']='published'; self.reject(record)
        record['data'].update(rights=rights(True),evidence=[evidence()]); validate_record(record)

    def test_missing_commit_and_incompatible_version(self):
        record=project(); record['data']['source_commit']=None; self.reject(record)
        record=project(); record['schema_version']='0.3'; self.reject(record)

    def test_false_tested_and_stale_evidence(self):
        record=component(); record['data']['readiness']='integration_tested'; self.reject(record)
        record['data'].update(rights=rights(True),evidence=[evidence()],verification=verification())
        validate_record(record)
        record['data']['verification']['source_commit']='d'*40; self.reject(record)

    def test_paths_reject_posix_windows_encoded_and_controls(self):
        for path in ['../secret','/secret','a/../../secret',r'C:\secret',r'a\..\secret','%2e%2e/secret','a\x00b']:
            record=component(); record['data']['scope']['required_files']=[path]; self.reject(record)

    def test_unknown_measurement_is_not_zero(self):
        record=envelope('game_brief',{'intent':'Fixture','runtime':None,'runtime_version':None,
               'platform':None,'device':None,'visual_references':[],'camera':None,'input':[],
               'scope':None,'budgets':[{'metric':'download','value':None,'unit':'bytes'}],
               'preserved_systems':[],'constraints':[]})
        validate_record(record); self.assertIsNone(record['data']['budgets'][0]['value'])
        record['data']['budgets'][0]['value']=0; validate_record(record)
        record['data']['budgets'][0]['value']=-1; self.reject(record)

    def test_recipe_cannot_inherit_component_tested_status(self):
        record=envelope('recipe',{'components':[{'id':'fixture-component','version':'1'}],'assets':[],
               'brief':{'id':'fixture-brief','version':'1'},'source_commit':COMMIT,'target_commit':'c'*40,
               'digest':DIGEST,'adapters':[],'compatibility_assumptions':[],'rights':rights(True),
               'status':'tested','verification':None,'rollback':'Discard fixture patch','limitations':[]})
        self.reject(record); record['data']['verification']=verification(); validate_record(record)
        record['data']['digest']='e'*64; self.reject(record)

    def test_declared_claim_cannot_become_measured(self):
        record=envelope('claim',evidence()); record['data']['origin']='maintainer'; self.reject(record)

    def test_rights_scope_and_nested_evidence_match(self):
        record=component(); record['data'].update(readiness='source_reviewed',rights=rights(True),evidence=[evidence()])
        validate_record(record)
        record['data']['rights']['scope']=['other.js']; self.reject(record)
        record['data']['rights']=rights(True)
        record['data']['rights']['evidence'][0]['source_commit']='c'*40; self.reject(record)

    def test_proven_demo_and_interactive_health_need_evidence(self):
        record=envelope('demo',{'project_version':None,'url':'https://example.com/demo',
                    'source_relation':'unknown','health':'unverified','evidence':[]})
        validate_record(record)
        record['data']['source_relation']='proven'; self.reject(record)
        record['data']['source_relation']='unknown'; record['data']['health']='interactive'; self.reject(record)

    def test_bundle_missing_reference_and_duplicate(self):
        record=component()
        with self.assertRaises(ValueError): validate_bundle([record])
        with self.assertRaises(ValueError): validate_bundle([project(),project()])

    def test_legacy_fixtures_and_copies(self):
        package=ROOT/'HeadStart-Starter-Package'
        for name in ['catalog-record.schema.json','catalog-record.example.json','seed-catalog.json']:
            self.assertEqual((package/name).read_bytes(),(package/'headstart-plugin/references'/name).read_bytes())
        schema=json.loads((package/'catalog-record.schema.json').read_text())
        validator=Draft202012Validator(schema,format_checker=FormatChecker())
        example=json.loads((package/'catalog-record.example.json').read_text())
        validator.validate(example)
        example['project']['publication_state']='published'
        self.assertTrue(list(validator.iter_errors(example)))

    def test_all_research_fields_mapped_and_ontology_consistent(self):
        mapping_document=json.loads((ROOT/'contracts/research-mapping.json').read_text())
        mapping=mapping_document['fields']
        export=json.loads((ROOT/'research/catalog/catalog.json').read_text())
        self.assertEqual(set(export)-{'records'},set(mapping_document['export_fields']))
        def walk(value,path=''):
            if isinstance(value,dict):
                for key,child in value.items(): walk(child,f'{path}.{key}' if path else key)
            elif isinstance(value,list):
                self.assertIn(path+'[]',mapping)
                for child in value: walk(child,path+'[]')
            else: self.assertIn(path,mapping)
        for record in json.loads((ROOT/'research/catalog/catalog.json').read_text())['records']:walk(record)
        ontology=json.loads((ROOT/'contracts/ontology.json').read_text())
        Draft202012Validator(json.loads((ROOT/'contracts/ontology.schema.json').read_text())).validate(ontology)
        ids={c['id'] for c in ontology['concepts']}
        self.assertEqual(len(ids),len(ontology['concepts']))
        for concept in ontology['concepts']:
            self.assertTrue(concept['parent_id'] is None or concept['parent_id'] in ids)
            self.assertTrue(concept['deprecated_by'] is None or concept['deprecated_by'] in ids)


if __name__=='__main__': unittest.main()
