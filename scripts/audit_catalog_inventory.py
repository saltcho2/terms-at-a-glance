"""Check all stored candidate URLs, without promoting candidates to official sources."""
import json
from pathlib import Path
from check_policy_sources import ROOT, scan

manifest = json.loads((ROOT / 'qa-20261017/all-source-candidates.json').read_text())
catalog = {key: {'name': value['name'], 'items': [], 'documents': [{'url': url} for url in value['urls']]} for key, value in manifest.items()}
report = scan(catalog, {}, workers=10, progress_path=ROOT / 'qa-20261017/full-inventory-progress.json')
report['complete'] = True
report['scope'] = '등록 서비스 전체의 기존 저장 후보 주소 접속·본문 수집 점검. 공식성 또는 약관 내용 검수 완료가 아님.'
(ROOT / 'qa-20261017/full-inventory-retrieval.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'serviceCount': len(catalog), 'urlCount': len(report['documents']), 'states': report['counts']}, ensure_ascii=False), flush=True)
