import fs from 'node:fs';
import vm from 'node:vm';
const ctx={window:{}};
vm.runInNewContext(fs.readFileSync('service-catalog.js','utf8'),ctx);
const catalog=ctx.window.serviceCatalog;
const additions=JSON.parse(fs.readFileSync('verification-additions.json','utf8'));
const fetched=JSON.parse(fs.readFileSync(fs.existsSync('verification-20261013/all-results.json')?'verification-20261013/all-results.json':'verification-status.json','utf8'));
fetched.urlCount??=fetched.linkChecks.storedUrls;
const original=JSON.parse(fs.readFileSync('audit-original-catalog-20261009.json','utf8'));
const checkedAt='2026. 10. 13. (한국 시간)';
const categories={payment:'결제·구독',privacy:'개인정보',content:'콘텐츠 권리',cancel:'해지·환불',other:'기타 주의'};
const owners=new Map();
for(const r of fetched.results)for(const key of r.owners){
  if(!owners.has(key))owners.set(key,[]);
  owners.get(key).push(r);
}
const stateLabels={
  'document-candidate':'본문 수집 · 조항 대조 필요',
  'body-unavailable':'본문 수집 불가 · 동적 화면 또는 접근 제한 확인 필요',
  'http-error':'서버 접속 거부 또는 주소 오류',
  'needs-document-check':'약관 본문 여부 확인 필요',
  'pdf-needs-review':'PDF 본문 대조 필요',
  'connection-error':'연결 실패 또는 시간 초과',
  'not-found-page':'문서를 찾을 수 없다는 화면 확인'
};
for(const [key,s]of Object.entries(catalog)){
  const results=owners.get(key)||[];
  const serviceStates={};for(const r of results)serviceStates[r.state]=(serviceStates[r.state]||0)+1;
  s.linkAudit={checkedAt,attempted:results.length,contentReviewComplete:false,states:serviceStates};
  if(!s.items.length){
    const states=[...new Set(results.map(r=>stateLabels[r.state]))];
    s.pendingReason=results.length
      ?`기존 저장 주소 ${results.length}개를 ${checkedAt} 점검했습니다. ${states.join(' / ')}. 적용 지역·상품과 개별 조항을 대조한 요약은 아직 없습니다.`
      :'기존 저장 자료에 점검 가능한 문서 주소가 없습니다. 공식 약관 주소와 개별 조항을 다시 조사해야 합니다.';
  }
}
const exceptional={
  instagram:'공식 약관 페이지에서 로그인 요구가 확인되어 본문을 대조하지 못했습니다. 로그인 화면을 약관 원문으로 표시하지 않습니다.',
  facebook:'공식 약관 페이지에서 로그인 요구·접근 제한이 확인되어 본문을 대조하지 못했습니다.',
  threads:'공식 약관 페이지에서 요청 제한(HTTP 429)이 발생해 본문을 대조하지 못했습니다.',
  roblox:'공식 페이지에서 2026년 11월 1일 시행 예정 약관이 확인됐습니다. 현재 적용되는 약관을 확보하기 전까지 예정 약관으로 현행 조건을 설명하지 않습니다.'
};
for(const [key,reason]of Object.entries(exceptional))if(catalog[key]&&!catalog[key].items.length)catalog[key].pendingReason=reason;
for(const entry of additions){
  const s=catalog[entry.key];if(!s)throw Error(`Unknown service: ${entry.key}`);
  const reviewDate=entry.checkedAt||checkedAt;
  s.items=entry.items.map(([cat,title,body,clause,action])=>{
    if(!categories[cat]||!title||!body||!clause||!action)throw Error(`Incomplete item: ${entry.key}`);
    return [cat,categories[cat],title,'mid',body,body,entry.url,{document:entry.document,clause,region:entry.region,version:entry.version||null,checkedAt:reviewDate,action}];
  });
  s.status='reviewed';s.overall='원문 대조 항목 있음';
  s.reviewScope=entry.scope+' · '+entry.region;
  s.reviewStatus=reviewDate+' · '+entry.scope;
  s.pendingReason='';
  s.documents=[{url:entry.url,title:entry.document,checkedAt:reviewDate,bodyChecked:true}];
  s.linkAudit.reviewedItemCount=s.items.length;
}
const counts={total:Object.keys(catalog).length,reviewed:Object.values(catalog).filter(s=>s.status==='reviewed').length,linked:Object.values(catalog).filter(s=>s.status==='linked').length,pending:Object.values(catalog).filter(s=>s.status==='pending').length,items:Object.values(catalog).reduce((n,s)=>n+s.items.length,0)};
const states={};for(const r of fetched.results)states[r.state]=(states[r.state]||0)+1;
const audit={checkedAt,...counts,complete:false,linkChecks:{storedUrls:fetched.urlCount,servicesAttempted:owners.size,states},newReviewedServices:additions.length};
fs.writeFileSync('service-catalog.js','// Each summary is limited to the cited clauses. URL access checks do not certify legal accuracy.\nwindow.serviceCatalog='+JSON.stringify(catalog)+';\nwindow.catalogAudit='+JSON.stringify(audit)+';\n');
const changes=Object.entries(catalog).filter(([,s])=>s.documents.length).map(([key,s])=>({key,name:s.name,status:s.status,oldSource:original.services[key].source,documents:s.documents}));
fs.writeFileSync('recovery-status.json',JSON.stringify({...audit,changes,pendingServices:Object.entries(catalog).filter(([,s])=>s.status==='pending').map(([key,s])=>({key,name:s.name,reason:s.pendingReason}))},null,2)+'\n');
fs.writeFileSync('verification-status.json',JSON.stringify({...audit,scope:'기존 주소 접속 점검과 표시 항목의 원문 대조를 구분합니다. 본문 수집만으로 내용 검증 완료를 뜻하지 않습니다.',results:fetched.results.map(({url,owners,status,httpStatus,finalUrl,state,title,checkedAt})=>({url,owners,httpStatus:status||httpStatus||null,finalUrl:finalUrl||null,state,title:title||null,checkedAt}))},null,2)+'\n');
console.log(audit);
