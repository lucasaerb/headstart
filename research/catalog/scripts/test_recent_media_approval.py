import copy,json,re,tempfile,unittest
from pathlib import Path
from PIL import Image
from recent_media_approval import load_approvals,apply_approvals,mark_pending
from build_site_catalog import catalog_asset_src
class RecentApprovalTests(unittest.TestCase):
 def fixture(self,ids,decision='approved_for_local_catalog_display'):
  return {'schema_version':'1.0','records':[{'record_id':i,'decision':decision,'reviewer':'/root/critical_review','reviewed_at':'2026-09-11T03:00:00Z','verdict':'PASS — exact image approved for narrow local catalog display.'} for i in ids]}
 def load(self,data,expected):
  with tempfile.TemporaryDirectory() as d:
   p=Path(d)/'a.json';p.write_text(json.dumps(data));return load_approvals(p,expected)
 def test_missing_extra_and_rejected_fail_closed(self):
  expected={'a','b'}
  for data in (self.fixture(['a']),self.fixture(['a','b','c']),self.fixture(['a','b'],'rejected')):
   with self.assertRaises(ValueError):self.load(data,expected)
 def test_unstamped_recent_media_cannot_project(self):
  item={'record_id':'a','rights_status':'reviewed_for_catalog_display','local_path':'media/a.jpg'}
  pending=mark_pending([item],{'a'})[0];self.assertIsNone(catalog_asset_src(pending))
 def test_exact_independent_pass_can_stamp(self):
  approvals=self.load(self.fixture(['a']),{'a'});item={'record_id':'a','rights_status':'candidate_local_display_pending_independent_review','local_path':'media/a.jpg'}
  stamped=apply_approvals([item],approvals,{'a'})[0];self.assertEqual('assets/catalog/a.jpg',catalog_asset_src(stamped));self.assertEqual('/root/critical_review',stamped['reviewer'])
 def test_contact_sheet_and_credits_match_manifest(self):
  root=Path(__file__).resolve().parents[1];manifest=json.loads((root/'media-manifest.json').read_text());credits=(root/'media-credits.md').read_text()
  self.assertEqual(len(manifest),len(re.findall(r'^## \d{2}\. ',credits,re.MULTILINE)))
  with Image.open(root/'contact-sheet.jpg') as image:self.assertEqual((1500,140+((len(manifest)+2)//3)*370),image.size)
  for item in manifest:
   with Image.open(root/item['local_path']) as image:
    if getattr(image,'n_frames',1)>1:image.seek(image.n_frames//2);image.convert('RGB').getbbox()
if __name__=='__main__':unittest.main()
