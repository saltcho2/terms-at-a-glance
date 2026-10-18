raise SystemExit('Legacy input is truncated. Use scripts/check_policy_sources.py or scripts/audit_catalog_inventory.py; these do not certify clause review.')
import gzip, zlib
import json, urllib.request, urllib.error, concurrent.futures, hashlib, time, re, html
from html.parser import HTMLParser
from pathlib import Path
ROOT=Path(__file__).parent; OUT=ROOT/'verification-20261013';OUT.mkdir(exist_ok=True)
class Text(HTMLParser):
 def __init__(self):super().__init__();self.skip=0;self.parts=[];self.title=False;self.titles=[];self.links=[];self.anchor=None
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag in ['script','style','noscript','svg']:self.skip+=1
  if tag=='title':self.title=True
  if tag=='a':self.anchor=[a.get('href',''),'']
  if tag in ['p','div','h1','h2','h3','h4','li','section','br']:self.parts.append('\n')
 def handle_endtag(self,tag):
  if tag in ['script','style','noscript','svg']:self.skip=max(0,self.skip-1)
  if tag=='title':self.title=False
  if tag=='a' and self.anchor:self.links.append(self.anchor);self.anchor=None
 def handle_data(self,s):
  if self.skip:return
  self.parts.append(s)
  if self.title:self.titles.append(s)
  if self.anchor:self.anchor[1]+=s
owners={}
services=json.loads((ROOT/'audit-original-catalog-20261009.json').read_text())['services']
for k,s in services.items():
 urls=[s.get('source'),*s.get('policyLinks',{}).values(),*[i[6] for i in s.get('items',[]) if len(i)>6]]
 for u in set(filter(None,urls)):owners.setdefault(u,[]).append(k)
def inspect(pair):
 url,keys=pair;id=hashlib.sha256(url.encode()).hexdigest()[:16];path=OUT/(id+'.json')
 if path.exists():return json.loads(path.read_text())
 r={'url':url,'owners':keys,'checkedAt':'2026-10-13','id':id,'contentReviewed':False}
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (compatible; TermsLinkCheck/1.0)'})
  with urllib.request.urlopen(req,timeout=22) as res:
   data=res.read(2500000)
   if data[:2]==b'\x1f\x8b':data=gzip.decompress(data)
   elif res.headers.get('Content-Encoding')=='deflate':data=zlib.decompress(data)
   r.update(status=res.status,finalUrl=res.url,contentType=res.headers.get('Content-Type',''))
   if 'pdf' in r['contentType']:r['state']='pdf-needs-review'
   else:
    encoding=res.headers.get_content_charset() or 'utf-8';p=Text();p.feed(data.decode(encoding,errors='replace'));txt='\n'.join(re.sub(r'\s+',' ',x).strip() for x in ''.join(p.parts).splitlines() if x.strip());(OUT/(id+'.txt')).write_text(txt)
    r.update(title=' '.join(p.titles),textLength=len(txt),legalLinks=[x for x in p.links if re.search(r'terms|privacy|약관|개인정보',x[1],re.I)][:30])
    if re.search(r'checking your browser|verify you are human|just a moment|access denied|request blocked',txt[:1500],re.I):r['state']='access-blocked'
    elif len(txt)<700:r['state']='body-unavailable'
    elif re.search(r'page not found|404 not found|페이지를 찾을 수 없',txt[:1000],re.I):r['state']='not-found-page'
    elif re.search(r'terms|agreement|privacy|약관|개인정보',txt[:8000],re.I):r['state']='document-candidate'
    else:r['state']='needs-document-check'
 except urllib.error.HTTPError as e:r.update(status=e.code,state='http-error',error=str(e))
 except Exception as e:r.update(status=0,state='connection-error',error=str(e))
 path.write_text(json.dumps(r,ensure_ascii=False,indent=2));return r
results=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=16) as pool:
 for r in pool.map(inspect,owners.items()):
  results.append(r)
  if len(results)%100==0:print('Checked',len(results),'/',len(owners),flush=True)
summary={'checkedAt':'2026-10-13','serviceCount':len(services),'urlCount':len(results),'results':results}
(OUT/'all-results.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2))
from collections import Counter
print(dict(Counter(r['state'] for r in results)),flush=True)
