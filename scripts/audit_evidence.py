"""Report missing evidence without changing dates or declaring semantic review complete."""
import json
from pathlib import Path
from collections import Counter
ROOT=Path(__file__).resolve().parent.parent
c=json.loads((ROOT/'data/catalog.json').read_text())
rows=[]
for key,s in c.items():
    for n,i in enumerate(s['items']):
        e=i[7]
        rows.append({'key':key,'service':s['name'],'index':n,'title':i[2],'source':i[6], 'missingFields':[f for f in ['quote','effectiveAt','publishedAt','document','clause','region','checkedAt'] if not e.get(f)],'checkedAt':e.get('checkedAt'),'scope':'기록 유무 점검. 원문 내용 검수 완료 판정 아님.'})
r={'registered':len(c),'summaryServices':sum(bool(s['items']) for s in c.values()),'items':len(rows),'missingFields':dict(Counter(f for x in rows for f in x['missingFields'])),'withoutSummary':[{'key':k,'name':s['name']} for k,s in c.items() if not s['items']],'itemsAudit':rows}
(ROOT/'qa-20261018/evidence-audit.json').write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:v for k,v in r.items() if k not in ['itemsAudit','withoutSummary']},ensure_ascii=False))
